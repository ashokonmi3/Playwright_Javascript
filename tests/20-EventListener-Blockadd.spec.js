const { chromium } = require('playwright'); // Import Playwright library
const { test } = require('@playwright/test');

/**
 * Handle Dialogs and Block Ads Demo
 * 
 * This test case demonstrates how to handle dialogs and block unwanted ads using Playwright.
 * 
 * Concepts:
 * ----------
 * - **Dialog Handling**: Managing browser dialogs such as alerts, prompts, and confirms.
 * - **Route Interception**: Intercepting network requests to block certain URLs (like ads) based on their request properties.
 * 
 * In this example:
 * ----------------
 * 1. Launch a Chromium browser in non-headless mode.
 * 2. Create a new context with specific settings.
 * 3. Define a function to block ads based on the request URL.
 * 4. Attach event listeners for dialogs and routing.
 * 5. Navigate to a webpage that triggers dialogs and potentially shows ads.
 * 6. Wait and observe the interactions.
 * 7. Close the browser.
 */
test.describe('Dialog and Ad Handling Tests', () => {
    test('should handle dialogs and block ads', async () => {
        // Launch the browser in non-headless mode with a specified viewport
        const browser = await chromium.launch({
            headless: false, // Run the browser in non-headless mode
            slowMo: 500, // Slow down actions for better visibility
        });

        const context = await browser.newContext({
            viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
            ignoreHTTPSErrors: true,
        });

        // Function to block ads and print request URLs that contain 'ad'
        const blockAds = async (route) => {
            const url = route.request().url(); // Get the URL from the route object
            console.log(`Checking URL: ${url}`); // Log the URL being checked

            // Check if the URL includes known ad-related patterns
            if (url.includes('ads') || url.includes('ad') || url.includes('advertisement') ||
                url.includes('banner') || url.includes('track') || url.includes('analytics') ||
                url.includes('commercial')) {

                console.log(`Aborting request to: ${url}`); // Log which request is being aborted
                await route.abort(); // Block the request
            } else {
                await route.continue(); // Allow the request
            }
        };

        // Handle request logging
        const onRequest = async (request) => {
            const url = request.url(); // Get the URL directly from the request object
            console.log(`Request made to: ${url}`); // Log the URL being checked

            // You can keep the request logging for ad patterns if you want:
            if (url.includes('ads') || url.includes('ad') || url.includes('advertisement') ||
                url.includes('banner') || url.includes('track') || url.includes('analytics') ||
                url.includes('commercial')) {
                console.log(`Ad request detected: ${url}`); // Log the detected ad request
            }
        };

        // Create a new page
        const page = await context.newPage();
        page.on("request", onRequest); // Listen for all requests

        // Attach the route event listener to block ads
        await page.route('**/*', blockAds);

        // Navigate to the website that triggers dialogs (e.g., CNN)
        await page.goto("https://www.rediff.com/", { timeout: 45000 });
        // await page.goto("https://edition.cnn.com/", { timeout: 45000 });

        console.log("Page loaded, waiting...");

        // Wait for 5 seconds to observe the interactions
        await page.waitForTimeout(15000);
        page.off("request", onRequest); // Remove the request listener

        // Close the browser
        await browser.close();
    });
});

// // Interview Questions and Answers
// /*
// 1. **What is dialog handling in Playwright?**
//    - Dialog handling in Playwright refers to managing browser dialog events (like alerts, confirms, prompts) that appear during page interactions. You can listen for these events and execute custom logic.

// 2. **How can you block network requests in Playwright?**
//    - You can block network requests by intercepting the requests using the `page.route('**/* ',callback)` method. In the callback function, you can choose to abort or continue requests based on certain criteria, such as URL patterns.

// // 3. ** What does `route.abort()` do?**
// //     - The`route.abort()` method cancels the request, preventing it from reaching the server.This is useful for blocking unwanted content like advertisements.

// // 4. ** Why is it important to handle ads in automated tests ?**
// //     - Handling ads is important because they can disrupt the testing flow, affect performance, or alter the appearance of the application, leading to inaccurate test results.

// // 5. ** What parameters can you configure when launching a browser with Playwright ?**
// //     - You can configure several parameters, such as `headless` mode, `slowMo` for slowing down actions, and`viewport` size to set the display resolution of the browser window.
// // */
