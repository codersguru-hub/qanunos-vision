# Gate 0 builder evidence — 2026-10-27

Bounded local-preview test only, under the participant's explicit local sign-in-prerequisite override. No account check was repeated; no authentication, publishing, or protected-service claim is made. Parent agent independently verifies the result before recording the gate outcome.

## Implementation

- Project: `D:/Projects/apps/QanunOS Vision/QanunOSVision/QanunOSVision.esproj` in Lens Studio 5.23.2.26081320 (version/project handoff already confirmed by real MCP).
- `QanunOSVision/Assets/Scripts/QanunOSVisionGate0CardUI.ts`: UI module generated following specs-build-ui, using UIKit BackPlate, FlexLayout/FlexItem, Button, and bright depth-tested text. No hand-rolled surface/button. Fixed authored root `Gate0SpatialCard` at `(0,-15,-110)` cm, dimensions `45x24` cm; action target `28x5` cm. The shared button's label changes with the view.
- `QanunOSVision/Assets/Scripts/QanunOSVisionGate0Main.ts`: controller owns the selected boolean, subscribes to the UI event, and invokes the passive view setter through a typed component input. No UI creation in controller and no independent touch-event fallback.
- Authored controller object: `QanunOSVisionGate0Controller`; its `card` input is wired to the UI ScriptComponent on `Gate0SpatialCard`.
- Both scripts have imported `.meta` files. Scene authoring/wiring used VirtualScene only. Project save via real ExecuteEditorCode returned `Execution Succeeded`, `{"saved":true}`.
- Manifest and spatial plan: `docs/evidence/2026-10-27-gate0-build-plan.json`. UI-only utility scope intentionally omits audio, icons and meshes.

## Setup and repairs

- Camera Object was already identity position/rotation, Perspective, with DeviceTracking World. Template roots Camera Object, Lighting, SpectaclesInteractionKit were preserved. No cleanup disabling was needed.
- Both SIK/UIKit packages were installed. Baseline compile succeeded and clean preview contained only the room. Baseline RunAndCollectLogsTool errors `[]`.
- PreviewPanelTool listSources discovered the Sunlit Room directory; setConfig succeeded for stereo/SPECS 27, Interactive, `C:/Program Files/Snap Inc/Lens Studio/InteractiveResources.bundle/Scenes/Sunlit Room`.
- First input wiring used the script class as a component type and applied zero changes; corrected VirtualScene retry used `components.ScriptComponent.card` and succeeded (applied 1, errors `[]`).
- First runtime build exposed the shipped UIKit error `Cannot add items while autoDiscoverItemsOnStart is enabled and the layout is not initialized`. The skill's explicit-registration helper was adapted to set public `flexLayout.autoDiscoverItemsOnStart=false` before addItems. Subsequent compile/runtime passed. No alternate scene-write surface was used for repair.
- QueryRuntimeSceneTool and PreviewInteractTool automatically provisioned their AiPreviewAgentInspect/AiPreviewAgentInteract bridge packages. This caused preview recompilation/reset; runtime UIDs changed. Always discover again after resets or use the stable name lookup below.

## Observed runtime verification

- RecompileTypeScriptTool final result `status: succeeded`.
- RunAndCollectLogsTool refresh at log time 18:30:20–22 returned `status: success`, `errors: []`, and `[QanunOS Gate0] UIKit card ready; fixed world anchor; local fictional demo.`
- Runtime query confirmed authored card worldPosition `{x:0,y:-15,z:-110}`. Button runtime componentTypes included `Button`, `RoundedRectangle`, `Interactable`, `InteractableStateMachine`, `FlexItem`, and `RenderMeshVisual` (UIKit internals).
- Preview name: `Preview 1`.
- Stable target: `name: Gate0ActionButton`, `parentName: Flex`. The button is instantiated below the single card's content layout. Latest observed button runtime UID after bridge-triggered reset: `2427620146720639846:3342742243143033194`.
- SELECT: PreviewInteractTool `action: Pinch` returned `success:true`, `CommandSuccess`, commandId `agent-cmd-7-1793115087329`, resolvedUniqueId above, both hands free. Runtime Text query showed status `Card selected — local demo revealed.\nNo reviewed authority available.` and action `Return to rehearsal`. The selected capture visibly shows those strings.
- RETURN: PreviewInteractTool `action: Pinch` returned `success:true`, `CommandSuccess`, commandId `agent-cmd-11-1793115101693`, same resolvedUniqueId, both hands free. Runtime Text query showed `Simulated hearing — fictional facts.\nSelect the card to inspect this demo.` and action `Select demo card`. Returned capture visibly shows restored ready state.
- RunAndCollectLogsTool tail after both interactions returned `status: success`, `errors: []`, SELECT log at 18:31:28.980 and RETURN at 18:31:43.318. Log: `C:/Users/Ahmed/AppData/Local/Snap/Lens Studio/logs/LensStudioLog-2026-10-27-17-51-54-880-956ec.txt`.
- CaptureRuntimeViewTool also succeeded with front/isolate view of the runtime card, 1024x768, and the image was inspected inline.

## Saved screenshots

- `D:/Projects/apps/QanunOS Vision/docs/evidence/2026-10-27-gate0-ready.png`
- `D:/Projects/apps/QanunOS Vision/docs/evidence/2026-10-27-gate0-selected.png`
- `D:/Projects/apps/QanunOS Vision/docs/evidence/2026-10-27-gate0-returned.png`

All are actual PreviewPanelTool captures at 1610x1590, inspected by the builder. Persistent fictional/local-preview disclosure remains visible in all states. The card is modest and below eye line; display contrast and reading comfort on physical glasses remain unproven.

## Limits

Only the Gate 0 ready/select/return state cycle is implemented and observed. No LEAF scenarios were authored/run in this bounded attempt. Full design-brief criteria 2–5, legal validation/source provenance, Arabic/RTL, 90-second run, 150-second recording, hardware feel, authentication and publishing remain untested. No full implementation has begun.
