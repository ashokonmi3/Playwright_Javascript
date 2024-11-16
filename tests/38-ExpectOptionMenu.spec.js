// optionMenuExpect.spec.js

const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Option Menu Assertions in Playwright
 * 
 * This suite demonstrates the usage of the expect API in Playwright
 * for asserting the selected state of dropdown menus.
 * 
 * Topics covered:
 * - Verifying the selected option in a dropdown menu
 * - Selecting multiple options in a multi-select dropdown
 */

test.describe('Option Menu Expect Tests', () => {
   let browser;
   let page;
   const URL = "https://bootswatch.com/default";

   test.beforeAll(async () => {
      // Launch the Chromium browser (non-headless for visibility)
      browser = await chromium.launch({
         headless: false, // Run tests in a visible browser window
         slowMo: 500 // Slow down actions for visibility
      });
      page = await browser.newPage({
         // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });
      await page.goto(URL); // Navigate to the Bootswatch page
   });

   test('Validate Dropdown and Multi-Select Options', async () => {
      // Locate the single select dropdown
      const optionMenu = page.getByLabel("Example select");
      await optionMenu.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // 1. Expect the selected option to be "1"
      await expect(optionMenu).toHaveValue("1");
      console.log("Selected option in the dropdown is '1'.");

      // Locate the multiple select dropdown
      const multiOptionMenu = page.getByLabel("Example multiple select");
      await multiOptionMenu.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // 2. Select options "2" and "4"
      await multiOptionMenu.selectOption(["2", "4"]);
      console.log("Selected options '2' and '4' in the multiple select.");

      // 3. Expect the selected options to be "2" and "4"
      await expect(multiOptionMenu).toHaveValues(["2", "4"]);
      console.log("Verified selected options in the multiple select.");
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
 * 2. How do you verify if a specific option is selected in a dropdown using Playwright?
 *    - You can verify if a specific option is selected by using the `toHaveValue()` method for single selects or `toHaveValues()` for multi-selects.
 *
 * 3. How can you select multiple options in a multi-select dropdown with Playwright?
 *    - You can select multiple options by using the `selectOption()` method and passing an array of the desired option values.
 *
 * 4. What assertion would you use to check if a dropdown has a specific selected value?
 *    - You would use the `toHaveValue()` assertion to check if a dropdown has a specific selected value.
 *
 * 5. How can you ensure an element is in view before performing actions or assertions on it?
 *    - You can use the `scrollIntoViewIfNeeded()` method to ensure that an element is within the visible viewport before performing any actions or assertions on it.
 */
