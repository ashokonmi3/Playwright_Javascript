const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Case: Overlapped Input Element Test
 * 
 * This test demonstrates how to use event listeners to monitor network events in Playwright.
 *
 * Network Event Concepts:
 * ------------------------
 * - **request**: Triggered when a network request is initiated. Useful for logging or modifying requests.
 * - **response**: Triggered when a network response is received. Important for validating server responses.
 *
 * In this test case:
 * -------------------
 * 1. Launch a Chromium browser in non-headless mode.
 * 2. Create a new page.
 * 3. Attach event listeners for network request and response events.
 * 4. Navigate to a webpage and observe the events being logged.
 * 5. Close the page and the browser.
 */

test('Monitor Network Events', async () => {
   // Launch the browser in non-headless mode with slow motion for better visualization
   const browser = await chromium.launch({
      headless: false,
      slowMo: 500,  // Slow down operations for better visualization
   });

   // Create a new browser context and page with specified viewport
   const context = await browser.newContext({
      // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
      viewport: { width: 1720, height: 1440 },

   });
   const page = await context.newPage();

   // Event listener functions for network events
   page.on('request', request => {
      console.log(`Request: ${request.method()} ${request.url()}`);
   });

   page.on('response', async response => {
      console.log(`Response: ${response.status()} ${response.url()}`);
      console.log(`Response Body: ${await response.body()}`);
   });

   // Navigate to a webpage (e.g., Playwright's official site)
   await page.goto('https://playwright.dev/');
   await page.waitForLoadState('load');

   // Wait for 2 seconds to enhance visibility for students
   await page.waitForTimeout(2000);

   // Close the page and browser after the demo
   await page.close();
   await browser.close();
});

/*
================================================
Example Questions for Students:
================================================

1. What is the purpose of monitoring network events in Playwright?
   - Answer: Monitoring network events allows you to track outgoing requests and incoming responses, which is crucial for debugging and validating the behavior of web applications.

2. How do you attach an event listener for a network request in Playwright?
   - Answer: You can attach an event listener using the `page.on("request", callback)` method, where `callback` is a function that handles the request event.

3. What information can you obtain from a network response event?
   - Answer: From a network response event, you can access the response status, URL, headers, and body, which can be used to verify the correctness of the server's response.

4. Why is it important to remove event listeners after they are no longer needed?
   - Answer: Removing event listeners helps prevent memory leaks and ensures that the callbacks do not execute unnecessarily, which can improve performance.

5. What types of network-related events can you listen for in Playwright?
   - Answer: In Playwright, you can listen for `request` and `response` events to monitor network activity.

================================================
Advanced Questions:
================================================

1. How can you log the time taken for a network request to complete?
   - Answer: You can store the timestamp when the request is initiated and calculate the duration when the corresponding response is received.

2. What challenges might arise when monitoring network events in a single-page application (SPA)?
   - Answer: In SPAs, requests may occur dynamically as the user interacts with the app, requiring careful management of event listeners to avoid stale references or excessive logging.

3. Can you modify requests or responses in Playwright? If so, how?
   - Answer: Yes, you can modify requests by intercepting them using `page.route()` to change request properties, and you can mock responses using `page.route()` to provide custom responses for specific requests.
*/
