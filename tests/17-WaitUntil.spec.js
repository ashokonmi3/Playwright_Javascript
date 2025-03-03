const { performance } = require('perf_hooks');
const { test, expect, chromium } = require('@playwright/test');

// Test Suite for Page Load Times
test.describe('Page Load Time Measurement Tests', () => {
    let browser;
    let context;
    let page;

    // Before all tests, launch the browser and set up the context
    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
            slowMo: 3000,
            args: ["--start-maximized"]
        });
        context = await browser.newContext({
            ignoreHTTPSErrors: true,
        });
    });

    // After all tests, close the browser
    test.afterAll(async () => {
        await browser.close();
    });

    // Function to measure page load time for different waitUntil options
    const measurePageLoadTime = async (waitUntilOption) => {
        page = await context.newPage();

        // Start the timer
        const start = performance.now();

        // Navigate to the page and wait for the condition specified by `waitUntil`
        await page.goto("https://playwright.dev/docs/intro", { waitUntil: waitUntilOption });

        // Measure time taken
        const timeTaken = (performance.now() - start) / 1000;
        console.log(`Page loaded with waitUntil = '${waitUntilOption}' in ${timeTaken.toFixed(2)} seconds`);

        await page.close();

        return timeTaken;
    };

    // Test cases for each `waitUntil` option
    const waitUntilOptions = ['commit', 'domcontentloaded', 'load', 'networkidle'];

    let loadTimes = {};

    // Use test.step to ensure sequential execution
    test('should measure load times and identify max and min load times', async () => {
        await test.step('Measure load times for different waitUntil options', async () => {
            for (const option of waitUntilOptions) {
                const timeTaken = await measurePageLoadTime(option);
                loadTimes[option] = timeTaken;
                expect(timeTaken).toBeGreaterThan(0); // Basic assertion to ensure time is measured
            }
        });

        await test.step('Identify max and min load times', async () => {
            // Check if loadTimes has been populated
            if (Object.keys(loadTimes).length === 0) {
                throw new Error('No load times were measured!');
            }

            // Find max and min times
            const maxTimeOption = Object.keys(loadTimes).reduce((a, b) => loadTimes[a] > loadTimes[b] ? a : b);
            const minTimeOption = Object.keys(loadTimes).reduce((a, b) => loadTimes[a] < loadTimes[b] ? a : b);

            console.log("\n--- Summary ---");
            console.log(`Maximum load time: ${loadTimes[maxTimeOption].toFixed(2)} seconds with waitUntil = '${maxTimeOption}'`);
            console.log(`Minimum load time: ${loadTimes[minTimeOption].toFixed(2)} seconds with waitUntil = '${minTimeOption}'`);

            // Basic assertions
            expect(loadTimes[maxTimeOption]).toBeGreaterThanOrEqual(loadTimes[minTimeOption]);
            expect(loadTimes[maxTimeOption]).not.toEqual(loadTimes[minTimeOption]);
        });
    });
});


// Options for waitUntil:
// 'commit':
// Waits until the first byte of the response is received from the server.
// The page content may not be fully loaded yet.
// This is the fastest option and waits for the bare minimum.

// 'domcontentloaded':
// Waits until the HTML is parsed, and the DOMContentLoaded event is fired.
// This means that the HTML is parsed and any <script> tags are executed.
// The page is considered interactive at this point,
//  but external resources like images and stylesheets might still be loading.

// 'load' (default):
// Waits for the full page load, including all resources such as images, stylesheets, and iframes.
// This option ensures the entire page, along with its resources, is fully loaded and displayed.

// 'networkidle':
// Waits until there are no network requests for at least 500 milliseconds, 
// meaning the page is completely loaded
// and no further requests are being made (e.g., for AJAX calls or other asynchronous resources).
// This is useful for more complex pages that continue to load resources after the initial page load.
