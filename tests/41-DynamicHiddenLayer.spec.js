// dynamicClassAttr.spec.js

const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Interacting with Dynamic Class Attributes in Playwright
 * 
 * This suite demonstrates how to interact with dynamic elements that have
 * changing attributes, such as buttons with dynamic classes or IDs. 
 * When the page is refreshed, the location and the class of the elements may change.
 *
 * Key Learning Points:
 * 1. How to locate elements using both CSS selectors and XPath.
 * 2. Best practices for working with dynamic elements.
 * 3. The use of the Playwright `expect` API for assertions, including checking visibility.
 */

test.describe('Dynamic Class Attribute Tests', () => {
   let browser;
   let page;
   const URL = "https://bootswatch.com/default/";

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
      await page.goto(URL); // Navigate to the target page
   });

   test('Interact with Dynamic Button using Class Attributes', async () => {

      // Locate the button with the tooltip
      const button = page.locator('button[data-bs-toggle="tooltip"]').first();
      await button.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Hover over the button to trigger the tooltip
      await button.hover();
      await page.waitForTimeout(5000);
      // Locate the tooltip
      const tooltip = page.locator('.tooltip');

      // Assert the tooltip is visible
      await expect(tooltip).toBeVisible();

      // Verify the tooltip text
      await expect(tooltip).toHaveText('Tooltip on left');
      await page.waitForTimeout(2000);

      // Move the mouse away and ensure the tooltip disappears
      await page.mouse.move(0, 0);
      await page.waitForTimeout(2000);

      await expect(tooltip).not.toBeVisible();
   });

   test.afterAll(async () => {
      // Close the browser after the test
      await browser.close();
   });
});

/**
 * Interview Questions:
 * 1. What are dynamic class attributes, and why are they used in web applications?
 *    - Dynamic class attributes are classes that can change based on user interactions, page states, or other conditions. They are often used for styling elements conditionally, such as highlighting a button when it is active.
 *
 * 2. How can you locate dynamic elements in Playwright?
 *    - You can locate dynamic elements using CSS selectors or XPath expressions that match part of the element's attributes or text content, allowing you to handle changes in the DOM structure.
 *
 * 3. Why is it important to check for visibility before interacting with an element?
 *    - Checking for visibility ensures that the element is present and ready for interaction, reducing the risk of encountering errors during tests and leading to more reliable automation scripts.
 *
 * 4. What are the advantages of using XPath over CSS selectors for locating elements?
 *    - XPath can handle more complex queries and is particularly useful when elements have multiple classes or attributes. It allows for more flexible searches based on the structure of the HTML document.
 *
 * 5. Explain the significance of `scrollIntoViewIfNeeded()`.
 *    - `scrollIntoViewIfNeeded()` ensures that the targeted element is visible in the viewport before any interaction occurs, which helps avoid issues where an element might be obscured or out of view during automated actions.
 */
