# Sylvan Lake AUTOPRO Website Style Guide

This guide documents the conventions, components, and patterns used throughout the website.

---

## Page Structure

All pages follow a consistent structure:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero2 from '~/components/widgets/Hero2.astro';
// ... other component imports

const metadata = {
  title: 'Page Title | Sylvan Lake AUTOPRO',
  description: 'Meta description for SEO (150-160 chars)',
};

// Schema markup objects (serviceSchema, faqSchema, breadcrumbSchema, etc.)
---

<Layout metadata={metadata}>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(schemaObject)} />
  </Fragment>

  <!-- Page content sections -->
</Layout>
```

---

## Hero2 Component

The Hero2 component has two layout modes:

### With Image (50/50 split)
```astro
<Hero2
  tagline="Category"
  title="Page Title"
  subtitle="Brief description"
  image={{
    src: heroImage,
    alt: 'Descriptive alt text',
  }}
  actions={[
    { variant: 'primary', text: 'Primary CTA', href: '...' },
    { variant: 'secondary', text: 'Secondary CTA', href: '...' },
  ]}
/>
```
- Text left-aligned on desktop
- Image on the right
- Buttons left-aligned on desktop

### Without Image (centered)
```astro
<Hero2
  tagline="Category"
  title="Page Title"
  subtitle="Brief description"
  actions={[
    { variant: 'primary', text: 'Primary CTA', href: '...' },
    { variant: 'secondary', text: 'Secondary CTA', href: '...' },
  ]}
/>
```
- Text centered with `max-w-4xl` constraint
- Buttons centered
- No empty space - compact layout

**Always prefer having an image when possible.** Use the centered layout for pages where no suitable image is available.

---

## Common Components

### Content
For text-heavy sections with optional image and bullet items.
```astro
<Content
  title="Section Title"
  content="HTML content with <strong>formatting</strong>..."
  image={{ src: imageImport, alt: '...' }}
  isReversed={true}  // Image on left instead of right
  items={[
    { title: 'Item Title', description: 'Item description' },
  ]}
/>
```

### Features2
For feature grids with icons.
```astro
<Features2
  title="Section Title"
  subtitle="Optional subtitle"
  columns={2}  // 2, 3, or 4
  items={[
    {
      title: 'Feature Title',
      description: 'Feature description',
      icon: 'tabler:icon-name',
      callToAction: { text: 'Learn More', href: '/path' },  // Optional
    },
  ]}
/>
```

### FAQs
For FAQ sections with schema markup.
```astro
<FAQs
  title="Frequently Asked Questions"
  subtitle="Optional subtitle"
  columns={1}
  items={[
    {
      title: 'Question?',
      description: 'Answer text.',
    },
  ]}
/>
```

### CallToAction
For final CTA sections.
```astro
<CallToAction
  title="CTA Headline"
  subtitle="Supporting text"
  actions={[
    { variant: 'primary', text: 'Primary', href: '...' },
    { variant: 'secondary', text: 'Secondary', href: '...' },
  ]}
