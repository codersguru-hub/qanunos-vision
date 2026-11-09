---
status: approved
---

# Design brief: QanunOS Vision

Prepared through the official plan-lens workflow from the participant's saved master prompt and follow-up instructions on 2026-10-27. Previously answered questions were skipped. Physical values not chosen by the participant are marked (default). The participant explicitly approved this design on 2026-10-27: “Looks good — approve the design.” This document is a plan, not evidence of a working Lens.

## The one spatial moment
A lawyer rehearses a fictional Egyptian oral argument in their own office. A prepared mock judge question leads to a risky fictional citation being visibly rejected as “Unverified — do not cite”; a source-reviewed replacement can be inspected in a discreet spatial card before returning to rehearsal.

## Why it belongs on glasses
- Uses: draws in the world and leaves the body free during rehearsal.
- Why it is better than the phone or laptop version: the lawyer can keep their eyes up and remain in the rehearsal stance, glancing toward a small cue near the rehearsal desk instead of switching to a separate research screen. This is a design hypothesis to test in preview; physical comfort remains unproven.

## Product or overlay
- Type: product — a fictional oral-argument rehearsal tool in the participant's own space.
- What the real version would sense: nothing in this slice; the participant deliberately triggers a prepared question.
- Stand-in for the preview: a large button labeled “Mock judge question” and clearly labeled local fixtures. No live speech recognition, hearing audio, scene recognition or live QanunOS API is implied.
- One fictional case and one prepared question (default); exact question and authentic legal excerpt remain subject to source review. If no reviewed replacement is available, show abstention rather than inventing a legal answer.

## Where things live
- Where the user is looking during the main task: forward in a fictional rehearsal setting, with the source cue near a desk-like rehearsal anchor and slightly below eye level; never covering a person's face.
- Rehearsal marker: a small virtual desk-edge marker, placed relative to the user's starting position and fixed in the room for the current preview run (default). It stands in for the desk; no physical-table detection or persistence across sessions is claimed.
- Main cue card: 45 cm wide by 24 cm high (default), approximately 110 cm from the initial view and centered 15 cm below the initial eye line (default). Start near the forward sightline; adjust after visual testing to fit the preview field of view.
- Source detail: replaces the card in the same position (default), rather than stacking several large panels. Keep the excerpt short and the full source identity inspectable without long scrolling.
- Interaction targets: at least 9 cm wide by 5 cm high (default), with generous spacing; adjust together with the card during preview inspection.

## Hands and input
- Start prepared exchange: pinch/select “Mock judge question”; mouse click performs the preview equivalent.
- Unsupported citation: a visibly labeled fictional fixture is submitted by a deliberate mock trigger (default). Reject it with text and a clear visual state; never rely on color alone.
- Replacement: select “Reviewed source” after rejection (default). Display a replacement only when its exact identity and excerpt have reviewed provenance. Otherwise show “No reviewed authority available.”
- Source inspection: select the displayed source card to reveal its matching authority ID, exact reviewed excerpt, source title/reference, URL or canonical location and review date.
- Dismiss/return: select one large “Return to rehearsal” target; restore the compact cue and open sightline.
- Targets are big and highlight when aimed at.
- Voice: outside the first slice. The mock-question button is the actual input, not a fallback presented as live speech.

## When things show
- Ready: show “Simulated hearing — fictional facts” and the mock-question trigger; keep background text minimal.
- Question: show the prepared prompt only after selection.
- Rejection: show “Unverified — do not cite” for the deliberately fictional unsupported citation. Do not call it expired or superseded without supporting metadata.
- Replacement: show a reviewed authority and a one-line rehearsal cue only when source review supports them. Keep any argument cue separate from exact quoted legal text. Effective date and legal currency remain “Unknown — not reviewed” unless supported by evidence.
- Source: show details only while inspecting the selected authority; dismiss restores rehearsal. A source link identifies provenance; opening an external browser inside the Lens is not promised.
- Attention out of view: none for the first slice (default). No essential automatic alert occurs while looking away; the participant can return to the starting rehearsal marker.

