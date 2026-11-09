import {DefaultLeafInteractor} from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor"
import {findInteractablesByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"

export function visibleText(name: string): string {
  const object = findSceneObjectByName(name)
  if (!object) throw new Error("Missing confirmed text object: " + name)
  return (object.getComponent("Component.Text") as Text).text
}
export class QanunOSVisionRehearsalInteractor extends DefaultLeafInteractor {
  async tap(name: string): Promise<void> {
    const button = findInteractablesByName(name, undefined, true)[0]
    if (!button) throw new Error("Missing enabled confirmed button: " + name)
    await this.trigger(button)
    await sleep(300)
  }
}
