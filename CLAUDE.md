# CLAUDE.md — Sylvan Lake Autopro Website

> **This is a live business website. Don't break what's working. Test locally before deploying.**

## Project Context
Auto repair shop website built with Astro + Tailwind CSS. Mobile-first design that should feel like a native app. Replaces a paid agency setup — keep it maintainable without a developer.

**Sylvan Lake Autopro** is a NAPA affiliate. Never call it "NAPA AutoCare Centre."

## Stack

| Item | Value |
|------|-------|
| Framework | Astro |
| Styling | Tailwind CSS |
| Hosting | Cloudflare Pages (`autoprowebsite.pages.dev`) |
| Forms | N8N webhook (server-side, never exposed in client JS) |
| CAPTCHA | Cloudflare Turnstile (invisible) |

## Commands

```bash
npm run dev        # Local dev server
npm run build      # Production build — run before every deploy
npm run preview    # Preview production build locally
```

## Deploy

```powershell
npm run build
npx wrangler pages deploy dist --project-name=autoprowebsite
```

If auth error: `npx wrangler logout && npx wrangler login`, then retry.

---

## Key Files

- `STYLE_GUIDE.md` — Complete design system documentation (READ THIS FIRST for any UI work)
- `src/pages/services/oil-change.astro` — Template for all service pages
- `src/assets/styles/tailwind.css` — Global styles, CSS variables, app-like features
- `src/navigation.ts` — All navigation links and service menu structure

---

## Design Principles

1. **Mobile-first** — Start with mobile styles, scale up with `md:` and `lg:` breakpoints
2. **App-like feel** — Touch feedback, smooth transitions, safe areas for notched phones
3. **Respect user preferences** — Dark mode, reduced motion, font size, high contrast
4. **No over-engineering** — Keep it simple, don't add unnecessary features
5. **Zero JS by default** — Astro's strength is static HTML. Only add `client:load` or `client:visible` when genuinely needed (forms, interactive elements)
6. **Sub-2-second load on mobile** — No bloat, optimize everything

## Brand Colors

- Primary (NAPA Blue): `#0A0094`
- Secondary: `#001FCC`
- Accent (NAPA Gold): `#FFC836`
- Dark background: `#0F172A`

Use `tailwind.config` values — don't hardcode hex in components. If a color isn't in the config, add it there.

## Common Patterns

```
Section spacing: py-12 md:py-16 lg:py-20
Container padding: px-4 md:px-6
Grid: grid-cols-1 md:grid-cols-2
Typography: text-2xl md:text-3xl lg:text-4xl
Buttons: min-h-[48px] w-full sm:w-auto
```

---

## Service Pages Structure

See `STYLE_GUIDE.md` → "Service Page Template" for complete code snippets.

1. **Hero2** — Service image, tagline, title, subtitle, CTAs
2. **Introduction** — Centered text, emotional hook, 2-3 paragraphs
3. **Product Showcase** — Two-column cards with 4:3 images, bullet points
4. **Feature Section** — Background image + dark overlay (80%) + content
5. **Additional Content** — Single column, max-w-4xl, subsections
6. **FAQs** — 4-6 questions with schema markup
7. **Final CTA** — Strong closing, primary + secondary buttons

### Feature Section Pattern (background image + overlay)

```astro
<section class="relative py-12 md:py-16 lg:py-20 overflow-hidden">
  <div class="absolute inset-0 bg-cover bg-center" style={`background-image: url(${bgImage.src});`}></div>
  <div class="absolute inset-0 bg-gray-800/[0.80] dark:bg-slate-900/[0.85]"></div>
  <div class="relative z-10"><!-- Content --></div>
</section>
```

Text on overlay: `text-[#FFC836]` (tagline), `text-white` (headings), `text-gray-200` (body)

---

## Image Requirements

| Context | Width | Max Size | Loading | Ratio |
|---------|-------|----------|---------|-------|
| Hero | 1200px | 200KB | `eager` | — |
| Cards | 800px | 150KB | `lazy` | 4:3 |
| Backgrounds | 1920px | 200KB | — | — |

- Use Astro's `<Image>` component — not raw `<img>` tags
- Optimize with Squoosh/TinyPNG before committing
- WebP preferred
- All images need `alt` text — actual descriptions, not "image1.jpg"

---

## Forms

Forms post to N8N webhooks. Webhook URL goes in an Astro API route or environment variable — **never in client-side code**.

```typescript
// src/pages/api/contact.ts (server-side)
export const POST = async ({ request }) => {
  const data = await request.formData()
  await fetch(import.meta.env.N8N_CONTACT_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(data))
  })
  return new Response(JSON.stringify({ success: true }))
}
```

Cloudflare Turnstile on every public form. Verify server-side, not just client-side.

---

## SEO / Local Business

- Every page needs: `<title>`, `<meta name="description">`, Open Graph tags
- Homepage: JSON-LD `LocalBusiness` schema with correct NAP (name, address, phone)
- Service pages: JSON-LD `Service` schema
- FAQ sections: JSON-LD `FAQPage` schema (pairs with section 6 of service pages)
- Canonical URLs on every page
- Sitemap via `@astrojs/sitemap`
- Contact info (hours, phone, address) must match Google Business Profile exactly

---

## Astro Conventions

- Pages in `src/pages/` — file-based routing
- Layouts in `src/layouts/` — reuse the base layout, don't create one-off layouts
- Components in `src/components/` — small, single-purpose
- Static assets in `public/`
- Content in `src/content/` if using content collections

---

## Git Discipline

- Commit after each logical unit (new page, component, config change)
- Messages: `[area] what changed` (e.g., `[services] add brake service page`)
- Run `npm run build` before pushing — never commit broken builds
- Don't commit `node_modules`, `dist`, or `.env` files

---

## What You Never Do

- Add client-side JavaScript without justification — Astro is static-first
- Use alternating left-right layouts with white space
- Override user font size preferences
- Add features not explicitly requested
- Create new files unless necessary
- Use images over 300KB without optimizing
- Use `<img>` instead of Astro's `<Image>` component
- Expose webhook URLs in client-side code
- Hardcode contact info in multiple places — centralize in one data file
- Break mobile layout — test at 375px width minimum
- Introduce dependencies without checking if Astro/Tailwind already handles it
- Guess at business info (hours, phone, address, services) — ask or verify
- Commit without building first
