const { test, expect, chromium } = require('@playwright/test');

// Fixture to create a browser and page object
test.describe('Browser and Page Tests', () => {
   let browser;
   let page;

   test.beforeAll(async () => {
      // Launch the browser in headful mode (visible)
      browser = await chromium.launch({
         headless: false,
         slowMo: 2000 // Set slow motion for visibility
      });
      // Create a new page
      page = await browser.newPage();
   });

   test.afterAll(async () => {
      // Close the browser after tests are done
      await browser.close();
   });

   // Test data for parameterization
   const testData = [
      { url: 'https://example.com', title: 'Example Domain' },
      { url: 'https://www.wikipedia.org', title: 'Wikipedia' },
      { url: 'https://www.google.com', title: 'Google' }
   ];

   // Parameterized tests
   testData.forEach(({ url, title }) => {
      test(`Verify title for ${url}`, async () => {
         await page.goto(url); // Navigate to the URL
         const pageTitle = await page.title(); // Get the page title
         expect(pageTitle).toBe(title); // Assert the title
      });
   });
});
