# Design: QanunOS Lens API (pairing + read-only hearing view)

Drafted 2026-10-29. **Design only — nothing is built.** It will be built in the QanunOS repository (D:/Projects/apps/QanunOS) on a new branch, after the participant commits the open work there.

## Decisions (participant, 2026-10-29)

| Topic | Choice |
| --- | --- |
| Lens sign-in | Pairing code approved on qanunos.com |
| What the Lens sees | Hearing view, read-only |
| Open QanunOS changes | Participant commits first; the API goes on a new branch |
| Demo data | Fictional demo account, created by a seed script |

## What QanunOS already does (read 2026-10-29)

- Office routes (`/api/office/*`) all require a signed-in user. Every case read checks `user_id`, so one lawyer can't read another's cases. Data is per user; there is no shared office.
- Sign-in methods: Google, email/password and phone OTP. All of them issue a JWT that lasts 7 days, carries only the user ID, has no scope and can't be revoked.
- So a website JWT must never go to the glasses. The Lens gets its own kind of token instead.
- No case-to-law-article link exists. The Lens keeps using the public `/api/laws/slug/:slug` route for articles (Gate L0 passed).

## Pairing flow

Modelled on the OAuth device-authorization flow (RFC 8628), so nothing is typed on the glasses.

1. **Start (Lens).** `POST /api/vision/pair/start` returns:
   - a secret `device_code` (32 random bytes)
   - a short `user_code` such as `QK7M-4TPA` (8 characters, no look-alike letters)
   - `expires_in` = 600 seconds and `interval` = 5 seconds

   It is rate-limited per IP.
2. **Show (Lens).** The card shows the code and "qanunos.com/vision".
3. **Approve (website).** The signed-in lawyer opens the Vision page and enters the code. The page shows what the Lens will be able to see and asks for approval. `POST /api/vision/pair/approve` requires the normal JWT. Wrong, expired and already-used codes fail with one generic message, and attempts are rate-limited.
4. **Collect (Lens).** The Lens calls `POST /api/vision/pair/token` with `device_code` every 5 seconds. It gets `pending` until approval, then one opaque access token (prefix `qv_`) exactly once. After that the pairing is consumed.

**Token rules:**
- The database stores only a SHA-256 hash of each token and device code, never the token itself.
- Tokens last 12 hours, and the scope is fixed to `vision:read`.
- Each paired device appears in a "Paired glasses" list on the website with a Revoke button.
- Blocking a user or revoking the device stops the token at once.

**Kept separate from the website:**
- A `qv_` token works only on `/api/vision/*`. It fails the JWT check everywhere else.
- A website JWT is rejected on `/api/vision/*` reads.

## Read endpoints (GET only, `qv_` token)

Each response is built from an explicit list of fields, never raw database rows. Every query is filtered by the token's user.

| Endpoint | Returns |
| --- | --- |
| `GET /api/vision/agenda?date=YYYY-MM-DD` | That day's hearings and due tasks: time, case title, court, circuit, stage |
| `GET /api/vision/cases?status=active` | Case list: id, title, number/year, court, stage, priority, next hearing date |
| `GET /api/vision/cases/:id` | Case summary: title, number/year, type, court, circuit, level, stage, priority, subject, our position. Also client display name, opponent name, opponent lawyer, the last 5 hearings (date, decision, next step) and open tasks |

**Never sent to the glasses:**
- Client details: national ID, phone, WhatsApp, email and address.
- Opponent phone.
- Power-of-attorney numbers and notary office.
- Free-text `notes`.
- Fees, payments and expenses.
- Documents and their downloads.
- Witnesses and experts.

Any field outside the list is dropped by default.

**Errors:** 401 for a missing, expired or revoked token; 404 for another user's case or a missing case. Responses never contain `error.message` or stack traces.

## Data and audit

- New table `vision_pairings`: user code, device-code hash, status, user, created/expiry/approved/consumed times.
- New table `vision_devices`: user, token hash, label, scope, created/expiry/revoked/last-used times.
- New table `vision_access_log`: device, endpoint, case id and time, so the lawyer can see what the glasses opened.
- These are added through the existing `npm run db:migrate` (`backend/dbMigrate.js`) with `CREATE TABLE IF NOT EXISTS`. No existing table changes.

## Website

A small "Vision / النظارة" panel in the Office area. It has an input for the pairing code, the list of what the Lens can see, the approve button, and the Paired glasses list with Revoke. It follows the approved Office design rules in QanunOS AGENTS.md: RTL, high contrast, no layout changes to the locked pages.

## Demo account

A seed script, `seed_vision_demo.js`, creates one demo lawyer with clearly FICTIONAL clients, cases, hearings and tasks. The demo case is a fictional unpaid invoice that matches Evidence Law Article 1. It runs against the local or dev database by default; running it against production needs separate approval. Real client data is never used in testing recordings or the demo.

## Tests (node --test, in `backend/tests`)

- **Pairing:** codes are random and in the right format; they expire after 10 minutes and are single-use; a wrong code fails generically; tokens are released only after approval; polling faster than the interval is refused; a second collect fails.
- **Token:** it is accepted only on vision routes; expired, revoked and blocked-user cases are refused; a JWT is refused on vision reads.
- **Response shaping:** no forbidden field appears, even when the row contains it; another user's case returns 404.
- **Errors:** no internal messages leak.

## Lens side (after the API exists)

- **Pairing card:** the code and "qanunos.com/vision", with polling and a clear expired/retry state.
- **Views:** an agenda card and a case card, labelled "Live QanunOS · demo account".
- **Token storage:** the token is kept only for the session at first. Persistent storage on the glasses is a later decision.
- **Late replies:** the cancellation and late-reply rule from Gate L0 applies.

## Not in scope / later approval

- Any write from the Lens.
- Deployment to qanunos.com and running the migration on production. Each needs explicit approval at that time.
- Case-to-law linking.

## Open checks

- Hackathon disclosure: this API is new work in the pre-existing QanunOS and must be described as such.
- Review Snap's Spectacles developer terms on showing sensitive personal data, such as legal case data, in a Lens.
