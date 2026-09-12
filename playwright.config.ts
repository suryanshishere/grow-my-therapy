import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.TEST_BASE_URL ?? "http://127.0.0.1:8787",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.TEST_BASE_URL ? undefined : {
    command: "npm run preview",
    url: "http://127.0.0.1:8787",
    reuseExistingServer: true,
    timeout: 90_000,
  },
});
