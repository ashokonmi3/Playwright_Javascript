// Import Playwright test utilities
const { test, chromium } = require('@playwright/test');

// Test Suite to demonstrate taking custom screenshots in Playwright
/**
 * **Topic: Custom Screenshots in Playwright**
 *
 * This test demonstrates how to take different types of screenshots of a webpage using Playwright, 
 * including full-page screenshots and screenshots of the visible viewport.
 * Additionally, it explains the use of the `omit_background` option to control whether the background
 * of the page is included in the screenshot.
 *
 * **Key Concepts Covered:**
 * - **Full-Page Screenshot:** Capturing the entire webpage, even the portions not visible in the viewport.
 * - **Viewport Screenshot:** Capturing only the visible portion of the webpage.
 * - **Omitting Background:** Using `omit_background` to control whether the page's background is included in the screenshot.
 *
 * **Example Use Case:**
 * This is useful when testing UI across different devices, capturing screenshots for reports, or verifying page layout.
 */
test.describe('Custom Screenshot Example', () => {
   test('should take a full-page and a visible viewport screenshot', async () => {
      // Launch browser with headless set to false and slowMo to slow down actions
      const browser = await chromium.launch({ headless: false, slowMo: 500 });
      // const context = await browser.newContext({ viewport: { width: 3840, height: 2160 } }); // Set viewport resolution
      const context = await browser.newContext(); // Set viewport resolution

      const page = await context.newPage();

      // Navigate to the webpage
      await page.goto('https://bootswatch.com/default/');
      await page.waitForTimeout(5000);


      // Take a full-page screenshot with background included
      await page.screenshot({
         path: 'full_page_custom_screenshot.png',  // Save full page screenshot
         fullPage: true,  // Capture the entire page
         omitBackground: false,  // Include background in the screenshot
      });
      await page.waitForTimeout(5000);

      console.log('Full-page screenshot taken.');

      // Take a screenshot of the visible portion (viewport only) with transparent background
      await page.screenshot({
         path: 'viewport_custom_screenshot.png',  // Save viewport screenshot
         fullPage: false,  // Capture only the visible part of the page
         omitBackground: true,  // Omit the background to make it transparent
      });
      await page.waitForTimeout(5000);

      console.log('Viewport screenshot with transparent background taken.');

      // Close the browser
      await browser.close();
   });
});

// Interview Questions:
/**
 * 1. **How do you capture a full-page screenshot using Playwright?**
 *    - Answer: By setting the `fullPage` option to `true` in the `page.screenshot()` method, you can capture the entire page, even the portions not currently visible in the viewport.
 * 
 * 2. **What does the `omit_background` option do in Playwright screenshots?**
 *    - Answer: The `omit_background` option determines whether to include the background color in the screenshot. When set to `true`, the background is omitted (transparent). When set to `false`, the background color is included.
 * 
 * 3. **Why would you want to omit the background in a screenshot?**
 *    - Answer: Omitting the background is useful when you need to overlay the screenshot on a different background or if you want a clean, transparent image for UI components without the page's default background color.
 * 
 * 4. **How do you take a screenshot of just the visible portion of the page (the viewport) in Playwright?**
 *    - Answer: By setting `fullPage: false` in the `page.screenshot()` method, Playwright captures only the visible portion of the page (i.e., the viewport).
 * 
 * 5. **What image formats can you save Playwright screenshots in?**
 *    - Answer: Playwright supports saving screenshots in 'png' and 'jpeg' formats, specified using the `type` option in `page.screenshot()`. If not specified, Playwright defaults to 'png'.
 */
