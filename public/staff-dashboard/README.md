# Staff Dashboard - Modular Structure

## Overview

This is a split version of your dashboard. Each "tab" is now a separate HTML page with the **same tabbed header** as the original. Clicking tabs navigates between pages.

Much easier to work on one section at a time - each page is ~400 lines instead of 2,400.

## File Structure

```
public/staff/
├── index.html          ← Redirects to invoices.html
├── invoices.html       ← Invoice receiving/posting (COMPLETE) ✓
├── cores-warranty.html ← Core & warranty tracking (TODO)
├── emails.html         ← Email triage (TODO)
├── statements.html     ← Statement reconciliation (TODO)
├── bookkeeper.html     ← Bookkeeper items & requests (TODO)
├── chat.html           ← Protractor AI chat (TODO)
├── search.html         ← Invoice/part search (TODO)
├── settings.html       ← Expense categories (TODO)
└── js/
    ├── config.js       ← Supabase URL & keys (ONE PLACE)
    └── utils.js        ← Shared helper functions
```

## How It Works

Each page is ~300-500 lines instead of 2,400+. Each page:
1. Loads the shared `config.js` for Supabase credentials
2. Has its own state, fetch functions, actions, and render logic
3. Links back to the main dashboard

## Benefits

1. **Easier to modify** - "Fix the invoices page" = send Claude ~400 lines, not 2,400
2. **Independent deploys** - Change one page without risking others
3. **Faster loading** - Each page only loads what it needs
4. **Clear organization** - One file = one purpose

## Updating

Same workflow as before:
```bash
# Edit a file locally
code public/staff/invoices.html

# Push to deploy
git add .
git commit -m "Fixed invoice filtering"
git push
```

## Adding New Pages

1. Copy an existing page as a template (invoices.html is a good one)
2. Update the state, fetch, actions, and render functions
3. Add a card link in index.html

## Shared Config

All Supabase credentials are in `js/config.js`:
```javascript
const SUPABASE_URL = 'https://...';
const SUPABASE_ANON_KEY = '...';
const PROTRACTOR_WEBHOOK = 'https://...';
```

Change them once, all pages use the updated values.

## Status

- [x] invoices.html - Complete with full tab navigation
- [x] js/config.js - Shared Supabase config
- [x] js/utils.js - Shared helpers
- [ ] cores-warranty.html - Ask Claude to build this next
- [ ] emails.html
- [ ] statements.html
- [ ] bookkeeper.html
- [ ] chat.html
- [ ] search.html
- [ ] settings.html

## Next Steps

1. Copy this folder to your project: `public/staff/`
2. Push to GitHub - auto-deploys to Cloudflare
3. Access at `sylvanlakeautopro.com/staff/`
4. Set up Cloudflare Access to protect `/staff/*`
5. Ask Claude to build the remaining pages one at a time
