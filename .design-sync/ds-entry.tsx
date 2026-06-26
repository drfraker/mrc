// design-sync barrel entry for the MRC design system.
//
// The repo is a Laravel + Inertia app, not a published component library, so
// there is no dist/ entry to bundle. This barrel re-exports the reusable
// chrome/section/brand components with clean named exports; package-build.mjs
// bundles it (via --entry) into window.MRC.*. `@/` resolves through
// .design-sync/tsconfig.ds.json, which also aliases @inertiajs/react to the
// static shim.
export { Kicker, ContourLines, PageHero, CtaBand, CheckRow } from '@/components/sections';
export { default as MrcMark } from '@/components/mrc-mark';
export { default as SiteHeader } from '@/components/site-header';
export { default as SiteFooter } from '@/components/site-footer';
export { default as SiteLayout } from '@/components/site-layout';
