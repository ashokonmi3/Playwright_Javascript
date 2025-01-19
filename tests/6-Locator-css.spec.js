const { test, chromium } = require('@playwright/test');

test.describe('CSS Selectors Example', () => {
    let browser;
    let context;
    let page;

    test.beforeEach(async () => {
        // Launch a browser in non-headless mode with a slow motion delay of 1 second
        browser = await chromium.launch({
            headless: false,   // Set to false to run the browser in visible mode
            slowMo: 1000       // 1 second delay between actions for better visibility
        });

        // Create a new browser context
        context = await browser.newContext({
            ignoreHTTPSErrors: true,  // Ignore HTTPS certificate issues
            viewport: { width: 1920, height: 1080 } // Set to your screen resolution
        });

        // Open a new page (tab) in the browser context
        page = await context.newPage();

        // Visit the website
        await page.goto("https://bootswatch.com/default/");
    });

    test('Demonstrate CSS Selectors', async () => {
        /*
         * This test demonstrates how to use CSS selectors in Playwright
         * to locate and interact with web elements.
         *
         * CSS Selectors Examples:
         * - Tag Name: Select elements based on their tag name.
         * - Class Name: Select elements based on their CSS class.
         * - ID: Select elements based on their unique ID.
         * - Attribute Value: Select elements based on specific attribute values.
         *
         * This script:
         * 1. Launches a browser and navigates to a webpage.
         * 2. Demonstrates various CSS selector methods:
         *     - By Tag Name
         *     - By Class Name
         *     - By ID
         *     - By Attribute Value
         * 3. Interacts with these elements and performs some actions.
         * 4. Closes the browser.
         */

        // Example 1: Select and highlight the first element by tag name (h1)
        const elementByTag = page.locator('h1').first(); // Select the first <h1> element
        await elementByTag.scrollIntoViewIfNeeded(); // Scroll into view if necessary
        await elementByTag.highlight(); // Highlight the element
        await page.waitForTimeout(2000); // Wait for 2 seconds

        // Example 2: Select an element by class and highlight it
        const elementByClass = page.locator('button.btn-outline-success'); // Success button (3rd row)
        await elementByClass.scrollIntoViewIfNeeded(); // Scroll into view if necessary
        await elementByClass.highlight(); // Highlight the element
        await page.waitForTimeout(2000); // Wait for 2 seconds
        await elementByClass.click(); // Click the button

        // Example 3: Select an element by ID and click it
        const elementById = page.locator('button#btnGroupDrop1'); // Button by ID, DROPDOWN next to Primary
        await elementById.scrollIntoViewIfNeeded(); // Scroll into view if necessary
        await elementById.highlight(); // Highlight the element
        await page.waitForTimeout(2000); // Wait for 2 seconds
        await elementById.click(); // Click the button

        // Example 4: Select an input element with the 'readonly' attribute and highlight it
        const elementByReadonly = page.locator('input[readonly]').first(); // Read-only input field
        await elementByReadonly.scrollIntoViewIfNeeded(); // Scroll into view if necessary
        await elementByReadonly.highlight(); // Highlight the element
        await page.waitForTimeout(2000); // Wait for 2 seconds

        // Example 5: Select an input element by attribute value and highlight it
        const elementByAttr = page.locator("input[value='correct value']"); // Input with a specific value
        await elementByAttr.scrollIntoViewIfNeeded(); // Scroll into view if necessary
        await elementByAttr.highlight(); // Highlight the element
        await page.waitForTimeout(2000); // Wait for 2 seconds
    });

    test.afterEach(async () => {
        await page.close();      // Close the page
        await context.close();   // Close the context
        await browser.close();   // Close the browser
    });
});


// class  <input class='button'>  input.button 
// id    <input id='button'>  input#button