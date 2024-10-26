// Import Playwright test utilities
const { test, expect, chromium } = require('@playwright/test');

// Function to demonstrate finding elements by attribute using Playwright in JavaScript.
/**
 * This function demonstrates how to locate elements by their attributes using Playwright.
 * 
 * **Key Concepts Covered:**
 * - **Locating Elements by Role:** Learn how to use `get_by_role` to find elements by their roles.
 * - **Counting Elements:** Understand how to count the number of elements matching a locator.
 * - **Iterating Over Elements:** Learn how to iterate over all elements found and interact with them.
 * 
 * **Example Use Case:**
 * In web testing, it's common to locate multiple elements (e.g., buttons) and perform actions like clicking or retrieving their text.
 * This function shows how to count elements and print their text content.
 * 
 * **Steps Explained:**
 * 1. Launch the browser in non-headless mode.
 * 2. Navigate to a sample webpage.
 * 3. Find elements based on their roles.
 * 4. Count the number of matching elements and iterate through each element.
 */
test.describe('Find elements by attribute', () => {
   test('should locate buttons and iterate over them', async ({ }) => {
      // Test setup: Slow down the execution and set a large viewport
      const browser = await chromium.launch({
         headless: false,            // Set to false to visualize browser actions
         slowMo: 500,                // Slow down actions for better visualization
      });

      const context = await browser.newContext({
         viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
         ignoreHTTPSErrors: true,
      });
      const page = await context.newPage();

      // Navigate to the test page
      await page.goto('https://bootswatch.com/default/');

      // Find all buttons on the page using their role
      const buttons = await page.locator('role=button');

      // Count the number of buttons found
      const count = await buttons.count();
      console.log(`Found ${count} buttons.`);

      // Print the text of the first button
      console.log(`First button text: ${await buttons.first().textContent()}`);

      // Iterate over each button and print its text content
      for (let i = 0; i < count; i++) {
         const button = buttons.nth(i);
         await button.scrollIntoViewIfNeeded(); // Scroll into view if needed
         console.log(`Button ${i} text: ${await button.textContent()}`);
      }

      // Close the browser
      await browser.close();
   });
});

// Interview Questions:
/**
 * 1. **How do you locate elements by their roles in Playwright?**
 *    - Answer: In Playwright, you can use the `locator('role=roleName')` method to locate elements by their roles, such as buttons, links, or headers.
 * 
 * 2. **What is the purpose of `scrollIntoViewIfNeeded()` in Playwright?**
 *    - Answer: `scrollIntoViewIfNeeded()` ensures that the element is scrolled into view if it's not visible in the viewport. This is useful when interacting with elements located off-screen.
 * 
 * 3. **Why is `slowMo` used in Playwright, and what does it do?**
 *    - Answer: `slowMo` slows down the execution of each Playwright command by the specified number of milliseconds. It's helpful for debugging or observing test execution.
 * 
 * 4. **How do you count the number of elements located by a selector in Playwright?**
 *    - Answer: You can use the `count()` method on a locator object to count the number of elements matching the selector.
 */
