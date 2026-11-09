import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {createIKInteractor} from "Leaf.lspkg/Interactors/interactor/ik/visualizer/BitmojiAvatar"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {expect} from "Leaf.lspkg/Utils/common/Expect"

/**
 * Simulated IK reach probe only: physical comfort and actual hand tracking remain unproven.
 * Asserts the IK targeting ray reaches the button, not that the pinch lands on it. LEAF stops
 * aiming at the first edge hit and the pinch animation then drifts the ray ~1.5 cm onto the card
 * (reported as a target_overlap warning); the confirmed trigger path is covered by the SIK flows.
 */
@component
export class QanunOSVisionIKScenario extends Scenario {
  async run(): Promise<void> {
    await sleep(1500)
    const button = findInteractableByName("RehearsalPrimaryButton")
    if (!button) throw new Error("Missing confirmed button: RehearsalPrimaryButton")
    let reached = false
    button.onHoverEnter.add(() => reached = true)
    const ik = createIKInteractor()
    await ik.trigger(button)
    await sleep(300)
    expect(reached).toBe(true)
    print("[QanunOS TEST] IK ray reached RehearsalPrimaryButton; pinch landing is a known LEAF simulation limit.")
  }
}
