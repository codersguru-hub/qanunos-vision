# Local rehearsal flow — builder evidence

2026-10-27. The participant explicitly authorized extending the local-preview exception: “Continue building the local rehearsal flow.” Scope remained ordinary local editor/preview operations; no account recheck, protected-service authentication bypass, publishing or production integration. Parent owns final independent verification and gate classification.

## Saved implementation

Project `D:/Projects/apps/QanunOS Vision/QanunOSVision/QanunOSVision.esproj`, scene `QanunOSVision/Assets/Scene.scene`.

Authored roots:

- `RehearsalSpatialCard`, editor ID `252408e1-54d0-4568-9b7e-1cfd1455567c`, position `(0,-15,-110)` cm, identity rotation/scale. Fixed in world; no camera following or billboard.
- `QanunOSVisionRehearsalController`, editor ID `404ff2a2-3987-41c3-ad6a-3af03881b8d6`. Typed `card` points to the UI component, ID `906693b4-a748-4452-bbc7-33bed0467743`. `useReviewedFixture=true` restored and saved.
- `QanunOSVisionLeafIndex`, editor ID `c892d19c-459d-445d-9ff7-be99bede5324`, registers five scenarios.

Gate 0 original scripts/captures are preserved. Its two authored roots are disabled to avoid overlapping the evolved card.

UI-only utility manifest: one rehearsal card using UIKit BackPlate/FlexLayout/FlexItem/Button, with ready/question/rejection/replacement/source/abstention views and two large action targets. The current card is 45x28 cm for compact states and 45x38 cm for replacement/source detail, at the same world anchor. Buttons are 22x5 and 17x5 cm. These height adjustments replace the brief's 24 cm default to fit provenance without shrinking below Caption size 38. No meshes, icons, audio, or AI-generated legal text were declared. Bright amber rejection and mint reviewed-identity headings retain the explicit state text. BackPlate uses UIKit dark style; text remains bright on the additive display.

Active application modules in `QanunOSVision/Assets/Scripts/`:

- `QanunOSVisionRehearsalUI.ts`: passive UIKit view and action events; exact Arabic excerpt lives in its own text component, separate from the rehearsal cue and metadata.
- `QanunOSVisionRehearsalMain.ts`: typed view wiring, deterministic state coordination, fixture-availability input.
- `QanunOSVisionRehearsalState.ts`: Ready → Question → Rejected → Replacement → Source → Ready, plus missing-source and unsupported-question abstention.
- `QanunOSVisionSourceValidator.ts`: exact candidate/curated-record comparison, ID/article suffix consistency and provenance completeness, no nearest-match substitution. Passing means excerpt identity only; unknown effective date/currency remain mandatory.
- `QanunOSVisionReviewedSource.ts`: parent-owned curated Presidency Article 97 record. Builder did not change the parent's exact text or metadata. See `docs/SOURCE_REVIEW_ART97.md` for review evidence and limits.

The explicit prepared-question ID is allowlisted. Unknown/ambiguous question IDs abstain before offering a source. This does not implement arbitrary natural-language legal QA.

All editor scene writes used real VirtualScene; save used real ExecuteEditorCode and returned `Execution Succeeded`, `{"saved":true}`. Final TypeScript compile returned `status:succeeded`. Script imports created their `.meta` files. No Cache package code was edited. Main/controller source contains no UIKit imports or UI creation; test scripts only read text, while view modules own its creation.

## Actual LEAF outcomes

LEAF was already installed. Real package listing reported the LEAF framework; `Packages/Leaf.lspkg` and its TS sources existed. `open_leaf_panel` returned `opened:true,created:true`; list returned five registered scenarios. No library/account-protected installation was attempted.

| Scenario | Outcome | Coverage |
| --- | --- | --- |
| `qanunos-validator-guards` | succeeded | 38 synthetic validator/state assertions: exact identity accepted, missing ID/candidate/record/source rejected, suffix/article/case/zero-padding mismatch rejected, altered excerpt rejected, provenance mismatch/incompleteness rejected, unsupported/ambiguous question abstains, deterministic transitions and return |
| `qanunos-reviewed-flow` | succeeded; fresh repeat succeeded | 16 UI assertions through real LEAF/SIK triggers: question/disclosure, explicit fictional rejection, exact reviewed excerpt and ID, source locator/review date, both unknown-status labels, return and hidden detail text |
| `qanunos-abstention-flow` | succeeded | 5 UI assertions with authored `useReviewedFixture=false`: fictional rejection, “No reviewed authority available”, no replacement, hidden excerpt, return. Fixture switch restored true afterwards |
| `qanunos-ik-question` | succeeded | Simulated IK trigger changed the confirmed button to the question state. Direct versus far-field routing was not established; this is not physical reach/comfort proof |
| `qanunos-90-second-flow` | succeeded | 9 assertions across a continuous local source-inspection/return cycle, elapsed >90 s and unchanged world anchor |

69 distinct asserted checks across these five scenarios (the short flow ran twice). Synthetic validator fixtures are explicitly non-legal test text; these checks prove validation behavior, not legal correctness/currency.

Authoritative Lens-side manager/log evidence:

