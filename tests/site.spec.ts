import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const route of ["/", "/original/"]) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`${route} renders without overflow or missing images at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      // Catch content hidden by the overflow clip used for intentional edge photos.
      const clippedText = await page.locator("main h1, main h2, main h3, main p").evaluateAll(elements => elements.filter(element => {
        const bounds = element.getBoundingClientRect();
        return bounds.left < -1 || bounds.right > window.innerWidth + 1;
      }).map(element => element.textContent));
      expect(clippedText).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test("consultation is an accessible informational demo and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: "Let’s connect" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("appointments cannot be booked here");
  await expect(dialog.locator("input, textarea, form")).toHaveCount(0);
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("FAQs expand and the consultation dialog closes on the backdrop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: "FAQs" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.locator("summary").filter({ hasText: "Can we meet in person or online?" }).click();
  await expect(dialog.getByText("My practice offers in-person therapy", { exact: false })).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(dialog).not.toBeVisible();
});

test("mobile menu supports nested navigation, focus restoration, and FAQ transitions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  await page.getByRole("dialog").locator("summary").filter({ hasText: "Services" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Trauma", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/#service-2$/);
  await expect(page.locator("#service-2")).toBeInViewport();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await trigger.click();
  await page.getByRole("dialog").getByRole("button", { name: "FAQs" }).click();
  await expect(page.getByRole("dialog")).toContainText("Before we begin.");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("desktop dropdowns and every redesign anchor lead to existing content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Services", exact: true }).hover();
  await expect(page.locator("#nav-services")).toBeVisible();
  await page.locator("#nav-services").getByRole("link", { name: "Anxiety & panic" }).click();
  await expect(page).toHaveURL(/#service-1$/);
  const broken = await page.locator('a[href^="#"]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute("href")!).filter(href => href.length < 2 || !document.getElementById(decodeURIComponent(href.slice(1)))));
  expect(broken).toEqual([]);
});

test("Maya page and dialogs meet automated WCAG AA checks", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const scan = () => new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect((await scan()).violations).toEqual([]);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: "FAQs" }).click();
  expect((await scan()).violations).toEqual([]);
});

test("source fidelity, SEO metadata, reduced motion, and static 404", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Anxiety and trauma therapy in Santa Monica, CA");
  await expect(page.locator("#office img")).toHaveCount(2);
  await expect(page.locator(".service-card")).toHaveCount(3);
  await expect(page.locator(".specialty-card")).toHaveCount(4);
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior)).toBe("auto");
  await expect(page.locator("body")).not.toContainText(/Conejo|Newbury|123th|free consultation|insurance/i);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Santa Monica/);
  await page.goto("/original/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("#office")).toHaveCount(0);
  const response = await page.goto("/this-page-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to the homepage" })).toBeVisible();
});
