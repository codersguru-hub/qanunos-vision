# Evidence report

Observed 2026-10-27. The local prototype is implemented and verified; no public video, repository or submission is claimed.

## Current outcomes

| Check | Input/action | Observed result |
| --- | --- | --- |
| Gate 0 | CLAD custom spatial card, real SIK select and return | PASS, builder and independent parent; actual pixels/queries/logs |
| Exact authority | Curated Article 97 publication/article/excerpt/provenance | Exact runtime text matched the reviewed record; identity review only |
| Fabricated citation | FICTIONAL-EG-9999-ART-404 | Visible Unverified — do not cite, actual validator path |
| Mismatch and missing values | ID/suffix/article/case/zero-padding, altered excerpt, missing/tampered provenance | Negative checks passed among 38 synthetic validator/state assertions |
| Unknown legal status | Curated record has no reviewed validity/effective-date conclusion | Both Unknown — not reviewed labels visible and asserted |
| Unsupported/ambiguous question ID | ID outside the single prepared-question allowlist | Abstention guard passed; no arbitrary natural-language legal QA is implemented |
| Source reveal/return | Real SIK triggers | Matching source details and restored Ready; fresh LEAF and independent parent cycles |
| Missing source | useReviewedFixture=false for the scenario | Five UI assertions passed, actual abstention capture inspected; true restored/saved |
| Arabic | Original six-word excerpt | Connected glyphs and coherent RTL visually observed in the tested preview; exact Unicode text queried |
| Fresh demo | Refresh under normal local fixture with no production account | Complete prepared local flow reproduced |
| Gate 2 | Continuous LEAF cycle with paced interaction and source inspection | PASS; 93.526 seconds uninterrupted, nine assertions, timestamps and in-run captures |
| World placement | 15 cm camera translation | Card remained (0,-15,-110) cm; reset restored starting view; off-axis outer edge can leave FOV |

Five LEAF scenarios succeeded with 69 distinct assertions: 38 validator/state, 16 reviewed UI, 5 abstention UI, 9 continuous-run, 1 simulated IK. The 16-assertion flow also passed a fresh repeat. These tests establish local behavior, not legal correctness, physical tracking or measured performance.

## Independent parent verification

After the builder finished, the parent forced compilation, refreshed, rediscovered runtime targets and performed five actual PreviewInteractTool Pinches. Each returned success:true / CommandSuccess and the expected stage. Runtime queries matched the exact reviewed Arabic, authority ID, PDF/printed page, review date and both unknown legal-status labels. Actual source/rejection/returned captures were inspected. A further cycle was used to save durable final captures after the viewport changed; all actions succeeded and the Lens ended Ready.

- [Sanitized parent results](evidence/2026-10-27-rehearsal-parent-verification.json)
- [Builder results and exact Lens-side timestamps](evidence/2026-10-27-rehearsal-builder-evidence.md)
- [Independent rejection](evidence/2026-10-27-flow-parent-rejected.jpg)
- [Independent source](evidence/2026-10-27-flow-parent-source.jpg)
- [Independent returned state](evidence/2026-10-27-flow-parent-returned.jpg)
- [Continuous-run question](evidence/2026-10-27-rehearsal-90s-question.png), [rejection](evidence/2026-10-27-rehearsal-90s-rejected.png), [replacement](evidence/2026-10-27-rehearsal-90s-replacement.png), [source](evidence/2026-10-27-rehearsal-90s-source.png), [return](evidence/2026-10-27-rehearsal-90s-returned.png).

## Source and data limits

The parent reviewed the original PDF linked by Egypt’s Presidency, including rendered Article 97 on PDF page45/printed39. Exact short excerpt and PDF hash are in [SOURCE_REVIEW_ART97.md](SOURCE_REVIEW_ART97.md). The newly curated fixture is source-identity reviewed only. Effective date and current legal validity remain unknown. The inspected local QanunOS corpus contained no exact Constitution record, so no QanunOS cross-check/API integration is claimed. Fictional facts and unsupported candidate are explicitly labeled; no private case data or old platform code was copied.

## Failures and qualifications

- Refreshes with the LEAF panel open can return the editor-plugin warning Skipping plugin state save: instance was destroyed before its state finished loading. The parent observed this on refresh. The later interaction tail returned errors:[] with all expected stage prints. This is not a claim that every log was empty.
- A transient typed-input wiring error during scene construction was resolved by the planned reference wiring. A post-LEAF manual batch timeout was recovered after refresh; its initial screenshot was discarded as invalid evidence. See builder notes.
- Native video recording reached the save dialog, but its filename controls were not reliably targetable and no expected MP4 export was verified. No 150-second recording, video duration, public URL or recording success is claimed. The script is ready for manual capture.
- Filename-level publication checks exclude MCP/config/env/key/live-instance files; raw vendor telemetry was not copied into the sanitized JSON. This does not replace the final full publication/footage review.
- No physical SPECS tests, full Arabic interface, persistent anchor, performance benchmark, actual account authentication, protected service operation or publication was verified.

Earlier setup evidence remains under evidence/2026-10-27-mcp-readiness.md, evidence/2026-10-27-sign-in-error.md, and the historical status snapshot. Gate 0 source/captures are preserved alongside the evolved implementation.
