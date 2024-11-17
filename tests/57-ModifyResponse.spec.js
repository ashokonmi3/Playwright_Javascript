const { test, expect, chromium } = require('@playwright/test');

test.describe('Network Fulfillment Demo', () => {
   /**
    * Demonstrates how to use network routing in Playwright to fulfill network requests with custom responses.
    *
    * Network Fulfillment Concepts:
    * ------------------------------
    * - **Fulfill**: Responding to a network request with custom data instead of letting the original request proceed.
    *
    * In this example:
    * ----------------
    * We will intercept a specific API request and respond with a custom JSON object instead of the actual response.
    *
    * Workflow:
    * ---------
    * 1. Launch a Chromium browser in non-headless mode.
    * 2. Create a new page.
    * 3. Attach a network route to fulfill a specific API request.
    * 4. Navigate to a webpage and observe the behavior.
    * 5. Close the page and the browser.
    */

   test('Fulfill API request with custom response', async ({ page }) => {
      // Launch the browser in non-headless mode
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500,  // Slow down operations for better visualization
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });
      page = await context.newPage();

      // Event listener function to fulfill specific API requests
      await page.route("**/*", async (route) => {
         // Check if the request URL matches the API we want to mock
         if (route.request().url() === "https://playwright.dev/") {
            console.log(`Fulfilling request for: ${route.request().url()}`);

            // Fetch the original response
            const response = await route.fetch();
            const body = await response.text();

            // Modify the response body
            const modifiedBody = body.replace(
               "enables reliable end-to-end testing for modern web apps.", "is an awesome framework for web automation!"
            );
            // The subsequent requests are made the original unmodified response can overwrite the modification
            // the  mocked response body is only applied during the route.fulfill porecss for that sepcific request .
            // The rest of the page or subsequent scripts can undo or over write the changes
            // Fulfill the route with the modified response
            await route.fulfill({
               response,
               body: modifiedBody
            });
         } else {
            await route.continue();  // Continue other requests
         }
      });

      // Navigate to a webpage that triggers the API request
      await page.goto("https://playwright.dev/");
      await page.waitForTimeout(20000); // Wait for a moment to ensure the request is made and fulfilled

      // Take a screenshot of the page
      await page.screenshot({ path: "playwright_modified_content.jpg", fullPage: false });

      // Close the page
      await page.close();
      // Close the browser if done with all tasks
      await browser.close();
   });
});

/**
================================================
Example Questions for Students:
================================================

1. What does it mean to fulfill a network request in Playwright?
   - Answer: Fulfilling a network request means responding to a request with custom data instead of allowing the original request to proceed.

2. How can you customize the response when fulfilling a request?
   - Answer: You can customize the response by specifying the status code, content type, and body of the response using the `route.fulfill()` method.

3. What is the use of `route.continue()` in the context of network routing?
   - Answer: The `route.continue()` method allows other network requests to proceed without interference when the current request is not one we want to fulfill or modify.

4. When might you want to fulfill requests with custom data during testing?
   - Answer: Fulfilling requests with custom data is useful for mocking API responses in tests, allowing you to test different scenarios without relying on the actual server responses.

================================================
Advanced Questions:
================================================

1. How can you log request details when fulfilling a network request?
   - Answer: You can log the request URL, method, and other details within the `on_route` function before calling `route.fulfill()`.

2. What challenges might arise when fulfilling requests in tests for dynamic web applications?
   - Answer: Dynamic applications may change API endpoints or payloads, requiring frequent updates to the mocked responses in tests to stay relevant.

3. Can you fulfill requests based on specific request headers or parameters?
   - Answer: Yes, you can inspect the request headers or query parameters in the `on_route` function to conditionally fulfill requests based on their contents.
================================================
*/
