# QanunOS Vision

A new SPECS Lens project for Learn AR with SPECS: a fictional oral-argument rehearsal that rejects unsupported citations and lets the participant inspect traceable legal sources in AR.

**Current status:** the approved local rehearsal works in the actual [Lens Studio project](QanunOSVision/QanunOSVision.esproj): mock question, fictional citation rejection, source-reviewed replacement or abstention, source inspection and return. Gate 0 and Gate 2 passed; five LEAF scenarios succeeded with 69 assertions; a sixth scenario now covers the live hearing card's pairing logic, and the hearing card itself loaded from production qanunos.com in preview on 2026-11-08, and the parent independently repeated the fresh interaction cycle. A 150-second video and public materials remain pending. See [docs/STATUS.md](docs/STATUS.md) and [docs/EVIDENCE_REPORT.md](docs/EVIDENCE_REPORT.md) for exact results and known warnings.

## Setup progress
- Node.js and Git are available.
- Official Devpost Learn plan-lens skill is installed and its [design brief](QanunOSVision/devpost/design-brief.md) was explicitly approved by the participant.
- Snap's ls-clad plugin is installed through its official ls-extensions marketplace.
- Lens Studio 5.23.2.26081320 is installed and the intended project is open; real MCP confirmed both. Its account check remains false after reported sign-in. The participant explicitly authorized local editor/preview work despite the router skill prerequisite; no actual authentication is bypassed. Publishing and protected services are excluded. The original project and approved brief have a verified local backup.

## Next steps
1. Keep Lens Studio open with the saved QanunOSVision project.
2. Use this participant's explicitly authorized local-preview workflow; the editor account discrepancy remains unresolved and must not be represented as successful authentication. Do not repeat the login loop or attempt publishing/protected services.
3. Both workspace folders are attached. The primary folder has an ignored copy of the generated MCP configuration with the verified IPv4 URL. Real tool execution now works; no blind restart is needed.
4. Read AGENTS.md for the saved handoff and use the child Lens project folder explicitly for Lens-specific operations.
5. Follow the approved official design brief at QanunOSVision/devpost/design-brief.md; the first build milestone is the Gate 0 select/dismiss card.
6. Gate 0 and Gate 2 passed. Record the actual local preview using docs/DEMO_SCRIPT.md, then inspect the recording before any later authorized publication. No MP4 export is currently verified.

Use Lens Studio's preview for the actual Lens. No standalone Node/web application build command applies. Do not substitute a browser mockup for a working SPECS Lens.

## Run the local rehearsal

1. Open QanunOSVision/QanunOSVision.esproj in Lens Studio 5.23.2. The observed build is 5.23.2.26081320.
2. Keep Preview 1 on SPECS 27, Interactive, Sunlit Room, and allow TypeScript compilation to complete.
3. Select **Mock judge question**. Choose one of four practice citations: Art. 98 with the full quote (misattributed), Art. 97 with a shortened quote (altered), the FICTIONAL Art. 404, or Art. 97 with the full quote.
4. Each wrong choice shows **Unverified — do not cite** with the validator's reason (wrong article, altered text, or unknown authority); **Try another citation** returns to the choices. Only the exact reviewed citation reaches **Exact reviewed match**, which reports the attempt number.
5. Select **Inspect source card** for the source reference, page locator and review date, all read from the reviewed record. Both legal-status labels must remain unknown.
6. Select **Return to rehearsal** to restore the ready view. The card is fixed in the room for this preview run; persistent anchors across sessions are not implemented.

The misattributed and shortened variants are derived from the reviewed record as labeled practice fixtures; they are not presented as legal text.

The prepared case is fictional. Input is a button, and the source is a newly curated local fixture. The citation rehearsal itself makes no network call, uses no speech recognition and gives no AI legal answer.

## Live QanunOS hearing card

