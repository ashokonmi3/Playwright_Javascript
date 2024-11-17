// Import Playwright test utilities
const { test, expect } = require('@playwright/test');

// Test Suite to demonstrate taking a screenshot in Playwright
/**
 * **Topic: Taking Screenshots in Playwright**
 *
 * This test demonstrates how to take a screenshot of the visible portion of a webpage using Playwright.
 * Screenshots are crucial for debugging and visual validation in automated tests.
 *
 * **Key Concepts Covered:**
 * - **Navigating to a Web Page:** Using `page.goto()` to visit a URL.
 * - **Taking Screenshots:** Using the `page.screenshot()` method.
 * - **Viewport Configuration:** Setting screen resolution and using `slowMo` to slow down execution for better observation.
 * 
 * **Example Use Case:**
 * Taking screenshots during automated testing is a helpful way to capture the visual state of a web page, 
 * either for debugging, reporting, or validating the UI.
 */
test.describe('Screenshot Example', () => {
   test('should take a screenshot of the visible portion of the page', async ({ page }) => {
      // Test setup: Slow down execution and set a large viewport
      // await page.setViewportSize({ width: 3840, height: 2160 }); // Set viewport resolution
      await page.setViewportSize({ width: 1720, height: 1440 }); // Set viewport resolution


      await page.goto('https://bootswatch.com/default/', { waitUntil: 'load', slowMo: 500 });

      // Scroll to ensure the element to be highlighted is visible
      const body = await page.locator('body');
      await body.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Take a screenshot of the visible portion of the page
      await page.screenshot({
         path: 'visible_page_screenshot111.png', // Save screenshot with this file name
         fullPage: false // Take a screenshot only of the visible area
      });

      console.log('Screenshot of the visible part of the page has been taken.');
      await page.close();
   });
});

// Interview Questions:
/**
 * 1. **How do you take a screenshot of a web page in Playwright?**
 *    - Answer: You can use the `page.screenshot()` method to capture a screenshot. To take a screenshot of the full page, set the `fullPage` option to `true`, otherwise the screenshot will be of the visible portion.
 * 
 * 2. **What is the purpose of `slowMo` in Playwright, and when would you use it?**
 *    - Answer: `slowMo` slows down the execution of Playwright commands by a specified number of milliseconds. It's helpful for debugging or visually observing the automation process.
 * 
 * 3. **How do you ensure an element is visible before interacting with it in Playwright?**
 *    - Answer: You can use the `scrollIntoViewIfNeeded()` method to make sure the element is scrolled into view if it is not already visible in the viewport.
 * 
 * 4. **How do you set the viewport size in Playwright?**
 *    - Answer: The `setViewportSize()` method allows you to set the width and height of the viewport, which is helpful for simulating different screen resolutions.
 * 
 * 5. **Can you take a full-page screenshot in Playwright? How?**
 *    - Answer: Yes, you can take a full-page screenshot by setting the `fullPage` option to `true` in the `screenshot()` method.
 */
