const { chromium } = require('playwright'); // Import Playwright library
const { test, expect } = require('@playwright/test');

/**
 * Custom Wait Demo
 * 
 * This test case demonstrates how to use custom wait logic in Playwright 
 * when interacting with web pages that load content dynamically via AJAX.
 * 
 * Custom Wait Concept:
 * --------------------
 * Often, web pages use AJAX or JavaScript to load certain elements after the initial page load. 
 * Playwright's automatic wait mechanisms handle many of these cases, but sometimes, 
 * we need to wait for specific elements that load dynamically.
 * Auto-waiting only works for actions related to DOM elements, such as clicking or typing. 
 * If you need to wait for something that’s not directly related to an element, such as waiting for 
 * a network request, page navigation, or JavaScript execution, you’ll need waitFor().
 *
 * For example:
 * - Waiting for a network request to finish before proceeding.
 * - Waiting for a specific event (like a page load or a custom JavaScript event).
 *
 * In this case:
 * --------------
 * - The page we are interacting with uses AJAX to load the movie data for the year 2015.
 * - Instead of waiting for the entire page to load, we wait specifically for a table of movie titles to appear.
 *
 * Key Playwright Features Used:
 * ------------------------------
 * - `locator.waitFor()`: Waits for a specific element (like a table cell) to be available in the DOM.
 * 
 * Workflow:
 * ---------
 * 1. Launch a browser with a slow motion for better visualization.
 * 2. Navigate to the AJAX demo page.
 * 3. Click the link to load the 2015 movie data.
 * 4. Use `waitFor()` to wait for the table data to load.
 * 5. Record and print the time taken to load the movie data.
 * 6. Close the browser.
 */
test.describe('Custom Wait Tests', () => {
    test('should load movie data for 2015', async () => {
        // Launch the browser
        const browser = await chromium.launch({
            headless: false, // Run the browser in non-headless mode
            slowMo: 500, // Slow down actions for better visibility
        });

        const context = await browser.newContext({
            viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
            ignoreHTTPSErrors: true,
        });

        const page = await context.newPage();

        // Navigate to the AJAX demo page
        await page.goto("https://www.scrapethissite.com/pages/ajax-javascript/", {
            waitUntil: 'domcontentloaded',
        });

        // Locate the link for loading movie data for the year 2015 and click it
        const link = page.getByRole("link", { name: "2015" });
        await link.click();

        console.log("Loading Oscars for 2015...");

        // Start the timer to measure the wait time
        const start = performance.now();

        // Locate the first table cell containing the movie title and wait for it to appear
        const firstTableData = page.locator("td.film-title").first();
        await firstTableData.scrollIntoViewIfNeeded(); // Scroll into view if needed
        await firstTableData.waitFor(); // Wait for the first table data to appear
        // default wait is 30seconds
        // Calculate the time taken for the movies to load
        const timeTaken = (performance.now() - start) / 1000;
        console.log(`...movies are loaded, in ${timeTaken.toFixed(2)}s!`);

        // Check that the first movie title is visible
        await expect(firstTableData).toBeVisible();

        // Close the browser once the action is complete
        await browser.close();
    });
});

// Interview Questions and Answers
/*
1. **What is the purpose of custom wait logic in Playwright?**
   - Custom wait logic is used to handle scenarios where elements load dynamically via AJAX or JavaScript, ensuring the script waits for specific elements to appear before proceeding.

2. **How does `locator.waitFor()` work?**
   - `locator.waitFor()` waits for a specific element to be available in the DOM, allowing for scripts to synchronize with dynamic content loading.

3. **What is the difference between `waitFor` and automatic waiting in Playwright?**
   - Automatic waiting is built into Playwright and handles most element interactions. `waitFor` is used for scenarios where you need to wait for specific conditions that are not directly linked to DOM element interactions.

4. **Why is it important to scroll elements into view before interacting with them?**
   - Scrolling elements into view ensures that the elements are visible on the screen, which can be necessary for actions like clicking, typing, or waiting for them to load.

5. **How can you measure the time taken for an operation in Playwright?**
   - You can use the `performance.now()` method to capture timestamps before and after an operation to calculate the duration of the operation.
*/