```text
18:54:46.749 [QanunOS TEST] 38 validator/state assertions passed; synthetic test fixtures only.
18:54:46.750 [DefaultLeafScenarioManager] PASSED: qanunos-validator-guards
18:54:55.055 [DefaultLeafScenarioManager] PASSED: qanunos-reviewed-flow
18:55:25.190 [DefaultLeafScenarioManager] PASSED: qanunos-abstention-flow
18:55:48.497 [DefaultLeafScenarioManager] PASSED: qanunos-ik-question
19:01:52.620 [DefaultLeafScenarioManager] RUNS: qanunos-90-second-flow
19:01:54.150 [QanunOS 90s] START t=2.173944300000585
19:02:04.352 [QanunOS] stage=Question
19:02:19.980 [QanunOS] stage=Rejected
19:02:35.588 [QanunOS] stage=Replacement
19:02:46.281 [QanunOS] stage=Source
19:03:11.911 [QanunOS] stage=Ready
19:03:27.672 [QanunOS 90s] END elapsed=93.5263715000001s; complete source inspection and return; anchor unchanged.
19:03:27.672 [DefaultLeafScenarioManager] [95.052s]PASSED: qanunos-90-second-flow
19:05:54.426 [DefaultLeafScenarioManager] [6.595s]PASSED: qanunos-reviewed-flow
```

Log file: `C:/Users/Ahmed/AppData/Local/Snap/Lens Studio/logs/LensStudioLog-2026-10-27-17-51-54-880-956ec.txt`.

The 90-second run tail returned `errors:[]`. On normal refreshes while the LEAF panel is open, the tool's errors array includes the editor-plugin warning `Skipping plugin state save: instance was destroyed before its state finished loading.` This is an observed reset-lifecycle warning, not a silent “clean logs” claim. No Lens runtime exception appeared after the typed reference was wired. A transient `Input card was not provided` occurred between scene-create and input-wiring/reset and was resolved by the already-planned typed wiring.

## Continuous run and visual evidence

All paths below are under `D:/Projects/apps/QanunOS Vision/docs/evidence/`. Actual PreviewPanelTool screenshots are 1610x1590. They were opened and visually inspected by the builder, not inferred from text query results.

- Final ordinary state captures: `2026-10-27-rehearsal-ready.png`, `...-question.png`, `...-rejected.png`, `...-replacement.png`, `...-source.png`, `...-returned.png`, `...-abstention.png` (same prefix `2026-10-27-rehearsal-` throughout).
- In-run captures from the uninterrupted 93.526 s run: `2026-10-27-rehearsal-90s-question.png`, `...-90s-rejected.png`, `...-90s-replacement.png`, `...-90s-source.png`, `...-90s-returned.png`. Some show LEAF's visible test status line. No compile/refresh occurred between the run START and END. A later color-only heading polish was followed by the fresh short-flow repeat and new ordinary captures; state/validator behavior was unchanged.
- `2026-10-27-rehearsal-camera-right15.png`: actual 15 cm camera translation with card worldPosition still exactly `{x:0,y:-15,z:-110}` before and after. Reset returned camera pose to `(0,0,0)` and restored the centered view. The outer left card edge can leave the preview FOV at that lateral pose, consistent with a fixed world surface; broad movement comfort is not proven.

In replacement/source and their in-run captures, Arabic glyphs are connected and the six-word original reads right-to-left coherently. The exact parent-reviewed excerpt was not translated, normalized or regenerated. Both unknown labels remain visibly readable after the source wait, along with the canonical Presidency locator and review date. The English rehearsal cue is separate from exact Arabic legal text. The busy room background and translucent backing remain preview limitations; physical display readability is untested.

One post-LEAF manual PreviewInteract batch timed out waiting for onTriggerStart; its initial screenshot was not accepted as abstention evidence. After a refresh, the actual missing-source batch returned success and its abstention capture was replaced with the correct visible state. Final fresh manual cycle returned CommandSuccess for all five steps and ended Ready; source view was captured and inspected before return.

## Independent verification handoff

Preview name `Preview 1`, SPECS 27, Interactive, Sunlit Room; camera reset. Stable primary lookup:

```json
{"action":"Pinch","name":"RehearsalPrimaryButton","parentName":"RehearsalControlRow","previewName":"Preview 1"}
```

From Ready: five presses show question, rejection, reviewed replacement, source details, restored Ready. `RehearsalReturnButton` under the same control row returns early from question/rejection/replacement. Source/abstention use the primary label “Return to rehearsal”. Latest primary runtime UID was `2427620146720639846:3342742243144109631`; rediscover after reset. Last manual return command `agent-cmd-65-1793117477371` returned `success:true`, `CommandSuccess`.

To repeat missing-source LEAF coverage, set authored `QanunOSVisionRehearsalController` → ScriptComponent `useReviewedFixture=false` with VirtualScene, compile, run `qanunos-abstention-flow`, then restore true and compile/save. Do not run that scenario under the default true fixture setting. Run scenarios serially because each resets the Lens.

## Explicit limits and minor defaults

Logic proven in preview: bounded mock-flow state changes, fictional unsupported-citation rejection, exact source identity/provenance guarding, missing/unsupported abstention, source inspection/return, fresh-run reproduction, stable world placement during the measured camera shift, uninterrupted >90-second run.

Feel unproven: physical SPECS hand tracking, physical reach, fatigue/reading comfort, additive contrast in a real room, real-world table/desk recognition and persistent anchors. The card itself is the authored rehearsal-position cue; no separate desk-edge marker was added. The 24 cm height default was adjusted as above. No broader navigation or full Arabic interface was implemented.

A 150-second demo video is not recorded here. Parent's demo script/submission documents, legal-source review and final independent gate review remain parent-owned. No source opening in an external browser, real legal QA, QanunOS corpus/database integration, credentials, private case records, live hearing audio/speech, backend, protected service operation or publishing was implemented. Account boolean remains the previously observed false; no successful authentication is asserted.