## Done criteria
Each one can be checked in Lens Studio's preview.
1. Gate 0 first: one CLAD-generated spatial card renders in SPECS preview, reacts to a real SIK select, and visibly changes or dismisses after the return control. Save actual visual and log evidence before full implementation.
2. Selecting “Mock judge question” starts the prepared fictional exchange; mock input and local-fixture labels remain visible. The card stays at its authored place during movement within the current preview run and fits comfortably when returning to the starting view.
3. Submitting the unsupported fictional citation produces “Unverified — do not cite,” never a verified badge or an authoritative answer. Missing IDs, identity/suffix mismatch and altered excerpts must fail validation in meaningful logic tests.
4. Selecting the reviewed replacement reveals only the exact reviewed fixture and its matching source identity/excerpt. Unknown effective dates and currency stay unknown; absence of a reviewed replacement produces visible abstention.
5. Selecting the source and then “Return to rehearsal” completes source inspection and dismissal in a continuous 90-second preview run. A fresh preview reproduces the flow without a production QanunOS account. Record a separate 150-second demo using actual observed behavior.

## Out of scope
- Real clients, real case records, live hearing recording, recording/identifying/following other people, or claims of courtroom authorization.
- Production QanunOS integration, old application code, credentials in the Lens, signup, CRM, payments, broad RAG, multiplayer and office briefing.
- Live speech recognition, live camera recognition, custom/two-hand gestures, persistent spatial anchors and external browser support as an assumed feature.
- Claims that a reviewed source establishes current law when currency/effective dates have not been reviewed.
- Full implementation before Gate 0 passes; publishing or submission before the required later checks.

## Risks and open questions
- A small local Article 97 excerpt was subsequently identity-reviewed against the original Presidency PDF; see ../docs/SOURCE_REVIEW_ART97.md from the project root. No current-law/effective-date conclusion is approved by this design brief. Use fictional facts and source-reviewed excerpts only.
- Arabic shaping, right-to-left alignment, line wrapping and legibility must be visually checked. A clearly labeled English summary may be used if Arabic rendering fails (default), while keeping any exact source excerpt distinct and never presenting a translation as the authoritative original.
- The saved concept proposes a small cue near the rehearsal context; spatial placement, reading burden and advantage over a laptop need actual testing. Dimensions above are defaults for review.
- No SPECS device is assumed. Real hand tracking, comfort over time and physical-world anchoring remain “feel unproven.”
- MCP works in Lens Studio 5.23.2.26081320 with this saved project. The account check remained false after reported sign-in; the participant explicitly authorized local editor/preview development despite the router skill prerequisite. Actual service authentication remains in force. The local custom rehearsal is verified, while account authentication and publishing are not claimed.
- Preserve the original 5.24 project before older-version testing. Keep the root journey-state file canonical and the generated child project layout intact.

## Observed implementation follow-up, 2026-10-27

- Defaults adjusted after preview testing: 45 cm width, 28 cm compact/38 cm detail height at the original fixed (0,-15,-110) cm anchor. The card itself is the rehearsal-position cue; no separate desk-edge marker was added.
- Criteria 1–4 have local preview/logic evidence, including exact source identity, missing/unsupported abstention and negative cases. Five LEAF scenarios passed with 69 assertions; the parent independently repeated the fresh flow and inspected captures.
- Criterion 5: uninterrupted 93.526-second flow and fresh repeat passed. The separate 150-second recorded demo remains pending; the native recorder reached Save recording but no MP4 export was verified. No video, physical-device comfort or current-law validity result is implied.
- Canonical evidence is in ../docs/STATUS.md and ../docs/EVIDENCE_REPORT.md. The approved design intent is preserved; this follow-up records implementation choices/results, not a new participant sign-off.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources

