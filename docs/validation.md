# Validation record

Reviewed on September 12, 2026, using the production static export served by Cloudflare's local Pages preview.

## Build and browser checks

- ESLint, strict TypeScript checking, and the production Next.js build passed.
- Twenty-two Playwright checks cover both routes at 320, 390, 768, 1024, and 1440 pixels; image loading and text clipping; service-heading hierarchy; desktop dropdowns; mobile navigation; FAQ expansion; consultation demo behavior; focus containment, Escape, and focus restoration; reduced motion; metadata; and static 404 handling.
- Automated axe checks passed on the Maya page and FAQ dialog for WCAG A/AA criteria. Automated checks do not constitute a complete accessibility certification.
- The clone was compared manually with the reference at 390, 768, and 1440 pixels, including section proportions, image crops, mobile order, and the reference's 799px hamburger breakpoint.
- Redesign copy, FAQ answers, dialog text, footer credentials, and location were checked against the supplied profile. The supplied portrait and both office photographs are included.

A second spacing and layout pass measured section and content bounds at all five widths. Maya keeps 6vw mobile gutters (19.2px at 320 and 23.4px at 390), with no accidental section gaps, overlaps, or horizontal overflow. That pass corrected the mobile service-title cascade, contained the clone footer email at 768, and aligned the clone's approach and banner focal points with the reference. The clone's full-page height is within 0.1% of the reference at 390; at 1440, its individual section boundaries are within one pixel. Tablet height differences are caused primarily by the documented font substitutions changing line wraps.

## Reference fidelity pass

A third pass compared the clone with the live reference under scripted measurement rather than by eye: a text-keyed inventory of every visible node's computed styles and geometry, pixel sampling of the rendered full-page screenshots, and scripted hover and scroll probes at 390, 768, 1024, and 1440 pixels.

That pass confirmed several things already correct and left alone: the 799px hamburger breakpoint, the non-sticky header, and the absence of scroll-triggered animation on both sides. The reference emits 36 `data-animation-role` attributes but no active animation nodes, and nothing below the fold is staged at reduced opacity.

It corrected the following:

- **Colour.** The colophon's text is white on the teal strip, not `#2B2B2B`. The approach band and service-card titles use pure black against the site's `#2B2B2B` body ink. The approach band's eyebrow stays at the body ink. `--color-sand` was one unit of blue off (`#E3D9CB` to `#E3D9CA`), and the rule under text links is `#515151` rather than the text colour.
- **Motion.** The text-link rule now collapses its right edge inward over one second, matching the reference; it previously scaled away in the opposite direction over 0.6 seconds. Navigation links no longer underline on hover, service titles and expertise links no longer tint teal, and the oval button keeps its dark outline through the fill change and retimes to `background-color .1s linear, color .1s linear`.
- **Typography.** Navigation links take the reference's weight, line height, and right alignment. Script accents are scaled so Allura matches the reference's measured word widths, which also restored the reference's line break in the expertise heading. The hero heading's measure is trimmed so its line breaks match the reference at 768, 820, 900, 1024, 1200, and 1440 pixels. The mobile booking link is 13.48px, and the three expertise items without a link were being left at 14px while their linked siblings rendered at 15px.
- **Navigation and layout.** Desktop dropdowns hang off the right edge of their folder title rather than overflowing to the right across the hero. The mobile menu is rebuilt as the reference's stepping sheet. The colophon carries only the reference's own credits; the switch between the two assignment versions moved out of it.
- **The booking page.** Every booking control previously left the site. `/original/contact/` now recreates the reference page and its intake form.

After the pass, every background band matches the reference colour for colour at 390 and 1440, with boundaries within two pixels. Full-page height is within 0.03% at 1440 and 0.16% at 390. Remaining differences are the documented font substitutions and the element-versus-inline measurement artifacts they cause.

## Public deployment checks

The Pages deployment was verified at [the redesign](https://grow-my-therapy-suryansh.pages.dev/) and [the clone](https://grow-my-therapy-suryansh.pages.dev/original/) on September 12, 2026. Both returned HTTP 200 on direct requests and refreshes. All page images loaded; the clone returned its noindex header. All 13 visible desktop FAQ and consultation triggers opened the expected dialog and restored focus after Escape. Public mobile navigation, FAQ transitions, automated accessibility, metadata, and the missing-page route passed three additional Playwright checks. The favicon, robots file, sitemap, image response headers, and HTTP 404 were also verified.

The [GitHub repository](https://github.com/suryanshishere/grow-my-therapy) is public and contains the source on `main`. Cloudflare uses Direct Upload; automatic deployments are not enabled.

All 27 external links retained by the reference clone returned HTTP 200 during the final link audit.

## Mobile performance

Lighthouse 13.4.1, simulated mobile Slow 4G and 4× CPU slowdown, with an empty browser cache against the local production Pages preview:

| Route | Performance | First contentful paint | Largest contentful paint | Total blocking time | Layout shift | Initial transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Maya `/` | 92 | 1.38s | 1.46s | 345ms | 0.011 | 573 KiB |
| Clone `/original/` | 84 | 1.62s | 3.88s | 164ms | 0.073 | 543 KiB |

These are single local lab measurements, not field data or guarantees of visitor performance. The Windows host reported CPU variability during one audit. The redesign's score improved from 79 to 92 after enabling inline CSS; three blocking stylesheet requests were removed. Both routes have explicit image dimensions, responsive local WebP files, local fonts, and lazy loading below the hero.

The clone's heading font swap remains a source of loading delay and minor layout movement. Approved font substitutions also change some line breaks. The clone retains the source's pale teal accent, which has lower contrast than the redesign. These fidelity tradeoffs are intentional and documented in the README.

Raw Lighthouse reports and screenshots are kept in ignored `.artifacts/`; Playwright produces ignored HTML reports and failure traces. The reproducible browser and screenshot commands are in the README. Verified public route and repository links are recorded in the submission checklist.
