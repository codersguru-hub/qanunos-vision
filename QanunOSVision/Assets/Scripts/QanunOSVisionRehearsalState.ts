import {explainRejection, ReviewedSourceRecord, sourceHost, validateCitation, validateReviewedSource} from "./QanunOSVisionSourceValidator"
import {PRACTICE_CANDIDATES, PracticeCandidate} from "./QanunOSVisionPracticeCandidates"

export type RehearsalStage = "Ready" | "Question" | "Rejected" | "Matched" | "Source" | "Abstention"
  | "Connecting" | "Pairing" | "Loading" | "Case" | "OfficeError"
export const PREPARED_QUESTION_ID = "MOCK-GENERAL-RIGHT-TO-LITIGATE"
export interface RehearsalView {
  stage: RehearsalStage
  heading: string
  body: string
  primaryLabel: string
  showPrimary: boolean
  showReturn: boolean
  choices: string[]
  source: ReviewedSourceRecord | null
  detail: string[]
  // Optional overrides used by the QanunOS hearing view; the rehearsal leaves them unset.
  returnLabel?: string
  disclosure?: string
  tallBody?: boolean
}

/** A single deterministic local-fixture rehearsal. No microphone, API, or legal inference. */
export class QanunOSVisionRehearsalState {
  stage: RehearsalStage = "Ready"
  attempts = 0
  private unsupportedQuestion = false
  private chosen: PracticeCandidate | null = null
  private rejection = ""
  constructor(private readonly reviewedSource: ReviewedSourceRecord | null, private readonly questionId: string = PREPARED_QUESTION_ID,
    readonly candidates: PracticeCandidate[] = PRACTICE_CANDIDATES) {}

  /** Primary button. Choosing a citation happens through choose(). */
  advance(): void {
    if (this.stage === "Ready") {
      this.unsupportedQuestion = this.questionId !== PREPARED_QUESTION_ID
      this.attempts = 0
      this.stage = this.unsupportedQuestion ? "Abstention" : "Question"
    } else if (this.stage === "Rejected") this.stage = "Question"
    else if (this.stage === "Matched") {
      // Re-check before revealing details; the record must still match exactly.
      this.stage = this.chosen && validateCitation(this.chosen.citation, this.reviewedSource).ok ? "Source" : "Abstention"
    } else if (this.stage !== "Question") this.returnToRehearsal()
  }
  choose(index: number): void {
    const candidate = this.candidates[index]
    if (this.stage !== "Question" || !candidate) return
    this.attempts++
    this.chosen = candidate
    if (validateReviewedSource(this.reviewedSource)) { this.stage = "Abstention"; return }
    const result = validateCitation(candidate.citation, this.reviewedSource)
    this.rejection = result.ok ? "" : explainRejection(candidate.citation, this.reviewedSource!)
    this.stage = result.ok ? "Matched" : "Rejected"
  }
  returnToRehearsal(): void {
    this.stage = "Ready"
    this.chosen = null
  }
  view(): RehearsalView {
    const shared = {stage: this.stage, showPrimary: true, showReturn: this.stage !== "Ready", choices: [] as string[],
      source: null as ReviewedSourceRecord | null, detail: [] as string[]}
    if (this.stage === "Ready") return {...shared, heading: "QanunOS Vision", body: "Simulated hearing — fictional facts.\nFictional case: permit refusal.\nPractice identifying a source for access to court.", primaryLabel: "Mock judge question"}
    if (this.stage === "Question") return {...shared, heading: "Mock judge question", body: "Which constitutional provision states\nthe general right to litigate? Choose a citation:", primaryLabel: "", showPrimary: false, choices: this.candidates.map(c => c.label)}
    if (this.stage === "Rejected") return {...shared, heading: "Unverified — do not cite", body: "You cited: " + this.chosen!.label + "\n" + this.rejection + "\nAttempt " + this.attempts + " — try another citation.", primaryLabel: "Try another citation"}
    if (this.stage === "Abstention") return {...shared, heading: "No reviewed authority available", body: (this.unsupportedQuestion ? "Unsupported or ambiguous mock question.\n" : "The reviewed fixture is missing or invalid.\n") + "No citation is confirmed.\n\nContinue rehearsal without citing it.", primaryLabel: "Return to rehearsal", showReturn: false}
    const source = this.reviewedSource!
    if (this.stage === "Matched") return {...shared, source, heading: "Exact reviewed match", body: "", primaryLabel: "Inspect source card",
      detail: [source.title, source.authorityId, "Excerpt identity reviewed: " + source.reviewedOn,
        "Matched on attempt " + this.attempts + " of this rehearsal.",
        "Effective date: " + source.effectiveDate, "Legal currency: " + source.currentValidity]}
    return {...shared, source, heading: "Source details", body: "", primaryLabel: "Return to rehearsal", showReturn: false,
      detail: [source.authorityId, source.publisher + " | " + source.publication,
        "Art. " + source.article + " | PDF p." + source.pdfPage + " (printed " + source.printedPage + ") | " + sourceHost(source.sourceUrl),
        "Excerpt identity reviewed: " + source.reviewedOn,
        "Effective date: " + source.effectiveDate, "Legal currency: " + source.currentValidity]}
  }
}
