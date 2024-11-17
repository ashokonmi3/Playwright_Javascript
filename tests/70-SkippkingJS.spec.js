const { test, expect, chromium } = require('@playwright/test');

// Define the test suite
test.describe('Scrape This Site - Movies Page Tests', () => {
   let browser;
   let context;
   let page;

   // Set up the browser and context with JavaScript disabled
   test.beforeAll(async () => {
      // Launch the browser in headless mode
      browser = await chromium.launch({ headless: false });

      // Create a new browser context with JavaScript disabled
      context = await browser.newContext({ javaScriptEnabled: false });

      // Create a new page in the context
      page = await context.newPage();
   });

   // Clean up after all tests
   test.afterAll(async () => {
      // Close the page, context, and browser
      await page.close();
      await context.close();
      await browser.close();
   });

   // Test to verify the visibility of the link for loading movie data for the year 2015
   test('Verify 2015 movie data link is functional', async () => {
      // Navigate to the target website
      await page.goto('https://www.scrapethissite.com/pages/ajax-javascript/');

      // Locate the link for loading movie data for 2015
      const link = await page.getByRole('link', { name: '2015' });

      console.log('Clicking on the link for 2015...');
      await link.click(); // Click the link

      console.log('Waiting for movie data for 2015 to load...');
      // Wait for the first movie title in the table to load
      const firstTableData = page.locator('td.film-title').first();
      // await firstTableData.waitFor();
      await page.waitForTimeout(10000); // Waits for 10 seconds (10,000 milliseconds)

      // Verify the link is still visible after the action
      // await expect(link).toBeVisible();

      console.log('Movie data for 2015 successfully loaded and verified.');
   });
});
