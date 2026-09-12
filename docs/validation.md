# Validation record

Reviewed on September 12, 2026, using the production static export served by Cloudflare's local Pages preview.

## Build and browser checks

- ESLint, strict TypeScript checking, and the production Next.js build passed.
- Sixteen Playwright checks cover both routes at 320, 390, 768, 1024, and 1440 pixels; image loading and text clipping; desktop dropdowns; mobile navigation; FAQ expansion; consultation demo behavior; focus containment, Escape, and focus restoration; reduced motion; metadata; and static 404 handling.
- Automated axe checks passed on the Maya page and FAQ dialog for WCAG A/AA criteria. Automated checks do not constitute a complete accessibility certification.
- The clone was compared manually with the reference at 390, 768, and 1440 pixels, including section proportions, image crops, mobile order, and the reference's 799px hamburger breakpoint.
- Redesign copy, FAQ answers, dialog text, footer credentials, and location were checked against the supplied profile. The supplied portrait and both office photographs are included.

## Public deployment checks

The Pages deployment was verified at [the redesign](https://grow-my-therapy-suryansh.pages.dev/) and [the clone](https://grow-my-therapy-suryansh.pages.dev/original/) on September 12, 2026. Both returned HTTP 200 on direct requests and refreshes. All page images loaded; the clone returned its noindex header. All 13 visible desktop FAQ and consultation triggers opened the expected dialog and restored focus after Escape. Public mobile navigation, FAQ transitions, automated accessibility, metadata, and the missing-page route passed three additional Playwright checks. The favicon, robots file, sitemap, image response headers, and HTTP 404 were also verified.

The [GitHub repository](https://github.com/suryanshishere/grow-my-therapy) is public and contains the source on `main`. Cloudflare uses Direct Upload; automatic deployments are not enabled.

## Mobile performance

Lighthouse 13.4.1, simulated mobile Slow 4G and 4× CPU slowdown, with an empty browser cache against the local production Pages preview:

| Route | Performance | First contentful paint | Largest contentful paint | Total blocking time | Layout shift | Initial transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Maya `/` | 92 | 1.38s | 1.46s | 345ms | 0.011 | 573 KiB |
| Clone `/original/` | 84 | 1.62s | 3.88s | 164ms | 0.073 | 543 KiB |

These are single local lab measurements, not field data or guarantees of visitor performance. The Windows host reported CPU variability during one audit. The redesign's score improved from 79 to 92 after enabling inline CSS; three blocking stylesheet requests were removed. Both routes have explicit image dimensions, responsive local WebP files, local fonts, and lazy loading below the hero.

The clone's heading font swap remains a source of loading delay and minor layout movement. Approved font substitutions also change some line breaks. The clone retains the source's pale teal accent, which has lower contrast than the redesign. These fidelity tradeoffs are intentional and documented in the README.

Raw Lighthouse reports and screenshots are kept in ignored `.artifacts/`; Playwright produces ignored HTML reports and failure traces. The reproducible browser and screenshot commands are in the README. Verified public route and repository links are recorded in the submission checklist.
