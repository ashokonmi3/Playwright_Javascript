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
         viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
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
 *
 * 2. How does the `record_video` option work in Playwright?
 *    Answer: The `record_video` option specifies the directory where the recorded videos
 *    will be saved. Each video is associated with a browser context and is saved after
 *    the context is closed.
 *
 * 3. Why is it important to scroll an element into view before interacting with it?
 *    Answer: Some elements may not be visible on the screen, and attempting to interact
 *    with such elements can result in errors. Scrolling them into view ensures they are
 *    interactable and prevents unexpected failures in tests.
 *
 * 4. What does the `slowMo` option do in Playwright?
 *    Answer: The `slowMo` option adds a delay between each action taken by the test,
 *    which helps in observing the actions as they occur, making debugging easier.
 */
