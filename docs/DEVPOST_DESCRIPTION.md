# QanunOS Vision — submission draft

> **Internal notes, not for pasting.** Draft only; nothing has been submitted. Rewritten 2026-11-08 for the four-way citation flow; the live QanunOS hearing card was added the same evening. Before pasting:
> - The video's one job: a wrong citation rejected, the exact match, source inspection, and return. The approved video is docs/evidence/QanunOSVision-demo-live-narrated.mp4 (96.9 s): it opens with the live hearing card (pair, approve on qanunos.com, case card with the next hearing) and then the citation flow, so the whole story below is shown. The write-up may also describe behavior that's verified but not shown (the other rejections, abstention, tests). Cut anything that's neither shown nor verified.
> - The story is written in your voice. Check that Inspiration matches why you built this.
> - Fill in the two personal sections (what I learned, links) in your own words.
> - Survey and eligibility fields are listed at the end. Only you can answer them.
>
> Everything between the two rules below is the project story to paste into Devpost.

---

## Inspiration

In a courtroom, a citation is only as good as its source. A lawyer who names the wrong article, or quotes a sentence from memory and gets a word wrong, loses credibility in front of the judge. AI research tools have made this worse, because they can produce citations that look right and aren't.

I build QanunOS, an Arabic-first Egyptian legal platform with a cited legal AI assistant and case and hearing management for law offices. My picture was a lawyer standing before the judge with their office in front of their eyes. I started with the moment *before* the hearing: rehearsal. Can a pair of glasses bring up today's case from QanunOS and check a citation while you keep your eyes up and stay in the argument?

## What it does

QanunOS Vision is a SPECS Lens for rehearsing oral argument in a fictional Egyptian hearing. It's for litigators and law students who practise in Arabic and want to catch a bad citation before a judge does.

1. A card sits in the room beside the rehearsal position. Pinch **QanunOS hearing** to link the glasses to your QanunOS office: the card shows a short code, you approve it on qanunos.com/vision, and the card turns into your next hearing, live from QanunOS: case title, court and stage, next hearing date, client and opponent, subject and open tasks. It's read-only, and contact details, ID numbers, notes, fees, documents and witnesses are never sent to the glasses.
2. Pinch **Rehearse a citation** (or **Mock judge question** to skip the office) to get a prepared question: *"Which constitutional provision states the general right to litigate?"*
3. Choose one of four citations:
   - **Art. 98, full quote:** the right words credited to the wrong article.
   - **Art. 97, short quote:** the right article with the quote cut short.
   - **Art. 404, FICTIONAL:** an authority that doesn't exist.
   - **Art. 97, full quote:** the exact citation.
4. A wrong choice shows **Unverified — do not cite** and says why: *"This excerpt is reviewed Article 97, not Article 98"*, *"Quoted text differs from the reviewed Article 97 excerpt"*, or *"No reviewed source has this authority ID or text"*. **Try another citation** goes back to the four choices.
5. The exact citation shows **Exact reviewed match**, with the Arabic text and the attempt it took.
6. **Inspect source card** shows where the text comes from: Egypt's Constitution (April 2019 publication, Presidency of Egypt), Article 97, PDF page 45 (printed page 39), and the date the excerpt was checked. Effective date and legal currency stay labelled **Unknown — not reviewed**, because checking that a quote is accurate is not the same as confirming the law is current.
7. **Return to rehearsal** puts the card back to its starting state.

If the reviewed source record is missing, the Lens abstains: **No reviewed authority available**, and it confirms nothing, not even the correct citation.

The excerpt is the first sentence of Article 97, *التقاضى حق مصون ومكفول للكافة.* (unofficial English gloss: the right to litigate is protected and guaranteed to everyone). It was checked word for word against the original PDF published by Egypt's Presidency.

## How I built it

- **Planning:** the official Devpost Learn plan-lens skill interviewed me and produced the design brief in the `devpost/` folder, which I approved before building.
- **Building:** AI coding agents built the Lens in Lens Studio 5.23.2 through the CLAD plugin and the Lens Studio MCP. Codex built the first version (scene, card and rehearsal logic). Claude Code then added the four-way citation choice and the live hearing card; both were compiled and tested in Lens Studio through the MCP.
- **Live link to QanunOS:** I added a small read-only API to QanunOS for this. The Lens pairs with a device code (the same pattern as signing a TV into a streaming account), gets a 12-hour read-only token, and calls it over HTTPS with Lens Studio's InternetModule. The token stays in memory and is never logged.
- **Interface:** Spectacles UI Kit for the card and buttons, and Spectacles Interaction Kit for pinch input, so it works in the Interactive Preview.
- **The check is real code, not an animation.** Two of the wrong citations, the Art. 98 misattribution and the shortened Art. 97 quote, are derived from the reviewed source record. Art. 404 is a separate, clearly fictional test citation. The validator compares whichever citation you choose field by field against that record (authority ID, article, exact text, title, source link, review date and scope), and writes the rejection reason from whichever fields differ. It also checks the record itself: if the page number in the record doesn't match the page in the source link, or any field is missing, it refuses to confirm anything.
- **Tests:** six LEAF scenarios run in the Lens Studio preview:
  - 60 validator and state checks.
  - The full four-choice flow (23 UI checks).
  - The missing-source path.
  - A continuous run of more than 90 seconds.
  - A simulated hand-reach check.
  - Pairing and the hearing card against fake QanunOS replies (29 checks: approval, slow-down, expired code, revoked token, server error, empty account, no network, cancel).

