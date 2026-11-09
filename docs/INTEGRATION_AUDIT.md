# Read-only QanunOS integration audit

Inspected 2026-10-27. Existing platform: D:/Projects/apps/QanunOS. No production calls or database access were made.

## Observed structure and source
The existing project contains backend, frontend, laws, tests and documentation. Its AGENTS.md and docs/project/status.md describe React 19/Vite/Tailwind, Express 5, PostgreSQL, FastAPI/ChromaDB RAG and Google OAuth/JWT. These are documentation claims; no runtime was started.

backend/index.js mounts routes/laws.js at /api/laws.
The source implements:
- GET /api/laws: law names.
- GET /api/laws/article?law_name=...&article=...: exact-reference lookup.
- GET /api/laws/slug/:slug: stable citation lookup.
- GET /api/laws/:law_name: article listing and optional search.

These are observed source routes, not verified deployed endpoints. The GET handlers have no route-local authentication middleware. Upstream deployment controls, rate limits, licensing and availability are unverified. Mutating handlers require authenticateToken and requireAdmin. No mutating route was called.

## Article response fields
backend/services/lawRepository.js selects article_id, law_id, law_name, article_number, article_number_numeric, sub_letter, section, content, content_clean, slug and is_amended.

The inspected public projection does not include official publication URLs, verification timestamps, effective-from/effective-to dates or a verified current-law status. Do not convert is_amended into expired/current status. An edit can write article_amendments with amending_decree, amendment_year and old_content; this alone does not establish legal effect.

The exact-reference function can fall back to another sub-letter row if no exact suffix matches. A future adapter must validate the returned full article identity against the request and abstain on mismatch.

## Safe first integration
Use a newly curated, explicitly labeled static demo dataset first. For each accepted authority require exact article ID, exact excerpt, source title/reference and reviewed provenance. Keep unknown effective dates unknown. A QanunOS ID provides traceability to that corpus; it does not establish primary legal authority.

The intentional invalid citation must be fictional and visibly rejected. Do not show any real legal excerpt as verified until its source is checked. No law text or client data has been exported.

An online adapter is optional. Add it only if direct public-law retrieval is necessary and documented; use read-only access, an allowlisted schema, no private speech or case data, and server-side credentials if any. Never copy old platform code into the new Lens.

## Reference directory status
D:/Projects/Hackathon_Director contains Codex/Claude/Antigravity material, a shared hackathon-director skill and evaluation assets. Read the shared skill, strategy core, output contract and root evidence-first playbook. The skill's referenced shared playbook path was missing; the root playbook was available. Historical outcomes were not consulted.

Git status returned Permission denied for both reference projects. No edits were made to either.

