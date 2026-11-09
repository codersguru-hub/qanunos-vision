# Plan: read-only QanunOS link

Drafted 2026-10-28. **Only Gate L0 (network in preview) has run; the live-source module and second question are not built.** QanunOS (D:/Projects/apps/QanunOS) was read, not changed; no QanunOS code is copied into the Lens.

## What was checked

| Question | Observed |
| --- | --- |
| Is there an API already? | Yes. QanunOS source has public read routes under `/api/laws`; only add/edit/delete require admin login. No new QanunOS API is needed. |
| Is it live? | Yes. `GET https://qanunos.com/api/laws/slug/evidence-law-1` returned HTTP 200 JSON with no credentials (4 calls). A missing slug returned 404. |
| How fast? | First call 6.8 s, then about 2.9–3.1 s each. Slow enough that the card needs a visible "looking up" state and a timeout. |
| Can the Lens make the call? | `InternetModule.fetch` exists in this project's Lens API types (Spectacles and Camera Kit) and is not marked experimental. Snap's docs say HTTPS lenses can be published; access to sensitive data (camera/mic/location) gets restricted once a Lens uses the internet. This Lens uses none of those. **Works in Lens Studio preview (Gate L0 below); not yet tested on device.** |
| Is Article 97 in QanunOS? | No. The corpus has ten laws and no Constitution, so the live link needs a different article. |

Sources: [Spectacles Internet Access](https://developers.snap.com/spectacles/about-spectacles-features/apis/internet-access), [Permissions & Privacy](https://developers.snap.com/spectacles/permission-privacy/overview), [InternetModule](https://developers.snap.com/lens-studio/api/lens-scripting/classes/Built-In.InternetModule.html).

## Demo article

**Evidence Law No. 25 of 1968, Article 1** (`EGY-EVIDENCE-25-1968-ART-1`, slug `evidence-law-1`):

> على الدائن إثبات الالتزام وعلى المدين إثبات التخلص منه.

Why this one: ten words, so it fits the card and is a good Arabic test. It answers a natural judge question ("Who must prove the debt?"). It has no sub-article, and QanunOS reports `is_amended: false`.

Caveats:
- QanunOS stores the text with a leading `–` line, which must be trimmed before comparison.
- A QanunOS record is a copy, not primary authority. Before it is shown as reviewed, Article 1 needs the same review Article 97 got (docs/SOURCE_REVIEW_ART97.md) against an official copy of Law 25/1968. No official copy is in the workspace yet.
- `is_amended: false` means only that QanunOS has no amendment row. It must not be shown as "current". Effective date and currency stay "Unknown — not reviewed".

## Recommended design: direct call, pinned to a reviewed copy

The Lens calls the public slug route itself. No adapter server, no keys, nothing to deploy.

1. **Fixed request.** The URL is one constant: `https://qanunos.com/api/laws/slug/evidence-law-1`. Nothing the user says or picks is sent, and there is no free-text query.
2. **Check identity.** Accept the reply only if `article_id`, `law_id`, `slug`, `article_number_numeric` = 1 and `sub_letter` = "" all match exactly. The slug route has no sub-article fallback, unlike `/api/laws/article`, which is why it is used.
3. **Pin to the reviewed text.** Compare the trimmed `content` with the locally reviewed Article 1 record using the existing `validateCitation` rules. Match → show the card labelled **"Live QanunOS lookup · matches reviewed copy"**. Any difference → abstain with "QanunOS text differs from the reviewed copy". It never shows unreviewed live text as verified.
4. **Fail safe.** On timeout (8 s), network error, non-200 status or malformed JSON, show **"QanunOS unreachable — showing local reviewed copy"** and use the local record. Any QanunOS error message is never displayed.
5. **Label every state.** "Live QanunOS lookup", "Local fixture" and "Mock input" stay visibly distinct, as the master prompt requires.

**Option B, not recommended for now:** a small read-only adapter on the QanunOS server that reshapes the reply. It would need deployment and is only worth it if QanunOS has to add fields such as the source URL or dates. It isn't needed for one fixed article.

## Changes in the Lens (when approved)

- **New `QanunOSVisionLiveSource.ts`:** takes the `InternetModule` as an `@input` and a replaceable fetch function, so tests can supply fake replies. It returns either a checked record or an abstain reason.
- **New reviewed record** for Evidence Art. 1 next to `QanunOSVisionReviewedSource.ts`, after the source review.
- **Rehearsal flow:** add a second mock judge question with its own one-line fictional fact, for example a fictional unpaid invoice. It gets a new "Looking up QanunOS…" stage, then the same four-choice grid: exact Art. 1, one misattributed article, one shortened quote and one FICTIONAL article. The Article 97 flow stays as it is, so the five current scenarios remain valid.
- **Scene:** none needed. Gate L0 got the module with `require("LensStudio:InternetModule")`, so no Internet Module asset or scene wiring is required.
- **Timeouts:** preview logs "Http request cancellation not implemented", so a timeout cannot cancel the request. After the 8-second fallback, a late reply must be ignored rather than swapped onto the card.
- **Tests:** LEAF scenarios use the fake fetch for the match, text-differs, wrong-ID, 404, timeout and malformed-JSON cases. The network is not involved, so runs stay repeatable. One manual live run in preview is recorded separately as evidence.
- **Docs:** update the README, Devpost description and demo script so they say "live read-only QanunOS lookup for one article". The Article 97 path stays described as a local fixture.

## Order of work

1. **Gate L0 — network in preview. PASSED 2026-10-28** (details below).
2. Source-review Evidence Art. 1 against an official copy (needs an official PDF or gazette reference).
3. Build the live-source module and its fake-fetch tests (Node first, then LEAF).
4. Add the second question to the flow, connect the Internet Module, and re-run all scenarios.
5. Make one live preview run with captures, and update the docs.

## Gate L0 result (2026-10-28)

Lens Studio 5.23.2, Preview 1, through the real Lens Studio tools. A throwaway script (`QanunOSVisionNetProbe.ts`) was compiled and attached to a temporary scene object. It got `InternetModule` with `require("LensStudio:InternetModule")` and sent one fixed GET to `https://qanunos.com/api/laws/slug/evidence-law-1`.

| Run | Result |
| --- | --- |
| 1 | HTTP 200 after 1.303 s; `article_id` = EGY-EVIDENCE-25-1968-ART-1; trimmed text matched; PASS |
| 2 | HTTP 200 after 0.313 s; same ID and text match; PASS |

- The Preview log had no errors. Its debug lines included "HttpsOpenService for Wearable platform only" and "Http request cancellation not implemented".
- The expected text in the probe was QanunOS's own copy. This shows the connection works; it is not the source review of Article 1.
- Afterwards the temporary object and the probe script were deleted through the Lens Studio tools, and the project recompiled. A clean preview refresh showed no errors. Scene.scene kept the same timestamp and hash throughout, and `useReviewedFixture` still reads true.
- Not covered: physical Spectacles, poor or no network, and published-Lens permission behaviour.

## Decisions for the participant

- **Calling the live site: approved 2026-10-28.** The participant approved the public read-only call to `qanunos.com`, added as a second question.
- **Official source.** Do you have an official copy of Law 25/1968 to review against?

## Noticed in QanunOS (not changed)

- The public law routes return the raw server `error.message` on HTTP 500, which can expose database details.
- No rate limiting was seen on those routes.

Both belong to QanunOS, not this entry.
