// checkboxExpect.spec.js

const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Checkbox Assertions in Playwright
 * 
 * This suite demonstrates the usage of the expect API in Playwright
 * for asserting the checked state of checkboxes.
 * 
 * Topics covered:
 * - Verifying the checked state of checkboxes
 */

test.describe('Checkbox Expect Tests', () => {
   let browser;
   let page;
   const URL = "https://bootswatch.com/default";

   test.beforeAll(async () => {
      // Launch the Chromium browser (non-headless for visibility)
      browser = await chromium.launch({
         headless: false, // Run tests in a visible browser window
         slowMo: 5000 // Slow down actions for visibility
      });
      page = await browser.newPage({
         // viewport: { width: 1920, height: 1080 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });
      await page.goto(URL); // Navigate to the Bootswatch page
   });

   test('Validate Checkbox States', async () => {
      // Locate the checkboxes using their labels
      const defaultCheckbox = page.getByLabel("Default checkbox");
      const checkedCheckbox = page.getByLabel("Checked checkbox");

      // Scroll to the checked checkbox to ensure it's in view
      await checkedCheckbox.scrollIntoViewIfNeeded();

      // 1. Expect that the checked checkbox is checked
      await expect(checkedCheckbox).toBeChecked();
      console.log("Checked checkbox is checked.");

      // 2. Expect that the default checkbox is unchecked
      await expect(defaultCheckbox).not.toBeChecked();
      console.log("Default checkbox is unchecked.");
   });

   test.afterAll(async () => {
      // Close the browser after the test
      await browser.close();
   });
});

/**
 * Interview Questions:
 * 1. What is the purpose of the `expect` API in Playwright?
 *    - The `expect` API is used to perform assertions in Playwright tests, ensuring that the expected state of elements matches the actual state.
 *
 * 2. How do you verify if a checkbox is checked using Playwright?
 *    - You can verify if a checkbox is checked using the `toBeChecked()` method of the `expect` API.
 *
 * 3. What assertion would you use to check if a checkbox is not checked?
 *    - You would use the `not.toBeChecked()` method to assert that the checkbox is unchecked.
 *
 * 4. Can you explain how the `scrollIntoViewIfNeeded` method works and why it's used before assertions?
 *    - The `scrollIntoViewIfNeeded` method ensures that an element is within the visible viewport before performing actions or assertions on it, preventing potential errors related to element visibility.
 *
 * 5. How can you assert that a checkbox's label is correctly displayed?
 *    - You can use the `toHaveText()` method to assert that the label of the checkbox matches the expected text, ensuring it is displayed correctly next to the checkbox.
 */
