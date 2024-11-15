const { chromium } = require('playwright'); // Import Playwright library
const { test, expect } = require('@playwright/test');

/**
 * Event Listener Demo
 * 
 * This test case demonstrates how to use and remove event listeners in Playwright 
 * for various page events such as requests, responses, page load, and DOM content load.
 * 
 * Event Listener Concepts:
 * -------------------------
 * - **request**: Triggered when a network request is made.
 * - **response**: Triggered when a network response is received.
 * - **load**: Triggered when the page finishes loading.
 * - **domcontentloaded**: Triggered when the DOM is fully loaded and parsed.
 * - **close**: Triggered when the page is closed.
 * 
 * In this example:
 * ----------------
 * We will listen for network requests, responses, page load, DOM content loaded, 
 * and page close events. After handling the events, we will remove the listeners.
 * 
 * Workflow:
 * ---------
 * 1. Launch a Chromium browser in non-headless mode.
 * 2. Create a new page.
 * 3. Attach event listeners.
 * 4. Navigate to a webpage and observe the events being logged.
 * 5. Remove the event listeners.
 * 6. Close the browser.
 */
test.describe('Event Listener Tests', () => {
    test('should demonstrate event listeners', async () => {
        // Launch the browser in non-headless mode
        const browser = await chromium.launch({
            headless: false, // Run the browser in non-headless mode
            slowMo: 500, // Slow down actions for better visibility
        });

        const context = await browser.newContext({
            viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
            ignoreHTTPSErrors: true,
        });

        const page = await context.newPage();

        // Event listener functions
        const onRequest = (request) => {
            console.log(`Request: ${request.method()} ${request.url()}`);
        };

        const onResponse = (response) => {
            console.log(`Response: ${response.status()} ${response.url()}`);
        };

        const onLoad = () => {
            console.log("Page has finished loading!");
        };

        const onDOMContentLoaded = () => {
            console.log("DOM content has been fully loaded and parsed!");
        };

        const onClose = () => {
            console.log("Page has been closed!");
        };

        // Attach the event listeners to the page
        page.on("request", onRequest);
        page.on("response", onResponse);
        page.on("load", onLoad);
        page.on("domcontentloaded", onDOMContentLoaded);
        page.on("close", onClose);

        // Navigate to a webpage (e.g., Playwright's official site)
        await page.goto("https://playwright.dev/");

        // Wait for the page to load
        await page.waitForLoadState("load");

        // Remove the event listeners
        page.off("request", onRequest);
        page.off("response", onResponse);
        page.off("load", onLoad);
        page.off("domcontentloaded", onDOMContentLoaded);
        page.off("close", onClose);

        // Close the page
        await page.close();

        // Optionally close the browser if done with all tasks
        await browser.close();
    });
});

// Interview Questions and Answers
/*
1. **What are event listeners in Playwright?**
   - Event listeners in Playwright are functions that are triggered in response to specific events occurring on the page, such as network requests, responses, page loading, etc.

2. **How do you attach event listeners to a page?**
   - You can attach event listeners using the `page.on(eventName, listenerFunction)` method, where `eventName` is the name of the event to listen for, and `listenerFunction` is the function to be executed when the event occurs.

3. **What is the purpose of the `page.off()` method?**
   - The `page.off()` method is used to remove previously attached event listeners from the page, ensuring that they no longer respond to events.

4. **What events can you listen for in Playwright?**
   - You can listen for various events such as `request`, `response`, `load`, `domcontentloaded`, and `close`, among others.

5. **Why is it important to handle events like `request` and `response`?**
   - Handling `request` and `response` events is crucial for debugging network activity, analyzing the flow of data, and ensuring the application's functionality during automated testing.
*/

// Browser and Browser Context Events
// These events apply to the browser and browserContext objects and often relate to page management, such as opening or closing pages.

// browserContext.on('page'): Fired when a new page is created in the context.
// browserContext.on('close'): Fired when the browser context is closed.
// Page Events
// The page object emits a wide variety of events for interaction with the page, including loading, dialog handling, network requests, and more.

// page.on('close'): Fired when the page is closed.
// page.on('console'): Fired when a console message is logged (e.g., console.log).
// page.on('dialog'): Fired when a dialog (alert, prompt, etc.) appears.
// page.on('domcontentloaded'): Fired when the DOM content has been loaded (before full page load).
// page.on('download'): Fired when a file download is initiated on the page.
// page.on('filechooser'): Fired when a file chooser dialog is triggered, such as with an <input type="file">.
// page.on('frameattached'): Fired when a new frame is attached to the page.
// page.on('framedetached'): Fired when a frame is detached from the page.
// page.on('framenavigated'): Fired when a frame navigates to a new URL.
// page.on('load'): Fired when the full page has been loaded, including resources.
// page.on('pageerror'): Fired when a page error occurs, such as an uncaught JavaScript error.
// page.on('popup'): Fired when a new popup (child) page is created from the current page (e.g., from window.open()).
// page.on('request'): Fired when a network request is made.
// page.on('requestfailed'): Fired when a network request fails.
// page.on('requestfinished'): Fired when a network request is completed successfully.
// page.on('response'): Fired when a network response is received.
// page.on('worker'): Fired when a new Web Worker or Service Worker is created on the page.
// page.on('websocket'): Fired when a WebSocket connection is established.
// page.on('websocketclosed'): Fired when a WebSocket connection is closed.
// page.on('websocketerror'): Fired when there’s an error with a WebSocket connection.
// WebSocket Events
// If you are working with WebSockets, Playwright allows you to listen for events related to WebSocket connections.

// webSocket.on('framereceived'): Fired when a WebSocket frame is received.
// webSocket.on('framesent'): Fired when a WebSocket frame is sent.
// webSocket.on('close'): Fired when the WebSocket is closed.
// webSocket.on('error'): Fired when an error occurs in the WebSocket.
// Worker Events
// If there are workers (like Service Workers) running on the page, Playwright can capture their lifecycle events:

// worker.on('close'): Fired when a worker is terminated.
// worker.on('error'): Fired when an error occurs in a worker.