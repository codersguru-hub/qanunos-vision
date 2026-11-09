import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign, FlexDirection, FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import {RehearsalView} from "./QanunOSVisionRehearsalState"

// specs-build-ui utility module, evolved from the preserved Gate 0 foundation.
// All semantic placement lives on the authored world anchor. Layout owns child X/Y.
const TYPE_SCALE = {Headline: {size: 54, weight: 700}, Body: {size: 39, weight: 500}, Caption: {size: 38, weight: 500}}
type Role = keyof typeof TYPE_SCALE

@component
export class QanunOSVisionRehearsalUI extends BaseScriptComponent {
  @ui.label("QanunOS Vision — local rehearsal card")
  @ui.separator
  @ui.group_start("Presentation")
  @input
  @hint("World card width in centimeters.")
  @widget(new SliderWidget(42, 50, 1))
  width: number = 45
  @input
  @hint("Compact rehearsal card height in centimeters.")
  @widget(new SliderWidget(26, 32, 1))
  compactHeight: number = 28
  @input
  @hint("Source detail replaces the same card, with space for exact provenance.")
  @widget(new SliderWidget(34, 40, 1))
  detailHeight: number = 38
  @input
  @hint("Permanent disclosure: this is deliberate mock input using local fixtures.")
  disclosure: string = "Fictional facts | Mock input | Local fixtures"
  @input('vec4', '{1,1,1,1}')
  @hint("Bright additive-display text color.")
  @widget(new ColorWidget())
  textColor: vec4
  @input('vec4', '{1,0.7,0.35,1}')
  @hint("Bright rejection heading accent; explicit rejection text always remains.")
  @widget(new ColorWidget())
  rejectionColor: vec4
  @input('vec4', '{0.55,1,0.75,1}')
  @hint("Reviewed excerpt identity accent; this does not assert legal currency.")
  @widget(new ColorWidget())
  reviewedColor: vec4
  @ui.group_end

  readonly onPrimary = new Event<void>()
  readonly onReturn = new Event<void>()
  readonly onChoice = new Event<number>()
  readonly onReady = new Event<void>()
  private plate: BackPlate
  private column: FlexLayout
  private bodyItem: FlexItem
  private heading: Text
  private body: Text
  private excerpt: Text
  private metadata: Text
  private primaryLabel: Text
  private primaryButton: SceneObject
  private returnButton: SceneObject
  private returnLabel: Text
  private disclosureText: Text
  private bodyWidth = 0
  private choiceColumn: SceneObject
  private choicePrompt: Text
  private choiceButtons: SceneObject[] = []
  private choiceLabels: Text[] = []
  private choiceLayouts: FlexLayout[] = []

  onAwake(): void { this.createEvent("OnStartEvent").bind(() => this.buildUI()) }

  show(view: RehearsalView): void {
    const detail = view.source !== null
    const choosing = view.choices.length > 0
    const tall = view.tallBody === true
    const height = detail || choosing || tall ? this.detailHeight : this.compactHeight
    this.plate.size = new vec2(this.width, height)
    this.column.height = height
    const bodyHeight = detail ? 19 : choosing ? 20 : tall ? 19 : 9
    this.bodyItem.overrideHeight = bodyHeight
    this.body.layoutRect = Rect.create(-this.bodyWidth / 2, this.bodyWidth / 2, -bodyHeight / 2, bodyHeight / 2)
    this.disclosureText.text = view.disclosure ?? this.disclosure
    this.returnLabel.text = view.returnLabel ?? "Return to rehearsal"
    this.heading.text = view.heading
    this.heading.textFill.color = view.stage === "Rejected" ? this.rejectionColor
      : detail ? this.reviewedColor : this.textColor
    this.body.text = view.body
    this.body.enabled = !detail && !choosing
    this.excerpt.enabled = detail
    this.metadata.enabled = detail
    this.choiceColumn.enabled = choosing
    this.choicePrompt.text = choosing ? view.body : ""
    this.choiceButtons.forEach((button, index) => {
      button.enabled = index < view.choices.length
      if (index < view.choices.length) this.choiceLabels[index].text = view.choices[index]
    })
    if (detail) {
      const text = view.source!.originalText
      this.excerpt.text = text
      this.excerpt.horizontalAlignment = /[\u0600-\u06ff]/.test(text) ? HorizontalAlignment.Right : HorizontalAlignment.Center
      // Every provenance line comes from the reviewed record via the view; nothing is typed here.
      this.metadata.text = view.detail.join("\n")
    }
    this.primaryLabel.text = view.primaryLabel
    this.primaryButton.enabled = view.showPrimary
    this.returnButton.enabled = view.showReturn
    // Re-layout the choice grid each time it reappears, since it was hidden while the card resized.
    if (choosing) this.choiceLayouts.forEach(layout => layout.markDirty())
    this.column.markDirty()
  }

