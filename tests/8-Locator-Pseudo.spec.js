const { test, expect, chromium } = require('@playwright/test');

test.describe('Pseudo Classes Test', () => {
    let browser;
    let context;
    let page;

    // Set up before each test
    test.beforeEach(async () => {
        // Launch a browser in non-headless mode with a slow motion delay of 500ms
        browser = await chromium.launch({
            headless: false,  // Run the browser in visible mode
            slowMo: 500,      // 500ms delay between actions
        });

        // Create a new browser context with specified viewport
        context = await browser.newContext({
            ignoreHTTPSErrors: true, // Ignore HTTPS certificate issues
            viewport: { width: 1920, height: 1080 } // Set to your screen resolution
        });

        // Open a new page (tab) in the browser context
        page = await context.newPage();

        // Visit the website
        await page.goto("https://bootswatch.com/default/");
    });

    test('Highlight Elements Using Pseudo Classes', async () => {


        // Example 1: Select and highlight an element by text (Navbars in h1)
        let elementByText = page.locator('h1:has-text("Navbars")');
        await highlightElement(elementByText);

        // Example 2: Highlight another h1 by text (Navs)
        elementByText = page.locator('h1:has-text("Navs")');
        await highlightElement(elementByText);

        // Example 3: Select the 1st button with text 'Primary'
        elementByText = page.locator(":nth-match(button:has-text('Primary'), 1)"); // :nth-match(selector, n)
        await highlightElement(elementByText);

        // Example 4: Select the 3rd button with text 'Primary'
        elementByText = page.locator(":nth-match(button:has-text('Primary'), 3)");
        await highlightElement(elementByText);
    });

    // Function to highlight an element, scroll into view, and wait for 2 seconds
    async function highlightElement(locator) {
        await locator.scrollIntoViewIfNeeded(); // Scroll into view
        await locator.evaluate((el) => {
            el.style.backgroundColor = 'yellow'; // Highlight color
        });
        await page.waitForTimeout(2000); // Wait for 2 seconds
    }

    // Clean up after each test
    test.afterEach(async () => {
        await page.close();      // Close the page
        await context.close();   // Close the context
        await browser.close();   // Close the browser
    });
});
