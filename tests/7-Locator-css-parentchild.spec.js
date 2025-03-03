const { test, expect, chromium } = require('@playwright/test');

test.describe('CSS Selectors Test', () => {
    let browser;
    let context;
    let page;

    test.beforeEach(async () => {
        // Launch a browser in non-headless mode with a slow motion delay of 1 second
        browser = await chromium.launch({
            headless: false,   // Set to false to run the browser in visible mode
            slowMo: 500       // 1 second delay between actions for better visibility
        });

        // Create a new browser context
        context = await browser.newContext({
            ignoreHTTPSErrors: true,  // Ignore HTTPS certificate issues
            viewport: { width: 1920, height: 1080 } // Set to your screen resolution
        });

        // Open a new page (tab) in the browser context
        page = await context.newPage();

        // Visit the website
        await page.goto('https://bootswatch.com/default/');
    });

    test('Parent and Child Selectors Example', async () => {
        /**
         * Demonstrates how to use parent and child CSS selectors in Playwright to locate and interact with web elements.
         *
         * CSS Selectors Examples:
         * - Parent and Child: Selects elements based on their hierarchical relationship.
         *
         * This test case:
         * 1. Demonstrates selecting elements using parent and child CSS selectors.
         * 2. Highlights selected elements to visualize them.
         * 3. Closes the browser.
         */


        // Example 1: Select and highlight all elements by tag name (h1)
        const h1Elements = page.locator('h1');
        const h1Count = await h1Elements.count(); // Count the number of h1 elements

        for (let i = 0; i < h1Count; i++) {
            const element = h1Elements.nth(i);
            await element.scrollIntoViewIfNeeded(); // Scroll into view if necessary

            await element.evaluate((el) => {
                el.style.backgroundColor = 'yellow'; // Highlight color
                setTimeout(() => {
                    el.style.backgroundColor = ''; // Reset after 2 seconds
                }, 1000);
            });
            await expect(element).toBeVisible(); // Assertion to check visibility
            await page.waitForTimeout(1000); // Wait for visibility check
        }

        // Example 2: Select a child element within a specific parent element
        const elementByParentChild = page.locator('nav.bg-dark a.nav-link.active'); // Home link
        await elementByParentChild.scrollIntoViewIfNeeded(); // Scroll into view if necessary
        await elementByParentChild.evaluate((element) => {
            element.style.backgroundColor = 'red'; // Highlight color
            setTimeout(() => {
                element.style.backgroundColor = ''; // Reset after 2 seconds
            }, 2000);
        });
        await expect(elementByParentChild).toBeVisible(); // Assertion to check visibility
        await page.waitForTimeout(2000);
    });

    test.afterEach(async () => {
        await page.close();      // Close the page
        await context.close();   // Close the context
        await browser.close();   // Close the browser
    });
});
