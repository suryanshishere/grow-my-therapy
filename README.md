# Grow My Therapy — Dr. Maya Reynolds

A responsive reference clone and **Sunlit Studio** therapist redesign, built for Grow My Therapy's frontend internship assignment. Both homepages share the reference section layouts. Maya adds Our Office and uses a new palette, typography, profile-based copy, and photography.

## View the project

- [Published site](https://grow-my-therapy-suryansh.pages.dev/)
- [Reference clone](https://grow-my-therapy-suryansh.pages.dev/original/)
- [Public GitHub repository](https://github.com/suryanshishere/grow-my-therapy)
- Verified submission links are recorded in [the submission checklist](docs/submission-checklist.md).

Release verification is recorded in [validation.md](docs/validation.md). Cloudflare Pages uses Direct Upload: building or pushing to GitHub does not automatically update the live site.

Dr. Maya Reynolds is fictional. Maya's "Book an appointment" controls lead to a themed demonstration form at `/contact/`; it and the cloned booking form validate in the browser and then state that nothing was sent. This website does not collect personal information, book appointments, or send messages.

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

- `src/components/homepage.tsx` renders the nine reference section layouts for both homepages. `MayaHomePage` supplies Maya's content, theme styles, and the custom Our Office section. Both versions retain two hero images, a full-width photographic statement, the specialties grid, and two closing images.
- Shared template geometry lives in `homepage.css`. Maya's CSS Module supplies theme styling and the additional office composition. Theme-scoped header, footer, and dialog styles live in `maya.css`.
- `src/components/interactions.tsx` handles desktop dropdowns, both mobile menus, and the FAQ dialog. Native dialogs include explicit Tab cycling, Escape dismissal, backdrop dismissal, scroll locking, and focus restoration.
- The two routes use different mobile menus on purpose. Maya opens a native dialog with an accordion. The clone reproduces the reference's full-screen sheet: a three-bar burger that morphs into a close control in place, a sheet that fades in beneath the header so the logo stays put, and folders that step sideways to a panel headed by **Back** rather than expanding inline. Because a modal `<dialog>` is promoted to the top layer and would cover the header, the clone's sheet is an ordinary fixed panel that reuses the same focus trap, Escape handling, scroll lock, and focus restoration, and marks the rest of the page `inert` while open.
- `/original/contact/` recreates the reference booking page, including its two-column layout and all eleven intake controls. The form has no `action`, makes no network request, and stores nothing; submitting a valid form replaces it with a notice explaining that it is a demonstration.
- `/contact/` is Maya's booking page. It reuses the same inert form in her palette and type, with an intake adapted to her adult practice: name, email, phone, meeting format, referral source, what brings you to therapy, and availability. There are no clinician, insurance, or minor's-age questions.
- `Photo` uses a checked-in image manifest to choose real responsive image variants, with lazy loading and explicit dimensions. Above-the-fold photography loads eagerly.
- Section links navigate to services, Maya’s biography, modalities, and office. Links outside the reference clone point to the original website.

The application uses Next.js App Router, React, TypeScript, Tailwind CSS 4, and CSS grids. Static export is configured with `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`. There is no backend, database, appointment integration, or runtime image service.

Next.js's experimental `inlineCss` option serves CSS with the initial HTML. A comparison on the preceding redesign removed three blocking CSS requests and reduced local mobile LCP from 3.72s to 1.46s, with about 29 KiB more initial transfer. Those measurements describe the previous revision; the current validation record documents this revision’s checks.

## Design and sources

Sunlit Studio combines deep olive, warm stone, muted plum, and naturally colored photography. The original section compositions remain recognizable, including the offset hero photographs and four-block specialties grid. **Our Office**, immediately after Maya's biography, introduces the custom overlapping stone panel and two supplied office photographs. Mobile layouts retain the template's reading order. Filled plum buttons and locally hosted Instrument Sans and Newsreader complete Maya's theme; FAQs remain in a dialog and booking lives on its own page, so Our Office is the only added homepage section.

| Token | Color | Use |
| --- | --- | --- |
| Deep olive | `#303B32` | Primary surfaces, hero, final invitation |
| Warm stone | `#E5DED2` | Signature text panels and secondary surfaces |
| Muted plum | `#725569` | Buttons and accent details |
| Light surface | `#F7F4ED` | Reading surfaces and light text |
| Pale plum | `#E5DAE1` | Reflective statement band |
| Body ink | `#292D28` | Body copy |

The clone reproduces the reference's interaction layer as well as its composition: its text-link rule wipes away right to left over one second, its oval button changes only fill and label colour, and its navigation links, service titles and expertise links deliberately do not respond to hover. Neither site animates content on scroll. The reference also runs two inks — `#2B2B2B` for most copy and pure black in the approach band and on service-card titles — which the clone now matches.

Locally hosted **Instrument Sans** supports Maya’s H1, body, navigation, and controls; **Newsreader** gives reflective headings their expressive character. A brief opening reveal and subtle control transitions respect reduced-motion preferences.

The clone uses the reference's actual **Beaufort Pro Light**, **Printed Moments**, and **Muli** fonts. The first two are served locally from the reference's public font files, with provenance recorded in [font-sources.md](docs/font-sources.md). Maya uses Fontsource's locally hosted Instrument Sans and Newsreader. The clone retains the source's pale teal accent, including its lower contrast; Maya's palette has separate contrast checks.

- [Reference homepage](https://www.conejovalleycounseling.com/home)
- [Dr. Maya Reynolds’ supplied profile](https://docs.google.com/document/d/1-IJVKEjuqV9CTd9QH16UNHJ7SQfdiweS4oAIZ8vmgHU/edit)
- [Content provenance and factual boundaries](docs/content-source.md)
- [Every photograph, source, author, and license](docs/image-sources.md)

Maya’s portrait and both office photos are supplied assignment assets. Seven new licensed photographs from Unsplash and Pexels show daylight, a sheltered stone path, a quiet workspace, linen, and ceramics. They support each section’s message and palette without being presented as Maya’s premises. Reference photos and the reference logo remain exclusive to the clone. Content uses the supplied profile as its sole factual source and omits the malformed street address, retaining the supported city, state, and ZIP code.

Optimized WebP assets and their size manifest are included, so builds need no source downloads. Run `node scripts/prepare-images.mjs --theme maya` to prepare the current Maya assets while preserving clone images and existing manifest entries. The supplied portrait and office files are retained. Missing source downloads go into ignored `.asset-source/`; responsive variants never upscale. Asset records in `scripts/` include source URLs and licensing, with Maya’s image purpose and export limits. The default command without `--theme` prepares both routes.

## Browser checks

```sh
# After npm run build; starts/reuses the local Pages preview.
npm run test:e2e
```

Tests use installed Google Chrome. They cover both homepages and Maya's booking page at 320, 390, 768, 1024, and 1440 pixels; missing images and clipped text; menu and dropdown navigation; dialog focus and dismissal; FAQ expansion; every Maya booking control resolving to `/contact/` and its adapted form producing no POST, PUT, or PATCH request; WCAG AA automated checks on the redesign, Maya's booking page, and the cloned contact page; metadata; reduced motion; and static 404 handling. Clone-specific checks cover the burger morph and folder stepping, dropdown right alignment, the absence of hover tinting, the white colophon, every booking control resolving to `/original/contact/`, and a form submission that produces no POST, PUT, or PATCH request. The original’s known accent contrast is documented above rather than represented as WCAG compliant.

See the [validation record](docs/validation.md) for current checks. The previously recorded local mobile Lighthouse scores of 92 for the redesign and 84 for the clone belong to the preceding revision.

`node scripts/capture-site.mjs http://localhost:8787` captures desktop/mobile screenshots into ignored `.artifacts/` for visual review. Visual comparisons check the live reference with fonts fully loaded. Browser tests also verify matching template grid placements and successful local reference-font loading. Test traces and reports remain in ignored output directories.

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
