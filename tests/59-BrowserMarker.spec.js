const { test, expect, firefox, webkit } = require("@playwright/test");

test.describe("Browser Specific Test Suite", () => {
  test("should run only on Firefox", async ({ page, browserName }) => {
    test.skip(browserName !== "firefox", "This test runs only on Firefox");

    await page.goto("https://example.com");
    await expect(page).toHaveTitle("Example Domain");
  });

  test("should skip Firefox browser", async ({ page, browserName }) => {
    test.skip(browserName === "firefox", "This test is skipped on Firefox");

    await page.goto("https://example.com");
    await expect(page).toHaveTitle("Example Domain");
  });

  const browsers = [
    { name: "firefox", browserType: firefox },
    { name: "webkit", browserType: webkit },
  ];

  browsers.forEach(({ name, browserType }) => {
    test(`should run manually on ${name}`, async () => {
      const browser = await browserType.launch({
        headless: false,
        slowMo: 500,
      });

      const page = await browser.newPage();

      await page.goto("https://example.com");
      await expect(page).toHaveTitle("Example Domain");

      await browser.close();
    });
  });
});
