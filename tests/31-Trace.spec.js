// Importing necessary modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * This test suite demonstrates how to navigate to the Playwright documentation page,
 * click on the "GET STARTED" link, and validate the navigation. It includes tracing
 * and screenshots for better debugging and understanding of test execution.
 */

// Define the URL you expect after clicking the "GET STARTED" link
const DOCS_URL = "https://playwright.dev/python/docs/intro";

// Test suite for Playwright documentation navigation
test.describe('Playwright Documentation Navigation Tests', () => {

   // Test case for verifying navigation to the "GET STARTED" link
   test('Verify GET STARTED link navigation', async ({ }) => {
      // Launch a Chromium-based browser instance with specified options
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500, // Slow down actions by 500ms for better visibility
         // viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
         size: { width: 1280, height: 720 },
      });

      // Create a new browser context
      const context = await browser.newContext();

      // Start tracing for the current context
      await context.tracing.start({
         name: 'playwright',
         screenshots: true, // Capture screenshots at every step
         snapshots: true,   // Capture snapshots
         sources: true,     // Include source code in the trace
      });

      // Create a new page in the context
      const page = await context.newPage();

      // Navigate to the Playwright Python documentation website
      await page.goto('https://playwright.dev/python');

      // Locate the link with the role "link" and name "GET STARTED", then click it
      const link = page.locator('a', { hasText: 'GET STARTED' });
      await link.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await link.click();

      // Assert that the URL is the expected URL after clicking the link
      await expect(page).toHaveURL(DOCS_URL);

      // Stop tracing and save it to a file
      await context.tracing.stop({ path: 'trace333.zip' });
      // Traaceviewer https://trace.playwright.dev/
      // Close the browser context and browser
      await context.close();
      await browser.close();
   });
});

/**
 * Interview Questions:
 *
 * 1. What is the purpose of using tracing in Playwright?
 *    Answer: Tracing captures detailed information about the test execution, including
 *    screenshots, snapshots, and source code. This information can be used for debugging
 *    and understanding the flow of the test.
 */
//  config.ts file we can enable trace for all test cases
// use: {
//    /* Base URL to use in actions like `await page.goto('/')`. */
//    // baseURL: 'http://127.0.0.1:3000',

//    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//    trace: 'on-first-retry',
//       headless: false,
//   },