const { test, expect, describe, chromium } = require('@playwright/test');

// URL for Playwright documentation
const DOCS_URL = 'https://playwright.dev/python/docs/intro';

// Test suite for Playwright documentation tests
describe('Playwright Documentation Tests', () => {
   let browser;
   let context;
   let page;

   // Setup for each test - launches the browser and creates a new page.
   test.beforeEach(async () => {
      console.log('Launching the browser');
      browser = await chromium.launch({ headless: false }); // Launch in UI mode
      context = await browser.newContext(); // Create a new browser context
      page = await context.newPage(); // Create a new page
      await page.goto('https://playwright.dev/python'); // Navigate to the initial URL
   });

   // Teardown for each test - closes the browser after each test.
   test.afterEach(async () => {
      await browser.close(); // Close the browser after the test is done
      console.log('\n[ Teardown ]: Browser closed!');
   });

   // Test that verifies the visibility of the Docs link on the Playwright page.
   test('Page has Docs link', async () => {
      const link = page.getByRole('link', { name: 'Docs' });
      await expect(link).toBeVisible();
   });

   // Test that checks clicking the Get Started link redirects to the Docs page.
   test('Get Started visits Docs', async () => {
      const link = page.getByRole('link', { name: 'GET STARTED' });
      await link.click();
      await expect(page).toHaveURL(DOCS_URL);
   });
});
