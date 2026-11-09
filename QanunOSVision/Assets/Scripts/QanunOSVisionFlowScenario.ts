import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {REVIEWED_SOURCE} from "./QanunOSVisionReviewedSource"
import {PRACTICE_CANDIDATES} from "./QanunOSVisionPracticeCandidates"
import {QanunOSVisionRehearsalInteractor, visibleText} from "./QanunOSVisionRehearsalInteractor"

@component
export class QanunOSVisionFlowScenario extends Scenario {
  async run(): Promise<void> {
    await sleep(1500)
    const i = new QanunOSVisionRehearsalInteractor()
    expect(visibleText("RehearsalPrimaryButtonLabel")).toBe("Mock judge question")
    expect(visibleText("RehearsalDisclosure")).toBe("Fictional facts | Mock input | Local fixtures")
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("Mock judge question")
    expect(visibleText("RehearsalChoicePrompt").includes("general right to litigate")).toBe(true)
    PRACTICE_CANDIDATES.forEach((candidate, index) => expect(visibleText("RehearsalChoice" + index + "Label")).toBe(candidate.label))
    // Misattributed article, altered excerpt, fictional ID: each is rejected live with its own reason.
    await i.tap("RehearsalChoice0")
    expect(visibleText("RehearsalHeading")).toBe("Unverified — do not cite")
    expect(visibleText("RehearsalBody").includes("not Article 98")).toBe(true)
    await i.tap("RehearsalPrimaryButton")
    await i.tap("RehearsalChoice1")
    expect(visibleText("RehearsalBody").includes("Quoted text differs")).toBe(true)
    await i.tap("RehearsalPrimaryButton")
    await i.tap("RehearsalChoice2")
    expect(visibleText("RehearsalBody").includes("FICTIONAL")).toBe(true)
    await i.tap("RehearsalPrimaryButton")
    await i.tap("RehearsalChoice3")
    expect(visibleText("RehearsalHeading")).toBe("Exact reviewed match")
    expect(visibleText("RehearsalExcerpt")).toBe(REVIEWED_SOURCE.originalText)
    expect(visibleText("RehearsalProvenance").includes("Matched on attempt 4")).toBe(true)
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("Source details")
    expect(visibleText("RehearsalProvenance").includes(REVIEWED_SOURCE.publisher + " | " + REVIEWED_SOURCE.publication)).toBe(true)
    expect(visibleText("RehearsalProvenance").includes("PDF p.45 (printed 39) | presidency.eg")).toBe(true)
    expect(visibleText("RehearsalProvenance").includes("Excerpt identity reviewed: " + REVIEWED_SOURCE.reviewedOn)).toBe(true)
    expect(visibleText("RehearsalProvenance").includes("Effective date: Unknown — not reviewed")).toBe(true)
    expect(visibleText("RehearsalProvenance").includes("Legal currency: Unknown — not reviewed")).toBe(true)
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("QanunOS Vision")
    expect((findSceneObjectByName("RehearsalExcerpt").getComponent("Component.Text") as Text).enabled).toBe(false)
    print("[QanunOS TEST] Citation-choice flow: " + (19 + PRACTICE_CANDIDATES.length) + " UI assertions passed.")
  }
}