On the Ready card, **QanunOS hearing** pairs the Lens with a QanunOS account. The card shows a code; the lawyer signs in at qanunos.com/vision and approves it. The Lens then makes read-only HTTPS calls to `qanunos.com/api/vision` and shows one hearing card: case title, court and stage, next hearing, client and opponent, subject and open tasks. **Rehearse a citation** opens the mock judge question above; **Close hearing** returns to Ready. The token stays in memory and is never printed. Client contact details, ID numbers, powers of attorney, notes, fees, documents, witnesses and experts are never sent to the glasses. Verified in Lens Studio preview against production with an account of dummy data (2026-11-08); not tested on physical Spectacles. Set `useQanunOffice` off to keep the Lens fully offline.

## Verification scenarios

Use the installed LEAF panel to discover/run these scenarios in the actual preview:

- `qanunos-validator-guards`: synthetic identity/provenance tampering, unsupported question and state guards. These do not establish legal validity.
- `qanunos-reviewed-flow`: prepared question, all four citation choices (three rejected with their reasons, one exact match), source metadata and return.
- `qanunos-abstention-flow`: disable the reviewed fixture for the test, choose even the exact citation, observe abstention, then restore it.
- `qanunos-90-second-flow`: paced continuous interaction including source inspection and return; elapsed test duration is not a performance benchmark.
- `qanunos-ik-question`: interaction-kinematics trigger probe, not a physical-glasses hand-tracking test.
- `qanunos-office-pairing`: pairing, polling, slow-down, expiry, revoked token, server error, empty account, network failure and cancel, against fake QanunOS replies (29 assertions, no network).

Read docs/EVIDENCE_REPORT.md for observed results, remaining checks and known failures. Scenario presence alone is not a passing result.

## Local architecture

The UIKit view displays data and emits actions. The controller owns a deterministic rehearsal state. QanunOSVisionPracticeCandidates.ts derives the four practice citations from the reviewed record. A pure allowlist validator checks the chosen candidate's exact identity/excerpt/provenance against QanunOSVisionReviewedSource.ts and explains every rejection from the mismatched fields; missing/invalid data produces rejection or abstention. Publisher, publication and page locator live in the reviewed record (the validator checks the PDF page against the source link); the card never hardcodes provenance. The source record is not fetched or inferred at runtime. Legal currency and effective date are separate unknown fields.

## Planning and evidence
- [Approved official plan-lens design brief](QanunOSVision/devpost/design-brief.md)
- [Competition brief](docs/COMPETITION_BRIEF.md)
- [Strategy](docs/STRATEGY.md)
- [Draft storyboard](docs/UX_STORYBOARD.md)
- [Rubric mapping](docs/RUBRIC_TO_FEATURE_MATRIX.md)
- [Novelty assessment](docs/NOVELTY.md)
- [Integration audit](docs/INTEGRATION_AUDIT.md)
- [Article 97 excerpt identity review and source limitations](docs/SOURCE_REVIEW_ART97.md)
- [Evidence report](docs/EVIDENCE_REPORT.md)
- [150-second recording script](docs/DEMO_SCRIPT.md)
- [Submission draft](docs/DEVPOST_DESCRIPTION.md)
- [Submission checklist](docs/SUBMISSION_CHECKLIST.md)
- [Security and privacy](docs/SECURITY_AND_PRIVACY.md)

The child project's design brief is the approved official plan-lens output. The docs/ files distinguish original planning from observed CLAD/preview/test evidence. The local rehearsal is verified; a recorded/public demonstration and submission remain pending.

## Data and reuse
QanunOS is pre-existing infrastructure. It has been inspected read-only; no old application code, credentials, client data or production database export has been copied into this new project. A future local demonstration dataset will use fictional case facts and source-reviewed legal excerpts. Source verification and legal currency are separate states; unknown effective dates must remain unknown.

## Official resources
- https://learn-specs.devpost.com/resources
- https://github.com/challengepost/learn-specs
- https://developers.specs.com/docs/clad
- https://ar.snap.com/download

No public repository, project submission or demo video has been published.
