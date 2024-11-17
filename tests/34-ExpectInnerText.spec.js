// Import necessary modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Playwright Documentation Navigation
 * This suite demonstrates the usage of the expect API in Playwright
 * for asserting the inner text of web elements on the Playwright page.
 *
 * Steps:
 * - Navigate to the Playwright Python homepage.
 * - Verify that the dropdown menu contains specific programming languages.
 * - Verify that the main heading has the exact expected text.
 */

test.describe('Playwright Documentation Inner Text Tests', () => {
   let browser;
   let page;
   const URL = "https://playwright.dev/python";

   // Runs once before the entire suite
   test.beforeAll(async () => {
      // Launch the browser in UI mode
      browser = await chromium.launch({
         headless: false, // Runs in UI mode
         slowMo: 5000, // Slows down actions by 500ms for visibility
      });
      page = await browser.newPage({
         // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });
      await page.goto(URL); // Navigate to the specified URL
   });

   test('Validate Dropdown Menu Contains Programming Languages', async () => {
      // Locate the dropdown menu that contains programming languages
      const dropdownMenu = page.locator("ul.dropdown__menu");

      // Expect API: Check if the dropdown menu contains the text "Python"
      await dropdownMenu.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await expect(dropdownMenu).toContainText("Python");
      // Playwright doesn't need the dropdown to be visible for this check; it only needs the element and its text to exist in the DOM.
      console.log("Dropdown menu contains 'Python'.");

      // Expect API: Check if the dropdown menu contains the text "Node.js"
      await expect(dropdownMenu).toContainText("Node.js");
      console.log("Dropdown menu contains 'Node.js'.");

      // Expect API: Check if the dropdown menu contains the text "Java"
      await expect(dropdownMenu).toContainText("Java");
      console.log("Dropdown menu contains 'Java'.");

      // Expect API: Check if the dropdown menu contains the text ".NET"
      await expect(dropdownMenu).toContainText(".NET");
      console.log("Dropdown menu contains '.NET'.");
   });

   test('Validate Main Heading Text', async () => {
      // Locate the main heading of the page
      const heading = page.locator("h1.hero__title");

      // Expect API: Verify that the main heading has the exact text
      await heading.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await expect(heading).toHaveText("Playwright enables reliable end-to-end testing for modern web apps.");
      console.log("Heading has the exact expected text.");
   });

   // Runs once after all tests in the suite
   test.afterAll(async () => {
      console.log('Cleanup after all tests');
      await browser.close(); // Close the browser after tests are completed
   });
});

/*
 * Interview Questions:
 * 1. What is the purpose of the `expect` API in Playwright?
 * Answer: The `expect` API is used to make assertions about the state of elements on the page, allowing you to verify conditions like visibility, presence, and text content.

 * 2. How do you check if an element contains specific text using Playwright?
 * Answer: You can check if an element contains specific text by using `await expect(element).toContainText('Your Text')`, which asserts that the text is present within the element.

 * 3. What is the significance of the `scrollIntoViewIfNeeded` method?
 * Answer: The `scrollIntoViewIfNeeded` method scrolls the element into the viewport if it is not currently visible. This is important for ensuring that the element can be interacted with or verified.

 * 4. Why is it important to have a `beforeAll` and `afterAll` hook in your test suite?
 * Answer: The `beforeAll` hook allows you to set up resources (like launching a browser) that will be reused across tests, while the `afterAll` hook ensures that resources are properly cleaned up after all tests have completed (like closing the browser).
 */
