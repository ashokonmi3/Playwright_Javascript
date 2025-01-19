// dynamicIdExpect.spec.js

const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Expect Assertions with Dynamic ID in Playwright
 * 
 * This suite demonstrates the usage of the expect API in Playwright
 * for asserting the visibility of elements with dynamic IDs.
 * 
 * Topics covered:
 * - Verifying the visibility of a button with a dynamic ID
 * - Interacting with elements in a UI testing playground
 */

test.describe('Dynamic ID Expect Tests', () => {
   let browser;
   let page;
   const URL = "http://uitestingplayground.com/dynamicid";

   test.beforeAll(async () => {
      // Launch the Chromium browser (non-headless for visibility)
      browser = await chromium.launch({
         headless: false, // Run tests in a visible browser window
         slowMo: 500 // Slow down actions for visibility
      });
      page = await browser.newPage({
         // viewport: { width: 1920, height: 1080 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });
      await page.goto(URL); // Navigate to the UI Testing Playground
   });

   test('Validate Button with Dynamic ID', async () => {
      // Locate the button with a dynamic ID
      const button = page.getByRole('button', { name: 'Button with Dynamic ID' });
      await button.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // 1. Expect the button to be visible
      await expect(button).toBeVisible();
      console.log("Button with dynamic ID is visible.");

      // 2. Click the button
      await button.click();
      console.log("Button clicked.");

      // Optional: Wait for some result after clicking, if applicable
      // For example, checking for a change in text or appearance
      // const newElement = page.getByText("Expected Result");
      // await expect(newElement).toBeVisible();
   });

   test.afterAll(async () => {
      // Close the browser after the test
      await browser.close();
   });
});

/**
 * Interview Questions:
 * 1. What does the `expect` API do in Playwright?
 *    - The `expect` API allows you to write assertions that verify if a condition is met, such as visibility, text content, or state of elements in your tests.
 *
 * 2. How can you assert that a button is visible on the page using Playwright?
 *    - You can use the `toBeVisible()` assertion to check if a button or any other element is currently visible in the viewport.
 *
 * 3. What is the purpose of `scrollIntoViewIfNeeded()`?
 *    - The `scrollIntoViewIfNeeded()` method ensures that the element is visible within the viewport by scrolling it into view if necessary.
 *
 * 4. Why might you need to verify the visibility of an element before interacting with it?
 *    - Verifying visibility ensures that the element is not hidden or obstructed, which can prevent errors during interaction and improve test reliability.
 *
 * 5. What would you do if an element is not visible as expected?
 *    - If an element is not visible, you may need to investigate further, check for timing issues, or verify the selector and ensure that the element is correctly rendered in the DOM.
 */
