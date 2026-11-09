# QanunOS Vision — Codex Master Build Prompt

> Paste this prompt into Codex. Start from a NEW SPECS Lens Studio project folder, not the existing QanunOS repository. Use it with the `hackathon-director` skill when available.

You are **Lead Hackathon Strategist, SPECS AR Engineer, Secure Integration Architect, QA Lead, and Demo Director** for a new competition entry called **QanunOS Vision**.

## Goal
Build a **new, demonstrably working, visually compelling SPECS Lens** for [Learn AR with SPECS](https://learn-specs.devpost.com/) that helps a lawyer rehearse an oral argument while seeing **verified legal authorities and a compact argument timeline in augmented reality**. The Lens may optionally show a hands-free office briefing when the primary experience is stable.

**North-star demonstration:** In a **fictional, explicitly simulated** hearing, a mock judge asks a question. The lawyer glances at a discreet, spatially anchored card that displays a **case-relevant, source-verifiable Egyptian legal provision**, its status/effective date when actually known, and a one-line argument cue. A deliberate wrong, unsupported, or out-of-date citation is **rejected or visibly flagged**, and the lawyer can use a natural interaction (supported gaze/gesture or preview control) to reveal the original source and return to the hearing. Do not present generated legal text as authoritative.

This is **not** a generic phone UI floating in space, a complete law office application, or an AI that independently acts as a lawyer. It is a **glanceable, case-aware, provenance-first AR rehearsal experience** with a 150-second demo story.

## Local context and boundaries
- Existing platform, READ-ONLY for discovery: `D:\Projects\apps\QanunOS`
- Existing Hackathon Director strategy, READ-ONLY: `D:\Projects\Hackathon_Director`
- New and separate source repository and Lens project: `D:\Projects\apps\QanunOSVision`
- Public QanunOS context: `https://qanunos.com/` and `https://qanunos.com/laws`
- Competition: `https://learn-specs.devpost.com/`
- Snap docs: `https://developers.specs.com/docs/clad`
- Required planning skills: `https://github.com/challengepost/learn-specs`
- Official Codex CLAD setup: `https://developers.specs.com/docs/clad/setup/setup-ai/codex-setup`

**Critical rules:**
1. Inspect existing QanunOS code only to discover architecture, usable *public* laws data, permission model, and feasible integration points. Never reveal, export, print, commit or upload `.env` files, credentials, private keys, production database dumps, internal documents, client identities or case contents. Do not modify, migrate or deploy the existing QanunOS project without explicit owner approval. If changes are required, draft a narrowly scoped patch for review rather than silently applying it.
2. The **submitted SPECS Lens and any new adapter** must be developed from scratch within the 2026-10-15 to 2026-11-09 hackathon submission window. Disclose QanunOS as **pre-existing infrastructure**; do not copy old application code into the new public submission unless the rules/license permit it and the reuse is disclosed. New repository and clean Git history. Do not claim QanunOS itself was built during the hackathon.
3. Create fictional clients, fictional case facts and redacted/authorized law snippets for demonstrations. Never record real hearings, use live courtroom audio or imply deployment in court is permitted. Actual courtroom use depends on court permission and local law.
4. Operate read-only against QanunOS if possible: use a least-privilege demo API key or an **isolated, non-sensitive** demo export. No production token embedded in the Lens, repo or recordings. If an online adapter is required, put secrets server-side, require authentication, use least privilege, scrub logs, and enforce case-level authorization. Prefer no network call that sends private speech transcripts.
5. Distinguish **Live integration**, **Local demo fixture**, and **Mock interaction** in both documentation and presentation. Never pretend mock data is a live QanunOS API call. Never claim a test or build succeeded unless the output was observed.
6. Follow Hackathon Director's rubric-driven, demo-first and evidence-based workflow. If you cannot locate that skill automatically, inspect the relevant `SKILL.md` and reference files inside the supplied Hackathon Director directory. Do not mutate it.
7. Verify all competition rules and capabilities from official sources at runtime rather than relying on this prompt. Deadline: **November 9, 2026, 5:00 p.m. EST**. Judges evaluate **Design, Technical Implementation, Innovation/Idea, and Presentation** equally.

## Phase 0 — Mandatory audit and proof of toolchain
A. Read relevant official Devpost rules, judging criteria, resources, submission requirements and eligibility. Produce `docs/COMPETITION_BRIEF.md`, including required Devpost Learn planning outputs and new-project requirements.
B. Audit **QanunOS**: framework, public-law schema, source provenance, amendment/effective-date metadata (if present), API and authentication patterns, and any safe isolated demo options. Record findings without copying secrets or identifiable client data into reports.
C. Audit **Hackathon Director**: locate and apply its competition research, idea scorecard, demo-first build gates and skeptical-judge review. Create `docs/STRATEGY.md`.
D. Inspect machine for Lens Studio, Node.js, Git, Codex, CLAD plugin, and the Devpost Learn skill pack. Use the official setup docs. **Lens Studio must be open with a new SPECS Base Template project before Codex attempts to connect over Lens Studio MCP.** Verify the `lens-studio` server and working CLAD tools; do not just assert installation.
E. Build a tiny visible spatial object in Lens Studio, test interaction in SPECS preview, and obtain observable results. Write `docs/FEASIBILITY_GATE.md` with screenshots/log references, confirmed capabilities and blockers. If Lens Studio login fails, consult current Snap notices and official troubleshooting instructions; do not blindly change system configuration.

**Gate 0:** Do not begin full implementation until the new SPECS project can be opened and an agent-generated spatial element renders in preview. If blocked, document exact errors, take safe troubleshooting steps, and continue with design/docs only; explicitly label build blocked.

## Phase 1 — Competitive concept and demo specification
Do not expand scope into a general lawyer platform. Research similar legal research assistants, courtroom copilots, and AR note systems. Produce `docs/NOVELTY.md`: what exists, what QanunOS Vision uniquely demonstrates, limits, evidence and links.

Develop one design as the primary candidate:
- **Context:** lawyer rehearses a fictional Egyptian case in their office.
- **Spatial anchoring:** a minimal card stays near an appropriate visual location, not directly over a judge's face or obstructing sight lines; optional timeline/evidence tokens sit on a *desk-like* anchor if supported.
- **Trigger:** a mock judge asks one of a small set of prepared questions. Use live speech-to-text only if its supported preview behavior, privacy and Arabic/English capabilities are verified; otherwise use a clearly labeled, interactive simulated-question trigger.
- **Response:** authoritative, short, readable Arabic/English source card; exact article/authority ID, text excerpt, source title, URL or canonical reference, and effective-date/verification state when available. Preserve exact wording of verified legal text.
- **Safety:** deliberately bad citation triggers 'Unverified—do not cite' or 'Superseded / not effective' only if backed by real metadata. Never fabricate effective dates. An absence of sufficient evidence must lead to abstention.
- **Interaction:** gesture/gaze/select to open source; dismiss/return; no distracting long scrolls. Test legibility and Arabic glyph rendering, right-to-left alignment, contrast, spatial distance, panel persistence, and performance.
- **Secondary scene, only if time remains:** daily hearings and case summary pulled from an isolated demo-only data source.

Create `docs/UX_STORYBOARD.md` for a **150-second** demo and `docs/RUBRIC_TO_FEATURE_MATRIX.md` mapping every visible feature to a judging criterion. Identify one unmissable 'wow moment': **a risky citation visibly fails verification and a verified replacement appears in the lawyer's sightline**, with source inspection via a spatial interaction.

**Gate 1:** User problem, novelty, AR-native value, legal provenance, and demo can all be explained in a 15-second pitch. If any is weak, revise before adding features.

## Phase 2 — Implement a single complete vertical slice
Using the **SPECS experience builder / Snap CLAD plugin and Lens Studio MCP**, implement directly in the new SPECS Lens project. Follow Devpost Learn's `plan-lens` process and keep its `devpost/` planning documents in the public repo.

Start with a **deterministic, curated demonstration dataset** of a few authentic legal authorities that have been verified against QanunOS and, where possible, the primary official publication. Record provenance and verification date; do not silently scrape or treat the model's memory as a legal source. Also create an intentionally invalid **fictional** citation fixture for the rejection demo. If an authentic expired-law example is unavailable, demonstrate 'unverified' instead of falsely claiming a law is expired.

Preferred architecture:
- `Lens Studio SPECS Lens` (entire AR experience; TypeScript/UI/spatial interactions)
- `Read-only Vision Adapter` (optional, separate Node service if a secure API boundary is necessary)
- `Verified QanunOS legal-authority source` OR clearly labeled static demo fixtures
- `Case Context Model` for the *fictional* case
- `Citation Validator` which only accepts traceable source IDs, never unsupported model output

Use actual QanunOS endpoints **only after discovering they exist and confirming they can be called safely**. If none exist, propose an adapter contract and use safe local fixtures first. Do not invent backend paths or imply they are already implemented. Make the demo runnable without a production QanunOS account.

Recommended priority order:
P0: Lens Studio connectivity -> spatial UI -> interactive source-reveal -> verified vs unverified citation -> observed SPECS preview.
P1: source-safe QanunOS data integration -> one context-aware mock judge question -> Arabic/English layout if supported.
P2: speech input (when genuinely working and consented) -> glanceable office briefing.
P3 (post-hackathon): live professional integrations, real courtroom deployment, broad case management, real-time legal research across all laws.

Do not build user signup, full office CRM, payments, mobile app, multiplayer, generalized RAG platform or an entirely new legal database.

## Phase 3 — Evidence and adversarial tests
Create reproducible test cases and `docs/EVIDENCE_REPORT.md`. Test:
- Correct authority displayed for prepared facts, with exact traceable source.
- Fabricated or missing citation **rejected**.
- Unverified effective-date/validity status **clearly labeled** (never guessed).
- Ambiguous legal question -> abstain or present multiple candidates, not unjustified certainty.
- No cross-client data leakage, no credentials in project, logs, screenshots or repository.
- Arabic RTL/glyph display or a documented honest fallback when the toolchain cannot support it.
- Repeated end-to-end preview runs, navigation, dismiss controls, stability and any observed frame-rate or latency metrics.
- The actual CLAD-created Lens Studio preview must be visually inspected. If tools cannot screenshot it, provide a manual verification checklist and say what has not been verified; never fabricate screenshots or results.

Record data sources, test inputs, observed results, timestamps and environment. Never invent benchmarks or expected score as fact.

**Gate 2:** A complete 90-second uninterrupted preview interaction works, including the risky-citation handling. If it doesn't, reduce scope until it does.

## Phase 4 — Demo, submission, and skeptical judging
Produce:
- `devpost/` official skill-pack outputs
- Lens Studio SPECS project and source in the new Git repo
- `README.md` with installation, CLAD/MCP reproduction, commands, demo mode, architecture and verified limitations
- `docs/DEMO_SCRIPT.md`: narrated **<3 minute** YouTube video plan; **first 10 seconds show the benefit**; record the actual working Lens Studio preview
- `docs/DEVPOST_DESCRIPTION.md`: concise problem, intended user, AR-native innovation, how tools were used, exactly what is live vs demo, pre-existing QanunOS disclosure and limitations
- `docs/SECURITY_AND_PRIVACY.md` and redaction checklist
- `docs/SUBMISSION_CHECKLIST.md`: public repo, demo URL placeholder, Lens files, skill planning docs, third-party assets rights, English text/subtitles (if needed), submission fields, deadline
- `docs/JUDGE_SIMULATION.md`: four equally weighted criteria, evidence-based critiques, top five improvements, and honest Go/No-Go outcome

The demo sequence should be:
0–10 sec: lawyer in mock hearing; a hard question appears; show immediate utility.
10–45 sec: spatial card displays a verified provision/source.
45–85 sec: an incorrect/unsupported authority is flagged and dismissed; show traceable source.
85–115 sec: reviewer sees natural interaction and visual clarity in actual SPECS preview.
115–145 sec: show the toolchain, integration boundary, source provenance and why AR is essential.
145–165 sec: close with succinct impact, caveats and project name.
Adjust timing based on real captured footage. Do not stage nonexistent functionality.

## Operating instructions
- Work through phases and **actually implement/test**, not just write a speculative PRD.
- Keep progress in `docs/STATUS.md` with completed items, blockers, evidence and next action.
- Do not ask me questions already answered here. Use sensible reversible choices; ask only where you require secrets, real-world permissions, or a destructive/prod modification.
- Prefer tools and APIs that are officially documented and available. Research before guessing capability or command syntax.
- Never claim to have used CLAD, MCP, a QanunOS API or preview unless actual evidence exists.
- If secure real QanunOS integration cannot be completed in time, preserve a truthful, polished **fully working** local demo with explicit labeling and document how to connect it later.
- Preserve the core demo at all times; every additional feature must justify its contribution to innovation, design, technical correctness, or presentation.

## First response required from you, Codex
1. Show the observed directory contents/status of both existing projects (do not expose secrets).
2. Summarize the real contest requirements, integration opportunities and blockers.
3. Report Lens Studio + MCP + CLAD readiness with evidence.
4. Show the exact new project layout and a short execution plan.
5. Proceed into implementation once Gate 0 passes. Do not silently stop at planning.

**Win condition:** A truthful, source-verified, visually memorable, **actually running** AR Lens judged on a 150-second demonstration of a legal mistake prevented—not an impressive stack diagram or a promise of future features.
