/**
 * Read-only QanunOS hearing view for the glasses, against qanunos.com/api/vision.
 * Pairing follows the device flow: the Lens shows a code, the lawyer approves it on the
 * website, the Lens collects a qv_ token. The token lives in memory only and is never shown.
 * Transport and timers are injected so the flow can be tested without a network.
 */
export const VISION_API = "https://qanunos.com/api/vision"
export const VERIFICATION_HINT = "qanunos.com/vision"

export interface HttpReply {status: number; json: any}
export type FetchJson = (method: "GET" | "POST", path: string, body: object | null, token: string | null) => Promise<HttpReply>
export type Sleep = (seconds: number) => Promise<void>

export type OfficeStage = "Connecting" | "Pairing" | "Loading" | "Case" | "OfficeError"
export interface CaseCard {
  title: string
  court: string
  stage: string
  nextHearing: string
  parties: string
  subject: string
  openTasks: number
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}
function shorten(value: string, limit: number): string {
  return value.length <= limit ? value : value.slice(0, limit - 1).trim() + "…"
}

/** Shapes a /cases/:id reply into card lines; missing fields stay out rather than inventing text. */
export function toCaseCard(summary: any): CaseCard | null {
  if (!summary || typeof summary !== "object" || !text(summary.title)) return null
  const next = summary.next_hearing || null
  const nextHearing = next ? [text(next.date), text(next.time).slice(0, 5), text(next.purpose)].filter(Boolean).join(" · ") : ""
  const parties = [text(summary.client_name) && "الموكل: " + text(summary.client_name),
    text(summary.opponent_name) && "الخصم: " + text(summary.opponent_name)].filter(Boolean).join(" | ")
  return {
    title: shorten(text(summary.title), 60),
    court: text(summary.court),
    stage: text(summary.stage),
    nextHearing,
    parties,
    subject: shorten(text(summary.subject), 90),
    openTasks: Array.isArray(summary.open_tasks) ? summary.open_tasks.length : 0
  }
}

/** Picks the active case with the nearest upcoming hearing; otherwise the most recently updated one. */
export function pickCase(cases: any[]): any | null {
  if (!Array.isArray(cases) || cases.length === 0) return null
  const dated = cases.filter(c => text(c.next_hearing_date)).sort((a, b) => text(a.next_hearing_date) < text(b.next_hearing_date) ? -1 : 1)
  return dated[0] || cases[0]
}

export class QanunOSVisionOfficeState {
  stage: OfficeStage = "Connecting"
  userCode = ""
  card: CaseCard | null = null
  problem = ""
  private token: string | null = null
  private run = 0

  constructor(private readonly fetchJson: FetchJson, private readonly sleep: Sleep, private readonly onChange: () => void = () => {}) {}

  get paired(): boolean { return this.token !== null }

  /** Opens today's hearing, pairing first if needed. A newer open() or cancel() supersedes this one. */
  async open(): Promise<void> {
    const run = ++this.run
    try {
      if (!this.token) {
        this.set("Connecting")
        const start = await this.fetchJson("POST", "/pair/start", null, null)
        if (this.run !== run) return
        if (start.status !== 201 || !text(start.json?.device_code) || !text(start.json?.user_code))
          return this.fail("QanunOS could not start pairing.")
        this.userCode = text(start.json.user_code)
        this.set("Pairing")
        const token = await this.waitForApproval(run, text(start.json.device_code),
          Number(start.json.interval) || 5, Number(start.json.expires_in) || 600)
        if (this.run !== run) return
        if (!token) return
        this.token = token
      }
      this.set("Loading")
      const list = await this.fetchJson("GET", "/cases", null, this.token)
      if (this.run !== run) return
      if (list.status === 401) { this.token = null; return this.fail("Pairing expired. Connect again.") }
      if (list.status !== 200) return this.fail("QanunOS server error (HTTP " + list.status + ").")
      const chosen = pickCase(list.json?.cases)
      if (!chosen) return this.fail("No active case in this QanunOS account.")
      const summary = await this.fetchJson("GET", "/cases/" + encodeURIComponent(String(chosen.id)), null, this.token)
      if (this.run !== run) return
      const card = summary.status === 200 ? toCaseCard(summary.json) : null
      if (!card) return this.fail("QanunOS returned no readable case.")
      this.card = card
      this.set("Case")
    } catch (error) {
      if (this.run === run) this.fail("QanunOS unreachable.")
    }
  }
  cancel(): void { this.run++ }

  private async waitForApproval(run: number, deviceCode: string, interval: number, expiresIn: number): Promise<string | null> {
    let wait = interval
    for (let waited = 0; waited < expiresIn; waited += wait) {
      await this.sleep(wait)
      if (this.run !== run) return null
      const reply = await this.fetchJson("POST", "/pair/token", {device_code: deviceCode}, null)
      if (this.run !== run) return null
      if (reply.status === 200 && text(reply.json?.access_token)) return text(reply.json.access_token)
      const error = text(reply.json?.error)
      if (error === "slow_down") wait += 5
      else if (error !== "authorization_pending") {
        this.fail(error === "expired_token" ? "Pairing code expired. Connect again." : "Pairing was not completed.")
        return null
      }
    }
    this.fail("Pairing code expired. Connect again.")
    return null
  }
  private set(stage: OfficeStage): void {
    this.stage = stage
    this.onChange()
  }
  private fail(problem: string): void {
    this.problem = problem
    this.set("OfficeError")
  }
}
