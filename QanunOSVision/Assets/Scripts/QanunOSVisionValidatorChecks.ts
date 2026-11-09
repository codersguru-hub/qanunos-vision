import {candidateFromSource, CitationCandidate, explainRejection, FICTIONAL_UNSUPPORTED_CITATION, ReviewedSourceRecord, sourceHost, UNKNOWN_LEGAL_STATUS, validateCitation} from "./QanunOSVisionSourceValidator"
import {buildPracticeCandidates} from "./QanunOSVisionPracticeCandidates"
import {PREPARED_QUESTION_ID, QanunOSVisionRehearsalState} from "./QanunOSVisionRehearsalState"

export const VALIDATOR_CHECK_COUNT = 60

/** Synthetic strings only: these tests make no statement about an authentic legal source. */
export function runValidatorChecks(): number {
  const source: ReviewedSourceRecord = {
    authorityId: "TEST-ONLY-ART-97", article: "97", title: "Synthetic test fixture — not law",
    originalText: "EXACT SYNTHETIC EXCERPT — NOT LEGAL TEXT", sourceUrl: "https://example.invalid/test-only#page=3",
    reviewedOn: "2026-10-27", reviewScope: "excerpt-identity-only", publisher: "Synthetic publisher", publication: "Synthetic publication",
    pdfPage: "3", printedPage: "1", effectiveDate: UNKNOWN_LEGAL_STATUS, currentValidity: UNKNOWN_LEGAL_STATUS
  }
  const valid = candidateFromSource(source)
  let passed = 0
  function check(name: string, condition: boolean): void {
    if (!condition) throw new Error("Validator assertion failed: " + name)
    passed++
  }
  check("exact identity and provenance accepted", validateCitation(valid, source).ok)
  check("missing allowlist rejected", !validateCitation(valid, null).ok)
  check("missing candidate rejected", !validateCitation(null, source).ok)
  check("fictional unsupported ID rejected", !validateCitation(FICTIONAL_UNSUPPORTED_CITATION, source).ok)
  const candidateMutations: Partial<CitationCandidate>[] = [
    {authorityId: ""}, {authorityId: "TEST-ONLY-ART-970"}, {authorityId: "test-only-art-97"},
    {article: "98"}, {article: "097"}, {originalText: valid.originalText + "."}, {originalText: ""},
    {originalText: valid.originalText.toLowerCase()}, {title: "Similar title"}, {sourceUrl: "https://example.invalid/other"},
    {sourceUrl: ""}, {reviewedOn: "2026-10-26"}, {reviewScope: "current-law"}
  ]
  candidateMutations.forEach((change, index) => check("candidate tamper " + index, !validateCitation({...valid, ...change}, source).ok))
  const sourceMutations: Partial<ReviewedSourceRecord>[] = [
    {article: "98"}, {title: ""}, {originalText: ""}, {sourceUrl: ""}, {sourceUrl: "http://example.invalid/test#page=3"},
    {reviewedOn: ""}, {reviewedOn: "today"}, {effectiveDate: "Current"}, {currentValidity: "Verified current law"},
    {publisher: ""}, {publication: ""}, {pdfPage: ""}, {pdfPage: "4"}, {printedPage: "x"}
  ]
  sourceMutations.forEach((change, index) => {
    const altered = {...source, ...change}
    check("incomplete/invalid reviewed source " + index, !validateCitation(candidateFromSource(altered), altered).ok)
  })

  const candidates = buildPracticeCandidates(source)
  check("explains misattributed article", explainRejection(candidates[0].citation, source).includes("not Article 98"))
  check("explains altered excerpt", explainRejection(candidates[1].citation, source).includes("Quoted text differs"))
  check("explains unknown authority", explainRejection(candidates[2].citation, source).includes("No reviewed source"))
  check("host derived from reviewed link", sourceHost("https://www.presidency.eg/media/x.pdf#page=45") === "presidency.eg")
  check("four practice candidates", candidates.length === 4)
  check("exactly one candidate validates", candidates.filter(c => validateCitation(c.citation, source).ok).length === 1)

  const absent = new QanunOSVisionRehearsalState(null, PREPARED_QUESTION_ID, candidates)
  absent.advance(); check("absent fixture still asks the question", absent.stage === "Question")
  absent.choose(3); check("missing reviewed fixture abstains on any choice", absent.stage === "Abstention")
  check("abstention offers no source", absent.view().source === null)
  absent.returnToRehearsal()
  check("return resets absent-source path", absent.stage === "Ready")

  const flow = new QanunOSVisionRehearsalState(source, PREPARED_QUESTION_ID, candidates)
  flow.advance(); check("ready opens question", flow.stage === "Question")
  check("question offers every candidate", flow.view().choices.length === 4)
  flow.choose(0); check("misattributed article rejected", flow.stage === "Rejected")
  check("rejection names the reviewed article", flow.view().body.includes("not Article 98"))
  flow.advance(); check("rejection returns to choices", flow.stage === "Question")
  flow.choose(1); check("altered excerpt rejected", flow.stage === "Rejected")
  check("rejection explains the altered text", flow.view().body.includes("differs"))
  flow.advance(); flow.choose(2); check("fictional citation rejected", flow.stage === "Rejected")
  flow.advance(); flow.choose(3); check("only the exact reviewed citation matches", flow.stage === "Matched")
  check("attempts counted", flow.attempts === 4)
  check("match reports its attempt", flow.view().detail.includes("Matched on attempt 4 of this rehearsal."))
  flow.advance(); check("source inspection reachable", flow.stage === "Source")
  check("source details keep exact text", flow.view().source!.originalText === source.originalText)
  check("page locator comes from the record", flow.view().detail.some(line => line.includes("PDF p.3 (printed 1) | example.invalid")))
  flow.advance(); check("source return restores ready", flow.stage === "Ready")
  flow.choose(3); check("choices ignored outside the question", flow.stage === "Ready")

  const unknown = new QanunOSVisionRehearsalState(source, "UNKNOWN-OR-AMBIGUOUS-QUESTION", candidates)
  unknown.advance()
  check("unsupported question abstains before citation", unknown.stage === "Abstention")
  check("unsupported question exposes no authority", unknown.view().source === null)
  check("unsupported-question reason disclosed", unknown.view().body.includes("Unsupported or ambiguous"))
  return passed
}
