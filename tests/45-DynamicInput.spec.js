// Importing required modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Case: Emulating Physical Keyboard Input in Playwright
 * 
 * This test demonstrates the difference between entering text with a physical keyboard 
 * and sending DOM events to an input field. It highlights scenarios where DOM events may 
 * fail and physical keyboard emulation is required.
 * 
 * Scenario:
 * 1. Enter text into an input field.
 * 2. Press a button to change its name based on the input.
 */
test.describe('Dynamic Input Handling', () => {

   test('Load delay and input handling', async () => {
      // Launch the Chromium browser with specified configurations
      const browser = await chromium.launch({
         headless: false, // The browser will be visible
         slowMo: 500 // Slow down actions by 500ms for better visibility
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         // viewport: { width: 1920, height: 1080 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 } // Set to your screen resolution

      });
      const page = await context.newPage();

      // Step 1: Navigate to the text input page
      console.log("Navigating to the text input page...");
      await page.goto("http://uitestingplayground.com/textinput");

      // Step 2: Fill the input field with text
      const query = 'great stuff';
      console.log(`Entering text: '${query}' into the input field...`);
      const inputField = page.getByLabel("Set New Button Name");
      await inputField.fill(query);

      // Step 3: Click the button to change its name
      console.log("Clicking the button to set the new name...");
      const btn = page.locator("button.btn-primary");
      await btn.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await btn.click();

      // Step 4: Verify that the button's text has changed
      console.log("Verifying that the button text has changed...");
      await expect(btn).toHaveText(query);
      console.log("Button successfully clicked and text changed!");

      // Close the browser after the test completes
      console.log("Closing the browser...");
      await browser.close();
      console.log("Test execution completed.");
   });

   /**
    * Important Notes for Learning:
    * - **Keyboard Input Handling**: This example illustrates the importance of using physical 
    *   keyboard emulation when DOM events fail to work properly.
    * - **Assertions**: Using Playwright’s `expect` API ensures that the input has been successfully 
    *   registered, enhancing the reliability of the test.
    */
});

/**
 * Interview Questions:
 * 
 * 1. **Q**: Why is it important to emulate physical keyboard input in testing?
 *    **A**: Emulating physical keyboard input is crucial for ensuring that applications handle user input 
 *    correctly, especially when certain elements may not respond to DOM event-based interactions.
 * 
 * 2. **Q**: What is the role of the `fill()` method in Playwright?
 *    **A**: The `fill()` method is used to enter text into input fields, emulating a user typing into 
 *    the field, which helps ensure the application behaves as expected.
 * 
 * 3. **Q**: How can you verify that an input has been registered correctly in Playwright?
 *    **A**: You can use Playwright’s `expect()` function to assert that the element's value or text has 
 *    changed to the expected result after an action has been performed.
 * 
 * 4. **Q**: What should you consider when automating tests that involve user input?
 *    **A**: It’s essential to consider different types of user interactions, such as physical clicks, keyboard 
 *    inputs, and their impact on the application’s behavior to ensure comprehensive test coverage.
 */
