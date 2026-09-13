# Validation record

## Assignment corrections - September 13, 2026

The production static export is served locally at `http://127.0.0.1:8787/`. This record supersedes the earlier independent-layout Sunlit revision and the preceding coastal redesign.

## Layout and reference fidelity

- Maya now renders the same nine template section compositions through `HomePage`: two hero images, the original introduction arrangement, three service features, a full-width photographic statement, expertise columns, biography, bridge, four specialties blocks, and two closing images.
- Our Office is the only additional homepage section. Its custom stone panel, olive background, and two supplied office photographs remain immediately after the biography. FAQs and session information remain in dialogs.
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
- New regressions compare the nine sections' image counts, desktop column geometry, and child grid placements between Maya and the clone at 768 and 1440px. Another checks successful local loading of the actual reference fonts.
- Screenshot evidence is stored in ignored `.artifacts/criteria-maya-<width>.png` and the related section captures. Reference comparison measurements are in `.artifacts/clone-font-layout.json` and `.artifacts/clone-mobile-deltas.json`.
- The profile audit covers credentials, adult audience, three services, four modalities, Santa Monica/California session formats, FAQs, metadata, and both supplied office photographs. No fees, availability, contact details, testimonials, or treatment guarantees are invented. The malformed street address remains omitted.

## Limits and release status

The clone retains the source's pale teal accent, including its lower contrast. Maya has separate accessible color choices. Automated accessibility checks supplement visual and keyboard review; they are not a complete certification.

The previously recorded Lighthouse scores belonged to an earlier design and are not presented as current measurements.

Public release verification is pending synchronization of GitHub and Cloudflare Pages. Cloudflare uses Direct Upload, so pushing source alone does not publish the export. The public links and remaining candidate deliverables are tracked in [submission-checklist.md](submission-checklist.md).
