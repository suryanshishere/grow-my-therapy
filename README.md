# Grow My Therapy — Dr. Maya Reynolds

A responsive homepage study and therapist website redesign, built for Grow My Therapy’s frontend internship assignment. Both versions use the same section components and maintain the reference’s asymmetric composition and mobile content order.

## View the project

- [Live redesign](https://grow-my-therapy-suryansh.pages.dev/)
- [Reference clone](https://grow-my-therapy-suryansh.pages.dev/original/)
- [Public GitHub repository](https://github.com/suryanshishere/grow-my-therapy)
- Verified submission links are recorded in [the submission checklist](docs/submission-checklist.md).

Dr. Maya Reynolds is fictional. Consultation controls open an informational demo dialog, and the cloned booking form validates in the browser and then states that nothing was sent. This website does not collect personal information, book appointments, or send messages.

## Run locally

Use Node.js 22.23.1 (recorded in `.node-version`) and npm.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. All production fonts and photos are served locally; Google Drive and stock providers are not contacted while visitors browse the redesign.

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production export is written to `out/`. The preview serves it on `http://localhost:8787`, using Cloudflare’s local Pages runtime.

## Structure and behavior

- `src/components/homepage.tsx` renders the shared section layout; content is defined in `src/content/original.ts` and `src/content/maya.ts` using `HomepageContent`.
- `src/app/globals.css` defines scoped theme tokens. `src/styles/homepage.css` contains the shared reference composition; `maya.css` applies redesign typography and office styling.
- `src/components/interactions.tsx` handles desktop dropdowns, both mobile menus, FAQs, and consultation dialogs. Native dialogs include explicit Tab cycling, Escape dismissal, backdrop dismissal, scroll locking, and focus restoration.
- The two routes use different mobile menus on purpose. Maya opens a native dialog with an accordion. The clone reproduces the reference's full-screen sheet: a three-bar burger that morphs into a close control in place, a sheet that fades in beneath the header so the logo stays put, and folders that step sideways to a panel headed by **Back** rather than expanding inline. Because a modal `<dialog>` is promoted to the top layer and would cover the header, the clone's sheet is an ordinary fixed panel that reuses the same focus trap, Escape handling, scroll lock, and focus restoration, and marks the rest of the page `inert` while open.
- `/original/contact/` recreates the reference booking page, including its two-column layout and all eleven intake controls. The form has no `action`, makes no network request, and stores nothing; submitting a valid form replaces it with a notice explaining that it is a demonstration.
- `Photo` uses a checked-in image manifest to choose real responsive image variants, with lazy loading and explicit dimensions. Above-the-fold photography loads eagerly.
- Section links navigate to services, Maya’s biography, modalities, and office. Links outside the reference clone point to the original website.

The application uses Next.js App Router, React, TypeScript, Tailwind CSS 4, and CSS grids. Static export is configured with `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`. There is no backend, database, appointment integration, or runtime image service.

Next.js's experimental `inlineCss` option serves the small stylesheet with the initial HTML. In the local mobile Lighthouse comparison, this removed three blocking CSS requests and reduced the redesign's LCP from 3.72s to 1.46s. The tradeoff is about 29 KiB more initial transfer and no independent stylesheet caching on first loads.

## Design and sources

The redesign keeps the reference’s section order, rectangular photos, generous whitespace, thin underlines, and oval buttons. The one added homepage section is **Our Office**, immediately after Maya’s biography. FAQs retain their header/footer entry points and open in a dialog instead of adding another page section.

| Token | Color | Use |
| --- | --- | --- |
| Ocean | `#234C5A` | Headings, buttons, footer strip |
| Pale blue | `#DCE7E8` | Biography and dialog panels |
| Sand | `#F3EEE5` | Hero, introduction, final invitation |
| Bronze | `#927047` | Selected display accents |
| Ink | `#23383F` | Body copy |
| White | `#FCFCFA` | Services, office, supporting sections |

The clone reproduces the reference's interaction layer as well as its composition: its text-link rule wipes away right to left over one second, its oval button changes only fill and label colour, and its navigation links, service titles and expertise links deliberately do not respond to hover. Neither site animates content on scroll. The reference also runs two inks — `#2B2B2B` for most copy and pure black in the approach band and on service-card titles — which the clone now matches.

Fraunces and DM Sans provide the redesign’s typography. The clone uses **Cormorant Garamond, Allura, and Mulish** as the approved open-font substitutes for Beaufort Pro, Printed Moments, and Muli. Font families are the documented exception to exact visual matching; letterforms differ. Because Allura sets far narrower than the reference's Printed Moments, the clone scales its script accents up so the words match the reference's measured widths, and trims the hero heading's measure so its line breaks match at every width. The clone intentionally retains the original pale teal accent, whose text contrast is lower than the redesign’s. Fonts are bundled through Fontsource under their included open licenses.

- [Reference homepage](https://www.conejovalleycounseling.com/home)
- [Dr. Maya Reynolds’ supplied profile](https://docs.google.com/document/d/1-IJVKEjuqV9CTd9QH16UNHJ7SQfdiweS4oAIZ8vmgHU/edit)
- [Content provenance and factual boundaries](docs/content-source.md)
- [Every photograph, source, author, and license](docs/image-sources.md)

Maya’s portrait and both office photos are supplied assignment assets. Other redesign photographs come from the documented Unsplash and Pexels sources. Reference photos and the reference logo are used only on the clone; their inclusion does not grant broader redistribution rights. The content omits the profile’s malformed street address and includes only the supported city, state, and ZIP code.

Optimized WebP assets and their size manifest are committed, so builds do not need source downloads. To regenerate them, run `node scripts/prepare-images.mjs`. This downloads any missing originals into ignored `.asset-source/`, then rebuilds image variants without upscaling. The checked-in manifests in `scripts/` record the input URLs.

## Browser checks

```sh
# After npm run build; starts/reuses the local Pages preview.
npm run test:e2e
```

Tests use installed Google Chrome. They cover both routes at 320, 390, 768, 1024, and 1440 pixels; missing images and clipped text; menu and dropdown navigation; dialog focus, dismissal and demo behavior; FAQ expansion; WCAG AA automated checks on the redesign and the cloned contact page; metadata; reduced motion; and static 404 handling. Clone-specific checks cover the burger morph and folder stepping, dropdown right alignment, the absence of hover tinting, the white colophon, every booking control resolving to `/original/contact/`, and a form submission that produces no POST, PUT, or PATCH request. The original’s known accent contrast is documented above rather than represented as WCAG compliant.

See the [validation record](docs/validation.md) for the completed checks and mobile Lighthouse measurements: 92 for the redesign and 84 for the clone in local simulated mobile tests.

`node scripts/capture-site.mjs http://localhost:8787` captures desktop/mobile screenshots into ignored `.artifacts/` for visual review. Screenshot comparisons are manual because the approved font substitutes have different letterforms. Test traces and reports remain in ignored output directories.

## Publish on Cloudflare Pages

```sh
npx wrangler whoami
# If authentication is needed: npx wrangler login

# Once per new project:
npx wrangler pages project create grow-my-therapy-suryansh --production-branch main --force

npm run lint
npm run typecheck
npm run build
npm run deploy
```

`wrangler.jsonc` identifies the Pages project and `out/` directory. This is a **Direct Upload** project. GitHub stores the source; pushes do not deploy automatically. Run the build and deploy commands for updates. No custom domain or paid service is required. Confirm the URL returned by Wrangler before sharing it.

The installed Wrangler 4.131.1 uses `--force` for this one-time project creation to select Pages instead of delegating to Workers. The project is already created; subsequent deployments use `npm run deploy` without that flag.

The redesign includes a title, description, canonical URL, Open Graph metadata, descriptive headings, and local service terms. `/original/` is marked `noindex` in page metadata and response headers. `public/_headers` supplies static response headers and immutable caching for hashed framework assets.

## Record and submit

Use [the five-minute walkthrough script](docs/walkthrough-script.md) for a client-facing desktop and mobile demo. Rehearse at your own speaking pace, then trim the recording to five minutes. The script and recording checklist are preparation materials; the candidate must record and host the Loom video and submit the three required links before the deadline.

See [the submission checklist](docs/submission-checklist.md) for final links and remaining candidate actions.
