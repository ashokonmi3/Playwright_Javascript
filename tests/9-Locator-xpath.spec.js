const { test, expect, chromium } = require('@playwright/test');

// /**
//  * Demonstrates the use of XPath selectors with Playwright to locate and interact with elements on a webpage.
//  * 
//  * XPath Notes:
//  * -------------
//  * XPath (XML Path Language) is used to navigate through elements and attributes in an XML document.
//  * In Playwright, XPath can be used to locate elements in the DOM based on their structure or attributes.
//  * 
//  * Basic XPath Examples:
//  * - `xpath=//tagName`: Selects all elements with the specified tag name in the document.
//  * - `xpath=//input[@readonly]`: Selects all <input> elements with the 'readonly' attribute.
//  * - `xpath=//input[@value="correct value"]`: Selects all <input> elements with a specific 'value' attribute.
//  * - `xpath=//*[text()='Example Text']`: Selects elements with specific text content.
//  * 
//  * Workflow:
//  * -------------
//  * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
//  * 2. Creates a new page and navigates to "https://bootswatch.com/default/".
//  * 3. Sets the viewport size to 3840x2160 pixels.
//  * 4. Waits for 2 seconds to ensure the page is fully loaded.
//  * 5. Selects and highlights elements using various XPath selectors.
//  * 6. Closes the browser.
//  * 
//  * Examples:
//  * -------------
//  * - Example 1: Select and highlight an <h1> element by tag name.
//  * - Example 2: Select and highlight an <input> element with the 'readonly' attribute.
//  * - Example 3: Select and highlight an <input> element with a specific value (note: the value used in the example may not match any existing elements).
//  */

test.describe('XPath Selectors Test Suite', () => {
    let browser;
    let context;
    let page;

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

    test('Highlight Elements Using XPath Selectors', async () => {
        // Wait for 2 seconds before performing actions
        await page.waitForTimeout(2000);

        // Example 1: Select and highlight an <h1> element by tag name
        let elementByTag = page.locator('xpath=//h1').first();
        await highlightElement(page, elementByTag);

        // Example 2: Select and highlight an <input> element with the 'readonly' attribute
        let elementByReadonly = page.locator('xpath=//input[@readonly]').first();
        await highlightElement(page, elementByReadonly);

        // Example 3: Select and highlight an <input> element with a specific value (note: the value used in the example may not match any existing elements)
        let elementByValue = page.locator('xpath=//input[@value="wrong value"]');
        await highlightElement(page, elementByValue);
    });

    test.afterEach(async () => {
        // Close the page, context, and browser after each test
        await page.close();
        await context.close();
        await browser.close();
    });
});

// Function to highlight an element
async function highlightElement(page, locator) {
    await locator.scrollIntoViewIfNeeded(); // Scroll into view
    await locator.evaluate((el) => {
        el.style.backgroundColor = 'yellow'; // Highlight color
    });
    await page.waitForTimeout(2000); // Wait for 2 seconds
}

// =========================
// const { test, expect, chromium } = require('@playwright/test');

/**
 * XPath Selectors with Playwright
 *
 * This module demonstrates how to use XPath selectors with Playwright to locate and interact with elements on a webpage.
 *
 * XPath Notes:
 * -------------
 * XPath (XML Path Language) is used to navigate through elements and attributes in an XML document.
 * In Playwright, XPath can be used to locate elements in the DOM based on their structure or attributes.
 *
 * Basic XPath Examples:
 * - `xpath=//h1[text()='Heading 1']`: Selects <h1> elements with exact text "Heading 1".
 * - `xpath=//h1[contains(text(),'Head')]`: Selects <h1> elements containing the text "Head".
 * - `xpath=//button[contains(@class,'btn-outline-primary')]`: Selects <button> elements with class name containing 'btn-outline-primary'.
 * - `xpath=//input[contains(@value,'correct')]`: Selects <input> elements where the 'value' attribute contains 'correct'.
 *
 * Workflow:
 * ---------
 * 1. Launches a browser in non-headless mode with a slow motion delay.
 * 2. Creates a new page and navigates to "https://bootswatch.com/default/".
 * 3. Sets the viewport size to 3840x2160 pixels.
 * 4. Waits for 2 seconds to ensure the page is fully loaded.
 * 5. Selects and highlights elements based on various XPath selectors.
 * 6. Scrolls the page down to make more elements visible.
 * 7. Closes the browser.
 */

// test.describe('XPath Selectors Test Suite', () => {
//     let browser;
//     let context;
//     let page;

//     test.beforeEach(async () => {
//         // Launch a browser in non-headless mode with a slow motion delay
//         browser = await chromium.launch({
//             headless: false,  // Run the browser in visible mode
//             slowMo: 500      // 3000ms delay between actions
//         });

//         // Create a new browser context with specified viewport
//         context = await browser.newContext({
//             ignoreHTTPSErrors: true, // Ignore HTTPS certificate issues
//             viewport: { width: 1920, height: 1080 } // Set to your screen resolution
//         });

//         // Open a new page (tab) in the browser context
//         page = await context.newPage();

//         // Visit the website
//         await page.goto("https://bootswatch.com/default/");
//         await page.waitForTimeout(1000); // Wait for 2 seconds
//     });

//     test('Highlight Elements Using XPath Selectors', async () => {
//         // Example 1: Select and highlight an <h1> element with exact text "Heading 1"
//         let elementByTag = page.locator("xpath=//h1[text()='Heading 1']");
//         await highlightElement(page, elementByTag);

//         // Example 2: Select and highlight an <h1> element that contains the text "Head"
//         elementByTag = page.locator("xpath=//h1[contains(text(),'Head')]");
//         await highlightElement(page, elementByTag);

//         // Example 3: Select and highlight a <button> element with class containing 'btn-outline-primary'
//         elementByTag = page.locator("xpath=//button[contains(@class,'btn-outline-primary')]");
//         await highlightElement(page, elementByTag);

//         // Example 4: Select and highlight an <input> element where the 'value' attribute contains 'correct'
//         elementByTag = page.locator("xpath=//input[contains(@value,'correct')]");
//         await highlightElement(page, elementByTag);
//     });

//     test.afterEach(async () => {
//         // Close the page, context, and browser after each test
//         await page.close();
//         await context.close();
//         await browser.close();
//     });
// });

// /**
//  * Function to highlight an element.
//  *
//  * @param {Object} page - The Playwright page object.
//  * @param {Object} locator - The locator for the element to be highlighted.
//  */
// async function highlightElement(page, locator) {
//     await locator.scrollIntoViewIfNeeded(); // Scroll into view if needed
//     await locator.evaluate((el) => {
//         el.style.backgroundColor = 'yellow'; // Highlight color
//     });
//     await page.waitForTimeout(2000); // Wait for 2 seconds
// }

