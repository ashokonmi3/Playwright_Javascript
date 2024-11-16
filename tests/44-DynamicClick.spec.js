// Importing required modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Case: Emulating Physical Mouse Clicks in Playwright
 * 
 * This test demonstrates the difference between physical mouse clicks 
 * and DOM event emulated clicks, specifically on a button designed to ignore 
 * event-based clicks.
 * 
 * Scenario:
 * 1. Navigate to a page where a button becomes green after being clicked.
 * 2. Execute a test to ensure that the button can be clicked successfully.
 */
test.describe('Dynamic Click Handling', () => {

   test('Load delay and button click', async () => {
      // Launch the Chromium browser with specified configurations
      const browser = await chromium.launch({
         headless: false, // The browser will be visible
         slowMo: 500 // Slow down actions by 500ms for better visibility
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 } // Set to your screen resolution

      });
      const page = await context.newPage();

      // Step 1: Navigate to the click test page
      console.log("Navigating to the click test page...");
      await page.goto("http://uitestingplayground.com/click");

      // Step 2: Find the button that ignores DOM click events and scroll into view if needed
      const btn = page.getByRole('button', { name: 'Button That Ignores DOM Click Event' });
      await btn.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Click the button that ignores DOM event clicks
      console.log("Clicking the 'Button That Ignores DOM Click Event'...");
      await btn.click();
      // document.getElementById("badButton").addEventListener("click", () => {
      //    console.log("Button clicked!");
      // });
      // Step 3: Verify that the button has changed its class
      console.log("Verifying that the button has changed to 'btn btn-success'...");
      await expect(btn).toHaveClass('btn btn-success');
      console.log("Button successfully clicked and class changed!");

      // Close the browser after the test completes
      console.log("Closing the browser...");
      await browser.close();
      console.log("Test execution completed.");
   });

   /**
    * Important Notes for Learning:
    * - **Mouse Click Handling**: This example illustrates how emulating a physical mouse click
    *   can sometimes be necessary for buttons that ignore event-based clicks.
    * - **Assertions**: Using Playwright’s `expect` API ensures that the button's state
    *   is as expected after the click, enhancing test reliability.
    */
});

/**
 * Interview Questions:
 * 
 * 1. **Q**: What is the difference between a physical mouse click and a DOM event emulated click?
 *    **A**: A physical mouse click simulates a user interaction with the UI, while a DOM event emulated click 
 *    does not trigger certain behaviors in elements designed to respond only to physical clicks.
 * 
 * 2. **Q**: How can you ensure that an element is in view before clicking it in Playwright?
 *    **A**: You can use `scrollIntoViewIfNeeded()` to ensure the element is visible within the viewport before performing any actions on it.
 * 
 * 3. **Q**: Why is it important to test both physical and DOM event clicks?
 *    **A**: It's important because some UI elements may behave differently based on the type of click event, which can affect user experience and functionality.
 * 
 * 4. **Q**: How can you handle timeouts and delays in loading elements when testing with Playwright?
 *    **A**: You can use Playwright’s built-in wait functions like `expect()` to wait for specific conditions, or use `waitForTimeout()` to pause execution for a specified duration.
 */
