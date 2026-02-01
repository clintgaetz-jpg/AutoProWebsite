# Sylvan Lake AUTOPRO - Website Style Guide

**Last Updated:** January 2026
**Purpose:** Document design standards, components, and mobile-first patterns for consistent development.

---

## Table of Contents

1. [Brand Colors](#brand-colors)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Reference](#component-reference)
5. [Service Page Template](#service-page-template)
6. [Mobile-First Patterns](#mobile-first-patterns)
7. [Accessibility](#accessibility)
8. [Research Summary](#research-summary)

---

## Brand Colors

### Primary Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **NAPA Blue (Primary)** | `#0A0094` | `--aw-color-primary` | Headers, CTAs, brand elements |
| **NAPA Blue Light** | `#001FCC` | `--aw-color-secondary` | Hover states, accents |
| **NAPA Gold (Accent)** | `#FFC836` | `--aw-color-accent` | Highlights, trust signals, accent buttons |

### Background Colors

| Mode | Page Background | Card Background |
|------|-----------------|-----------------|
| **Light** | `#ffffff` | `#ffffff` / `bg-gray-50` |
| **Dark** | `#030621` | `slate-900` / `slate-800` |

### Text Colors

| Mode | Default | Muted | On Dark BG |
|------|---------|-------|------------|
| **Light** | `#1a1a1a` | `#4b5563` | `white` |
| **Dark** | `#e5e7eb` | `#9ca3af` | `white` |

---

## Typography

### Font Families

```css
--aw-font-sans: 'Barlow', sans-serif;      /* Body text */
--aw-font-heading: 'Barlow Condensed', sans-serif;  /* Headlines */
```

### Type Scale (Mobile-First)

| Element | Mobile | Tablet (md:) | Desktop (lg:) | Tailwind Classes |
|---------|--------|--------------|---------------|------------------|
| **H1 (Hero)** | 30px | 48px | 60px | `text-3xl md:text-5xl lg:text-6xl` |
| **H2 (Section)** | 24px | 30px | 36px | `text-2xl md:text-3xl lg:text-4xl` |
| **H3 (Card)** | 20px | 24px | 24px | `text-xl md:text-2xl` |
| **H3 (Subsection)** | 18px | 20px | 20px | `text-lg md:text-xl` |
| **Body** | 16px | 18px | 18px | `text-base md:text-lg` |
| **Small** | 14px | 16px | 16px | `text-sm md:text-base` |

### Font Sizing Philosophy

- **No fixed overrides** - respects user's system font size preferences
- All sizing uses `rem` units via Tailwind (scales with user settings)
- Removed forced `110%` mobile override to respect accessibility

---

## Spacing System

### Section Padding (Vertical)

```
Mobile:  py-12  (48px)
Tablet:  py-16  (64px)
Desktop: py-20  (80px)

Tailwind: py-12 md:py-16 lg:py-20
```

### Container Padding (Horizontal)

```
Mobile:  px-4   (16px)
Tablet+: px-6   (24px)

Tailwind: px-4 md:px-6
```

### Component Spacing

| Element | Mobile | Tablet+ | Tailwind |
|---------|--------|---------|----------|
| Section header margin | 32px | 48px | `mb-8 md:mb-12` |
| Card padding | 16px | 24px / 32px | `p-4 md:p-6 lg:p-8` |
| Grid gaps | 16px | 24px / 32px | `gap-4 md:gap-6 lg:gap-8` |
| Content spacing | 24px | 32px | `space-y-6 md:space-y-8` |
| Button gaps | 12px | 16px | `gap-3 md:gap-4` |
| Margin bottom (small) | 8px | 12px | `mb-2 md:mb-3` |
| Margin bottom (medium) | 16px | 24px | `mb-4 md:mb-6` |

---

## Component Reference

### Components Modified

#### 1. `CallToAction.astro`
**Location:** `src/components/widgets/CallToAction.astro`

**Changes:**
- Background: Brand blue `bg-[#0A0094]` (works in both light/dark)
- Title: White text `text-white`
- Subtitle: Light gray `text-gray-200`
- **Primary buttons:** NAPA Gold `bg-[#FFC836]` with blue text (high contrast on blue bg)
- **Secondary buttons:** White border/text on blue background
- Mobile-first spacing and typography
- Removed `isDark` default (was causing dark wrapper in light mode)
- Touch-friendly buttons: `min-h-[48px]`

```astro
<!-- Button styling on blue CTA background -->
class={`... ${
  action.variant === 'primary'
    ? 'bg-[#FFC836] border-[#FFC836] text-[#0A0094] hover:bg-[#e6b430] hover:border-[#e6b430]'
    : action.variant === 'secondary'
      ? 'border-white text-white hover:bg-white hover:text-[#0A0094]'
      : ''
}`}
```

#### 2. `Hero.astro`
**Location:** `src/components/widgets/Hero.astro`

**Changes:**
- Reduced min-height: `min-h-[75vh]` (was 85vh)
- Reduced top padding: `pt-6 pb-12 md:pt-10 md:pb-20`

#### 3. `Header.astro`
**Location:** `src/components/widgets/Header.astro`

**Changes:**
- Added `target` attribute support for action buttons
- Added `rel="noopener noreferrer"` for security on external links
- Both desktop and mobile nav buttons respect `target="_blank"`

#### 4. `tailwind.css`
**Location:** `src/assets/styles/tailwind.css`

**Changes:**
- Removed forced `font-size: 110%` on mobile (respects user preferences)
- Kept all accessibility media queries:
  - `prefers-color-scheme: dark`
  - `prefers-reduced-motion: reduce`
  - `prefers-contrast: more`

---

## Service Page Template

**Canonical Example:** `src/pages/services/oil-change.astro`

### Structure Overview

```
1. HERO (Hero2 component)
2. INTRODUCTION (centered text)
3. PRODUCT SHOWCASE (2-column cards with images)
4. FEATURE SECTION (background image + overlay + content)
5. ADDITIONAL CONTENT (single column, max-w-4xl)
6. FAQs (with schema markup)
7. FINAL CTA
```

---

### 1. Hero Section (Hero2)

```astro
import Hero2 from '~/components/widgets/Hero2.astro';
import heroImage from '~/assets/images/service-hero.jpg';

<Hero2
  tagline="Service Category"
  title="Service Name"
  subtitle="Brief value proposition. One line."
  image={{
    src: heroImage,
    alt: 'Descriptive alt text',
  }}
  actions={[
    { variant: 'primary', text: 'Book Now', href: 'BOOKING_URL', target: '_blank' },
    { variant: 'secondary', text: 'Call (403) 887-0440', href: 'tel:+14038870440' },
  ]}
/>
```

---

### 2. Introduction Section

```astro
<section class="py-12 md:py-16 lg:py-20">
  <div class="max-w-4xl mx-auto px-4 md:px-6 text-center">
    <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-heading dark:text-white">
      Headline That Connects Emotionally
    </h2>
    <div class="text-base md:text-lg text-muted dark:text-slate-400 space-y-4 text-left md:text-center">
      <p>Opening hook - relate to customer's situation.</p>
      <p>Transition to solution.</p>
      <p>Why we do it differently with <strong class="text-gray-900 dark:text-white">highlighted products/services</strong>.</p>
    </div>
  </div>
</section>
```

---

### 3. Product Showcase (Two-Column Cards)

```astro
<section class="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-slate-800">
  <div class="max-w-7xl mx-auto px-4 md:px-6">
    <!-- Section Header -->
    <div class="text-center mb-8 md:mb-12">
      <p class="text-sm font-bold tracking-wide uppercase text-primary dark:text-blue-200 mb-2">Tagline</p>
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold font-heading dark:text-white">Section Title</h2>
      <p class="text-base md:text-lg text-muted dark:text-slate-400 mt-3 md:mt-4 max-w-2xl mx-auto">Supporting text.</p>
    </div>

    <!-- Two-Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      <!-- Card -->
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden">
        <div class="relative aspect-[4/3] bg-gray-100 dark:bg-slate-800">
          <Image
            src={productImage}
            alt="Product description"
            class="absolute inset-0 w-full h-full object-cover"
            widths={[400, 600, 800]}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div class="p-4 md:p-6 lg:p-8">
          <h3 class="text-xl md:text-2xl font-bold mb-2 md:mb-3 font-heading dark:text-white">Product Name</h3>
          <p class="text-sm md:text-base text-muted dark:text-slate-400 mb-4 md:mb-6">Description.</p>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <Icon name="tabler:check" class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span class="text-sm md:text-base dark:text-slate-300"><strong class="dark:text-white">Benefit</strong> details</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- Repeat for second card -->
    </div>
  </div>
</section>
```

---

### 4. Feature Section with Background Image + Overlay

Use for highlighting a key feature (e.g., inspections, warranties).

```astro
import featureBgImage from '~/assets/images/feature-bg.jpg';
import featureImage from '~/assets/images/feature-mockup.png';

<section class="relative py-12 md:py-16 lg:py-20 overflow-hidden">
  <!-- Background Image -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style={`background-image: url(${featureBgImage.src});`}
  ></div>
  <!-- Dark Overlay - 80% opacity for text contrast -->
  <div class="absolute inset-0 bg-gray-800/[0.80] dark:bg-slate-900/[0.85]"></div>

  <!-- Content -->
  <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <!-- Image (left on desktop) -->
      <div class="order-2 lg:order-1 flex justify-center items-center py-8">
        <div class="w-full max-w-3xl">
          <Image
            src={featureImage}
            alt="Feature description"
            class="w-full h-auto drop-shadow-2xl"
            widths={[400, 684]}
            sizes="(max-width: 768px) 400px, 684px"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Content (right on desktop) -->
      <div class="order-1 lg:order-2">
        <p class="text-sm font-bold tracking-wide uppercase text-[#FFC836] mb-2">Tagline</p>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-heading text-white">Section Title</h2>
        <div class="text-base md:text-lg text-gray-200 space-y-4">
          <p>Content paragraphs...</p>
          <p>More content with <strong class="text-white">highlights</strong>.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Text colors on dark overlay:**
- Tagline: `text-[#FFC836]` (NAPA Gold)
- Heading: `text-white`
- Body: `text-gray-200`
- Muted: `text-gray-300`
- Strong/bold: `text-white`

---

### 5. Additional Content Section

```astro
<section class="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-slate-800">
  <div class="max-w-4xl mx-auto px-4 md:px-6">
    <div class="text-center mb-8 md:mb-12">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold font-heading dark:text-white">Section Title</h2>
      <p class="text-base md:text-lg text-muted dark:text-slate-400 mt-3 md:mt-4">Subtitle</p>
    </div>

    <div class="space-y-6 md:space-y-8 text-base md:text-lg text-muted dark:text-slate-400">
      <div>
        <h3 class="text-lg md:text-xl font-bold mb-2 md:mb-3 dark:text-white">Subsection Title</h3>
        <p>Content with <strong class="text-gray-900 dark:text-white">highlights</strong>.</p>
      </div>
      <!-- Repeat for more subsections -->
    </div>
  </div>
</section>
```

---

### 6. FAQs Section

```astro
import FAQs from '~/components/widgets/FAQs.astro';

<FAQs
  title="Frequently Asked Questions"
  subtitle="Common questions about [service]"
  columns={1}
  items={[
    {
      title: 'Question text?',
      description: 'Answer text.',
    },
    // 4-6 questions total
  ]}
/>
```

**Don't forget schema markup in frontmatter:**
```astro
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer."
      }
    }
  ]
};

// In <Layout>:
<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
</Fragment>
```

---

### 7. Final CTA

```astro
<CallToAction
  title="Strong closing statement"
  subtitle="Supporting message."
  actions={[
    { variant: 'primary', text: 'Book Now', href: 'BOOKING_URL', target: '_blank' },
    { variant: 'secondary', text: 'Call (403) 887-0440', href: 'tel:+14038870440' },
  ]}
/>
```

---

### Image Requirements

| Placement | Aspect Ratio | Recommended Size | Max File Size | Loading |
|-----------|--------------|------------------|---------------|---------|
| Hero | Flexible | 1200px wide | 200KB | `eager` |
| Product Cards | 4:3 | 800px wide | 150KB | `lazy` |
| Background | 16:9 | 1920px wide | 200KB | N/A (CSS) |
| Mockups/PNG | Flexible | Match source | 200KB | `lazy` |

**Optimization:** Use [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) - target 80% quality JPG.

---

### Service Schema Markup

```astro
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service Name",
  "description": "Service description",
  "provider": {
    "@type": "AutoRepair",
    "name": "Sylvan Lake AUTOPRO",
    "telephone": "+1-403-887-0440",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1A Industrial Dr",
      "addressLocality": "Sylvan Lake",
      "addressRegion": "AB",
      "postalCode": "T4S 1P4",
      "addressCountry": "CA"
    }
  },
  "areaServed": ["Sylvan Lake", "Red Deer", "Lacombe", "Blackfalds", "Eckville", "Bentley"]
};
```

---

## Mobile-First Patterns

### Grid Layouts

```html
<!-- Always single column on mobile, expand at breakpoints -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
```

### Typography

```html
<!-- Start with mobile size, scale up -->
<h2 class="text-2xl md:text-3xl lg:text-4xl">
```

### Buttons

```html
<!-- Full width on mobile, auto on tablet+ -->
<div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <a class="w-full sm:w-auto min-h-[48px]">Primary</a>
  <a class="w-full sm:w-auto min-h-[48px]">Secondary</a>
</div>
```

### Touch Targets

- **Minimum size:** 48x48px (`min-h-[48px]`)
- **Recommended:** 52px for primary actions
- **Spacing between:** 12-16px minimum

### Images

```astro
<Image
  src={image}
  alt="Description"
  widths={[400, 600, 800]}
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"  <!-- or "eager" for above-fold -->
/>
```

---

## Accessibility

### System Preferences Respected

| Preference | CSS Media Query | What It Does |
|------------|-----------------|--------------|
| Dark Mode | `prefers-color-scheme: dark` | Switches to dark palette |
| Reduced Motion | `prefers-reduced-motion: reduce` | Disables animations |
| High Contrast | `prefers-contrast: more` | Increases text contrast |
| Font Size | N/A (no override) | Respects user's system setting |

### Viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
- Allows pinch-to-zoom (no `maximum-scale` restriction)

### Color Contrast

- All text meets WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- CTA buttons use white on brand blue (high contrast)

---

## Research Summary

### Mobile-First Design Principles

**Source:** Industry research from Net Solutions, Tekmetric, Prismic, UX Movement, Nielsen Norman Group, Learn UI Design, GOV.UK Design System

#### Key Findings

1. **Single Column First**
   - Start with stacked layouts, expand at breakpoints
   - Never require horizontal scrolling

2. **Touch Targets**
   - 48x48px minimum (Apple, Google, WCAG standards)
   - 12-16px spacing between interactive elements

3. **Typography**
   - 16-18px body text minimum for readability
   - Don't override system font size preferences
   - Use relative units (rem) throughout

4. **Hero Sections**
   - 75-90vh on mobile, 75vh on desktop
   - CTAs stacked vertically on mobile
   - Image can be below text on mobile

5. **Product Cards**
   - Image at top, content below
   - Consistent aspect ratios prevent layout shift
   - Lazy load below-fold images

6. **CTAs**
   - Full width on mobile
   - Click-to-call converts 10-15x better than forms
   - Place CTAs after value proposition, mid-page, and end

7. **Spacing**
   - Use 4px/8px grid system
   - Tighter padding on mobile, expand on desktop
   - Consistent vertical rhythm

#### Auto Repair Industry Specific

- Phone calls are primary conversion action
- Trust signals (years in business, reviews, warranties) prominent
- Service-specific pages rank better than generic "services" page
- Local SEO critical (address, service area in content)

---

## Files Reference

### Core Style Files
- `src/assets/styles/tailwind.css` - Base styles, CSS variables
- `tailwind.config.cjs` - Tailwind configuration

### Key Components
- `src/components/widgets/Hero.astro` - Homepage hero
- `src/components/widgets/Hero2.astro` - Service page hero (with image)
- `src/components/widgets/CallToAction.astro` - CTA sections
- `src/components/widgets/Features2.astro` - Feature grids
- `src/components/widgets/FAQs.astro` - FAQ sections
- `src/components/ui/Button.astro` - Button component
- `src/components/common/ToggleTheme.astro` - Dark/light toggle

### Template Reference
- `src/pages/services/oil-change.astro` - Standard service page template

---

## App-Like Experience

### Features Implemented

The site includes several features that make it feel more like a native mobile app:

#### View Transitions
- **Enabled in:** `src/layouts/Layout.astro`
- Smooth page transitions using Astro's `<ClientRouter>` component
- Falls back gracefully on older browsers

#### Safe Area Support
- **Viewport:** `viewport-fit=cover` enables safe area insets
- **Body padding:** `env(safe-area-inset-left/right)` for notched phones
- **Header:** Respects `env(safe-area-inset-top)` for status bar
- **Fixed bottom elements:** Account for home indicator on iPhone X+

#### Touch Feedback
```css
/* Buttons and links scale down slightly on tap */
.btn:active { transform: scale(0.97); opacity: 0.9; }

/* Cards get subtle press feedback */
[class*="rounded-xl"][class*="shadow"]:active { transform: scale(0.98); }
```

#### iOS/Android Meta Tags
```html
<!-- iOS -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="SL AUTOPRO" />

<!-- Android -->
<meta name="mobile-web-app-capable" content="yes" />
```

#### Scroll Behavior
- Smooth momentum scrolling on iOS (`-webkit-overflow-scrolling: touch`)
- Smooth anchor scrolling (respects `prefers-reduced-motion`)
- Pull-to-refresh contained (`overscroll-behavior-y: contain`)

#### Touch Optimizations
- Tap highlight disabled (custom feedback instead)
- Double-tap zoom prevented on buttons (`touch-action: manipulation`)
- Text selection disabled on UI, enabled on content

---

## Quick Reference

### Mobile-First Checklist

- [ ] Grid uses `grid-cols-1 md:grid-cols-2`
- [ ] Typography scales: `text-2xl md:text-3xl lg:text-4xl`
- [ ] Spacing scales: `py-12 md:py-16 lg:py-20`
- [ ] Padding scales: `p-4 md:p-6 lg:p-8`
- [ ] Buttons: `min-h-[48px]` and `w-full sm:w-auto`
- [ ] Images: `loading="lazy"` for below-fold
- [ ] No horizontal scroll on any screen size
- [ ] Works in both light and dark mode
- [ ] Respects system font size preferences

### App-Like Checklist

- [x] View Transitions enabled
- [x] Safe area insets for notched phones
- [x] Touch feedback on interactive elements
- [x] PWA meta tags for add-to-home-screen
- [x] Smooth momentum scrolling
- [x] Tap highlight customized
- [ ] Bottom navigation (future enhancement)
- [ ] Service worker for offline (future enhancement)
