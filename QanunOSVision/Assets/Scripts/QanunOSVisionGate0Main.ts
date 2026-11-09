import {QanunOSVisionGate0CardUI} from "./QanunOSVisionGate0CardUI"

/** Bounded Gate 0 controller. No legal validation, backend, or hearing simulation. */
@component
export class QanunOSVisionGate0Main extends BaseScriptComponent {
  @ui.label("QanunOS Vision — Gate 0 controller")
  @ui.separator
  @input
  @hint("Typed UI component on the authored Gate0SpatialCard object.")
  card: QanunOSVisionGate0CardUI
  private selected = false

  onAwake(): void {
    this.createEvent("OnStartEvent").bind(() => {
      if (!this.card) {
        print("[QanunOS Gate0] ERROR: card reference missing.")
        return
      }
      this.card.onAction.add(() => {
        this.selected = !this.selected
        this.card.setSelected(this.selected)
        print(this.selected
          ? "[QanunOS Gate0] SELECT observed via UIKit/SIK; demo detail visible."
          : "[QanunOS Gate0] RETURN observed via UIKit/SIK; ready card restored.")
      })
    })
  }
}
