import {FetchJson, HttpReply, pickCase, QanunOSVisionOfficeState, toCaseCard} from "./QanunOSVisionOfficeState"
import {officeView} from "./QanunOSVisionOfficeView"

export const OFFICE_CHECK_COUNT = 29

// Fictional replies shaped like qanunos.com/api/vision; no network is involved.
const CASE_LIST = {status: "active", cases: [
  {id: 7, title: "دعوى مستحقات عمالية", next_hearing_date: null},
  {id: 3, title: "مطالبة بقيمة فاتورة توريد غير مسددة", next_hearing_date: "2026-11-10"},
  {id: 9, title: "قضية لاحقة", next_hearing_date: "2026-12-01"}
]}
const CASE_SUMMARY = {
  id: 3, title: "مطالبة بقيمة فاتورة توريد غير مسددة", court: "المحكمة الاقتصادية بالقاهرة", stage: "محاكمة ابتدائية",
  subject: "مطالبة بمبلغ 185,000 جنيه قيمة فاتورة توريد مواد بناء استلمها المدعى عليه ولم يسدد ثمنها.",
  client_name: "شركة خيالية للتوريدات", opponent_name: "شركة الأفق الخيالية للمقاولات",
  next_hearing: {date: "2026-11-10", time: "10:00:00", purpose: "تقديم المستندات"}, open_tasks: [{id: 1}, {id: 2}]
}

type Script = {[route: string]: HttpReply[]}
function fakeServer(script: Script, calls: string[]): FetchJson {
  return async (method, path, body, token) => {
    const route = method + " " + path
    calls.push(route + (token ? " +token" : ""))
    const replies = script[route]
    if (!replies || replies.length === 0) throw new Error("unexpected " + route)
    return replies.length > 1 ? replies.shift()! : replies[0]
  }
}
const noWait = async (): Promise<void> => {}
const started: HttpReply = {status: 201, json: {device_code: "dev-secret", user_code: "ABCD-2345", interval: 5, expires_in: 600}}
const pending: HttpReply = {status: 400, json: {error: "authorization_pending"}}
const granted: HttpReply = {status: 200, json: {access_token: "qv_test_token", token_type: "Bearer", expires_in: 43200}}

