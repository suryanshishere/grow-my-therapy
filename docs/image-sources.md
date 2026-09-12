# Image sources

Assets were retrieved on 12 September 2026 and are served locally from `public/images`. WebP exports preserve photographic proportions; the page applies section-specific crops. Responsive variants are generated only at or below the source width, and the checked-in image manifest lists the actual available sizes.

## Maya redesign

The coastal photographs establish a consistent palette of blue water, pale sky, sand, and botanical green. Stock landscapes are atmospheric illustrations, not photographs of Maya's office or claims about its view. The calm horizon returns in the closing section as a visual echo of the opening.

The selected Unsplash photographs are free images covered by the [Unsplash License](https://unsplash.com/license), not Unsplash+ assets. Pexels photographs are covered by the [Pexels License](https://www.pexels.com/license/). Both license pages were checked during asset selection. Credits are retained here even where attribution is optional.

| Local base filename | Subject and photographer | Source |
| --- | --- | --- |
| `maya-hero.webp`, `maya-closing-two.webp` | Calm blue ocean and pale sky — gi gi | [Pexels 31744632](https://www.pexels.com/photo/tranquil-blue-horizon-over-the-open-sea-31744632/) |
| `maya-hero-side.webp` | Hazy California shore — Valerie (@leracherry) | [Unsplash ZbneaDVW0uY](https://unsplash.com/photos/sandy-beach-with-waves-crashing-under-a-hazy-sky-ZbneaDVW0uY) |
| `maya-intro.webp` | Dune grass above the sea — Kristīne Kozaka | [Unsplash 7b5n_DbfUXY](https://unsplash.com/photos/grasses-on-sand-dunes-overlooking-the-ocean-7b5n_DbfUXY) |
| `maya-anxiety.webp` | Blue ocean surface — Nothing Ahead | [Pexels 20585987](https://www.pexels.com/photo/blue-wavy-sea-20585987/) |
| `maya-trauma.webp` | Path through coastal dunes — maarten van asten | [Pexels 32660464](https://www.pexels.com/photo/sandy-path-through-coastal-dunes-under-blue-sky-32660464/) |
| `maya-burnout.webp` | Eucalyptus leaves — Annie Spratt | [Unsplash hX_hf2lPpUU](https://unsplash.com/photos/green-leaf-hX_hf2lPpUU) |
| `maya-banner.webp` | Aerial surf at Del Mar, California — Joshua Brown | [Unsplash F0AA2IzvdO4](https://unsplash.com/photos/an-aerial-view-of-a-body-of-water-F0AA2IzvdO4) |
| `maya-transition.webp` | Coastal cove at Point Lobos — Vinu T | [Unsplash -nlLLhs5xcw](https://unsplash.com/photos/coastal-cliffs-meet-the-ocean-and-lush-hills--nlLLhs5xcw) |
| `maya-closing-one.webp` | Gentle waves at sunset — Brooke Balentine | [Unsplash -boxOd85nPU](https://unsplash.com/photos/gentle-waves-wash-onto-a-sandy-beach-at-sunset--boxOd85nPU) |
| `maya-portrait.webp` | Dr. Maya Reynolds portrait; supplied for the assignment | [Provided portrait](https://drive.google.com/file/d/1koVGhvD8mkiRXRukqrklo0HbB48p9PIa/view) |
| `maya-office-one.webp` | Office with sofa, armchair, and natural light; supplied for the assignment | [Provided office photograph 1](https://drive.google.com/file/d/1DwpoQD0VWsfGsl4J1CwtSb3Wxy5ePVJW/view) |
| `maya-office-two.webp` | Office seating and bookshelves; supplied for the assignment | [Provided office photograph 2](https://drive.google.com/file/d/1EqlCJsSNzGI93VgaQULRIwoFP2xiFioy/view) |

The three supplied practice images are used for this assignment. No broader reuse license is asserted for those images.

## Reference clone

The `/original/` route is an educational recreation of the [Conejo Valley Counseling homepage](https://www.conejovalleycounseling.com/home), using that page's exact eleven photographs and logo. These assets remain the property of their respective rights holders. They are separate from the licensed stock selection above; no independent stock license is claimed for the reference site's assets. The route is marked `noindex` and the project identifies itself as an assignment.

All reference source paths below are relative to `https://images.squarespace-cdn.com/content/v1/670423e106da6c036366fd10/`.

| Local base filename | Exact reference source path |
| --- | --- |
| `original-hero.webp` | `80513bd1-30ee-4a2d-aaf6-782d9be095ce/Jennifer+A+-+Images+%2866%29.jpg` |
| `original-hero-side.webp` | `3643a7ac-ff62-4927-b96e-9e65ecff0521/Jennifer+A+-+Images+%2867%29.jpg` |
| `original-intro.webp` | `7a40691c-70a5-4307-b9ae-974592087a8f/Jennifer+A+-+Images+%283%29.jpg` |
| `original-individuals.webp` | `066f60e6-1354-4d47-a586-ab3f2f2ba612/Jennifer+A+-+Images+%288%29.jpg` |
| `original-couples.webp` | `d0157712-388c-4800-aada-c78db97ee966/Jennifer+A+-+Images+%289%29.jpg` |
| `original-teens.webp` | `d5d62bf4-34a7-4bf4-bf00-e1169863ace7/Jennifer+A+-+Images+%2810%29.jpg` |
| `original-banner.webp` | `27b4f80c-ca73-4d1f-824e-ec29a2211142/Jennifer+A+-+Images+%282%29.png` |
| `original-approach.webp` | `389808ad-7273-4e03-a32b-c172aa735f12/Jennifer+A+-+Images+%286%29.jpg` |
| `original-transition.webp` | `6f1501bf-74a5-4c57-a957-8ce4c5876848/Jennifer+A+-+Images+%285%29.jpg` |
| `original-closing-one.webp` | `1b9495e0-ce39-4826-9df9-e24de99da82f/Jennifer+A+-+Images+%2812%29.jpg` |
| `original-closing-two.webp` | `7557312a-044d-4489-a9d1-6f43ee9888b1/Jennifer+A+-+Images+%2811%29.jpg` |
| `original-logo.webp` | `7116bf54-a0e1-4128-81d8-24fd9960c7ed/Conejo+Valley+Counseling+Logo.png` |

## Optimization and reproduction

The source photographs are downloaded at no more than 2,500 pixels wide. The site uses compressed WebP files and precomputed responsive sizes because static Next.js export does not include a runtime image optimizer. No photo is upscaled. The supplied portrait is 1,024 × 1,536 pixels and both office photographs are 1,500 × 1,125 pixels. The reference logo retains its transparency.

Temporary downloads and inspection contact sheets in `.asset-source/` are excluded from the repository and deployment. Only the optimized web assets, source documentation, and the size manifest are part of the deliverable.
