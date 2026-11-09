/** Local allowlist validation only. Passing means reviewed excerpt identity, not legal currency. */
export const UNKNOWN_LEGAL_STATUS = "Unknown — not reviewed"
export interface ReviewedSourceRecord {
  authorityId: string
  article: string
  title: string
  originalText: string
  sourceUrl: string
  reviewedOn: string
  reviewScope: "excerpt-identity-only"
  // Provenance shown on the source card. The view reads these; it never hardcodes them.
  publisher: string
  publication: string
  pdfPage: string
  printedPage: string
  effectiveDate: string
  currentValidity: string
}
export interface CitationCandidate {
  authorityId: string
  article: string
  originalText: string
  title: string
  sourceUrl: string
  reviewedOn: string
  reviewScope: string
}
export type SourceValidation = {ok: true; source: ReviewedSourceRecord} | {ok: false; reason: string}
const EXACT_FIELDS: (keyof CitationCandidate)[] = ["authorityId", "article", "originalText", "title", "sourceUrl", "reviewedOn", "reviewScope"]

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}
/** Checks the trusted record itself before any candidate is compared against it. */
export function validateReviewedSource(allowlist: ReviewedSourceRecord | null): string | null {
  if (!allowlist) return "No reviewed authority available."
  const fields: (keyof ReviewedSourceRecord)[] = ["authorityId", "article", "title", "originalText", "sourceUrl", "reviewedOn",
    "publisher", "publication", "pdfPage", "printedPage"]
  if (fields.some(key => !nonempty(allowlist[key]))) return "Reviewed provenance is incomplete."
  if (!/^[0-9]+$/.test(allowlist.article) || !allowlist.authorityId.endsWith("-ART-" + allowlist.article))
    return "Reviewed identity and article suffix disagree."
  if (!/^https:\/\/[^\s]+$/.test(allowlist.sourceUrl) || !/^\d{4}-\d{2}-\d{2}$/.test(allowlist.reviewedOn)
      || allowlist.reviewScope !== "excerpt-identity-only") return "Reviewed provenance is invalid."
  if (!/^[0-9]+$/.test(allowlist.pdfPage) || !/^[0-9]+$/.test(allowlist.printedPage)
      || !allowlist.sourceUrl.endsWith("#page=" + allowlist.pdfPage)) return "Reviewed page locator and source link disagree."
  if (allowlist.effectiveDate !== UNKNOWN_LEGAL_STATUS || allowlist.currentValidity !== UNKNOWN_LEGAL_STATUS)
    return "This fixture does not establish currency or an effective date."
  return null
}
export function validateCitation(candidate: CitationCandidate | null, allowlist: ReviewedSourceRecord | null): SourceValidation {
  const sourceProblem = validateReviewedSource(allowlist)
  if (sourceProblem) return {ok: false, reason: sourceProblem}
  if (!candidate) return {ok: false, reason: "Candidate is missing."}
  for (const field of EXACT_FIELDS) {
    if (!nonempty(candidate[field]) || candidate[field] !== allowlist![field])
      return {ok: false, reason: "Exact " + field + " match required."}
  }
  return {ok: true, source: allowlist!}
}

/** Plain-language rejection derived from every mismatched field. Call only with a valid reviewed record. */
export function explainRejection(candidate: CitationCandidate, allowlist: ReviewedSourceRecord): string {
  const differs = EXACT_FIELDS.filter(field => candidate[field] !== allowlist[field])
  if (differs.length === 0) return "Exact reviewed match."
  const sameText = candidate.originalText === allowlist.originalText
  if (sameText && differs.includes("article"))
    return "This excerpt is reviewed Article " + allowlist.article + ",\nnot Article " + candidate.article + "."
  if (!sameText && candidate.authorityId === allowlist.authorityId && candidate.article === allowlist.article)
    return "Quoted text differs from the reviewed\nArticle " + allowlist.article + " excerpt."
  if (!sameText && differs.includes("authorityId")) return "No reviewed source has this\nauthority ID or text."
  return "Exact match required: " + differs.join(", ") + "."
}

export function candidateFromSource(source: ReviewedSourceRecord): CitationCandidate {
  return {authorityId: source.authorityId, article: source.article, originalText: source.originalText,
    title: source.title, sourceUrl: source.sourceUrl, reviewedOn: source.reviewedOn, reviewScope: source.reviewScope}
}

/** Host shown on the card, derived from the reviewed link rather than typed separately. */
export function sourceHost(sourceUrl: string): string {
  const match = /^https:\/\/(?:www\.)?([^/#?]+)/.exec(sourceUrl)
  return match ? match[1] : ""
}

export const FICTIONAL_UNSUPPORTED_CITATION: CitationCandidate = {
  authorityId: "FICTIONAL-EG-9999-ART-404", article: "404", originalText: "FICTIONAL unsupported practice citation — no legal text.",
  title: "Fictional practice fixture", sourceUrl: "", reviewedOn: "", reviewScope: "unreviewed"
}