## Challenges

- **Sign-in:** Lens Studio 5.24 wouldn't complete the SPECS sign-in. I moved to 5.23.2, as the organizers recommended, and did all the work locally in the preview.
- **Buttons disappeared:** the default UI Kit buttons are near-black, and on an additive display black reads as transparent, so the choices looked like floating text. Switching every button to UI Kit's brighter Primary style fixed it. Every choice uses the same style, so the look doesn't give away the answer.
- **Simulated pinch:** LEAF's simulated hand landed its pinch just off the button's bottom edge, onto the card behind it. A Spectacles Interaction Kit pinch on the same button in Lens Studio's Interactive Preview works. That test now checks that the simulated hand reaches the button.
- **First live call failed:** pairing worked, but the case list came back as a server error. The production database stores hearing dates as text, and the date-formatting function only accepts real dates. QanunOS's own tests used a fake database, so they never caught it. I reproduced it in a throwaway Postgres, fixed the query and redeployed.
- **Arabic:** the right-to-left Arabic excerpt was checked to render with joined letters on the card in the preview. The card keeps the source's spelling (ى, not ي) instead of normalizing it.

## Accomplishments I'm proud of

- A wrong citation fails in front of you, with a specific reason, not a generic "error".
- The Lens is honest about what it knows. It separates "this quote is accurate" from "this law is current", and it abstains instead of guessing.

## What I learned

*[Write this yourself. Possible prompts, drawn from the build log: what designing for an additive display taught you about contrast; how the plan-lens interview changed the idea; what it was like to direct an AI agent through CLAD; what the preview can and can't tell you without real glasses.]*

## What's next

- Pull reviewed articles live from QanunOS too. A test call from the Lens preview to QanunOS's public law API worked, but the citation check still uses its local reviewed record.
- Show today's whole agenda, not just the next hearing, and let the lawyer pick the case.
- More questions and articles, each checked against an official source.
- Testing on real Spectacles for comfort, legibility and hand tracking.

## What's real and what's simulated

- **Mock input:** the judge question comes from a button. There's no speech recognition or courtroom audio.
- **Fictional practice data:** the case facts are fictional. The three wrong citations are labelled practice examples, not law.
- **Live hearing card, made-up office:** the hearing card is real data from production qanunos.com, read live, but the account it reads holds only made-up cases and people.
- **Local source record:** the Article 97 excerpt is a small local record; the citation check doesn't call QanunOS.
- **Pre-existing work:** QanunOS is my existing platform. The read-only Lens API on the QanunOS side was added during the hackathon. No QanunOS code, data or credentials are stored in this Lens.
- **Preview only:** everything shown runs in the Lens Studio preview. It hasn't been tested on physical glasses.
- **Not legal advice:** this is a rehearsal tool. It doesn't establish what the current law is.

**Links:** public repository https://github.com/codersguru-hub/qanunos-vision · demo video *[YouTube URL]*

---

## Form field 29092: how the project meets the technology requirement

> Draft, for the "Explain how your project meets the main technology requirement" field.

QanunOS Vision is a new SPECS Lens, created during the submission period, that runs in the Lens Studio preview (5.23.2). I planned it with the Devpost Learn plan-lens skill; the design brief it produced is in the repository's `devpost/` folder. AI coding agents built it in Lens Studio through the CLAD plugin and the Lens Studio MCP: Codex built the first version, and Claude Code added the citation-choice flow and the live QanunOS hearing card, which were compiled and tested through the MCP. It uses Spectacles UI Kit, Spectacles Interaction Kit and InternetModule, and six LEAF scenarios verify it in the preview.

## Fields only you can answer

- Eligibility: submitter type, country of residence, the age, jurisdiction and not-an-employee checkboxes.
- Survey questions 29093 to 29101 (prior Lens Studio use, whether CLAD built the brief, most time-consuming step, AI cost, where you got stuck, one fix for Snap, likelihood of using Specs again, skills gained, change in what makes a good AR app).
- Optional: a link to a social post about the project.
