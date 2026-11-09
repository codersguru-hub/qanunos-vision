import {QanunOSVisionOfficeState, VERIFICATION_HINT} from "./QanunOSVisionOfficeState"
import {RehearsalView} from "./QanunOSVisionRehearsalState"

export const OFFICE_DISCLOSURE = "Fictional demo account | Live QanunOS, read-only"
export const OFFICE_ENTRY_LABEL = "QanunOS hearing"

/** Card content for the office stages. Case text is QanunOS data, shown as returned. */
export function officeView(office: QanunOSVisionOfficeState): RehearsalView {
  const shared = {stage: office.stage, showPrimary: false, primaryLabel: "", showReturn: true, returnLabel: "Cancel",
    choices: [] as string[], source: null, detail: [] as string[], disclosure: OFFICE_DISCLOSURE, tallBody: false}
  if (office.stage === "Connecting") return {...shared, heading: "QanunOS hearing",
    body: "Connecting to QanunOS…\nRead-only. The glasses send no case data."}
  // The code is the heading: the largest, boldest text on the card, readable at a glance.
  if (office.stage === "Pairing") return {...shared, heading: office.userCode, tallBody: true,
    body: "Pair with QanunOS\n\nOn " + VERIFICATION_HINT + ", sign in\nand enter the code above.\n\nWaiting for approval…"}
  if (office.stage === "Loading") return {...shared, heading: "QanunOS hearing", body: "Opening the next hearing…"}
  if (office.stage === "OfficeError") return {...shared, heading: "QanunOS unavailable", returnLabel: "Close",
    showPrimary: true, primaryLabel: "Try again", body: office.problem + "\nThe citation rehearsal still works offline."}
  const card = office.card!
  const lines = [
    [card.court, card.stage].filter(Boolean).join(" · "),
    card.nextHearing && "الجلسة القادمة: " + card.nextHearing,
    card.parties,
    card.subject,
    card.openTasks > 0 ? "مهام مفتوحة: " + card.openTasks : ""
  ].filter(Boolean)
  return {...shared, heading: card.title, body: lines.join("\n"), tallBody: true,
    showPrimary: true, primaryLabel: "Rehearse a citation", returnLabel: "Close hearing"}
}