export async function runOfficeChecks(): Promise<number> {
  let passed = 0
  function check(name: string, condition: boolean): void {
    if (!condition) throw new Error("Office assertion failed: " + name)
    passed++
  }

  check("picks nearest upcoming hearing", pickCase(CASE_LIST.cases).id === 3)
  check("falls back to first case", pickCase([{id: 5, next_hearing_date: null}]).id === 5)
  check("empty list picks nothing", pickCase([]) === null)
  const card = toCaseCard(CASE_SUMMARY)!
  check("card keeps title", card.title === CASE_SUMMARY.title)
  check("card formats next hearing", card.nextHearing === "2026-11-10 · 10:00 · تقديم المستندات")
  check("card names both parties", card.parties.includes("الموكل: ") && card.parties.includes("الخصم: "))
  check("card counts open tasks", card.openTasks === 2)
  check("untitled reply is not a card", toCaseCard({court: "x"}) === null)

  // Happy path: pending, slow_down, approved, then the case.
  let calls: string[] = []
  const stages: string[] = []
  let office: QanunOSVisionOfficeState = new QanunOSVisionOfficeState(fakeServer({
    "POST /pair/start": [started],
    "POST /pair/token": [pending, {status: 400, json: {error: "slow_down"}}, granted],
    "GET /cases": [{status: 200, json: CASE_LIST}],
    "GET /cases/3": [{status: 200, json: CASE_SUMMARY}]
  }, calls), noWait, () => stages.push(office.stage))
  await office.open()
  check("pairing shows the user code", stages.includes("Pairing") && office.userCode === "ABCD-2345")
  check("approved pairing reaches the case", office.stage === "Case" && office.paired)
  check("polled until approved", calls.filter(c => c === "POST /pair/token").length === 3)
  check("reads use the token", calls.includes("GET /cases/3 +token"))
  check("pairing calls carry no token", !calls.some(c => c.startsWith("POST") && c.endsWith("+token")))
  const view = officeView(office)
  check("case view shows title as heading", view.heading === CASE_SUMMARY.title)
  check("case view lists the next hearing", view.body.includes("الجلسة القادمة: 2026-11-10"))
  check("case view leads into rehearsal", view.showPrimary && view.primaryLabel === "Rehearse a citation")
  check("case view discloses demo data", view.disclosure!.includes("Fictional demo account"))
  check("token never appears on the card", !JSON.stringify(view).includes("qv_test_token"))

  // Already paired: opening again skips pairing.
  calls.length = 0
  await office.open()
  check("paired open skips pairing", office.stage === "Case" && !calls.some(c => c.startsWith("POST")))

  // Expired code.
  calls = []
  office = new QanunOSVisionOfficeState(fakeServer({"POST /pair/start": [started],
    "POST /pair/token": [{status: 400, json: {error: "expired_token"}}]}, calls), noWait)
  await office.open()
  check("expired code fails safely", office.stage === "OfficeError" && office.problem.includes("expired") && !office.paired)

  // Revoked token on read: forget it and say so.
  office = new QanunOSVisionOfficeState(fakeServer({"POST /pair/start": [started], "POST /pair/token": [granted],
    "GET /cases": [{status: 401, json: {error: "invalid_token"}}]}, []), noWait)
  await office.open()
  check("revoked token is dropped", office.stage === "OfficeError" && !office.paired)

  // No cases.
  office = new QanunOSVisionOfficeState(fakeServer({"POST /pair/start": [started], "POST /pair/token": [granted],
    "GET /cases": [{status: 200, json: {status: "active", cases: []}}]}, []), noWait)
  await office.open()
  check("empty account reports no case", office.stage === "OfficeError" && office.problem.includes("No active case"))

  // Server error is not an empty account.
  office = new QanunOSVisionOfficeState(fakeServer({"POST /pair/start": [started], "POST /pair/token": [granted],
    "GET /cases": [{status: 500, json: {error: "server_error"}}]}, []), noWait)
  await office.open()
  check("server error is named, not 'no case'", office.stage === "OfficeError" && office.problem.includes("HTTP 500") && office.paired)

  // Network failure.
  office = new QanunOSVisionOfficeState(async () => { throw new Error("offline") }, noWait)
  await office.open()
  check("network failure is reported", office.stage === "OfficeError" && office.problem === "QanunOS unreachable.")
  check("error view offers retry", officeView(office).primaryLabel === "Try again")

  // Bad start reply.
  office = new QanunOSVisionOfficeState(fakeServer({"POST /pair/start": [{status: 429, json: {error: "rate_limited"}}]}, []), noWait)
  await office.open()
  check("rate-limited start fails safely", office.stage === "OfficeError")

  // Cancel while waiting for approval: nothing changes afterwards.
  let release: () => void = () => {}
  const held = new Promise<void>(resolve => { release = resolve })
  calls = []
  office = new QanunOSVisionOfficeState(fakeServer({"POST /pair/start": [started], "POST /pair/token": [granted],
    "GET /cases": [{status: 200, json: CASE_LIST}], "GET /cases/3": [{status: 200, json: CASE_SUMMARY}]}, calls), () => held)
  const opening = office.open()
  await Promise.resolve(); await Promise.resolve()
  check("waiting shows the pairing code", office.stage === "Pairing")
  check("pairing code is the card heading", officeView(office).heading === "ABCD-2345" && !officeView(office).body.includes("dev-secret"))
  office.cancel()
  release()
  await opening
  check("cancel stops polling", !calls.includes("POST /pair/token") && office.stage === "Pairing" && !office.paired)
  return passed
}
