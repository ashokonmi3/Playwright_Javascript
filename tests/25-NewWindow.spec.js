const { test, chromium } = require('@playwright/test');

/**
 * Test suite for handling new tabs in Playwright
 *
 * This test demonstrates how to handle opening and interacting with a new tab in Playwright.
 *
 * **Key Concepts Covered:**
 * - **Opening a New Tab:** Learn how to trigger an action that opens a new tab.
 * - **Switching Between Tabs:** Understand how to focus on different tabs during automation.
 * - **Waiting for Page Load:** Ensure the new tab has fully loaded before interacting with it.
 *
 * **Example Use Case:**
 * Web applications often open new tabs when users click on specific buttons or links.
 * This test suite handles those cases and ensures smooth interaction with both the original and new tabs.
 * 
 * **Configuration:**
 * - The browser is launched in non-headless mode (`headless: false`) to visualize the interactions.
 * - `slowMo: 500` is added to slow down the actions for better visualization during testing.
 * - Viewport is set to a high resolution (3840x2160) to match typical screen resolutions.
 */

test.describe('Handle New Tab Demo', () => {

   test('should open a new tab and interact with it', async () => {
      // Launch the browser with slow motion and a high viewport resolution
      const browser = await chromium.launch({
         headless: false,            // Set to false to visualize browser actions
         slowMo: 500,                // Slow down actions for better visualization
      });

      const context = await browser.newContext({
         viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
         ignoreHTTPSErrors: true,
      });

      const page = await context.newPage();

      // Navigate to the webpage containing the button that opens a new tab
      await page.goto('https://demoqa.com/browser-windows');

      // Locate the button using its ID
      const button = page.locator("#messageWindowButton");

      // Scroll the button into view if needed
      await button.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Click the button and wait for the new page to open
      const [newPage] = await Promise.all([
         context.waitForEvent('page'), // Wait for the new page event
         button.click()                // Click the button that opens a new tab
      ]);

      // Wait for the new tab to fully load
      await newPage.waitForLoadState();

      // Print the URL of the new tab
      console.log(`New tab URL: ${newPage.url()}`);

      // Switch back to the original page
      await page.bringToFront(); // Bring the original page to focus
      console.log(`Original page URL: ${page.url()}`);

      // Switch back to the new tab
      await newPage.bringToFront(); // Bring the new tab back to focus
      console.log(`Switched back to new tab URL: ${newPage.url()}`);

      // Close the new tab after use
      await newPage.close();

      // Close the browser
      await browser.close();
   });

});

/**
 * Interview Questions:
 *
 * 1. What is the purpose of using `Promise.all()` when handling new tabs in Playwright?
 *    **Answer:** `Promise.all()` is used to wait for multiple asynchronous operations to complete. In this case, 
 *    it ensures that we are waiting for both the new page event and the button click to happen simultaneously.
 *
 * 2. How do you switch between tabs in Playwright?
 *    **Answer:** You can switch between tabs by using the `bringToFront()` method on the `Page` object corresponding 
 *    to the tab you want to focus on. This brings the desired tab to the forefront, allowing you to interact with it.
 *
 * 3. Why is `waitForLoadState()` important when handling new tabs?
 *    **Answer:** `waitForLoadState()` ensures that the new tab is fully loaded before interacting with any elements 
 *    on the page. Without waiting, interactions may fail because the page is not ready for manipulation.
 *
 * 4. What is the role of `scrollIntoViewIfNeeded()` in this code?
 *    **Answer:** `scrollIntoViewIfNeeded()` ensures that the element (in this case, the button) is visible on the page before 
 *    clicking it. This helps avoid errors when interacting with elements that are out of view or require scrolling.
 */

/**
 * Explanation of Key Lines:
 * 
 * 1. context.waitForEvent('page'):
 *    - Purpose: This line waits for a new page (or tab) to open as a result of an action. In Playwright, 
 *    this ensures that the test captures the new page reference immediately when it opens.
 * 
 * 2. newPage.waitForLoadState():
 *    - Waiting for Load Completion: This method ensures that the page has fully loaded before interacting with it.
 *    - Importance: Without waiting, interactions may fail if the page is still loading.
 *
 * 3. page.bringToFront():
 *    - Switching Between Tabs: This method is used to bring a specific tab (or page) to focus so that you can interact with it.
 *    - In this example, we switch back to the original page and then return to the new tab.
 */
