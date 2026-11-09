# SPECS sign-in error and official guidance

Observed 2026-10-27. Participant reported an error and supplied a screenshot of the SPECS login/signup page with `Something went wrong. Please try again.` below the email/passkey controls. The screenshot's email address is deliberately not reproduced in this evidence document. No screenshot containing it was copied into the repository.

The screenshot establishes a generic page error, not an HTTP status, server error code, account eligibility decision or confirmed cause. The previous real MCP account check returned `isAuthorized: false`; MCP tool execution itself succeeded.

## Sources checked

- Authenticated Devpost `get_announcements` for `learn-specs`, fetched 2026-10-27T13:45:00Z, returned announcement 47154, **Fix for issues logging into Lens Studio**, sent 2026-10-21T14:19:42Z. It recommends Lens Studio 5.23.2 for the CLAD readiness/login issue.
- [Official Resources FAQ](https://learn-specs.devpost.com/resources) repeats the downgrade recommendation, linking [Snap's 5.23.2 download](https://ar.snap.com/download/v5-23-2).
- [Official discussion](https://learn-specs.devpost.com/forum_topics/45557-lens-studio-5-24-1-clad-blocked-by-specs-developer-sign-in) includes a participant report matching this generic email-login error and reports that downgrading does not solve every case. A newer organizer reply visible in the web search result says SPECS developer access is not required for CLAD development, while publishing/package setup differs; it recommends signing in at [My Lenses](https://my-lenses.snapchat.com/) and retrying Lens Studio. The web open result was an older snapshot without that final reply, so no exact posting time is asserted here.
- The Snap MCP troubleshooting page could not be opened by the web tool. No contents of that inaccessible page are claimed as reviewed.

## Next action and limits

Participant was asked to sign in personally at My Lenses with their Snapchat account and retry Lens Studio. Await the reported result. Do not submit credentials or initiate authorization from code, repeatedly retry the SPECS email form, clear credentials, or infer that a SPECS developer account must be obtained.

If this route still fails, use the official 5.23.2 workaround as a bounded compatibility test, preserving the current 5.24 project first. No downgrade has been performed and no older-version compatibility is established. No support message was sent.

The installed router's explicit `isAuthorized === true` gate remains unsatisfied. The local build is pending; a generic login error is not evidence that preview-only CLAD development requires SPECS developer access. Planning design sign-off, Gate 0, custom scene work, LEAF and visual interaction proof remain pending.

## My Lenses follow-up and bounded workaround

The participant subsequently reported `Signed in successfully` after the My Lenses/retry instructions. The single allowed follow-up MCP authorization check executed successfully but again returned `{ "isAuthorized": false }`. This discrepancy is preserved as observed; browser sign-in success is not being represented as editor readiness success. No further authorization polling was performed.

Prepared the organizer's recommended 5.23.2 workaround. Saved the actual project through `ExecuteEditorCode` using the declared `Project.save()` method. Copied the generated project into ignored `local-backups/QanunOSVision-before-5.23.2` and verified all 46 copied files against the originals using SHA-256. Excluded only regenerable Cache/Support, lock files and live-instance state. Local configuration and signing material remain local/ignored; none was printed or uploaded. The original Lens project and repository-root journey state remain in place.

Opened Snap's official 5.23.2 download page and used the previously approved software terms to request the Windows download. The default sandbox transfer failed with `No such host is known`; the approved network-enabled retry completed. No Lens Studio endpoint was called with raw HTTP.

Verified installer: `local-installers/Lens_Studio_5.23.2_win_setup.exe`, 806,358,544 bytes. Windows Authenticode returned `Valid`, signer `Snap Inc.`. SHA-256: `3298EE5EC069893D00036CAF575E52AFC39C3F9590D02835CA120738253BA756`. This is an observed local hash, not a comparison with a separately published checksum.

The participant explicitly approved the official plan-lens design brief. It now has `status: approved`; the approved file was added to the ignored backup and all 47 backed-up files matched their originals at the final pre-install check.

Saved the project again through MCP and closed Lens Studio normally. An initial CUA close attempt reported `coordinate input geometry is unavailable`; the supported Windows Computer Use skill activated the correct window and closed it with Alt+F4. A fresh inventory confirmed the editor window was gone. Attempting to launch the verified installer through Computer Use returned `Computer Use app approval timed out`; the subsequent inventory showed no setup window. No successful install, downgrade or older-project compatibility is claimed. Participant must open the verified installer and complete setup/elevation personally. This was a launch-approval timeout, not an automatic-review rejection.

## Participant installation and real 5.23.2 check

Participant subsequently reported installation completed. Real `ListAllPanels` returned seven panel IDs successfully. The initial project/version query failed compilation because `LensStudio:App.executablePath` exists in the saved project's 5.24 definitions but not the live 5.23 tool compiler (`TS2339`). Removed that optional output property and retried the read-only query successfully:

```json
{
  "projectFile": "D:/tmp/LensStudio_NIRtUF/Default/Project.esproj",
  "version": "5.23.2.26081320"
}
```

One account query returned `{ "isAuthorized": false }`. This was the startup project's account state; it was not polled further.

Verified the `IModel.openProject(Editor.Path)` declaration in the active startup project's `Support/editor.d.ts`, then opened the already-authorized saved QanunOSVision project using real `ExecuteEditorCode`. It returned `Execution Succeeded`. A subsequent real project/version query returned:

```json
{
  "projectFile": "D:/Projects/apps/QanunOS Vision/QanunOSVision/QanunOSVision.esproj",
  "version": "5.23.2.26081320"
}
```

Windows accessibility for the actual QanunOSVision editor showed `My Lenses`, `Login`, and `TypeScript compilation succeeded!`. Thus installation, intended-project loading, and template compilation are observed. No custom scene or interaction is claimed, and no project manifest version was hand-edited. The participant was asked to complete Login within 5.23.2 personally, then report completion for the one follow-up account check. That question is pending.

## Follow-up after reported editor sign-in

Participant replied `I've signed in inside Lens Studio`. The one follow-up real `ExecuteEditorCode` account check returned `Execution Succeeded` with `{ "isAuthorized": false }`. Read-only Windows accessibility inspection then found the Login button, My Lenses menu, and successful template-compilation message. No account identity or token was printed. No further account polling or repeated login instruction followed.

Rechecked the official discussion through web search. The newer organizer reply again says SPECS developer access is not required for CLAD development. This does not establish successful account authentication here, nor prove why the editor boolean remains false. It does support asking whether the participant wants a local editor/preview-only attempt despite the installed router skill's stricter explicit prerequisite.

Asked the participant for a specific instruction to override that local workflow rule and attempt only the approved Gate 0 spatial card with select/dismiss. Publishing and account-protected services are excluded from that proposed attempt; no real service authentication check will be bypassed. The answer is pending, so no custom build has started.

## Explicit participant instruction for local test

The participant answered `Continue with the local preview test` to that exact scoped question on 2026-10-27. The exception is now granted for this Gate 0 attempt. It overrides the installed router skill's local sign-in prerequisite only. The account state remains false; no tool result or handoff represents it as true. Actual service authentication, publishing restrictions and credential boundaries remain unchanged.

Dispatched the bounded CLAD Specs Experience Builder workflow for one UIKit/SIK spatial card and real select/dismiss interaction. The approved brief is authoritative. Parent verification of actual preview pixels and interaction evidence is required before recording a pass. No full implementation has been authorized by a passing Gate 0 yet.
