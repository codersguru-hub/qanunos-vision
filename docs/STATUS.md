# QanunOS Vision status

**Submitted 2026-11-09:** https://devpost.com/software/qanunos-vision

## Live QanunOS hearing card (2026-11-08)

**Works end to end in Lens Studio preview against production qanunos.com.** From the Ready card, "QanunOS hearing" starts a device pairing. The card shows the code, the lawyer approves it on qanunos.com/vision, and the Lens receives a read-only token that is kept in memory and never printed. It then reads the case list and one case summary. The hearing card shows the case title, court and stage, the next hearing when there is one, client and opponent, subject and open-task count, under "Fictional demo account | Live QanunOS, read-only". "Rehearse a citation" opens the existing mock judge question and four-way choice.

- Account: the participant's own qanunos.com account, which they confirmed holds only dummy data. The production demo seed (`seed_vision_demo.js`) was not run. The first capture's case had no upcoming hearing; a hearing on 2026-11-10 was then added to it in QanunOS for the recorded take.
- Production fix: the first live pairing reached the token, then `GET /api/vision/cases` returned 500 with `function to_char(text, unknown) does not exist`, because production stores `hearings.hearing_date` as text. QanunOS branch `fix/vision-text-dates` (commit 9f8c4b9) casts hearing and task dates to `date` before formatting and ordering. It was checked against a throwaway Postgres 16 with text columns, then deployed with the participant's approval. Only `services/visionService.js` changed, the backup is `services/visionService.js.bak-20261108`, and the database was not touched. The branch is not merged or pushed.
- The pairing code is now the card heading, the largest and boldest text on the card. Server errors are reported as "QanunOS server error (HTTP n)" instead of "No active case".
- LEAF: `qanunos-office-pairing` passes 29 assertions against fake replies (no network). After the final change, office (29), validator (60), reviewed flow (23), IK reach and the 90-second flow (94.421 s scenario, script-measured 92.897 s, anchor unchanged, read from the Lens log after the MCP call timed out) passed serially. Abstention was last run earlier the same day, before the pairing-code heading change, which does not affect its path.
- Evidence: [hearing card](evidence/2026-11-08-office-hearing-card.png), [hand-off to the citation question](evidence/2026-11-08-office-to-rehearsal.png), [pairing card](evidence/2026-11-08-office-pairing-heading.png).
- Recording: a full take with the hearing card (including the 10 Nov 2026 next hearing) and its 96.9-second narrated cut are in docs/evidence; see docs/DEMO_SCRIPT.md, "Result". Final review and upload are pending.
- Not done: physical Spectacles test. Witnesses, memos and documents are never sent to the glasses by design.

## Local preview recording (2026-11-08)

Lens Studio exported `QanunOSVision-demo.mp4` (kept locally, not in the public repository because of its size). The verified 85.894-second native take shows the prepared mock question, Article 98 rejection, exact Article 97 match, source inspection and return. The [54-second narrated review cut](evidence/QanunOSVision-demo-explained.mp4) opens with a labeled courtroom dramatization and uses cropped Lens Studio footage for the actual interactions. Final review and public upload are pending.

As of 2026-10-27, Africa/Cairo. **The approved local rehearsal flow is implemented, saved and independently verified. Gate 0 and Gate 2 pass.** Five real LEAF scenarios succeeded with 69 distinct assertions; the continuous scenario lasted 93.526 seconds. The parent independently repeated the fresh interaction cycle and inspected actual captures.

## QanunOS live link: Gate L0 (2026-10-28)

The participant approved a public, read-only call from the Lens to `qanunos.com` for Evidence Law No. 25 of 1968, Article 1, added as a second question. Gate L0 passed in Lens Studio preview. A throwaway probe got InternetModule via `require("LensStudio:InternetModule")`, and its two runs both returned HTTP 200 (1.303 s and 0.313 s) with the article ID and text matching. The probe was then deleted, and Scene.scene stayed unchanged. The live module, the second question and the source review of Article 1 are not built. No device test has been done. Plan and details: docs/QANUNOS_LINK_PLAN.md.

## Citation-choice flow in Lens Studio (2026-10-28)

**Update, same day:** at the participant's choice, qanunos-ik-question now asserts IK *reach* only: the simulated IK ray must raise hoverEnter on RehearsalPrimaryButton. It no longer asserts that the simulated pinch lands, because of the LEAF landing artifact described in the table below. The pass prints LEAF's report with the expected target_overlap warning. The confirmed button trigger is covered by the SIK-driven flows and by a real PreviewInteractTool pinch. Serial re-run results are in "Final serial run" below.

### First run

Real MCP session, Lens Studio 5.23.2.26081320, Preview 1. RecompileTypeScriptTool succeeded; refresh logs had errors=[] and all five scenarios registered.

