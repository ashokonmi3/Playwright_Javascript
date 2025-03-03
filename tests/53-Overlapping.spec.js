const { test, expect, chromium } = require('@playwright/test');

test.describe('Overlapped Input Element Test', () => {
   let browser, context, page;

   test.beforeAll(async () => {
      /**
       * Set up the browser and context for the test.
       * Launch the Chromium browser with specified viewport and slow motion settings.
       */
      browser = await chromium.launch({
         headless: false,
         slowMo: 500 // Slow down operations for better visualization
      });

      context = await browser.newContext({
         // viewport: { width: 1920, height: 1080 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });
      page = await context.newPage();
   });

   test('Interact with an overlapped input field', async () => {
      /**
       * Test to fill an input field that may be overlapped by other elements.
       * Scenario:
       * 1. Navigate to the test page.
       * 2. Locate the input field and scroll it into view.
       * 3. Fill the input field with text and verify the value.
       */

      // Navigate to the test page
      await page.goto("http://uitestingplayground.com/overlapped");
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // Locate the input field by its placeholder
      const inputField = page.locator('input[placeholder="Name"]');

      // Scroll the input field into view if needed
      await inputField.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Hover over the parent div of the input to highlight it
      const parentDiv = inputField.locator('..');
      await parentDiv.hover();
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // Scroll down by 200 pixels to bring the input into view
      await page.mouse.wheel(0, 200);
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // Fill the input field with data
      const data = "javascript";
      await inputField.fill(data);
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // Assert that the input field contains the expected value
      const value = await inputField.inputValue();
      expect(value).toBe(data); // Check if the input value is correct

      // Take a screenshot of the scroll area
      await parentDiv.screenshot({ path: 'test-overlapped.jpg' });
      console.log("Screenshot taken.");
   });

   test.afterAll(async () => {
      // Close the browser after all tests are completed
      await browser.close();
      console.log("Test execution completed.");
   });
});

/**
 ================================================================
 Example Questions for Students:
 ================================================================
 
 1. What challenges might arise when interacting with partially visible elements?
    - Answer: Partially visible elements may not be interactable until they are scrolled into view, requiring additional steps to ensure visibility.

 2. How does the `mouse.wheel()` method work, and when would you use it?
    - Answer: The `mouse.wheel()` method simulates scrolling actions, allowing elements to be brought into view by adjusting the scroll position.

 3. What is the significance of taking a screenshot during a test?
    - Answer: Screenshots provide visual documentation of the state of the application at a specific point in time, which can be useful for debugging and reporting.

 4. How can you confirm that an input field contains the expected value after filling it?
    - Answer: You can use the `inputValue()` method to retrieve the value of the input field and compare it with the expected text.

 5. What is the purpose of using `no_viewport=True` in the context?
    - Answer: This option allows the browser to bypass viewport size restrictions, ensuring the full content can be rendered for testing.

 ================================================================
 Advanced Questions:
 ================================================================
 
 1. How would you modify the test to handle scenarios where the element may not be visible at first?
    - Answer: You could implement a wait mechanism, such as `page.waitForSelector()`, to wait until the element is visible before interacting with it.

//  2. What are some alternative meth**/
