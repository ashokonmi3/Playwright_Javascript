const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Case: Network Routing Demonstration
 *
 * This test demonstrates how to use network routing in Playwright to control network requests.
 *
 * Network Routing Concepts:
 * -------------------------
 * - **Routing**: The ability to intercept network requests and define how they should be handled.
 * - **Abort**: Cancelling a network request to prevent it from completing. Useful for blocking unwanted resources.
 * - **Fulfill**: Responding to a network request with custom data.
 *
 * In this example:
 * ----------------
 * We will set up a route to block all PNG image requests while navigating to a webpage and taking a screenshot of the page.
 *
 * Workflow:
 * ---------
 * 1. Launch a Chromium browser in non-headless mode.
 * 2. Create a new page.
 * 3. Attach a network route to block PNG image requests.
 * 4. Navigate to a webpage and observe the behavior.
 * 5. Take a screenshot of the loaded page.
 * 6. Close the page and the browser.
 */

test.describe('Network Routing Demonstration', () => {
   test('Demo Network Routing', async () => {
      // Launch the browser in non-headless mode with slow motion for better visualization
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500,  // Slow down operations for better visualization
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({         // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });
      const page = await context.newPage();

      // Event listener function to block requests- should be before any network call
      await page.route('**/*.png', async route => {
         console.log(`Request aborted: ${route.request().url()}`);
         await route.abort();  // Abort the request
      });

      // Navigate to a webpage (e.g., Playwright's official site)
      await page.goto('https://playwright.dev/');
      await page.waitForTimeout(20000); // Wait for 2 seconds to enhance visibility

      // Take a screenshot of the page
      await page.screenshot({ path: 'playwright_without_png.jpg', fullPage: true });
      await page.waitForTimeout(2000); // Wait for 2 seconds to enhance visibility

      // Close the page and the browser
      await page.close();
      await browser.close();
   });
});

// Rout patterns matching
// 1) **/*.png
// 2) https://example.com/* intercepts all requests to example.com
// 3) */* match all requests
// 4) *.jpg - match reqests for jpg files
// Use cases:
// 1) Blocking ads or tracking
// 2) Mocking Network Response
// 3) Test error conditions
// 4) Simulating slow network  

/*
================================================
Example Questions for Students:
================================================

1. What is network routing in Playwright?
   - Answer: Network routing allows you to intercept network requests and define how they should be handled, such as modifying, blocking, or fulfilling them.

2. How can you block specific types of requests in Playwright?
   - Answer: You can block requests by using the `page.route(url_pattern, callback)` method, where `url_pattern` specifies the requests to intercept and `callback` defines how to handle them.

3. What does the `route.abort()` method do?
   - Answer: The `route.abort()` method cancels the network request, preventing it from completing and sending a response.

4. How would you fulfill a network request with custom data?
   - Answer: You can use the `route.fulfill()` method to respond to a request with custom headers, status, and body.

5. What types of network requests can you route in Playwright?
   - Answer: You can route any network request, including images, scripts, stylesheets, and API calls by using appropriate URL patterns.

================================================
Advanced Questions:
================================================

1. How can you log request and response headers using network routing?
   - Answer: You can access the request and response headers through the `request.headers()` and `response.headers()` properties within your route handler functions.

2. What are potential use cases for modifying or fulfilling network requests in tests?
   - Answer: Use cases include mocking API responses for testing, blocking ads or tracking scripts, and modifying request data for simulation purposes.

3. How can network routing be useful in testing single-page applications (SPAs)?
   - Answer: Network routing allows testers to control resource loading, simulate various server responses, and ensure that SPAs handle network interactions correctly during testing.
*/