/>
```

---

## Page Types

### Service Pages (`/services/*`)

Structure:
1. Hero2 (with or without image)
2. Introduction Content section
3. Additional Content sections (what we do, how it works, etc.)
4. Features2 sections (equipment, capabilities, warning signs)
5. FAQs section
6. Related Services section
7. CallToAction

Schema: `serviceSchema`, `faqSchema`, `breadcrumbSchema`

### Location Pages (`/locations/*`)

Structure:
1. Hero2 (centered, no image - these are SEO landing pages)
2. "Why this location needs us" Content section
3. Distance/directions table section (custom HTML)
4. Services emphasized for this area
5. "Why Choose Us" trust signals
6. FAQs section
7. CallToAction

Schema: `localBusinessSchema`, `faqSchema`, `breadcrumbSchema`

**Important:** Location pages must have unique, locally-relevant content. No duplicate content between location pages.

---

## Schema Markup

### LocalBusiness/AutoRepair
Used on homepage and location pages:
```javascript
const localBusinessSchema = {
  "@context": "https://schema.org",
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
  },
  // ... additional properties
};
```

### BreadcrumbList
```javascript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sylvanlakeautopro.com/" },
    { "@type": "ListItem", "position": 2, "name": "Section", "item": "https://sylvanlakeautopro.com/section/" },
    { "@type": "ListItem", "position": 3, "name": "Page Name" }  // No item for current page
  ]
};
```

### FAQPage
```javascript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text."
      }
    }
  ]
};
```

---

## Brand Colors (NAPA AUTOPRO 2023 Graphic Standards)

### Official Palette

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| **NAPA Blue** | `#0A0094` | `bg-primary` | Headers, buttons, links, dark section backgrounds |
| **NAPA Yellow** | `#FFC836` | `bg-accent` | CTAs, highlights, badges, attention elements |
| **Stainless Gray** | `#DADAD9` | `bg-gray-300` | Tertiary backgrounds, dividers, subtle cards |

### Permitted Gradients

**Blue gradient:**
```css
background: linear-gradient(to bottom, #001FCC, #0A0094);
```

**Yellow gradient:**
```css
background: linear-gradient(to bottom, #FFD232, #FFC836, #F6B928);
```

**Gray gradient:**
```css
background: linear-gradient(to bottom, #F2F2F2, #DADAD9);
```

### Color Rules

**DO:**
- Use NAPA Blue `#0A0094` for dark accent sections (e.g., CallToAction, feature highlights)
- Use `#F2F2F2` or `#DADAD9` for alternating light section backgrounds
- Use white for card backgrounds in light mode
- Use Tailwind `slate-900` (`#0F172A`) for dark mode page backgrounds
- Use `bg-gray-800/80` or similar overlays on images for dark sections

**DO NOT:**
- Use `#030621` as a background color — this is NOT in the brand guide
- Invent new brand colors outside this palette
- Use raw black (`#000000`) for backgrounds

### Section Background Patterns

| Context | Light Mode | Dark Mode |
|---------|------------|-----------|
| Page background | `white` | `slate-900` |
| Alternating sections | `gray-50` / `#F2F2F2` | `slate-800` |
| Cards | `white` | `slate-900` |
| Accent sections | `bg-primary` | `bg-primary` |
| Hero (dark style) | `bg-primary` | `bg-primary` |

---

## Typography

### Font Stack (substitutes for NAPA Sans)

| Usage | Font | Weights | Tailwind |
|-------|------|---------|----------|
| **Headings** | Barlow Condensed | 400, 500, 600, 700 | `font-heading` |
| **Body** | Barlow | 400, 500, 600 | `font-sans` (default) |

### Heading Sizes

```
h1: text-3xl md:text-4xl lg:text-5xl font-bold font-heading
h2: text-2xl md:text-3xl lg:text-4xl font-bold font-heading
h3: text-xl md:text-2xl font-bold font-heading
h4: text-lg font-bold
```

---

## Button Patterns

### Primary CTA
```astro
{ variant: 'primary', text: 'Book Appointment', href: 'booking-url', target: '_blank' }
```

### Phone CTA
```astro
{ variant: 'secondary', text: 'Call (403) 887-0440', href: 'tel:+14038870440' }
```

### Booking URL
Always use the full booking URL:
```
https://sylvanlakeautopro.autotext.me/Admin/kioskv2/index.php?id=WTNHaFJhb1g1dk9YV3g1YmpkUEx3QT09&kiosk=1
```

---

## Internal Linking

Service pages should link to related services using Features2 with callToAction:
```astro
<Features2
  title="Related Services"
  columns={3}
  items={[
    {
      title: 'Service Name',
      description: 'Brief description',
      icon: 'tabler:icon-name',
      callToAction: { text: 'Learn More', href: '/services/service-slug' },
    },
  ]}
/>
```

---

## Image Guidelines

- Hero images: Use `loading="eager"` for above-the-fold images
- Content images: Use `loading="lazy"`
- Compress images to under 200KB when possible
- Use descriptive alt text
- Import from `~/assets/images/`

---

## Trust Signals (consistent across pages)

- **19 years** in Sylvan Lake (since 2006)
- **4.9 Google rating** from 290+ reviews
- **NAPA Peace of Mind Warranty** - 24 months / 40,000 km at 17,000+ locations
- **Red Seal certified technicians**
- **Digital inspections** with photos sent to phone
