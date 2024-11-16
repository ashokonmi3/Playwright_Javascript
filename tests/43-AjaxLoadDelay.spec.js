// Importing the required test module from Playwright
const { test, expect, chromium } = require('@playwright/test');

test.describe('Handling AJAX Load Delay in Playwright', () => {

   /**
    * Test Case: Handling delayed elements triggered by AJAX in Playwright
    * 
    * This test demonstrates how to handle elements that load after a delay 
    * due to an AJAX request. It waits for content (a paragraph) to load after 
    * an AJAX request is triggered.
    * 
    * Steps:
    * 1. Navigate to a page where an AJAX request triggers a delayed response.
    * 2. Click the button that initiates the AJAX request.
    * 3. Wait for the delayed content (paragraph) to load.
    * 4. Verify that the content is visible.
    * 5. Optionally perform additional actions if necessary.
    */

   test('AJAX load delay and paragraph visibility', async () => {

      // Launch browser with slow motion for better visualization and set screen resolution
      const browser = await chromium.launch({
         headless: false, // The browser will be visible
         slowMo: 500 // Slow down actions by 500ms for better visibility
      });

      // Create a new browser context and page
      // const context = await browser.newContext({ viewport: { width: 3840, height: 2160 } });
      const context = await browser.newContext({ viewport: { width: 1720, height: 1440 } });

      // viewport: { width: 1720, height: 1440 },

      const page = await context.newPage();

      // Step 1: Navigate to the AJAX request page
      console.log("Navigating to the AJAX request page...");
      await page.goto('http://uitestingplayground.com/ajax');

      // Step 2: Click the button that triggers the AJAX request
      console.log("Clicking the 'Button Triggering AJAX Request'...");
      const ajaxButton = page.getByRole('button', { name: 'Button Triggering AJAX Request' });
      await ajaxButton.click();

      // Wait for 2 seconds after clicking
      await page.waitForTimeout(2000);

      // Step 3: Wait for the delayed paragraph to load after the AJAX request
      console.log("Waiting for the paragraph to load after the AJAX request...");
      const paragraph = page.locator('p.bg-success');

      // Scroll the paragraph into view if needed
      await paragraph.scrollIntoViewIfNeeded();

      // Wait until the paragraph becomes available and visible
      await paragraph.waitFor();

      // Step 4: Verify that the paragraph is visible
      console.log("Verifying if the paragraph is visible...");
      await expect(paragraph).toBeVisible();
      console.log("Paragraph is visible!");

      // Optionally, perform further actions on the paragraph if needed
      console.log("Test case completed successfully!");

      // Close the browser after the test completes
      await browser.close();
   });

   /**
    * Important Notes for Learning:
    * - **AJAX Load Delays**: This test demonstrates how to handle elements that load with a delay
    *   due to AJAX requests, which dynamically fetch data from the server after an action (like clicking a button).
    * - **Waiting for Elements**: Playwright’s `waitFor()` ensures the paragraph becomes available
    *   after the AJAX request completes.
    * - **Assertions**: The `expect` API is used to confirm that the paragraph is visible after loading.
    */
});

/**
 * Interview Questions:
 * 
 * 1. **Q**: How does Playwright handle elements that load after an AJAX request?
 *    **A**: Playwright automatically waits for elements to be available before interacting with them. 
 *    For elements that load after AJAX requests, you can use `waitFor()` to ensure the content is fully loaded and visible.
 * 
 * 2. **Q**: What is AJAX, and how does it impact automated testing?
 *    **A**: AJAX (Asynchronous JavaScript and XML) allows web pages to update asynchronously by exchanging data with the server
 *    behind the scenes. This can cause elements to load dynamically, which requires tests to wait for these elements to become visible
 *    before interacting with them.
 * 
 * 3. **Q**: Why do we use `scrollIntoViewIfNeeded()` before interacting with an element in Playwright?
 *    **A**: `scrollIntoViewIfNeeded()` ensures that the element is scrolled into view if it's outside of the visible area of the page.
 *    This helps avoid interaction errors, especially when elements loaded by AJAX are outside the viewport.
 * 
 * 4. **Q**: How can you handle timeouts for elements that load slowly due to AJAX requests?
 *    **A**: You can increase the timeout for the `waitFor()` method or handle slow-loading elements using `try-catch` to prevent
 *    the test from failing due to a timeout. Playwright also provides built-in mechanisms to adjust default timeouts.
 */