| Scenario | Result on the new flow |
| --- | --- |
| qanunos-validator-guards | PASSED — 60 validator/state assertions |
| qanunos-reviewed-flow | PASSED — 23 UI assertions; three wrong citations rejected, exact Art. 97 matched, source, return. Passed again after the fixture restore |
| qanunos-abstention-flow | PASSED with authored useReviewedFixture=false (Question → Abstention → Ready, 5 assertions). A run under the default true setting fails by design and is not counted. Restored true; saved Scene.scene was never rewritten and still reads true |
| qanunos-90-second-flow | PASSED — 94.433 s scenario, script-measured elapsed 92.930 s, anchor unchanged. The MCP call itself timed out; the result was read from the Lens log |
| qanunos-ik-question | **FAILED, reproducible (3 runs)** — heading stayed "QanunOS Vision" after the simulated IK trigger. No reach diagnostic was logged. A real SIK Pinch via PreviewInteractTool on the same RehearsalPrimaryButton succeeded. Root cause confirmed with a temporary probe (since reverted): at 110 cm LEAF routes the IK hand indirect and stops converging on the first frame its ray touches the button, which landed 0.1–0.4 cm inside the button's bottom edge (hit y ≈ −25.6 vs edge −25.7, aim centre −23.2). The pinch animation then lowers the hand ~0.9 cm, sliding the hit ~1.5 cm onto the card's own BackPlate Interactable, so triggerStart/End fire on RehearsalSpatialCard and LEAF records target_overlap (a warning it only prints when run() returns, which is why it never appeared). LEAF also disables SIK sphere-casting during runs; disabling the card Interactable left the ray on nothing and still no trigger. This is a LEAF IK-simulation landing artifact, not a broken button; no fix applied yet |

Question-stage capture: docs/evidence/2026-10-28-question-choice-grid.png (actual Preview 1 screenshot, inspected). Prompt, disclosure and all four choice labels render legibly in a centered 2×2 grid with Return below. The button plates have very low contrast against the translucent card and busy room background, so the choices read as floating text; consider this before recording.

### Final serial run (after the IK reach-only change)

All five scenarios passed serially in Preview 1, with no runtime errors in the Preview log:

| Scenario | Result |
| --- | --- |
| qanunos-validator-guards | PASSED, 60 assertions |
| qanunos-reviewed-flow | PASSED, 23 assertions; passed again after the fixture restore |
| qanunos-ik-question | PASSED, IK ray reached the button (hoverEnter); LEAF report: 0 errors, 1 expected target_overlap warning |
| qanunos-90-second-flow | PASSED, 94.339 s scenario, script elapsed 92.837 s, anchor unchanged (result read from the Lens log after the MCP call timed out) |
| qanunos-abstention-flow | PASSED with useReviewedFixture=false (Question → Abstention → Ready, 5 assertions), then restored true; Scene.scene untouched and still true |

### Button contrast fix

