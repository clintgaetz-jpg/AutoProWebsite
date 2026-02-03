# Sylvan Lake AUTOPRO Website

## Project Context
Auto repair shop website built with Astro + Tailwind CSS. Mobile-first design that should feel like a native app.

## Key Files to Know
- `STYLE_GUIDE.md` - Complete design system documentation (READ THIS FIRST for any UI work)
- `src/pages/services/oil-change.astro` - Template for all service pages
- `src/assets/styles/tailwind.css` - Global styles, CSS variables, app-like features
- `src/navigation.ts` - All navigation links and service menu structure

## Design Principles
1. **Mobile-first** - Start with mobile styles, scale up with `md:` and `lg:` breakpoints
2. **App-like feel** - Touch feedback, smooth transitions, safe areas for notched phones
3. **Respect user preferences** - Dark mode, reduced motion, font size, high contrast
4. **No over-engineering** - Keep it simple, don't add unnecessary features

## Brand Colors
- Primary (NAPA Blue): `#0A0094`
- Secondary: `#001FCC`
- Accent (NAPA Gold): `#FFC836`
- Dark background: `#0F172A`

## Common Patterns
```
Section spacing: py-12 md:py-16 lg:py-20
Container padding: px-4 md:px-6
Grid: grid-cols-1 md:grid-cols-2
Typography: text-2xl md:text-3xl lg:text-4xl
Buttons: min-h-[48px] w-full sm:w-auto
```

## Service Pages Structure
See `STYLE_GUIDE.md` → "Service Page Template" for complete code snippets.

1. **Hero2** - Service image, tagline, title, subtitle, CTAs
2. **Introduction** - Centered text, emotional hook, 2-3 paragraphs
3. **Product Showcase** - Two-column cards with 4:3 images, bullet points
4. **Feature Section** - Background image + dark overlay (80%) + content
5. **Additional Content** - Single column, max-w-4xl, subsections
6. **FAQs** - 4-6 questions with schema markup
7. **Final CTA** - Strong closing, primary + secondary buttons

### Feature Section Pattern (background image + overlay)
```astro
<section class="relative py-12 md:py-16 lg:py-20 overflow-hidden">
  <div class="absolute inset-0 bg-cover bg-center" style={`background-image: url(${bgImage.src});`}></div>
  <div class="absolute inset-0 bg-gray-800/[0.80] dark:bg-slate-900/[0.85]"></div>
  <div class="relative z-10"><!-- Content --></div>
</section>
```
Text on overlay: `text-[#FFC836]` (tagline), `text-white` (headings), `text-gray-200` (body)

## Image Requirements
- Hero: 1200px wide, 200KB max, `loading="eager"`
- Cards: 800px wide, 4:3 ratio, 150KB max, `loading="lazy"`
- Backgrounds: 1920px wide, 200KB max
- Always optimize with Squoosh/TinyPNG before adding

## Don'ts
- Don't use alternating left-right layouts with white space
- Don't override user font size preferences
- Don't add features not explicitly requested
- Don't create new files unless necessary
- Don't use images over 300KB without optimizing first
