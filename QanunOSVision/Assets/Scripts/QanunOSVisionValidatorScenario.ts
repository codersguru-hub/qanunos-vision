import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {runValidatorChecks, VALIDATOR_CHECK_COUNT} from "./QanunOSVisionValidatorChecks"

@component
export class QanunOSVisionValidatorScenario extends Scenario {
  async run(): Promise<void> {
    const count = runValidatorChecks()
    expect(count).toBe(VALIDATOR_CHECK_COUNT)
    print("[QanunOS TEST] " + count + " validator/state assertions passed; synthetic test fixtures only.")
  }
}