The default UIKit SnapOS2 `PrimaryNeutral` button plate is near-black, which an additive display renders as near-transparent (design brief: don't rely on very dark content). QanunOSVisionRehearsalUI now sets every button to SnapOS2 `Primary` via `setVariant` before initialize. Primary keeps a dark yellow fill with a bright border. All buttons share one style, so no citation choice is visually favored. Captures, inspected directly:

- docs/evidence/2026-10-28-question-choice-grid-contrast.png: the four choices and Return now show bounded, tinted plates.
- docs/evidence/2026-10-28-ready-primary-style.png: the Ready card's Mock judge question button is visible.
- docs/evidence/2026-10-28-question-choice-grid.png: the earlier "before" capture.

After the change, all five scenarios passed again serially:

- Validator: 60 assertions.
- Reviewed flow: 23 assertions, passed before and after the fixture restore.
- IK reach.
- 90-second flow: 94.584 s scenario, script-measured 93.067 s, anchor unchanged.
- Abstention: 5 assertions with the fixture off, then restored true.

The Preview log had no errors. Contrast is judged from preview captures only; on-device legibility is unmeasured.

The 69-assertion and Gate 2 rows below describe the earlier single-path flow.

### Change description (2026-10-27)

The rehearser now chooses between four practice citations (misattributed Art. 98, shortened Art. 97 quote, FICTIONAL Art. 404, exact Art. 97); the validator rejects each wrong one with a reason derived from the mismatched fields, and only the exact match reaches the source card. Publisher, publication and PDF/printed page now live in the reviewed record, and the validator checks the PDF page against the source link. Scripts changed: SourceValidator, ReviewedSource, new PracticeCandidates, RehearsalState, RehearsalUI, RehearsalMain, ValidatorChecks and the reviewed/abstention/90-second LEAF scenarios. No scene edits.

Observed so far: the 60 validator/state checks pass when transpiled and run in Node outside Lens Studio, and a TypeScript check reports no new diagnostics. Lens Studio MCP was not connected in the session that made this change; the 2026-10-28 results above are the first Lens Studio runs of it.

## Working local behavior

- Fictional permit-refusal rehearsal; deliberate Mock judge question button, with no speech recognition or hearing audio.
- Unsupported fictional citation visibly rejected as Unverified — do not cite through the actual allowlist validator.
- Newly curated Article 97 replacement or explicit abstention when the source record/question is unsupported.
- Exact short Arabic excerpt separated from the cue; source identity/page/review date inspectable; effective date and legal currency remain Unknown — not reviewed.
- Return restores Ready. A world-fixed card was checked during a 15 cm camera translation and after camera reset; physical-glasses comfort remains unproven.
- Source record is local, reviewed against the original Presidency PDF. The inspected QanunOS corpus had no exact Constitution record; no QanunOS API or corpus match is claimed.

## Environment and authorization

Actual project: QanunOSVision/QanunOSVision.esproj. Real MCP confirmed Lens Studio 5.23.2.26081320 and this exact saved project; compilation succeeded. The generated layout is preserved.

Registration, Working solo choice, rules/software terms, and official plan-lens design sign-off are complete. Do not ask for them again. Account isAuthorized remained false after reported sign-in. The participant explicitly authorized a local-preview exception to the router skill prerequisite, then extended it with Continue building the local rehearsal flow. This does not bypass actual service authentication; publishing and account-protected services remain excluded. Do not repeat the login loop or claim authenticated status.

The canonical journey state remains the repository-root .devpost-hackathon-state.json and was not reset. The original generated project plus approved brief remain in ignored local-backups/QanunOSVision-before-5.23.2. Read-only reference directories were not modified.

## Verification

| Check | Observed result |
| --- | --- |
| Gate 0 | Visible CLAD UIKit card and real SIK select/return, builder plus independent parent |
| Validator/state guards | 38 synthetic assertions passed, including exact identity/provenance, altered/missing values, suffix mismatch, unsupported question and abstention |
| Reviewed UI flow | 16 assertions passed; fresh LEAF repeat also passed |
| Missing-source UI flow | 5 assertions passed with fixture disabled, then restored true |
| Simulated IK probe | 1 assertion passed; no physical reach/hand-tracking claim |
| Gate 2 | 9 assertions, uninterrupted 93.526-second sequence; in-run captures and manager timestamps |
| Independent parent | Fresh compile, five real MCP Pinches all CommandSuccess, exact excerpt/provenance/unknown labels queried, source/rejection/return captures inspected |
| Arabic | Connected glyphs and coherent RTL observed for this six-word excerpt in the tested preview; no full Arabic-interface claim |

## Evidence and deliverables

- docs/evidence/2026-10-27-rehearsal-builder-evidence.md: implementation, test/log results, movement, failures and limits.
- docs/evidence/2026-10-27-rehearsal-parent-verification.json: sanitized independent results.
- docs/evidence/2026-10-27-flow-parent-{rejected,source,returned}.jpg: actual independent captures, inspected directly.
- docs/SOURCE_REVIEW_ART97.md: official source, PDF/page/hash, exact excerpt and review limits.
- docs/EVIDENCE_REPORT.md and docs/FEASIBILITY_GATE.md: current gate/results summaries.
- QanunOSVision/devpost/design-brief.md: approved authentic plan-lens output.
- README.md: run flow, scenario IDs, architecture, disclosures.
- docs/DEMO_SCRIPT.md, docs/DEVPOST_DESCRIPTION.md, docs/SUBMISSION_CHECKLIST.md, docs/JUDGE_SIMULATION.md: recording/submission preparation and honest readiness review.

## Known issues and limits

- Refresh while LEAF is open reports the editor-plugin warning: Skipping plugin state save: instance was destroyed before its state finished loading. No unresolved Lens runtime exception was observed in the completed interaction tails. Do not describe every refresh log as empty.
- One manual interaction batch after a LEAF run timed out. It was not accepted as passing evidence; a refreshed run succeeded and the correct abstention capture replaced the invalid one.
- The card can partly leave the FOV when moving sideways away from the starting position; reset restores the intended view. Busy-room/additive contrast and physical comfort are unmeasured. Card defaults were adjusted to 28 cm compact/38 cm detail height; the card itself is the rehearsal-position cue.
- The initial recorder probe did not produce a verified MP4. The later 85.894-second native take is linked above.
- No current-law review, broad legal QA, real-world persistence, physical device test or latency/frame-rate benchmark is claimed. (Since this was written, the live read-only hearing card, the public repository, the YouTube video and the Devpost submission have been done; see the top of this file.)

## Next action

Submitted to Learn AR with SPECS on 2026-11-09: https://devpost.com/software/qanunos-vision (video https://youtu.be/9VZhsGy4deM, public; repository https://github.com/codersguru-hub/qanunos-vision). The project stays editable on Devpost until the deadline, 2026-11-09 5:00 pm ET. The QanunOS date fix is merged into master (codersguru-hub/QanunOS#9). Still open: physical-device testing.

Earlier setup and sign-in history is preserved in docs/evidence/2026-10-27-status-before-local-demo-final.md and docs/evidence/2026-10-27-sign-in-error.md.
