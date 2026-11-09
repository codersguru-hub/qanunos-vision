# Security and privacy boundaries

This is a fictional rehearsal demonstration. It is not an authorization to record or use assistance in a real courtroom.

- Use fictional people, case facts, questions and files. Do not record, identify or track bystanders.
- Initial demo should use a newly curated, small local fixture. Do not export production databases or client records.
- Preserve exact legal excerpts and provenance. A corpus ID or an amendment flag is not proof of current legal effect.
- Disclose QanunOS as pre-existing infrastructure. Build the Lens and any optional adapter from scratch.
- Do not put credentials in the Lens, repository, test fixtures, logs or footage. Exclude .mcp.json because Lens Studio can place an authorization token there.
- Keep any optional adapter read-only and restrict it to explicitly public legal fields. No private speech transcripts or case contents leave the device in the first slice.
- Use the participant's own sign-in flow. Never copy account credentials into the project or a troubleshooting report.

## Before publishing or recording
- Inspect staged files and the entire intended public history for secrets, private data and copied old code.
- Confirm rights to legal excerpts, libraries, fonts, images, music and trademarks.
- Inspect footage for email addresses, account identifiers, MCP tokens and unrelated windows.
- Check that every fixture, mock trigger and actual live connection is labeled truthfully.
- Test source ID, excerpt, suffix and provenance mismatch rejection.

This checklist has not yet been executed against a completed Lens or public repository.

## Local implementation checks, 2026-10-27

- Newly authored custom scripts were inspected for network/microphone integration: no fetch, InternetModule, RemoteService, WebSocket or XMLHttpRequest calls were found in Assets/Scripts. This concerns custom Lens code, not Lens Studio's own vendor telemetry.
- The authentic law fixture was newly curated from the official Presidency PDF; only the short reviewed excerpt and public provenance enter the Lens. The original PDF/render remain in ignored local-backups. QanunOS reference directories stayed read-only; no production data or old platform code was copied.
- A filename-level Git publication-candidate check caught ls-live-instance.json after 5.23 regenerated its ignore rules. Repository-level ignores now cover live-instance state, MCP configurations/settings, environment files and key material. The repeat filename check found no such candidates. No credential values were printed.
- Git history has zero commits at this check, and no public repository or upload exists. This is not a substitute for reviewing the exact intended publication payload/history later.
- Saved verification JSON contains scoped statuses, fictional UI text and relevant print lines; raw Lens Studio telemetry-tail records are not included in it.
- The account boolean remains false. The participant's explicit local workflow exception does not assert account authentication or bypass protected services. Publishing remains excluded.
