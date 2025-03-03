// docsInputExpect.spec.js

const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Playwright Documentation Search Input Assertions
 * 
 * This suite demonstrates the usage of the expect API in Playwright
 * for asserting the visibility, editability, and value of an input field.
 * 
 * Topics covered:
 * - Verifying initial visibility of an input field
 * - Checking if an input field is editable
 * - Asserting that an input field is initially empty
 * - Filling an input field and verifying its value
 */

test.describe('Playwright Documentation Search Input Tests', () => {
   let browser;
   let page;
   const URL = "https://playwright.dev/python";

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
      await page.goto(URL); // Navigate to the Playwright Python documentation page
   });

   test('Validate Search Input Functionality', async () => {
      // Locate the search input using its placeholder
      const searchInput = page.getByPlaceholder("Search docs");

      // 1. Initially, the search input should be hidden
      await expect(searchInput).toBeHidden();

      // 2. Locate the search button and click it to focus on the search input
      const searchButton = page.getByRole("button", { name: "Search" });
      await searchButton.click();

      // 3. After clicking the button, the search input should become visible and editable
      await expect(searchInput).toBeVisible();
      await expect(searchInput).toBeEditable();

      // 4. The search input should be empty initially before any text is entered
      await expect(searchInput).toBeEmpty('checking the field is empty');

      // 5. Define a search query to fill into the input
      const query = "assertions";
      // const query = "xyz";

      // 6. Fill the search input with the query
      await searchInput.fill(query);
      await searchInput.fill('xyz');

      // 7. Verify that the input value now matches the query
      await expect(searchInput, "Expected value of search input to be '${query}'").toHaveValue(query);
   });

   test.afterAll(async () => {
      // Close the browser after the test
      await browser.close();
   });
});

/**
 *  Questions:
 * 1. What is the purpose of the `expect` API in Playwright?
 *    - The `expect` API is used to perform assertions in Playwright tests, ensuring that the expected state of elements matches the actual state.
 *
 * 2. How do you verify the visibility of an element using Playwright?
 *    - You can verify the visibility of an element using the `toBeVisible()` method of the `expect` API.
 *
 * 3. What assertion would you use to check if an input field is initially empty?
 *    - You would use the `toBeEmpty()` method to assert that the input field is empty before any text is entered.
 *
 * 4. How can you simulate user input in Playwright?
 *    - You can simulate user input using methods like `fill()`, which sets the value of an input field to a specified string.
 *
 * 5. What does the `scrollIntoViewIfNeeded()` method do, and why is it useful?
 *    - The `scrollIntoViewIfNeeded()` method scrolls the page until the element is in view, ensuring that elements are visible before interactions.
 */
