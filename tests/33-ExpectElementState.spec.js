// Import necessary modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Playwright Documentation Navigation
 * This suite demonstrates the usage of the expect API in Playwright
 * for asserting the state of web elements on the Playwright Python page.
 *
 * Steps:
 * - Navigate to the Playwright Python homepage.
 * - Verify that the 'GET STARTED' link is visible and enabled.
 * - Verify that the 'Get Python' link is hidden.
 */

test.describe('Playwright Documentation Element State Tests', () => {
   let browser;
   let page;
   const URL = "https://playwright.dev/python";

   // Runs once before the entire suite
   test.beforeAll(async () => {
      // Launch the browser in UI mode
      browser = await chromium.launch({
         headless: false, // Runs in UI mode
         slowMo: 5000 // Slows down actions by 500ms for visibility
      });
      page = await browser.newPage();
      await page.goto(URL); // Navigate to the specified URL
   });

   test('Validate GET STARTED Link Visibility and State', async () => {
      const getStartedLink = page.getByRole('link', { name: 'GET STARTED' });

      // 1. Expect API: Check if the 'GET STARTED' link is visible
      await getStartedLink.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await expect(getStartedLink).toBeVisible();
      console.log("GET STARTED link is visible.");

      // 2. Expect API: Check if the 'GET STARTED' link is enabled
      await expect(getStartedLink).toBeEnabled();
      console.log("GET STARTED link is enabled.");
   });

   test('Validate Get Python Link State', async () => {
      const getPythonLink = page.getByRole('link', { name: 'Get Python' });

      // 3. Expect API: Check if the 'Get Python' link is hidden
      await expect(getPythonLink).toBeHidden();
      console.log("Get Python link is hidden.");

      // 4. Expect API: Check if the 'Get Python' link is not visible (alternative check)
      await expect(getPythonLink).not.toBeVisible();
      console.log("Get Python link is confirmed not to be visible.");
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
 * Answer: The `expect` API is used to make assertions about the state of elements on the page. It helps verify conditions such as visibility, enablement, and existence of elements.

 * 2. How do you check if an element is visible using Playwright?
 * Answer: You can check if an element is visible by using `await expect(element).toBeVisible()`, which asserts that the element is displayed on the page.

 * 3. What does `scrollIntoViewIfNeeded` do?
 * Answer: The `scrollIntoViewIfNeeded` method scrolls the element into the viewport if it is not already visible. This is useful to ensure that the element can be interacted with or verified.

 * 4. What is the significance of the `beforeAll` and `afterAll` hooks in the test suite?
 * Answer: The `beforeAll` hook runs once before any tests in the suite, allowing for setup actions (like launching the browser). The `afterAll` hook runs once after all tests have completed, useful for cleanup actions (like closing the browser).
 */
