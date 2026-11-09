import {candidateFromSource, CitationCandidate, FICTIONAL_UNSUPPORTED_CITATION, ReviewedSourceRecord} from "./QanunOSVisionSourceValidator"
import {REVIEWED_SOURCE} from "./QanunOSVisionReviewedSource"

export interface PracticeCandidate {
  label: string
  citation: CitationCandidate
}

/**
 * Four practice citations the rehearser chooses between. Variants are derived from the
 * reviewed record so the validator, not a script, decides which one survives.
 * The altered and misattributed variants are labeled practice fixtures, never legal text.
 */
export function buildPracticeCandidates(base: ReviewedSourceRecord): PracticeCandidate[] {
  const exact = candidateFromSource(base)
  const otherArticle = String(Number(base.article) + 1)
  const words = base.originalText.replace(/[.。]$/, "").split(" ")
  return [
    {label: "Art. " + otherArticle + " — full quote", citation: {...exact, article: otherArticle,
      authorityId: base.authorityId.replace(/-ART-[0-9]+$/, "-ART-" + otherArticle)}},
    {label: "Art. " + base.article + " — short quote", citation: {...exact,
      originalText: words.slice(0, Math.ceil(words.length / 2)).join(" ") + "."}},
    {label: "Art. " + FICTIONAL_UNSUPPORTED_CITATION.article + " — FICTIONAL", citation: FICTIONAL_UNSUPPORTED_CITATION},
    {label: "Art. " + base.article + " — full quote", citation: exact}
  ]
}

export const PRACTICE_CANDIDATES: PracticeCandidate[] = buildPracticeCandidates(REVIEWED_SOURCE)
