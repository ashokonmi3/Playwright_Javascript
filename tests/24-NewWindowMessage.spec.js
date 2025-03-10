const { test, chromium } = require('@playwright/test');

/**
 * Test suite for handling new tabs in Playwright
 * 
 * This test demonstrates how to handle opening and interacting with a new tab in Playwright.
 * 
 * **Key Concepts Covered:**
 * - **Opening a New Tab:** Trigger an action that opens a new tab in the browser.
 * - **Switching Between Tabs:** Focus on different tabs and switch back and forth between them.
 * - **Waiting for Page Load:** Ensure the new tab has fully loaded before interacting with it.
 * 
 * **Example Use Case:**
 * Web applications often open new tabs when users click on specific buttons or links. 
 * This suite handles those cases and ensures smooth interaction with both the original and new tabs.
 * 
 * **Configuration:**
 * - The browser is launched in non-headless mode (`headless: false`) to visualize the interactions.
 * - `slowMo: 500` is added to slow down the actions for better visualization during testing.
 * - Viewport is set to a high resolution (3840x2160) to match typical screen resolutions.
 */

test.describe('Handle New Tab Demo', () => {

   test('should open a new tab and interact with it', async ({ }) => {
      // Launch the browser with slow motion and a high viewport resolution
      const browser = await chromium.launch({
         headless: false,  // Set to false to visualize browser actions
         slowMo: 500,      // Slow down actions for better visibility during testing
      });

      // Create a new browser context with specified viewport and error handling
      const context = await browser.newContext({
         viewport: { width: 1720, height: 1440 },
         ignoreHTTPSErrors: true,                // Ignore HTTPS errors for smoother testing
      });

      // Open a new page in the browser context
      const page = await context.newPage();

      // Navigate to the webpage containing the button that opens a new tab
      await page.goto('https://demoqa.com/browser-windows');

      // Locate the button using its ID
      const button = page.locator("#messageWindowButton");

      // Scroll the button into view if needed
      await button.scrollIntoViewIfNeeded(); // Ensure the button is in view

      // Click the button and wait for the new page (tab) to open
      const [newPage] = await Promise.all([
         context.waitForEvent('page'), // Wait for the new page event (new tab)
         button.click()                // Click the button that opens a new tab
      ]);

      // Wait for the new tab to fully load
      await newPage.waitForLoadState(); // Ensure the new tab is fully loaded

      // Print the URL of the new tab
      console.log(`New tab URL: ${newPage.url()}`);
      await page.waitForTimeout(2000);

      // Switch back to the original page
      await page.bringToFront(); // Bring the original page into focus
      console.log(`Original page URL: ${page.url()}`);
      await page.waitForTimeout(2000);

      // Switch back to the new tab
      await newPage.bringToFront(); // Bring the new tab back into focus
      console.log(`Switched back to new tab URL: ${newPage.url()}`);
      await page.waitForTimeout(2000);

      // Close the browser after testing (optional, keep the session open if needed)
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
