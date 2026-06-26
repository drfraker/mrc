# design-sync notes — Medical Review Consultants

This repo is a **Laravel + Inertia + React + Tailwind v4 marketing site**, not a
published component library. There is no `dist/` of exported components, no
Storybook, and `package.json` has no `name`. The sync treats the reusable
chrome/section/brand components + the Tailwind theme as the design system.

claude.ai/design project: `74b1f53d-02f2-437f-88d9-1603a3b6db6c`
(https://claude.ai/design/p/74b1f53d-02f2-437f-88d9-1603a3b6db6c)

## Component set (rebuilt 2026-06-24 for the light "Assurance" redesign)

The site was redesigned from the dark teal/navy theme to the light
brand/azure/graphite/pewter "Assurance" palette. The old WebGL `HeroScene` is
gone; the decorative motif is now the `ContourLines` SVG. Section primitives were
renamed (`Eyebrow`→`Kicker`, `SubHero`→`PageHero`, `CheckItem`→`CheckRow`), and a
new `MrcMark` brand glyph was added.

- **Included (9):** Kicker, ContourLines, PageHero, CtaBand, CheckRow, MrcMark,
  SiteHeader, SiteFooter, SiteLayout.
- **Excluded:** `Seo` (renders only into `<head>` — not visual, Inertia-`Head`
  coupled), `Brand` (internal to site-header, not exported). Pages
  (home/services/working/resources/contact, provider/*) are full Inertia page
  compositions, not DS components — out of scope, but the best composition
  reference (home.tsx in particular).

## How the build is wired (non-default — read before re-syncing)

- **Entry**: `.design-sync/ds-entry.tsx` (hand-authored barrel), passed via
  `--entry`. Re-exports the 9 components with clean named exports. There is no
  package entry to discover, so `componentSrcMap` pins all 9 explicitly.
- **`package.json` MUST have a `name`.** The converter's `.d.ts` loader
  (`lib/dts.mjs` `loadDts`/`projectFor`) walks up for the nearest `package.json`
  with a `name` field; with none it climbs to filesystem root and crashes
  (`ENOENT: open '/package.json'`). `"name": "mrc"` was added to the repo
  package.json — keep it. This was the blocker that left every prior sync
  unpushed (the remote project was empty until 2026-06-24).
- **Inertia is shimmed, not bundled.** `SiteHeader`/`SiteFooter`/`SiteLayout`
  import `Link`/`usePage` from `@inertiajs/react`. `.design-sync/tsconfig.ds.json`
  aliases `@inertiajs/react` → `.design-sync/shims/inertia-react.tsx` (the
  esbuild tsconfig-paths plugin intercepts the exact bare specifier). The shim
  gives static equivalents: `Link` → plain `<a>`, `usePage` → a fixed page
  object (`url: '/'`, `props: {}`), `Head` → renders nothing. This is the honest
  rendering for a design surface (no routing/SSR) AND makes the components work
  in the design tool, which also has no Inertia. The current components only use
  `Link`/`usePage`; the shim also exports `Head`/`router` for safety.
- **CSS** = the compiled Tailwind output. `cfg.cssEntry` →
  `.design-sync/styles.compiled.css`, a committed copy of the vite-built CSS
  (all `@theme` tokens for both the legacy dark theme and the light "Assurance"
  palette — `--color-brand/azure/graphite/pewter/...`, the `@layer components`
  classes — `.cta`/`.cta-brand`/`.cta-azure`/`.cta-dark-ghost`/`.btn`/`.card`/
  `.container-page`/`.surface-light`/`.hero-bg` — preflight, and every utility
  the app uses). Regenerate with `cfg.buildCmd` (it runs `npm run build` then
  copies the manifest-resolved hashed CSS to the stable path). NB: this is now a
  full-app build (~126 KB) — it includes admin/dashboard utilities too, which is
  a harmless superset for the marketing components.
- **Fonts**: `cfg.extraFonts` ships `public/fonts/{inter,source-serif-4}-latin.woff2`;
  `rewriteBundleFontFaces` rewrites the compiled CSS's `/fonts/*.woff2` `@font-face`
  urls to `./fonts/*`.
- **Props**: no `.d.ts` ship, so `cfg.dtsPropsFor` hand-writes every props body.

## Re-sync risks (watch-list)

- **`styles.compiled.css` can go stale.** It is a committed snapshot of the
  vite build. If `resources/css/app.css` or the components' utility usage
  changes, re-run `cfg.buildCmd` before the converter or the shipped CSS lags
  the source.
- **Tailwind snapshot is content-scoped.** The shipped CSS only contains
  utilities the *current* app uses. A design agent inventing novel utility
  combos won't find them — it should compose with the provided component classes
  + tokens (`var(--color-brand)`, `var(--color-azure)`, `var(--radius-card)`,
  etc.). Documented in the conventions header.
- **Inertia shim is tied to the upstream import surface.** It currently covers
  `Link`/`usePage`/`Head`/`router`. If a synced component starts importing other
  `@inertiajs/react` exports, extend `.design-sync/shims/inertia-react.tsx`.
- **Renames break the diff.** This rebuild renamed/removed components vs. the
  previous sync (Eyebrow/SubHero/CheckItem/HeroScene). The next push should
  delete the old remote cards (HeroScene, Eyebrow, SubHero, CheckItem) and write
  the new set, rather than leaving orphans in the project.

## Known render warns (recorded — not new on re-sync)

- **`[TOKENS_MISSING]`** for ~10 `--radix-*`, `--sidebar-width`, `--skeleton-width`
  custom properties. These come from the **full-app** compiled CSS superset
  (admin/dashboard Radix components), are set at runtime, and are NOT used by any
  of the 9 marketing DS components. Expected and harmless — do not chase.
- **`conventions.md`** is wired via `cfg.readmeHeader` — it's prepended to the
  README and fed to the design agent. Re-validate its token/class names against
  the fresh build on each re-sync (all are in `styles.compiled.css`).

## Pushing the sync

First successful push: **2026-06-24** → project `74b1f53d-02f2-437f-88d9-1603a3b6db6c`
(atomic path; remote was empty, so `deletes: []` — the old HeroScene/Eyebrow/
SubHero/CheckItem cards the previous risk note worried about never existed
remotely). The render check was **deferred to claude.ai/design** (uploaded with
`--no-render-check`; previews not machine-verified locally) — skim the DS pane in
the tool to confirm visuals, and re-upload is cheap.

The push is driven by the `/design-sync` skill + the `DesignSync` tool
(build → finalize_plan → write/`_ds_sync.json`-last). The skill's bundler is not
vendored into this repo, so run re-syncs from an environment where `/design-sync`
is installed.
