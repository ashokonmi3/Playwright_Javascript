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
   const URL = "http://uitestingplayground.com/classattr";

   test.beforeAll(async () => {
      // Launch the Chromium browser (non-headless for visibility)
      browser = await chromium.launch({
         headless: false, // Run tests in a visible browser window
         slowMo: 500 // Slow down actions for visibility
      });
      page = await browser.newPage({
         viewport: { width: 3840, height: 2160 } // Set to your screen resolution
      });
      await page.goto(URL); // Navigate to the target page
   });

   test('Interact with Dynamic Button using Class Attributes', async () => {
      // --- Dynamic Element Location: CSS Selector ---
      // Locate the button using its dynamic class attribute
      const primaryBtnCSS = page.locator("button.btn-primary");
      await primaryBtnCSS.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // --- Dynamic Element Location: XPath ---
      // Alternatively, locate the button using XPath
      const primaryBtnXPath = page.locator("//button[contains(@class, 'btn-primary')]");
      await primaryBtnXPath.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // 1. Assert that the button is visible on the page using CSS selector
      await expect(primaryBtnCSS).toBeVisible();
      console.log("The dynamic button with class 'btn-primary' (CSS) is visible.");

      // 2. Assert that the button is visible on the page using XPath
      await expect(primaryBtnXPath).toBeVisible();
      console.log("The dynamic button with class 'btn-primary' (XPath) is visible.");

      // 3. Perform a click action on the button using CSS selector
      await primaryBtnCSS.click();
      console.log("Dynamic button clicked (CSS).");

      // 4. Perform a click action on the button using XPath
      await primaryBtnXPath.click();
      console.log("Dynamic button clicked (XPath).");
   });

   test.afterAll(async () => {
      // Close the browser after the test
      await browser.close();
   });
});

/**
 * Interview Questions:
 * 1. What are dynamic class attributes, and why are they used in web applications?
 *    - Dynamic class attributes are classes that can change based on user interactions, 
 * page states, or other conditions. They are often used for styling elements conditionally, such as highlighting a button when it is active.
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
