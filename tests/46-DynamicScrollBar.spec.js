// Importing required modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Case: Ensuring an Element is Visible on Screen by Scrolling
 * 
 * This test demonstrates how to scroll an element into view when it may be hidden 
 * behind native or custom scrollbars. It ensures that the intended element is visible 
 * before interacting with it.
 * 
 * Scenario:
 * 1. Navigate to a page with scrollbars.
 * 2. Locate a button that may be out of view.
 * 3. Scroll the button into view.
 * 4. Optionally take a screenshot to verify the result.
 */
test.describe('Dynamic Scrollbar Handling', () => {

   test('Load delay and scroll handling', async () => {
      // Launch the Chromium browser with specified configurations
      const browser = await chromium.launch({
         headless: false, // The browser will be visible
         slowMo: 500 // Slow down actions by 500ms for better visibility
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         viewport: { width: 3840, height: 2160 } // Set to your screen resolution
      });
      const page = await context.newPage();

      // Step 1: Navigate to the scrollbars test page
      console.log("Navigating to the scrollbars test page...");
      await page.goto("http://uitestingplayground.com/scrollbars");

      // Step 2: Locate the button that may be hidden
      const btn = page.getByRole("button", { name: "Hiding Button" });

      // Step 3: Scroll the button into view
      console.log("Scrolling the button into view...");
      await btn.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Optional: Click the button (uncomment if needed)
      // console.log("Clicking the button...");
      // await btn.click();

      // Step 4: Take a screenshot to confirm visibility
      console.log("Taking a screenshot of the page...");
      await page.screenshot({ path: "test-scrollbars.jpg" });
      console.log("Screenshot saved as 'test-scrollbars.jpg'.");

      // Close the browser after the test completes
      console.log("Closing the browser...");
      await browser.close();
      console.log("Test execution completed.");
   });

   /**
    * Important Notes for Learning:
    * - **Scroll Handling**: This example demonstrates how to ensure an element is visible 
    *   on screen by scrolling it into view.
    * - **Visual Verification**: Taking a screenshot can help confirm the state of the UI 
    *   after actions are performed.
    */
});

/**
 * Interview Questions:
 * 
 * 1. **Q**: Why is it important to ensure an element is visible before interacting with it?
 *    **A**: Ensuring that an element is visible before interaction prevents errors related 
 *    to attempting actions on hidden elements, which may lead to unexpected behaviors or test failures.
 * 
 * 2. **Q**: How does the `scrollIntoViewIfNeeded()` function work in Playwright?
 *    **A**: The `scrollIntoViewIfNeeded()` function scrolls the element into view only if it is not 
 *    currently visible in the viewport, ensuring that the user can see it before performing any actions.
 * 
 * 3. **Q**: What is the purpose of taking a screenshot during tests?
 *    **A**: Taking a screenshot helps verify the UI state after actions are performed, serving 
 *    as a visual confirmation of expected behavior.
 * 
 * 4. **Q**: How can scroll handling impact user experience in web applications?
 *    **A**: Proper scroll handling ensures that users can access and interact with all elements 
 *    on a page, leading to a smoother and more intuitive user experience.
 */
