// Import Playwright test utilities
const { test, chromium } = require('@playwright/test');

// Test Suite to demonstrate taking an element-specific screenshot in Playwright
/**
 * **Topic: Taking Element-Specific Screenshots in Playwright**
 *
 * This test demonstrates how to take a screenshot of a specific element on a webpage using Playwright.
 * Capturing element-specific screenshots is particularly useful when you want to focus on certain UI components
 * for visual validation or debugging.
 *
 * **Key Concepts Covered:**
 * - **Navigating to a Web Page:** Using `page.goto()` to visit a URL.
 * - **Locating Elements:** Using `page.locator()` to identify a specific element.
 * - **Taking Element Screenshots:** Using the `locator.screenshot()` method.
 * - **Ensuring Visibility:** Using `scrollIntoViewIfNeeded()` to make sure the element is in the viewport before taking a screenshot.
 *
 * **Example Use Case:**
 * Capturing screenshots of individual elements helps with testing visual components (like buttons, headers, or images) 
 * without including the entire page layout.
 */
test.describe('Element Screenshot Example', () => {
   test('should take a screenshot of a specific element', async () => {
      // Launch browser with headless set to false and slowMo to slow down actions
      const browser = await chromium.launch({ headless: false, slowMo: 500 });
      const context = await browser.newContext({ viewport: { width: 3840, height: 2160 } }); // Set viewport resolution
      const page = await context.newPage();

      // Navigate to the webpage
      await page.goto('https://example.com', { waitUntil: 'load' });

      // Locate the specific element to be captured (in this case, the <h1> element)
      const header = page.locator('h1'); // You can change the selector as needed

      // Scroll to ensure the element is visible before taking the screenshot
      await header.scrollIntoViewIfNeeded(); // Scroll into view if needed

      // Take a screenshot of the specific element
      await header.screenshot({
         path: 'element_screenshot.png', // Save screenshot as 'element_screenshot.png'
      });

      console.log('Screenshot of the <h1> element has been taken.');

      // Close the browser
      await browser.close();
   });
});

// Interview Questions:
/**
 * 1. **How do you take a screenshot of a specific element in Playwright?**
 *    - Answer: You can use the `locator.screenshot()` method to capture a screenshot of a specific element located using `page.locator()`.
 * 
 * 2. **Why would you take an element-specific screenshot instead of the whole page?**
 *    - Answer: Taking an element-specific screenshot is useful when you only want to validate or debug a particular component of the UI, rather than capturing the entire page.
 * 
 * 3. **How do you ensure an element is visible before interacting with or capturing it in Playwright?**
 *    - Answer: You can use `scrollIntoViewIfNeeded()` to ensure that the element is visible and scrolled into view before interacting with or capturing it.
 * 
 * 4. **What are the differences between capturing the entire page and capturing a single element in Playwright?**
 *    - Answer: Capturing the entire page includes everything visible in the browser viewport, while capturing a single element only captures the area defined by the element’s dimensions, ignoring everything else on the page.
 * 
 * 5. **Can you control the dimensions of the screenshot for an element?**
 *    - Answer: Yes, the dimensions of the screenshot are automatically controlled by the element's size. You don't manually control dimensions when using `locator.screenshot()` because it captures the exact area occupied by the element.
 */
