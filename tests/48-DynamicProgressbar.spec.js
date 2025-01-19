const { test, expect, chromium } = require('@playwright/test');

/**
 * Verify Dynamic Progress Bar
 * 
 * A web application may use a progress bar to reflect the state of some lengthy process. 
 * Thus, a test may need to read the value of a progress bar to determine if it is time to proceed or not.
 *
 * Scenario:
 * Create a test that clicks the Start button and then waits for the progress bar to reach 75%. 
 * Then the test should click Stop. The less the difference between the value of the stopped 
 * progress bar and 75%, the better your result.
 */

test.describe('Dynamic Progress Bar Verification', () => {
   test('Verify progress bar reaches 75% and stops', async () => {
      // Launch the Chromium browser with headless set to false
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500, // Slow down operations for better visualization
      });

      // Create a new browser context and page
      const context = await browser.newContext({
         // viewport: { width: 1920, height: 1080 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 } // Set to your screen resolution

      });
      const page = await context.newPage();

      // Step 1: Navigate to the progress bar test page
      await page.goto('http://uitestingplayground.com/progressbar', {
         waitUntil: 'domcontentloaded'
      });

      const progressbar = page.locator('role=progressbar');
      const startBtn = page.locator('role=button[name="Start"]');
      const stopBtn = page.locator('role=button[name="Stop"]');

      // Start progress
      await startBtn.click();

      // Check progress
      let valuenow;
      while (true) {
         valuenow = await progressbar.getAttribute('aria-valuenow');
         valuenow = parseInt(valuenow);
         console.log(`Percent: ${valuenow}%`);

         // Progress more than or equal to 75
         if (valuenow >= 75) {
            break;
         }

         // Adding a delay to avoid a busy-wait loop
         await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Scroll into view if needed
      await stopBtn.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Stop progress
      await stopBtn.click();

      // Assertions
      expect(valuenow).toBeGreaterThanOrEqual(75);
      console.log(`Progress bar stopped at ${valuenow}%, which is above 75%.`);

      // Close the browser after the test completes
      await browser.close();
   });
});

/*
    Important Notes for Learning:
    - **Progress Bar Handling**: This example demonstrates how to work with progress bars 
      and read their values during a lengthy process.
    - **Assertions**: Using assertions ensures that the progress meets the expected criteria.
*/

/*
    Interview Questions:
    1. What is the purpose of the `aria-valuenow` attribute in a progress bar?
        - The `aria-valuenow` attribute indicates the current value of the progress bar relative to its minimum and maximum values.

    2. How would you modify the code to handle cases where the progress bar does not reach 75%?
        - You could implement a timeout condition in the while loop that breaks out if the value does not reach 75% within a certain time frame.

    3. Why is it important to check for the visibility of elements before interacting with them in Playwright?
        - Ensuring that elements are visible prevents runtime errors and ensures that the test interacts with the user interface as intended.

    4. Explain the significance of using assertions in automated tests.
        - Assertions validate that the application behaves as expected. They act as checkpoints in the test, ensuring that the application meets specific criteria before proceeding.
*/
