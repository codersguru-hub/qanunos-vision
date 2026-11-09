import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign, FlexDirection, FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"

// Generated through specs-build-ui. The card is the sole utility UI asset.
// Fixed world anchor; no billboard or camera following is needed for Gate 0.
const LAYOUT_Z_LIFT = 0.02
const TYPE_SCALE = {HeadlineXL: {size: 62, weight: 700}, Body: {size: 39, weight: 500}, Button: {size: 39, weight: 500}}
type TextRole = keyof typeof TYPE_SCALE
function applyTextRole(text: Text, role: TextRole): void {
  text.size = TYPE_SCALE[role].size
  ;(text as Text & {weight?: number}).weight = TYPE_SCALE[role].weight
}

@component
export class QanunOSVisionGate0CardUI extends BaseScriptComponent {
  @ui.label("QanunOS Vision — Gate 0 local preview")
  @ui.separator
  @ui.group_start("Settings")
  @input
  @hint("Card width in centimeters; authored anchor controls placement.")
  @widget(new SliderWidget(40, 50, 1))
  width: number = 45
  @input
  @hint("Card height in centimeters.")
  @widget(new SliderWidget(22, 30, 1))
  height: number = 24
  @input
  @hint("Visible title for this local interaction test.")
  title: string = "QanunOS Vision"
  @input
  @hint("Permanent fiction and local-preview disclosure.")
  disclosure: string = "Fictional demo | Local preview | Gate 0"
  @input('vec4', '{1,1,1,1}')
  @hint("Bright additive-display text color.")
  @widget(new ColorWidget())
  textColor: vec4
  @ui.group_end

  readonly onAction = new Event<void>()
  private statusText: Text
  private actionText: Text

  onAwake(): void {
    this.createEvent("OnStartEvent").bind(() => this.buildUI())
  }

  // Passive view: the main script owns selected/ready state.
  setSelected(selected: boolean): void {
    this.statusText.text = selected
      ? "Card selected — local demo revealed.\nNo reviewed authority available."
      : "Simulated hearing — fictional facts.\nSelect the card to inspect this demo."
    this.actionText.text = selected ? "Return to rehearsal" : "Select demo card"
  }

  private buildUI(): void {
    this.sceneObject.createComponent("Component.Canvas")
    const plate = this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate
    plate.size = new vec2(this.width, this.height)
    const content = this.obj(this.sceneObject, "Gate0Content", new vec3(0, 0, 0.6))
    const column = this.makeFlex(content, FlexDirection.Column, this.width, this.height,
      {gap: 1, padX: 2, padY: 2, justify: FlexJustify.Center, align: FlexAlign.Center})
    const innerWidth = this.width - 4
    this.flexChild(column, {w: innerWidth, h: 3}, child => {
      child.name = "Gate0Title"
      this.label(child, this.title, innerWidth, 3, "HeadlineXL")
    })
    this.flexChild(column, {w: innerWidth, h: 2}, child => {
      child.name = "Gate0Disclosure"
      this.label(child, this.disclosure, innerWidth, 2, "Body")
    })
    this.flexChild(column, {w: innerWidth, h: 5}, child => {
      child.name = "Gate0Status"
      this.statusText = this.label(child, "", innerWidth, 5, "Body")
    })
    this.flexChild(column, {w: 28, h: 5}, child => {
      child.name = "Gate0ActionButton"
      const button = child.createComponent(Button.getTypeName()) as Button
      button.size = new vec3(28, 5, 1)
      const face = this.obj(child, "Gate0ActionLabel", new vec3(0, 0, 0.08))
      this.actionText = this.label(face, "Select demo card", 27, 3, "Button")
      // Build occurs in OnStart, so SIK initialization precedes subscription.
      button.onTriggerUp.add(() => this.onAction.invoke())
    })
    this.setSelected(false)
    print("[QanunOS Gate0] UIKit card ready; fixed world anchor; local fictional demo.")
  }

  private label(parent: SceneObject, value: string, width: number, height: number, role: TextRole): Text {
    const text = parent.createComponent("Component.Text") as Text
    text.text = value
    text.depthTest = true
    text.textFill.color = this.textColor
    applyTextRole(text, role)
    text.horizontalAlignment = HorizontalAlignment.Center
    text.verticalAlignment = VerticalAlignment.Center
    text.horizontalOverflow = HorizontalOverflow.Overflow
    text.verticalOverflow = VerticalOverflow.Overflow
    text.layoutRect = Rect.create(-width / 2, width / 2, -height / 2, height / 2)
    return text
  }

  private obj(parent: SceneObject, name: string, position?: vec3): SceneObject {
    const sceneObject = global.scene.createSceneObject(name)
    sceneObject.setParent(parent)
    if (position) sceneObject.getTransform().setLocalPosition(position)
    return sceneObject
  }
  private liftInZ(sceneObject: SceneObject, zOffset: number): void {
    const transform = sceneObject.getTransform()
    const pos = transform.getLocalPosition()
    transform.setLocalPosition(new vec3(pos.x, pos.y, pos.z + zOffset))
  }
  private makeFlex(parent: SceneObject, direction: FlexDirection, width: number, height: number,
    opts?: {gap?: number, padY?: number, padX?: number, justify?: FlexJustify, align?: FlexAlign}): SceneObject {
    const container = this.obj(parent, "Flex")
    this.liftInZ(container, LAYOUT_Z_LIFT)
    const flexLayout = container.createComponent(FlexLayout.getTypeName()) as FlexLayout
    // This project ships UIKit with auto-discovery enabled by default.
    // Explicit registration below requires disabling it before addItems.
    flexLayout.autoDiscoverItemsOnStart = false
    const flexItem = container.createComponent(FlexItem.getTypeName()) as FlexItem
    if (width > 0) flexItem.overrideWidth = width
    if (height > 0) flexItem.overrideHeight = height
    flexLayout.onInitialized.add(() => {
      flexLayout.width = width
      flexLayout.height = height
      flexLayout.direction = direction
      if (direction === FlexDirection.Row) flexLayout.columnGap = opts?.gap ?? 0
      else flexLayout.rowGap = opts?.gap ?? 0
      flexLayout.paddingTop = opts?.padY ?? 0
      flexLayout.paddingBottom = opts?.padY ?? 0
      flexLayout.paddingLeft = opts?.padX ?? 0
      flexLayout.paddingRight = opts?.padX ?? 0
      flexLayout.justifyContent = opts?.justify ?? FlexJustify.Start
      flexLayout.alignItems = opts?.align ?? FlexAlign.Stretch
    })
    return container
  }
  private flexChild(parent: SceneObject, size: {w?: number, h?: number, grow?: number},
    builder: (childObject: SceneObject) => void): SceneObject {
    const child = this.obj(parent, "Item")
    this.liftInZ(child, LAYOUT_Z_LIFT)
    const flexItem = child.createComponent(FlexItem.getTypeName()) as FlexItem
    if (size.w !== undefined && size.w > 0) flexItem.overrideWidth = size.w
    if (size.h !== undefined && size.h > 0) flexItem.overrideHeight = size.h
    flexItem.flexGrow = size.grow ?? 0
    flexItem.flexShrink = 0
    builder(child)
    const parentFlexLayout = parent.getComponent(FlexLayout.getTypeName()) as FlexLayout | null
    if (parentFlexLayout) parentFlexLayout.addItems([flexItem])
    return child
  }
}
