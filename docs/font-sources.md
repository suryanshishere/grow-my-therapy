# Font sources

The educational reference clone uses the same typefaces served by the [reference homepage](https://www.conejovalleycounseling.com/home), checked on September 13, 2026. These replace the earlier substitute families. Beaufort Pro Light normal and italic and Printed Moments are hosted in `public/fonts/original/` and imported only by the original-route layout.

| File | Public source used by the reference |
| --- | --- |
| `beaufort-pro-light.woff2` | [Source font](https://use.typekit.net/af/95c4e7/00000000000000007735fc7b/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3) |
| `beaufort-pro-light-italic.woff2` | [Source font](https://use.typekit.net/af/3e3437/00000000000000007735fc7d/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i3&v=3) |
| `printed-moments.woff` | [Source font](https://static1.squarespace.com/static/670423e106da6c036366fd10/t/67042f1ac94bbb494649b8e4/1728327450432/printedmoments-webfont.woff) |

These files are included as reference assets for the assignment; no independent open-source license is asserted for them. Muli is locally hosted from its Fontsource package, retaining the included license. Maya's Instrument Sans and Newsreader are also locally hosted Fontsource families with their included licenses.

Browser validation checks the loaded heading, script, and body font families and successful responses for all three reference font files. The former script-size compensation was removed: Printed Moments now uses the surrounding heading size, as on the reference.
