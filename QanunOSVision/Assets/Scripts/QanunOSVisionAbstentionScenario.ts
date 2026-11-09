import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {QanunOSVisionRehearsalInteractor, visibleText} from "./QanunOSVisionRehearsalInteractor"

/** Run with authored controller useReviewedFixture=false; restore true afterwards. */
@component
export class QanunOSVisionAbstentionScenario extends Scenario {
  async run(): Promise<void> {
    await sleep(1500)
    const i = new QanunOSVisionRehearsalInteractor()
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("Mock judge question")
    // Even the exact citation cannot be confirmed without a reviewed record.
    await i.tap("RehearsalChoice3")
    expect(visibleText("RehearsalHeading")).toBe("No reviewed authority available")
    expect(visibleText("RehearsalBody").includes("No citation is confirmed.")).toBe(true)
    expect((findSceneObjectByName("RehearsalExcerpt").getComponent("Component.Text") as Text).enabled).toBe(false)
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("QanunOS Vision")
    print("[QanunOS TEST] Missing reviewed source: 5 UI assertions passed.")
  }
}
