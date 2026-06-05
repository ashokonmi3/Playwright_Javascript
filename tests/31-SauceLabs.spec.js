const { test, expect, chromium } = require('@playwright/test');

// Example Playwright test for Sauce Labs.
// Set SAUCE_USERNAME and SAUCE_ACCESS_KEY in your environment before running.
// Optionally set SAUCE_REGION to 'eu-central-1' for the EU data center.

test.describe('Sauce Labs Playwright Remote Test', () => {
  test('should open a remote Sauce Labs browser and verify example.com', async () => {
    const sauceUser = process.env.SAUCE_USERNAME;
    const sauceKey = process.env.SAUCE_ACCESS_KEY;
    const sauceRegion = process.env.SAUCE_REGION || 'us-west-1';

    if (!sauceUser || !sauceKey) {
      throw new Error('Please set SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables.');
    }

    const sauceHost = sauceRegion.startsWith('eu')
      ? 'playwright.eu-central-1.saucelabs.com'
      : 'playwright.us-west-1.saucelabs.com';

    const capabilities = {
      browserName: 'chromium',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'sauce:options': {
        username: sauceUser,
        accessKey: sauceKey,
        name: 'Playwright Sauce Labs Example',
        build: `Playwright Example Build ${new Date().toISOString()}`,
      },
    };

    const wsEndpoint = `wss://${sauceHost}/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;

    const browser = await chromium.connect({ wsEndpoint });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);

    await browser.close();
  });
});
