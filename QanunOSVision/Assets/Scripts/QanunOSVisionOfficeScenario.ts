import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {OFFICE_CHECK_COUNT, runOfficeChecks} from "./QanunOSVisionOfficeChecks"

/** Pairing and hearing-card logic against fake QanunOS replies; no network is used. */
@component
export class QanunOSVisionOfficeScenario extends Scenario {
  async run(): Promise<void> {
    const count = await runOfficeChecks()
    expect(count).toBe(OFFICE_CHECK_COUNT)
    print("[QanunOS TEST] " + count + " office pairing/hearing assertions passed; fake replies only.")
  }
}
