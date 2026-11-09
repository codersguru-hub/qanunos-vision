import {scenariosIndex} from "Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator"
import {ScenarioMetadata} from "Leaf.lspkg/Scenarios/scenario/ScenarioMetadata"
import {QanunOSVisionValidatorScenario} from "./QanunOSVisionValidatorScenario"
import {QanunOSVisionFlowScenario} from "./QanunOSVisionFlowScenario"
import {QanunOSVisionAbstentionScenario} from "./QanunOSVisionAbstentionScenario"
import {QanunOSVisionNinetySecondScenario} from "./QanunOSVisionNinetySecondScenario"
import {QanunOSVisionIKScenario} from "./QanunOSVisionIKScenario"
import {QanunOSVisionOfficeScenario} from "./QanunOSVisionOfficeScenario"

@component
export class QanunOSVisionLeafIndex extends BaseScriptComponent {
  @scenariosIndex
  static scenariosIndex: ScenarioMetadata[] = [
    {id: "qanunos-validator-guards", typename: QanunOSVisionValidatorScenario.getTypeName()},
    {id: "qanunos-reviewed-flow", typename: QanunOSVisionFlowScenario.getTypeName()},
    {id: "qanunos-abstention-flow", typename: QanunOSVisionAbstentionScenario.getTypeName()},
    {id: "qanunos-90-second-flow", typename: QanunOSVisionNinetySecondScenario.getTypeName()},
    {id: "qanunos-ik-question", typename: QanunOSVisionIKScenario.getTypeName()},
    {id: "qanunos-office-pairing", typename: QanunOSVisionOfficeScenario.getTypeName()}
  ]
}