  private buildUI(): void {
    this.sceneObject.createComponent("Component.Canvas")
    this.plate = this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate
    this.plate.style = "dark"
    this.plate.size = new vec2(this.width, this.compactHeight)
    const content = this.obj(this.sceneObject, "RehearsalContent", new vec3(0, 0, 0.6))
    const column = this.flex(content, "RehearsalColumn", FlexDirection.Column, this.width, this.compactHeight, 0.8, 2)
    this.column = column.getComponent(FlexLayout.getTypeName()) as FlexLayout
    const w = this.width - 4
    this.bodyWidth = w
    this.child(column, "RehearsalHeading", w, 3, child => this.heading = this.text(child, "QanunOS Vision", w, 3, "Headline"))
    this.child(column, "RehearsalDisclosure", w, 2, child => this.disclosureText = this.text(child, this.disclosure, w, 2, "Caption"))
    const bodyCell = this.child(column, "RehearsalBodyCell", w, 9, child => {
      this.body = this.text(this.obj(child, "RehearsalBody"), "", w, 9, "Body")
      const sourceColumn = this.flex(child, "SourceDetailColumn", FlexDirection.Column, w, 19, 1, 0)
      this.child(sourceColumn, "RehearsalExcerpt", w, 6, cell => this.excerpt = this.text(cell, "", w, 6, "Body"))
      this.child(sourceColumn, "RehearsalProvenance", w, 12, cell => this.metadata = this.text(cell, "", w, 12, "Caption"))
      this.excerpt.enabled = false
      this.metadata.enabled = false
      // Citation choices share the body cell; the whole column is disabled outside the question stage.
      this.choiceColumn = this.flex(child, "RehearsalChoiceColumn", FlexDirection.Column, w, 20, 1, 0)
      this.child(this.choiceColumn, "RehearsalChoicePrompt", w, 7, cell => this.choicePrompt = this.text(cell, "", w, 7, "Body"))
      const choiceWidth = (w - 1) / 2
      for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
        this.child(this.choiceColumn, "RehearsalChoiceRow" + rowIndex, w, 5.5, rowCell => {
          const row = this.flex(rowCell, "RehearsalChoiceRowLayout" + rowIndex, FlexDirection.Row, w, 5.5, 1, 0)
          this.choiceLayouts.push(row.getComponent(FlexLayout.getTypeName()) as FlexLayout)
          for (let column = 0; column < 2; column++) {
            const index = rowIndex * 2 + column
            this.choiceButtons.push(this.child(row, "RehearsalChoice" + index, choiceWidth, 5, button =>
              this.choiceLabels.push(this.button(button, choiceWidth, "", () => this.onChoice.invoke(index)))))
          }
        })
      }
      this.choiceLayouts.push(this.choiceColumn.getComponent(FlexLayout.getTypeName()) as FlexLayout)
    })
    this.bodyItem = bodyCell.getComponent(FlexItem.getTypeName()) as FlexItem
    this.child(column, "RehearsalControls", w, 5, child => {
      const row = this.flex(child, "RehearsalControlRow", FlexDirection.Row, w, 5, 2, 0)
      this.primaryButton = this.child(row, "RehearsalPrimaryButton", 22, 5, button => this.primaryLabel = this.button(button, 22, "Mock judge question", () => this.onPrimary.invoke()))
      this.returnButton = this.child(row, "RehearsalReturnButton", 17, 5, button => this.returnLabel = this.button(button, 17, "Return to rehearsal", () => this.onReturn.invoke()))
    })
    this.onReady.invoke()
    print("[QanunOS] UIKit rehearsal card ready; fixed authored world anchor.")
  }

  private button(parent: SceneObject, width: number, label: string, callback: () => void): Text {
    const button = parent.createComponent(Button.getTypeName()) as Button
    // Additive display: the default near-black plate reads as transparent. Primary keeps a bright border;
    // every button shares it so no citation choice is visually favored.
    button.setVariant({theme: "SnapOS2", style: "Primary"})
    if (button.initialized) print("[QanunOS] WARNING button style set after initialize: " + parent.name)
    button.size = new vec3(width, 5, 1)
    const face = this.obj(parent, parent.name + "Label", new vec3(0, 0, 0.08))
    const text = this.text(face, label, width - 0.5, 3, "Body")
    button.onTriggerUp.add(callback)
    return text
  }
  private text(parent: SceneObject, value: string, width: number, height: number, role: Role): Text {
    const text = parent.createComponent("Component.Text") as Text
    text.text = value
    text.depthTest = true
    text.textFill.color = this.textColor
    text.size = TYPE_SCALE[role].size
    ;(text as Text & {weight?: number}).weight = TYPE_SCALE[role].weight
    text.horizontalAlignment = HorizontalAlignment.Center
    text.verticalAlignment = VerticalAlignment.Center
    text.horizontalOverflow = HorizontalOverflow.Wrap
    text.verticalOverflow = VerticalOverflow.Overflow
    text.layoutRect = Rect.create(-width / 2, width / 2, -height / 2, height / 2)
    return text
  }
  private obj(parent: SceneObject, name: string, position?: vec3): SceneObject {
    const result = global.scene.createSceneObject(name)
    result.setParent(parent)
    if (position) result.getTransform().setLocalPosition(position)
    return result
  }
  private flex(parent: SceneObject, name: string, direction: FlexDirection, width: number, height: number, gap: number, padding: number): SceneObject {
    const result = this.obj(parent, name, new vec3(0, 0, 0.02))
    const layout = result.createComponent(FlexLayout.getTypeName()) as FlexLayout
    layout.autoDiscoverItemsOnStart = false
    const item = result.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideWidth = width
    item.overrideHeight = height
    layout.onInitialized.add(() => {
      layout.width = width
      layout.height = height
      layout.direction = direction
      layout.rowGap = direction === FlexDirection.Column ? gap : 0
      layout.columnGap = direction === FlexDirection.Row ? gap : 0
      layout.paddingTop = padding
      layout.paddingBottom = padding
      layout.paddingLeft = padding
      layout.paddingRight = padding
      layout.justifyContent = FlexJustify.Center
      layout.alignItems = FlexAlign.Center
    })
    return result
  }
  private child(parent: SceneObject, name: string, width: number, height: number, build: (child: SceneObject) => void): SceneObject {
    const result = this.obj(parent, name, new vec3(0, 0, 0.02))
    const item = result.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideWidth = width
    item.overrideHeight = height
    item.flexShrink = 0
    build(result)
    ;(parent.getComponent(FlexLayout.getTypeName()) as FlexLayout).addItems([item])
    return result
  }
}
