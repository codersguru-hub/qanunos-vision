import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {QanunOSVisionRehearsalInteractor, visibleText} from "./QanunOSVisionRehearsalInteractor"
import {REVIEWED_SOURCE} from "./QanunOSVisionReviewedSource"

@component
export class QanunOSVisionNinetySecondScenario extends Scenario {
  async run(): Promise<void> {
    await sleep(1500)
    const start = getTime()
    const anchor = findSceneObjectByName("RehearsalSpatialCard")
    const before = anchor.getTransform().getWorldPosition()
    const i = new QanunOSVisionRehearsalInteractor()
    print("[QanunOS 90s] START t=" + start)
    await sleep(10000)
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("Mock judge question")
    await sleep(15000)
    await i.tap("RehearsalChoice2")
    expect(visibleText("RehearsalHeading")).toBe("Unverified — do not cite")
    await sleep(15000)
    await i.tap("RehearsalPrimaryButton")
    await i.tap("RehearsalChoice3")
    expect(visibleText("RehearsalExcerpt")).toBe(REVIEWED_SOURCE.originalText)
    await sleep(10000)
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("Source details")
    await sleep(25000)
    await i.tap("RehearsalPrimaryButton")
    expect(visibleText("RehearsalHeading")).toBe("QanunOS Vision")
    await sleep(15000)
    const after = anchor.getTransform().getWorldPosition()
    expect(after.x).toBeCloseTo(before.x, 3)
    expect(after.y).toBeCloseTo(before.y, 3)
    expect(after.z).toBeCloseTo(before.z, 3)
    const elapsed = getTime() - start
    expect(elapsed).toBeGreaterThan(90)
    print("[QanunOS 90s] END elapsed=" + elapsed + "s; complete source inspection and return; anchor unchanged.")
  }
}
