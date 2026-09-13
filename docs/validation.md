# Validation record

## Assignment corrections - September 13, 2026

The production static export is served locally at `http://127.0.0.1:8787/`. This record supersedes the earlier independent-layout Sunlit revision and the preceding coastal redesign.

## Layout and reference fidelity

- Maya keeps the clone's nine sections in the same order with the same image count in each: two hero images, one introduction photograph, three service photographs, a full-width statement, a biography portrait, a bridge photograph, and two closing images. Each section's layout is redesigned; this supersedes the template-geometry revision, and the browser test now checks section order and image counts rather than grid placements.
- Our Office is the only additional homepage section. Its olive background, two supplied office photographs, and stone details band remain immediately after the biography. FAQs remain in a dialog; booking has its own page at `/contact/`.
- The clone uses the reference's actual Beaufort Pro Light normal/italic, Printed Moments, and Muli fonts. Their sources are documented in [font-sources.md](font-sources.md).
- Comparison with the live reference at 1000px viewport height found all nine section boundaries within rounding (less than 1px) at widths 768, 1024, and 1440px. At 320 and 390px, boundaries differ by about 3px or less. These are measured section boundaries, not a claim that every rendered pixel is identical.
- Corrections use the source's viewport-relative section padding, per-section column gaps, service subgrids, and 24px minimum phone grid rows. They replace values previously tuned to a single phone width.
- Maya keeps Instrument Sans, Newsreader, the olive/stone/plum palette, profile-based copy, and naturally colored replacement photography. Stock interiors are not described as the actual practice.

## Production validation

- Next.js production build: passed, including TypeScript compilation and all static routes.
- ESLint and standalone TypeScript: passed.
- All **30 Playwright tests passed**, with no failures, skips, or flaky tests.
- Final production screenshots at all five widths recorded no overflow, clipped text, broken images, or browser errors. Maya homepage and FAQ dialog axe checks passed; keyboard, reduced-motion, and cross-route navigation checks passed.
- The browser suite covers both homepage routes at 320, 390, 768, 1024, and 1440px, plus the cloned contact page; image loading, text bounds, navigation, menus, FAQs, dialogs, focus containment/restoration, reduced motion, metadata, and 404 behavior.
- Regressions compare the nine sections' order and image counts between Maya and the clone at 768 and 1440px, and check that Maya's photographs stay inside the page margin at five widths without repeats. Another checks successful local loading of the actual reference fonts.
- Screenshot evidence is stored in ignored `.artifacts/criteria-maya-<width>.png` and the related section captures. Reference comparison measurements are in `.artifacts/clone-font-layout.json` and `.artifacts/clone-mobile-deltas.json`.
- The profile audit covers credentials, adult audience, three services, four modalities, Santa Monica/California session formats, FAQs, metadata, and both supplied office photographs. No fees, availability, contact details, testimonials, or treatment guarantees are invented. The malformed street address remains omitted.

## Limits and release status

The clone retains the source's pale teal accent, including its lower contrast. Maya has separate accessible color choices. Automated accessibility checks supplement visual and keyboard review; they are not a complete certification.

The previously recorded Lighthouse scores belonged to an earlier design and are not presented as current measurements.

The corrected implementation was committed as `683448f` and pushed to the public GitHub repository on September 13, 2026. The tested export was deployed to Cloudflare Pages as [deployment f46cc7fd](https://f46cc7fd.grow-my-therapy-suryansh.pages.dev/).

All three public routes returned HTTP 200 and their HTML matched the tested export by SHA-256: `/`, `/original/`, and `/original/contact/`. Both original routes retained `X-Robots-Tag: noindex, nofollow`.

All **9 public Playwright smoke tests passed**, covering desktop and mobile layout preservation, local reference-font loading, menus, session dialog focus, FAQ accessibility, navigation between versions, cloned contact navigation, metadata, and 404 behavior.

The canonical [redesign](https://grow-my-therapy-suryansh.pages.dev/), [clone](https://grow-my-therapy-suryansh.pages.dev/original/), and [repository](https://github.com/suryanshishere/grow-my-therapy) are synchronized. Cloudflare uses Direct Upload, so future source pushes still require an explicit deployment. Subsequent documentation-only commits record this verification without changing the deployed application. The Loom link and candidate submission steps remain pending in [submission-checklist.md](submission-checklist.md).
