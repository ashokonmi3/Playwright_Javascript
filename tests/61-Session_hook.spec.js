const { test, expect, chromium } = require('@playwright/test');

// Test suite for Playwright tests
test.describe('Playwright Navigation Tests', () => {
   let browser;
   let page;

   // Setup for the entire test session - launches the browser and creates a new page.
   test.beforeAll(async () => {
      console.log("Initializing browser and page"); // Log initialization
      browser = await chromium.launch({ headless: false }); // Launch in UI mode
      page = await browser.newPage(); // Create a new page
   });

   // Teardown for the entire test session - closes the browser after all tests.
   test.afterAll(async () => {
      await page.close(); // Close the page
      await browser.close(); // Close the browser
      console.log("Finished"); // Log completion
   });

   // Test that verifies navigation to the Playwright homepage.
   test('Navigate to Playwright homepage', async () => {
      await page.goto("https://playwright.dev"); // Navigate to the Playwright homepage
      await page.waitForLoadState('load'); // Wait for the page to fully load

      expect(await page.title()).toBe("Fast and reliable end-to-end testing for modern web apps | Playwright"); // Check the title
   });

   // Test that checks if the "Get Started" button is visible on the Playwright page.
   test('Check element visibility', async () => {
      await page.goto("https://playwright.dev"); // Navigate to the Playwright homepage
      const getStartedButton = page.locator("text=Get Started");
      await expect(getStartedButton).toBeVisible(); // Check visibility of the button
   });

   // Test that verifies the visibility of the Docs link on the Playwright page.
   test('Check Docs link visibility', async () => {
      await page.goto("https://playwright.dev"); // Navigate to the Playwright homepage
      const docsLink = page.locator("text=Docs");
      await expect(docsLink).toBeVisible(); // Check visibility of the Docs link
   });
});


// Global Setup and Teardown:

// The beforeAll method is used to initialize the browser and page only once per session.
// The afterAll method is used to clean up resources by closing the page and the browser.
// Test Cases:

// Each test case uses the same page instance that was created in the beforeAll block.
// The expect function is used to assert conditions in the tests.