# Gate 0: toolchain proof

Decision: **PASS for Gate 0**, observed on 2026-10-27. The participant subsequently extended the local-preview exception to the approved rehearsal flow, which is now implemented and independently verified. **Gate 2 also passed** with a continuous 93.526-second LEAF run. Five LEAF scenarios succeeded with 69 assertions. See EVIDENCE_REPORT.md for full outcomes; video/publication and physical-device checks remain pending.

## What passed

A real CLAD-created UIKit/SIK spatial card renders in SPECS Preview 1. Selecting its action reveals a distinct demo-detail state; selecting Return restores the ready card. The builder observed one cycle, then the parent independently recompiled, refreshed, rediscovered runtime targets and repeated the cycle. Both parent interactions returned `success:true` and `CommandSuccess`. Runtime text queries, visually inspected captures and SELECT/RETURN log lines corroborated the behavior. Final runtime errors were `[]`.

| Check | Observed evidence | Result |
| --- | --- | --- |
| Running editor/project | Real MCP confirmed Lens Studio 5.23.2.26081320 and QanunOSVision/QanunOSVision.esproj | Pass |
| Custom compile | Parent RecompileTypeScriptTool returned succeeded | Pass |
| Runtime startup | Parent refresh logs showed activity and no errors; runtime scene contained the UI | Pass |
| Spatial element | Gate0SpatialCard at (0,-15,-110) cm, 45 by 24 cm, visible in Preview 1 | Pass |
| Select | Real SIK Pinch revealed demo detail and Return to rehearsal | Pass |
| Return/dismiss detail | Second Pinch restored ready text and Select demo card | Pass |
| Final logs | UIKit-ready, SELECT and RETURN lines; errors=[] | Pass |
| Account authentication | isAuthorized remained false after participant-reported sign-in | Not passed; scoped user workflow exception |

## Evidence

- [Builder implementation and exact tool results](evidence/2026-10-27-gate0-builder-evidence.md)
- [Sanitized independent parent verification](evidence/2026-10-27-gate0-parent-verification.json)
- [Build manifest](evidence/2026-10-27-gate0-build-plan.json)
- [Ready capture](evidence/2026-10-27-gate0-ready.png)
- [Parent selected capture](evidence/2026-10-27-gate0-parent-selected.jpg)
- [Parent returned capture](evidence/2026-10-27-gate0-parent-returned.jpg)

These are actual Lens Studio captures, not generated mockups. The parent also inspected an object-framed CaptureRuntimeViewTool image. The room-view captures provide the clearer text evidence; no physical-glasses reading comfort is established.

## Implementation and reproduction

- Actual project: `QanunOSVision/QanunOSVision.esproj`. Generated layout is preserved; the original 5.24 project plus approved brief remain in ignored `local-backups/QanunOSVision-before-5.23.2`.
- UI module: `QanunOSVision/Assets/Scripts/QanunOSVisionGate0CardUI.ts`, using UIKit BackPlate, Button and FlexLayout/FlexItem.
- Controller: `QanunOSVision/Assets/Scripts/QanunOSVisionGate0Main.ts`, with a typed UI reference and selected-state boolean.
- Authored scene roots: `Gate0SpatialCard` and `QanunOSVisionGate0Controller`. Authoring/wiring used real VirtualScene; project save succeeded.
- Preview: `Preview 1`, SPECS 27, Interactive, Sunlit Room.
- Stable tool target: PreviewInteractTool Pinch with name `Gate0ActionButton`, parentName `Flex`, previewName `Preview 1`. Runtime UIDs change after reset: rediscover first.
- Preview tools provisioned their inspect/interact bridge packages. No raw HTTP workaround or account-protected operation was used.

## Authorization distinction

The participant installed the organizer-recommended 5.23.2 after the observed 5.24 sign-in error. The account boolean still returned false after reported editor sign-in. They explicitly answered `Continue with the local preview test` to overriding the router skill's local sign-in prerequisite for Gate 0. This is not successful account authentication and does not bypass actual service authentication. Publishing and account-protected services were excluded. See [sign-in evidence](evidence/2026-10-27-sign-in-error.md).

## Limits and next gate

The original Gate 0 proof concerns a visible spatial element and select/return only. Later evidence now verifies the approved fictional flow, validator behavior, source-identity-reviewed replacement, short Arabic/RTL rendering, five LEAF scenarios and the continuous Gate 2 run. Legal currency/effective dates, a 150-second recorded demo and physical-device comfort/performance remain unverified.

The Gate 0 detail explicitly said `No reviewed authority available.` It was not a legal-source verification result. Preserve mock-input/local-fixture labels and unknown legal validity. The participant explicitly answered `Continue building the local rehearsal flow` to extending the local-preview exception. Continue the approved design at `QanunOSVision/devpost/design-brief.md`; publishing/account-protected services remain excluded.
