import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const baseURL = process.argv[2] ?? "http://127.0.0.1:3000";
await fs.mkdir(".artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const width of [1440, 390, 768, 1024, 320]) {
  for (const route of ["", "original/"]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.goto(`${baseURL}/${route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode().catch(() => {}));
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `.artifacts/${route ? "clone" : "maya"}-${width}.png`, fullPage: true });
    if (width === 1440 || width === 390) await page.screenshot({ path: `.artifacts/${route ? "clone" : "maya"}-hero-${width}.png` });
    console.log(JSON.stringify({ route: route || "/", width, height: await page.locator("body").evaluate(e => e.scrollHeight), sections: await page.locator("main section").evaluateAll(elements => elements.map(e => ({ name: e.className.split(" ")[0], height: Math.round(e.getBoundingClientRect().height) }))) }));
    await page.close();
  }
}
await browser.close();
