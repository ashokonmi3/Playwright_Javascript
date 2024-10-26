const { chromium } = require('playwright');
const { test } = require('@playwright/test'); // Importing the test function from Playwright

test.describe('New Tab Handling Test Suite', () => {
   /**
    * This function demonstrates how to handle new tabs in Playwright.
    *
    * **Key Concepts Covered:**
    * - **Opening a New Tab:** Learn how to trigger an action that opens a new tab.
    * - **Switching Between Tabs:** Understand how to focus on different tabs during automation.
    *
    * **Example Use Case:**
    * In web applications, clicking on certain links or buttons often opens new tabs. This function illustrates how to manage such scenarios effectively.
    *
    * **Steps Explained:**
    * 1. Launch the browser in non-headless mode and maximize the window.
    * 2. Open a specified webpage that contains a button to open a new tab.
    * 3. Click the button to open the new tab and switch focus between the original and new tabs.
    */

   test('Handle New Tab Demo', async () => {
      // Launch the browser in non-headless mode with slow motion
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500,
      });

      // Create a new browser context with a specified viewport
      const context = await browser.newContext({
         ignoreHTTPSErrors: true,
         viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
      });

      const page = await context.newPage();

      // Navigate to the test page that opens a new tab
      await page.goto("https://demoqa.com/browser-windows");

      const button = page.locator("#tabButton");
      // await button.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Click the button that opens a new tab
      // await button.click();
      // Wait for the new page to open
      // const newPage = await context.waitForEvent('page'); // Wait for the new page event


      const [newPage] = await Promise.all([
         context.waitForEvent('page'), // Wait for the new page event
         button.click()                // Click the button that opens a new tab
      ]);

      // Wait for the new tab to fully load
      await newPage.waitForLoadState();

      // Print the URL of the new tab
      console.log(`New tab URL: ${newPage.url()}`);


      // Wait for the new tab to fully load
      await newPage.waitForLoadState();

      // Print the URL of the new tab
      console.log(`New tab URL: ${newPage.url()}`);
      // Wait a bit for demonstration purposes
      await newPage.waitForTimeout(5000);

      // Switch back to the original page
      await page.bringToFront(); // Bring the original page to focus
      console.log(`Original page URL: ${page.url()}`);

      await page.waitForTimeout(5000);

      // Switch back to the new tab
      await newPage.bringToFront(); // Bring the new tab back to focus
      console.log(`Switched back to new tab URL: ${newPage.url()}`);

      await newPage.waitForTimeout(1000);

      // Close the new tab after use (optional)
      await newPage.close();

      // Close the browser (optional)
      await browser.close();
   });
});

// Interview Questions:
/**
 * 1. What is the purpose of using `waitForEvent('page')` in Playwright?
 *    Answer: `waitForEvent('page')` is used to wait for a new page (or tab) to open after an action, allowing us to capture the new page reference immediately.
 *
 * 2. How do you switch between tabs in Playwright?
 *    Answer: You can switch between tabs by using the `bringToFront()` method on the `Page` object corresponding to the tab you want to focus on.
 *
 * 3. What happens if you try to interact with a tab that has not fully loaded?
 *    Answer: If you attempt to interact with a tab that hasn't fully loaded, it may lead to errors or unexpected behavior. It's essential to use `waitForLoadState()` to ensure the page is ready for interaction.
 */

// Explanation of Key Lines:
/**
 * 1. const [newPage] = await Promise.all([...]);
 *    - Purpose: This line waits for the new page event to occur when the button is clicked and captures the new page reference in the same operation.
 *    - Promise.all: Using Promise.all allows for simultaneous execution, ensuring that both the click action and the page opening are handled properly.
 * 
 * 2. await newPage.waitForLoadState();
 *    - Waiting for Load Completion: This method is called on the newly opened page object to ensure that the page has fully loaded before you try to interact with it.
 *    - Load States: Playwright defines different load states (like load, domcontentloaded, networkidle, etc.). By using waitForLoadState(), you ensure that all necessary resources are loaded and the page is ready for interactions.
 * 
 * 3. await page.bringToFront();
 *    - Switching Tabs: This method is used to bring a specified tab into focus, allowing for interaction with that tab.
 *    - Importance: Switching tabs correctly is crucial in scenarios where multiple tabs are opened and require user interactions.
 */
