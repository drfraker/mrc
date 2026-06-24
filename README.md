# Medical Review Consultants — Compliance App

Laravel + Inertia React app for Medical Review Consultants. The public marketing site is preserved, and the app now includes team-based consultant authentication plus a de-identified provider intake workflow for Medicare Part A SNF review.

## Stack

- Laravel 13, Fortify auth, passkeys, two-factor support, team accounts
- Inertia React 19 + TypeScript + Tailwind CSS v4
- Laravel AI SDK (`laravel/ai`) for consultant-only report drafting
- SQLite by default for local development

## Key Routes

| Route | Purpose |
| --- | --- |
| `/` | Public MRC marketing homepage |
| `/services` | Public services page |
| `/working-with-mrc` | Public engagement process |
| `/resources` | Public Medicare resources |
| `/contact` | Public contact page |
| `/provider/intake` | Public de-identified SNF Medicare review intake |
| `/login` / `/register` | Consultant auth |
| `/{team}/dashboard` | Consultant dashboard |
| `/{team}/reviews` | Consultant compliance review queue |

## PHI Handling Approach

The provider intake form is designed to avoid storing PHI:

- Date fields are used only in the browser to calculate relative values, such as qualifying inpatient day count and days from hospital discharge to SNF admission. Actual patient dates are not submitted.
- Free text is redacted in the browser and again on the server for common identifiers such as SSNs, phone numbers, emails, MRN/HICN/MBI labels, and similar values.
- The stored `compliance_cases.case_payload` contains de-identified review facts and deterministic rule findings.

This is a technical minimization strategy, not a legal determination that HIPAA does not apply. Confirm the compliance posture with counsel before collecting real facility submissions.

## Laravel AI SDK

`laravel/ai` is installed and configured with provider request storage off by default (`OPENAI_STORE=false`, `AZURE_OPENAI_STORE=false`). AI drafting is available only from the consultant review detail screen after deterministic findings are already stored. If no AI provider key is configured, the draft action degrades to a disabled-message draft.

## Local Development

```sh
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer dev
```

Then open the Herd/Valet URL, typically `http://mrc.test`.

## Verification

Useful checks:

```sh
npm run lint:check
npm run format:check
npm run types:check
composer lint:check
php artisan test
npm run build
```

Note: in the Codex sandbox, `pint --parallel` requires elevated execution because it opens a local TCP coordination socket.
