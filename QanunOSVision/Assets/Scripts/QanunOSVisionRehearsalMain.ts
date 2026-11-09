import {QanunOSVisionRehearsalUI} from "./QanunOSVisionRehearsalUI"
import {QanunOSVisionRehearsalState, RehearsalView} from "./QanunOSVisionRehearsalState"
import {REVIEWED_SOURCE} from "./QanunOSVisionReviewedSource"
import {HttpReply, QanunOSVisionOfficeState, VISION_API} from "./QanunOSVisionOfficeState"
import {OFFICE_ENTRY_LABEL, officeView} from "./QanunOSVisionOfficeView"

const REQUEST_TIMEOUT_SECONDS = 8

@component
export class QanunOSVisionRehearsalMain extends BaseScriptComponent {
  @ui.label("QanunOS Vision — local fixture rehearsal controller")
  @ui.separator
  @input
  @hint("Typed UIKit view on the authored RehearsalSpatialCard.")
  card: QanunOSVisionRehearsalUI
  @input
  @hint("Use the reviewed local fixture. Off exercises the explicit no-reviewed-source abstention path.")
  useReviewedFixture: boolean = true
  @input
  @hint("Offer the read-only QanunOS hearing view (pairing with qanunos.com). Off keeps the card fully offline.")
  useQanunOffice: boolean = true
  private state: QanunOSVisionRehearsalState
  private office: QanunOSVisionOfficeState
  private mode: "rehearsal" | "office" = "rehearsal"

  onAwake(): void {
    this.state = new QanunOSVisionRehearsalState(this.useReviewedFixture ? REVIEWED_SOURCE : null)
    this.office = new QanunOSVisionOfficeState((method, path, body, token) => this.fetchJson(method, path, body, token),
      seconds => this.sleep(seconds), () => { if (this.mode === "office") this.render() })
    // Subscribe before UI OnStart construction emits readiness.
    this.card.onReady.add(() => this.render())
    this.createEvent("OnStartEvent").bind(() => {
      this.card.onPrimary.add(() => this.primary())
      this.card.onReturn.add(() => this.back())
      this.card.onChoice.add(index => { this.state.choose(index); this.render() })
    })
  }

  private primary(): void {
    if (this.mode === "office") {
      if (this.office.stage === "OfficeError") { this.office.open(); return }
      if (this.office.stage !== "Case") return
      // From the hearing card straight into the citation rehearsal.
      this.mode = "rehearsal"
      this.state.returnToRehearsal()
    }
    this.state.advance()
    this.render()
  }
  private back(): void {
    if (this.mode === "office") {
      this.office.cancel()
      this.mode = "rehearsal"
      this.state.returnToRehearsal()
    } else if (this.state.stage === "Ready" && this.useQanunOffice) {
      this.mode = "office"
      this.office.open()
    } else this.state.returnToRehearsal()
    this.render()
  }
  private render(): void {
    if (this.mode === "office") {
      this.card.show(officeView(this.office))
      print("[QanunOS] office stage=" + this.office.stage + " | fictional demo account; read-only")
      return
    }
    let view: RehearsalView = this.state.view()
    if (view.stage === "Ready" && this.useQanunOffice) view = {...view, showReturn: true, returnLabel: OFFICE_ENTRY_LABEL}
    this.card.show(view)
    print("[QanunOS] stage=" + this.state.stage + " | fictional facts; mock input; local fixture")
  }

  private sleep(seconds: number): Promise<void> {
    return new Promise(resolve => {
      const delay = this.createEvent("DelayedCallbackEvent")
      delay.bind(() => resolve())
      delay.reset(seconds)
    })
  }
  /** One HTTPS call to the QanunOS vision API. The bearer token is never printed. */
  private async fetchJson(method: "GET" | "POST", path: string, body: object | null, token: string | null): Promise<HttpReply> {
    const internet = require("LensStudio:InternetModule") as InternetModule
    const headers: {[name: string]: string} = {"Accept": "application/json"}
    const options: {[name: string]: any} = {method, headers}
    if (body) { headers["Content-Type"] = "application/json"; options.body = JSON.stringify(body) }
    if (token) headers["Authorization"] = "Bearer " + token
    // Preview cannot cancel a request, so a late reply after the timeout is simply ignored by the state's run check.
    // Neither promise rejects, so a loser settling later never surfaces as an unhandled rejection.
    const timeout = this.sleep(REQUEST_TIMEOUT_SECONDS).then((): HttpReply | null => null)
    const request = internet.fetch(new Request(VISION_API + path, options)).then(async (response): Promise<HttpReply> => {
      let json: any = null
      try { json = await response.json() } catch (error) { json = null }
      return {status: response.status, json}
    }, (): HttpReply | null => null)
    const reply = await Promise.race([request, timeout])
    if (!reply) throw new Error("QanunOS request failed or timed out")
    return reply
  }
}
