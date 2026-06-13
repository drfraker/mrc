# Medical Review Consultants — Website

Marketing site for [Medical Review Consultants](https://www.medreviewconsultants.com), a Bozeman, Montana consulting firm supporting healthcare facilities with Medicare utilization review, physician peer review, RAC appeals, and staff education.

Built as a **Laravel 13 + Inertia + React (TypeScript) + Tailwind CSS v4** application, designed to deploy on **Laravel Cloud**. The visual design centers on trust and calm: a deep navy / teal palette, Source Serif 4 + Inter typography (self-hosted), and an animated Three.js hero — a slowly drifting field of light points — on every page.

There is **no authentication and no database**. It's a stateless marketing site: sessions use the cookie driver, cache uses the filesystem, and the queue runs synchronously, so it deploys with nothing to provision.

## Stack

- **Laravel 13** (PHP 8.3+), served via Inertia — no API layer, no Blade page templates
- **React 19 + TypeScript**, bundled by **Vite 8**
- **Tailwind CSS v4** with design tokens defined in `resources/css/app.css`
- **Three.js** for the hero scene (`resources/js/components/hero-scene.tsx`)

## Pages

| Route | Inertia page | Notes |
| --- | --- | --- |
| `/` | `home` | Hero, services overview, "why MRC", Montana section |
| `/services` | `services` | Four service detail blocks (anchors `#utilization-review`, `#peer-review`, `#rac-appeals`, `#education`) |
| `/working-with-mrc` | `working` | Engagement process and billing |
| `/resources` | `resources` | External Medicare references |
| `/contact` | `contact` | Contact details + backend-free form |

Routes are declared in `routes/web.php` using `Route::inertia(...)` — each renders a React page under `resources/js/pages/` with no controller.

## Local development

```sh
composer install
npm install
cp .env.example .env
php artisan key:generate

# Run Laravel + Vite together:
composer dev
# or separately:
php artisan serve
npm run dev
```

Then open http://localhost:8000.

## Quality checks

The same checks that CI runs:

```sh
npm run lint:check        # ESLint
npm run format:check      # Prettier
npm run types:check       # tsc --noEmit
./vendor/bin/pint --test  # PHP code style
./vendor/bin/phpstan analyse
php artisan test
```

## Deploying to Laravel Cloud

Laravel Cloud auto-detects the Laravel app and runs the standard build (`composer install` + `npm ci` + `npm run build`). Because the app is stateless:

- No database needs to be attached.
- Set `APP_NAME`, `APP_KEY`, and `APP_URL` in the environment. The session (`cookie`), cache (`file`), and queue (`sync`) drivers in `.env.example` need no external services.

The Vite build is self-contained — it does **not** invoke PHP — so the front end builds cleanly in any CI/CD pipeline.

## Imagery

Page imagery lives in `public/images/`. The shipped art is original, generated to match the site's navy/teal palette. To regenerate or swap an image, drop a replacement at the same path (1536×1024 works well) — the components reference them by filename, so no code changes are needed.

## Contact form

The form on `/contact` composes a `mailto:` message to `info@medreviewconsultants.com` — no backend required. To switch to a hosted form service (e.g. Formspree) or a Laravel route, replace the `handleSubmit` handler in `resources/js/pages/contact.tsx`.

## Accessibility & performance

- The Three.js scene honors `prefers-reduced-motion` (renders a single static frame), pauses when off-screen or when the tab is hidden, and caps device pixel ratio at 2.
- Semantic landmarks, a skip link, visible focus styles, and labeled form controls throughout.
- Fonts are preloaded and self-hosted; images are lazy-loaded with explicit dimensions.
