const { test, expect, chromium } = require('@playwright/test');

/**
 * Demonstrates how to use network routing in Playwright to block image requests based on resource type.
 *
 * Network Routing Concepts:
 * -------------------------
 * - **Routing**: The ability to intercept network requests and define how they should be handled.
 * - **Abort**: Cancelling a network request to prevent it from completing. Useful for blocking unwanted resources.
 *
 * In this example:
 * ----------------
 * We will set up a route to block all image requests while navigating to a webpage and taking a screenshot of the page.
 *
 * Workflow:
 * ---------
 * 1. Launch a Chromium browser in non-headless mode.
 * 2. Create a new page.
 * 3. Attach a network route to block image requests using resource types.
 * 4. Navigate to a webpage and observe the behavior.
 * 5. Take a screenshot of the loaded page.
 * 6. Close the page and the browser.
 */
test.describe('Network Routing Demo', () => {
   test('Block Image Requests', async ({ page }) => {
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500,  // Slow down operations for better visualization
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         viewport: { width: 3840, height: 2160 } // Set to your screen resolution
      });
      page = await context.newPage();

      // Event listener function to block image requests
      await page.route('**/*', async (route) => {
         console.log(`Request resource type is : ${route.request().resourceType()}`);

         if (route.request().resourceType() === 'image') {
            console.log(`Request aborted: ${route.request().url()}`);
            await route.abort();  // Abort the request
         } else {
            await route.continue();  // Continue other requests
         }
      });

      // Navigate to a webpage (e.g., Playwright's official site)
      await page.goto('https://playwright.dev/');
      await page.waitForTimeout(2000); // Wait for 2 seconds for visibility

      // Take a screenshot of the page
      await page.screenshot({ path: 'playwright_imageblocked.jpg', fullPage: true });
      await page.waitForTimeout(2000); // Wait for 2 seconds for visibility

      // Close the page
      await page.close();
      await context.close();
      await browser.close();
   });
});

/**
 * ================================================================
 * Example Questions for Students:
 * ================================================================
 *
 * 1. What is network routing in Playwright?
 *    - Answer: Network routing allows you to intercept network requests and define how they should be handled, such as modifying, blocking, or fulfilling them.
 *
 * 2. How can you block specific types of requests in Playwright using resource types?
 *    - Answer: You can block requests by using the `page.route(url_pattern, callback)` method, checking `route.request.resourceType` in the callback to determine how to handle the request.
 *
 * 3. What does the `route.abort()` method do?
 *    - Answer: The `route.abort()` method cancels the network request, preventing it from completing and sending a response.
 *
 * 4. What are some common resource types you can handle in Playwright?
 *    - Answer: Common resource types include:
 *      - **document**: HTML documents.
 *      - **script**: JavaScript files.
 *      - **stylesheet**: CSS files.
 *      - **image**: Images (e.g., PNG, JPG).
 *      - **xhr**: XMLHttpRequests (AJAX).
 *      - **fetch**: Fetch API requests.
 *      - **font**: Font files.
 *      - **media**: Audio and video files.
 *
 * 5. Why might you want to block image requests in your tests?
 *    - Answer: Blocking image requests can improve test speed, reduce resource usage, or focus on functionality without the influence of visual content.
 *
 * ================================================================
 * Advanced Questions:
 * ================================================================
 *
 * 1. How can you log request details for blocked requests when using resource types?
 *    - Answer: You can log the request URL and any other relevant details within the `on_route` function before calling `route.abort()`.
 *
 * 2. What are potential use cases for blocking image requests during automated tests?
 *    - Answer: Use cases include speeding up tests by avoiding unnecessary image downloads, simulating low-bandwidth conditions, or testing UI behavior without images.
 *
 * 3. How can network routing be useful in testing single-page applications (SPAs)?
 *    - Answer: Network routing allows testers to control resource loading, simulate various server responses, and ensure that SPAs handle network interactions correctly during testing.
 * ================================================================
 */
