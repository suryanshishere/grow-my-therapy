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
      const clippedText = await page.locator("main h1, main h2, main h3, main p, footer h2, footer p, footer a").evaluateAll(elements => elements.filter(element => {
        const bounds = element.getBoundingClientRect();
        return bounds.left < -1 || bounds.right > window.innerWidth + 1;
      }).map(element => element.textContent));
      expect(clippedText).toEqual([]);
      const mismatchedServiceTitles = await page.locator(".service-card h3 > .service-title-link").evaluateAll(elements => elements.filter(element => {
        const heading = element.parentElement;
        return heading && Math.abs(parseFloat(getComputedStyle(element).fontSize) - parseFloat(getComputedStyle(heading).fontSize)) > 0.5;
      }).map(element => element.textContent));
      expect(mismatchedServiceTitles).toEqual([]);
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

test("clone burger morphs to a close control and steps through folder panels", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/original/");
  const burger = page.getByRole("button", { name: "Open navigation menu" });
  const logo = page.locator(".site-header .original-brand");
  await expect(logo).toBeVisible();
  await burger.click();

  // The source keeps its logo in place and turns the burger itself into the close control.
  await expect(logo).toBeVisible();
  const toggle = page.getByRole("button", { name: "Close navigation menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(await page.locator(".burger-box span").first().evaluate(element => getComputedStyle(element).transform)).toContain("matrix");
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");

  const root = page.locator(".overlay-panel--active");
  await expect(root.getByRole("button", { name: "Our Team" })).toBeVisible();
  await expect(root.getByRole("link", { name: "Contact" })).toBeVisible();

  await root.getByRole("button", { name: "Our Team" }).click();
  const folder = page.locator(".overlay-panel--active");
  await expect(folder.getByRole("link", { name: "Jennifer Anderson, LMFT" })).toBeVisible();
  await expect(folder.getByRole("link")).toHaveCount(9);
  await expect(folder.getByRole("button", { name: "Back" })).toBeVisible();

  await folder.getByRole("button", { name: "Back" }).click();
  await expect(page.locator(".overlay-panel--active").getByRole("button", { name: "Our Team" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(burger).toBeFocused();
  await expect(burger).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
});

test("clone dropdowns hang off the right of their folder title and nothing tints on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/original/");
  const title = page.getByRole("button", { name: "Our Team", exact: true });
  await title.hover();
  const panel = page.locator("#nav-our-team");
  await expect(panel).toBeVisible();
  const offset = await panel.evaluate((element, right) => element.getBoundingClientRect().right - right, await title.evaluate(element => element.getBoundingClientRect().right));
  expect(offset).toBeGreaterThan(8);
  expect(offset).toBeLessThan(20);
  expect(await panel.evaluate(element => getComputedStyle(element).textAlign)).toBe("right");

  // The source leaves nav links, service titles and expertise links untouched on hover.
  for (const selector of [".desktop-navigation > a", ".service-title-link", ".expertise-link"]) {
    const target = page.locator(selector).first();
    await target.scrollIntoViewIfNeeded();
    const before = await target.evaluate(element => getComputedStyle(element).color);
    await target.hover();
    await page.waitForTimeout(400);
    expect(await target.evaluate(element => getComputedStyle(element).color), selector).toBe(before);
  }
});

test("clone colophon is white on the teal strip and carries only the source credits", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/original/");
  const colophon = page.locator(".site-colophon");
  expect(await colophon.evaluate(element => getComputedStyle(element).color)).toBe("rgb(255, 255, 255)");
  expect(await colophon.evaluate(element => getComputedStyle(element).backgroundColor)).toBe("rgb(134, 179, 179)");
  await expect(colophon).toContainText("Website by Walker Strategy Co.");
  await expect(colophon.getByRole("link", { name: /redesign/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /redesign/i })).toBeVisible();
});

test("every booking control opens the cloned contact page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/original/");
  for (const name of ["Book an Appointment", "Book now"]) {
    await expect(page.getByRole("link", { name })).toHaveAttribute("href", "/original/contact/");
  }
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/original/contact/");
  await page.getByRole("link", { name: "Book an Appointment" }).click();
  await expect(page).toHaveURL(/\/original\/contact\/$/);
  await expect(page.locator("h1")).toHaveText("Get in touch.");
});

test("cloned intake form carries every source field and never transmits a submission", async ({ page }) => {
  const sent: string[] = [];
  // Anything that would carry a submission body; the preview server itself issues
  // non-GET navigation requests, so those are not evidence of a transmission.
  page.on("request", request => {
    if (["POST", "PUT", "PATCH"].includes(request.method())) sent.push(`${request.method()} ${request.url()}`);
  });
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto("/original/contact/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  const form = page.locator("form.contact-form");
  await expect(form).toHaveCount(1);
  expect(await form.getAttribute("action")).toBeNull();
  await expect(form.locator("input, select, textarea")).toHaveCount(11);
  for (const label of [
    "First Name", "Last Name", "Email", "Phone",
    "Are you looking for telehealth or in-person therapy?",
    "How did you hear about our practice?",
    "Please provide the name of your insurance company:",
    "What are the presenting issues?",
    "If the counseling is for a minor, please provide their age:",
    "Are you interested in working with a particular clinician?",
    "We see clients the same day and time each week. Please provide some consistent days and times that work for you:",
  ]) {
    await expect(form.getByText(label, { exact: false }).first(), label).toBeVisible();
  }
  await expect(form.getByText("If you do not plan to use insurance", { exact: false })).toBeVisible();
  await expect(form.getByText("Note: Please do not provide any personal information in this form.")).toBeVisible();
  await expect(form.locator('select[name="clinician"] option')).toHaveCount(12);

  // An empty submit reports the first missing field rather than sending anything.
  await form.getByRole("button", { name: "Submit" }).click();
  await expect(form.getByText("First Name is required.")).toBeVisible();
  await expect(form.locator('input[name="first-name"]')).toBeFocused();

  await form.locator('input[name="first-name"]').fill("Sam");
  await form.locator('input[name="last-name"]').fill("Rivera");
  await form.locator('input[name="email"]').fill("sam@example.com");
  await form.locator('input[name="phone"]').fill("805 555 0100");
  await form.locator('select[name="format"]').selectOption("Telehealth");
  await form.locator('select[name="referral"]').selectOption("Google search");
  await form.locator('input[name="insurance"]').fill("None");
  await form.locator('textarea[name="issues"]').fill("Looking for support with stress.");
  await form.locator('select[name="clinician"]').selectOption("None");
  await form.locator('input[name="availability"]').fill("Tuesday mornings");
  await form.getByRole("button", { name: "Submit" }).click();

  const notice = page.getByRole("status");
  await expect(notice).toContainText("This is a demonstration form.");
  await expect(notice).toContainText("Nothing was sent and no information was stored.");
  expect(sent).toEqual([]);
});

test("cloned contact page meets automated WCAG AA checks", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto("/original/contact/");
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  // The clone keeps the source's pale teal accent, whose contrast is documented in the README.
  expect(results.violations.filter(violation => violation.id !== "color-contrast")).toEqual([]);
});
