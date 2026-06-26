# Medical Review Consultants — design system

Light "Assurance" marketing system for a Medicare review & compliance consultancy:
deep-ocean navy + sky-blue on white/paper, Inter throughout, generous rounded
cards, soft shadows, and a recurring topographic contour-line motif. Build
on-brand marketing pages (heroes, service/feature grids, CTA bands, testimonials,
FAQ) by composing the components below with the utility classes and tokens here —
don't hand-roll new chrome.

## Setup & wrapping

- Components are exported on `window.MRC.*` (e.g. `MRC.PageHero`, `MRC.CtaBand`).
- **No provider is required.** Components are self-contained and style themselves
  from the shipped `styles.css` (Tailwind v4 utilities + tokens + component
  classes). Just make sure `styles.css` is loaded.
- **Put `class="surface-light"` on the page root** (or any section wrapper). It
  switches all `h1–h4` to Inter — without it, headings fall back to the serif
  display face. Every page in this system uses it.
- `SiteLayout` renders the sticky `SiteHeader` + `SiteFooter` chrome around its
  children and runs the scroll-reveal observer; wrap a full page in it. There is
  no client routing here — nav links render as plain `<a>`.

## Styling idiom — Tailwind v4 utilities + a few component classes

Style with utility classes; reach for raw `var(--color-*)` only in custom CSS.
Use the brand palette, never ad-hoc hex:

| Role | Token / utilities |
|---|---|
| Primary navy (text/bg/border) | `text-brand` `bg-brand` `border-brand` — `var(--color-brand)` #003b5c |
| Darkest band | `bg-brand-ink` — `var(--color-brand-ink)` #00263c |
| Sky-blue accent | `text-azure` `bg-azure` — `var(--color-azure)` #62b5e5 |
| Accent on dark | `text-azure-soft` — `var(--color-azure-soft)` #9ec9e6 |
| Heading ink | `text-graphite` — #191c1d |
| Body text | `text-pewter` / secondary `text-pewter-soft` / captions `text-pewter-faint` |
| Opacity tints | `bg-brand/8`, `bg-azure/16`, `border-brand/10`, `bg-white/6` … |

Buttons are component classes — `cta` plus one variant, on an `<a>`/`<button>`:
`cta cta-brand` (navy, primary), `cta cta-azure` (sky, primary on dark),
`cta cta-outline` (white w/ border), `cta cta-dark-ghost` (translucent on dark
bands). Page width: wrap content in `container-page`. Headings: `font-extrabold`
+ tight `tracking-[-0.025em]`, sized with `text-[clamp(...)]`.

## Where the truth lives

- `styles.css` (and its `@import` of `_ds_bundle.css`) is the full compiled
  stylesheet — every token and component class above is defined there; read it
  before inventing a class. The utility set is content-scoped to what the app
  already uses, so prefer the component classes + tokens over exotic new combos.
- Each component's `general/<Name>/<Name>.d.ts` (the props) and `.prompt.md`
  (usage) are the per-component contract.

## Components

`PageHero{eyebrow,title,lede,children?}` (interior page hero w/ contour motif;
`title` may wrap a phrase in `<span class="text-brand">`), `Kicker{children,
tone?}` (uppercase section label; `tone="azure"` on dark), `CtaBand{title,text,
children,align?}` (dark gradient call-to-action; `align="center"|"split"`; pass
`cta`-class actions as children), `CheckRow{children}` (green-check list item),
`ContourLines{variant?,className}` (decorative topo SVG), `MrcMark{className}`
(brand glyph; color via `text-*`), and the `SiteHeader`/`SiteFooter`/`SiteLayout`
chrome.

## Idiomatic snippet

```jsx
<div className="surface-light">
  <PageHero
    eyebrow="Services"
    title={<>Medicare support, <span className="text-brand">built around outcomes</span></>}
    lede="On-demand expertise for SNFs, Critical Access Hospitals, and rural providers."
  />
  <section className="container-page py-16">
    <Kicker>Why MRC</Kicker>
    <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2rem)] font-extrabold tracking-[-0.025em] text-graphite">
      What your team no longer has to carry alone
    </h2>
    <div className="mt-6 flex flex-col gap-3">
      <CheckRow>Weekly reviews that catch coverage changes early</CheckRow>
      <CheckRow>Independent physician review without the search</CheckRow>
    </div>
  </section>
  <section className="container-page pb-20">
    <CtaBand align="center" title="Want to compare MRC with doing this in-house?"
             text="We'll help you weigh staff time, training, and appeal risk.">
      <a href="/contact" className="cta cta-azure">Contact us</a>
    </CtaBand>
  </section>
</div>
```
