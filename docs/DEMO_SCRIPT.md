# QanunOS Vision: demo script

## Live hearing-card take (plan, 2026-11-08)

This supersedes the 150-second plan below for the final video. Target length is 100 to 130 seconds, always under three minutes. The new element is the live QanunOS hearing card at the start; the citation flow afterwards is unchanged.

### Before recording (participant)

1. In QanunOS, add an upcoming hearing to the demo case (for example 2026-11-10, 10:00, with a purpose) so the card shows the "الجلسة القادمة" line.
2. On qanunos.com/vision, revoke the old pairings, so the linked-devices list on screen is clean.
3. Close unrelated windows and tabs. Keep the qanunos.com/vision tab open and signed in, at 100% zoom.

### The take (one continuous native Preview recording)

| Step | Who | What happens on screen |
| --- | --- | --- |
| 0 | Claude | Refresh Preview 1, which clears any token, and leave the Ready card showing. |
| 1 | Participant | Click the red record button on the Preview panel. |
| 2 | Claude | Hold Ready for 3 s, pinch **QanunOS hearing**; the pairing card shows the code as its heading. Hold. |
| 3 | Participant | On qanunos.com/vision, type the code, then press Win+Shift+S for a screenshot of the code typed in and the approve button, save it to `docs/evidence/2026-11-08-website-approve.png`, then press **الموافقة والربط**. |
| 4 | Claude | Hearing card appears. Hold 8 s for reading. |
| 5 | Claude | Pinch **Rehearse a citation**; hold the question 4 s. |
| 6 | Claude | Pinch **Art. 98 — full quote**; hold the rejection 6 s. Pinch **Try another citation**. |
| 7 | Claude | Pinch **Art. 97 — full quote**; hold the exact match 7 s. |
| 8 | Claude | Pinch **Inspect source card**; hold 8 s. |
| 9 | Claude | Pinch **Return to rehearsal**; hold Ready 3 s. |
| 10 | Participant | Click record again to stop; save as `docs/evidence/QanunOSVision-demo-live.mp4`. |

The waiting time while the code is approved is cut in editing, and the cut is marked on screen ("approval on qanunos.com, shortened"). Nothing else is cut. If any step fails, keep the take, report it, and record again; never splice in a different run.

### Narrated cut (built by script, neural voices)

| Beat | Visual | Narration |
| --- | --- | --- |
| Opener, about 8 s | Labeled AI courtroom still | Judge: "Counsel, what is your authority?" Narrator: "A lawyer's whole office should be one glance away. QanunOS Vision brings it into the room." |
| 01 Link the office | Pairing card with code | "One pinch asks QanunOS for a pairing code. No password is typed on the glasses." |
| 02 Approve | Website screenshot | "The lawyer approves it on qanunos.com. The glasses get read-only access for twelve hours." |
| 03 The hearing | Hearing card, with English captions for the Arabic | "Live from QanunOS: the case, the court, the next hearing, the parties and open tasks. Contact details, notes, fees and documents never reach the glasses." |
| 04 Rehearse | Question | "Now rehearse the argument. Which constitutional provision states the general right to litigate?" |
| 05 Catch the mismatch | Art. 98 rejection | "Article 98 has the right words but the wrong number. The Lens flags it before the lawyer says it aloud." |
| 06 Exact match | Art. 97 match | "Article 97 is the exact match: the reviewed Arabic excerpt, ready for a quick glance." |
| 07 Source | Source card | "Its source: Egypt's Presidency, April 2019 Constitution, PDF page 45. Current legal status stays unknown, because an accurate quote isn't the same as current law." |
| 08 Resume | Return to Ready, then disclosure | "Glance, verify, resume. The case data is a made-up office on live QanunOS; the citation check uses a local reviewed record. Lens Studio preview, not yet tested on Spectacles." |

On-screen labels: "Actual Lens Studio preview" on all Lens footage, "AI dramatization" on the opener, and the card's own "Fictional demo account | Live QanunOS, read-only" line.

### Result (2026-11-08)

- Raw take: [QanunOSVision-demo-live.mp4](evidence/QanunOSVision-demo-live.mp4), one continuous Lens Studio preview recording, 361.4 s at 1610 × 1590 and 30 fps. The flow runs from 0 to about 110 s: Ready, pairing code JDE5-2U5R (14.6 s), approval on qanunos.com, hearing card with the 10 Nov 2026 next hearing (49 s), question (67 s), Art. 98 rejected (73 s), Art. 97 exact match (86 s), source (95 s), Ready (105 s). The rest is the idle Ready card.
- Website approval: [2026-11-08-website-approve.jpg](evidence/2026-11-08-website-approve.jpg), the code typed in before approval. Pairing and approval were driven by Claude through the MCP and Claude in Chrome, on the participant's account of dummy data.
- Narrated cut: [QanunOSVision-demo-live-narrated.mp4](evidence/QanunOSVision-demo-live-narrated.mp4), 96.9 s, 1920 × 1080, Andrew (narrator) and Ryan (mock judge) neural voices, built by `local-backups/build_live_demo.py`. Each Lens beat shows only its own stage of the take and holds the last frame; the waiting time for approval is shortened, and that beat is labelled. The opener is the labelled AI courtroom still.
- Take 1 (no next-hearing line) is kept as `QanunOSVision-demo-live-take1.mp4`. Final human review and upload are pending.

### After capture

Check the saved clip's duration, legibility and privacy (no email, account name, other tabs or headers). Then build the narrated cut, review it frame by frame, and only then consider upload; upload and submission still need separate approval.

---

## Earlier plan: 150-second demo script (2026-10-28)

