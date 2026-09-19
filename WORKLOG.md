# WORKLOG — autopro-web

Newest first. One entry per working session: what ran, what landed, what is open, with ids.

---

## 2026-09-19 — site review + content fixes (Ops area `autopro_web`)

**Ran.** Full site review, two adversarial sweeps (copy accuracy; SEO/technical) over all 49
pages audited against built HTML, plus a mail sweep for the reported Google Search Console 404s
and a payroll-roster check for the staff page.

**Landed** — six commits, `bf07596..cfbbe94`, all pushed to `main` (each push is a production
deploy; verified live):

| commit | what |
|---|---|
| `6b0261a` | Delete `public/staff-dashboard/` (14 files). "Chicken family" → "locally owned and operated — same owners since 2006". 19→20 years ×14. Stop rendering `[Bio coming soon]`. |
| `7baac35` | `about` "Nineteen years"→"Twenty years"; `llms.txt` OOP price + year drift; CA spelling (honoured/labour/centred); `tire-pricing` missing `<h1>`; `making-it-easy` h3→h2; E.164 tel link; `breakdown` JSON-LD name. Remove stray `tailwind.css.backup`. |
| `6f2e872` | Team: remove Josh Lane, Nathan Marthaller, Niah Bayliss; add Edward Bourke, Mya Cattleman. |
| `186f970` | Mya Cattleman role → Scheduling & Reservations. |
| `3bfb67e` | Add Hannah (apprentice technician). |
| `cfbbe94` | Hanna → **Hannah Kemp**, confirmed against `payroll_staff.legal_name`. |

**Rulings (Clint, verbatim).**
- Staff dashboard: *"delete it, not used"* — removed from the public site rather than gated.
- On the anon-key / RLS exposure behind it: *"i reallly dont fucing care"* — thread dropped, not
  actioned. Not a security decision I re-raise unasked.
- Team page: *"josh lane gone, naathan gone, edward bourke, licensedtechnician, niah gone, add
  mya"*, then *"josh linton is an apprentice. mya is reservations etc."*, then *"Hanna Kemp,
  check the db ffs"*.
- On the NAPA claims: *"not 19k autopros, check the main website, check the warranty on napa
  autolrpo, verify all cliamees. the rest, sure"* — verify against NAPA's own sources rather
  than filing it as a todo.

**Findings that were NOT what was reported.** The Google Search Console 404 email was for
**gvventures.ca**, not this site. `sc-noreply@google.com` has 18 emails all-time, 100% readable;
sylvanlakeautopro.com has **zero** indexing alerts ever, only monthly performance digests. Caveat:
the Autopro GSC property reports to `clintgaetz@gmail.com` while other properties alert
`cgaetz@sylvanlakeautopro.com`, so an alert to a third owner address outside the mail corpus
cannot be ruled out from mail alone.

**Clean, verified not assumed.** 0 broken internal links; all 256 `_redirects` targets resolve;
sitemap matches emitted pages; all 110 JSON-LD blocks parse; 49/49 titles and descriptions
unique; NAP byte-identical across 36 of 37 AutoRepair nodes; zero "NAPA AutoCare Centre"
anywhere; all 121 images have real alt + dimensions.

**Open.**
1. `https://sylvanlakeautopro.com/staff-dashboard/` and `.../js/config.js` still return **200 from
   Cloudflare's edge cache** after a Purge Everything. Origin is clean (both 404 with a
   cache-buster; every other path 404s). Both carry `s-maxage=604800` — not a Pages default, so
   suspect a custom Cache Rule on the zone. Needs Custom Purge by exact URL.
2. NAPA claim verification in flight at close: location counts, Peace of Mind warranty scope
   (pages contradict — "across Canada" vs "North America"), J.D. Power, Consumer Choice, Red
   Seal, AMVIC-vs-Vehicle-Inspection-Program.
3. **This repo's `CLAUDE.md` State Tracking section is stale** — it directs sessions to update
   `dev_sessions` work areas `content`/`seo`/`blog`, all three archived in the 2026-09-07 fold.
4. Full findings list: `…\Viktor\autopro-web-review.md`.

**Root cause worth naming.** Every serious error found — the Chicken family line, "19 years",
AMVIC, the Benalto directions, warranty scope, the 19,000 locations — is one fact copy-pasted
into 5–12 files with no single source. Contact info alone is hardcoded across ~45 files, which
the repo's own CLAUDE.md forbids.
