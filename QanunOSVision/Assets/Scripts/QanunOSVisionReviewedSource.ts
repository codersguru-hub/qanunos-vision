import {ReviewedSourceRecord} from "./QanunOSVisionSourceValidator"

// Newly curated local fixture. Parent visually reviewed the original Presidency PDF.
// Review scope is excerpt identity only, not current-law validity or effective date.
// Provenance, PDF hash, page locator and corpus limitations: docs/SOURCE_REVIEW_ART97.md.
export const REVIEWED_SOURCE: ReviewedSourceRecord = {
  authorityId: "EG-CONSTITUTION-2019-ART-97",
  article: "97",
  title: "Egypt Constitution — April 2019 publication, Article 97",
  originalText: "التقاضى حق مصون ومكفول للكافة.",
  sourceUrl: "https://www.presidency.eg/media/46122/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1-%D8%AC%D9%85%D9%87%D9%88%D8%B1%D9%8A%D8%A9-%D9%85%D8%B5%D8%B1-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-2019.pdf#page=45",
  reviewedOn: "2026-10-27",
  reviewScope: "excerpt-identity-only",
  publisher: "Presidency of Egypt",
  publication: "Constitution Apr 2019",
  pdfPage: "45",
  printedPage: "39",
  effectiveDate: "Unknown — not reviewed",
  currentValidity: "Unknown — not reviewed"
}