Status: recording plan. The four-choice flow passed its latest serial Preview 1 verification on 2026-10-28 (see STATUS.md). Run it once before recording. Use genuine Lens Studio footage for every product interaction. The optional opening shot illustrates the rehearsal setting.

| Time | Visual | Suggested narration |
| --- | --- | --- |
| 0–8 | Optional dramatization. A lawyer wearing clear AR glasses faces a mock judge in a practice hearing. Keep **Fictional mock hearing · AI dramatization** on screen if using a generated shot. Cut to the real preview at “rehearse.” | Mock judge: “Counsel, what’s your authority?” Narrator: “Can you verify the citation without breaking your train of thought? Let’s rehearse it.” |
| 8–23 | Label the footage **Actual Lens Studio preview**. Select **Mock judge question**, then **Art. 98 — full quote**. Hold the rejection so viewers can read it. | “I start the prepared question with a pinch. I pick Article 98. The Lens flags the mismatch before I practice saying it aloud.” |
| 23–30 | If timing permits, show one other rejected choice and hold its reason. | “A shortened quote also fails the exact match.” |
| 30–55 | Choose **Art. 97 — full quote**; show Exact reviewed match with the attempt count and the Article 97 excerpt | “Only the exact match against a curated local record checked against Egypt’s Presidency PDF survives. An unofficial English gloss is: the right to litigate is protected and guaranteed to everyone.” |
| 55–85 | Inspect source; show authority ID, canonical source location, review date and both unknown legal-status labels | “Source identity review is separate from current legal validity. Effective date and legal currency remain unknown here. The English explanation is a non-authoritative summary.” |
| 85–105 | Shift the preview viewpoint slightly to show the card stays beside the rehearsal position. Select **Return** and let the ready view settle. | “The source stays beside my rehearsal position. I can glance at it, pinch to return, and pick up my argument.” |
| 105–125 | Show actual LEAF/validator results only if they have passed; show a short section of the authentic CLAD evidence | “The coding agent built this Lens through CLAD and the Lens Studio MCP. The tests check rejection, source identity, return and abstention.” |
| 125–140 | Brief on-screen disclosure slide or readable repo documentation; do not reveal account/config windows | “This uses mock input and local fixtures. QanunOS is pre-existing infrastructure, inspected read-only; no live QanunOS API is used in this demonstration.” |
| 140–150 | Return to the working preview and project name | “The goal is a traceable source check during rehearsal. It does not decide a real case, establish current law, or authorize courtroom use.” |

## Optional opening shot

Generate or film one silent, eight-second shot in 16:9. From a medium side angle in a quiet mock courtroom, show a fictional Egyptian attorney in a dark suit wearing slim, unbranded clear-lens AR glasses, standing at a lectern and facing a colleague playing a judge. The mock judge looks up and waits. The attorney keeps their gaze forward. Use a subtle camera push-in, natural light and restrained acting. Keep the shot free of logos, official seals, visible case files and generated AR overlays. Add the caption and spoken line in editing.

If the shot is unavailable, open on the real preview with the same mock-judge line read in voice-over. Introduce the live preview capture at **Mock judge question** so the audience can see the manual trigger.

## Recording discipline

- Record the actual Preview 1 flow; keep a continuous section showing rejection, replacement, inspection and return. Never splice away a failure and call the result an uninterrupted test.
- Aim for 150 seconds; the submitted video must stay under three minutes. Use English narration or accurate English subtitles. Do not imply an English summary is an authoritative translation.
- Keep fiction/mock/local-fixture labels visible. Show unknown validity/effective dates, rather than merely mentioning them off-screen.
- Use a fresh preview run and the exact reviewed fixture. If Arabic rendering is unsupported, show the documented honest fallback; do not silently show broken glyphs or a generated legal quotation.
- Inspect the recording for account names, unrelated windows, authorization headers, filesystem secrets and private information before any upload.
- The source-link identity and source-review record must agree. Do not claim current validity, professional approval, hardware comfort or measured performance.
- Save a local recording first. Public upload and project submission are separate later actions; no upload is authorized by this recording plan.

## Artifacts to fill after capture

- Local recording: [QanunOSVision-demo.mp4](evidence/QanunOSVision-demo.mp4), captured in SPECS 27 Interactive Preview on 2026-11-08.
- Narrated review cut: [QanunOSVision-demo-explained.mp4](evidence/QanunOSVision-demo-explained.mp4), 54 seconds. A labeled AI courtroom still introduces the scenario. Cropped Lens Studio footage shows the actual interactions alongside explanatory captions and synthesized narration.
- Public YouTube URL: pending.
- Raw duration: 85.894 seconds at 1610 × 1590 and 30 fps. The audio is silent.
- Continuous Gate 2 evidence: completed 93.526-second LEAF run with in-run captures; see EVIDENCE_REPORT.md. This is test evidence, not a recorded demo video.
- Raw take review: sampled frames show the mock question, Article 98 rejection, exact Article 97 match, source details and return. The capture shows only the preview. The source text is small against the room background. Final review of the narrated cut is pending.

## Manual native recording

Use these native preview controls if another take is needed:

1. Keep the project open in Preview 1, SPECS 27, Interactive, with the ready card visible. Keep live microphone input disabled; this local Lens has no speech feature.
2. Click the red video-record button at the lower right of the Preview panel. Capture the live flow from the first mock-question pinch through Return. Add the optional opener and narration in editing.
3. Click the same record button to stop. In Save recording, choose an explicit workspace filename such as `D:/Projects/apps/QanunOS Vision/docs/evidence/QanunOSVision-demo-150s.mp4` and click Save.
4. Inspect the actual saved clip, its duration, text legibility and privacy before any upload. If the recorder stops early or produces a different output, report the observed result; do not label it a 150-second video.
