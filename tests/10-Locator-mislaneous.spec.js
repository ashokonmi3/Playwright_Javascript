const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite: XPath Selectors in Playwright
 * 
 * This suite demonstrates the use of various locators with Playwright to locate and interact 
 * with elements on a webpage.
 * 
 * Locator Notes:
 * ---------------
 * Playwright provides several methods to locate elements on a webpage. These include:
 * - `getByRole`: Locates elements based on their ARIA role and accessible name.
 * - `locator`: Provides a way to locate elements using CSS selectors or XPath.
 * - `nth`: Selects an element based on its index in the list of matched elements.
 * - `filter`: Filters a set of elements to match additional criteria.
 * - `hasText`: Filters elements based on their visible text content.
 * - `visible`: Filters elements based on their visibility status.
 * - `getByLabel`: Locates form elements by their associated label.
 * 
 * Workflow:
 * ---------
 * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
 * 2. Creates a new page and navigates to "https://bootswatch.com/default/".
 * 3. Sets the viewport size to 3840x2160 pixels.
 * 4. Waits for 2 seconds to ensure the page is fully loaded.
 * 5. Selects and highlights elements using various locator strategies.
 * 6. Closes the browser.
 */
test.describe('XPath Selectors Test Suite', () => {
    test('test_xpath_selectors', async ({ page }) => {
        // Launch a browser in non-headless mode with a slow motion delay of 500ms
        const browser = await chromium.launch({ headless: false, slowMo: 500 });
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
            viewport: { width: 1920, height: 1080 } // Set to your screen resolution
        });

        page = await context.newPage();

        // Visit the website
        await page.goto('https://bootswatch.com/default/');

        // Wait for 2 seconds before performing actions
        await page.waitForTimeout(2000);

        // Example 1: Select and highlight a button element with the accessible name "Primary"
        const primaryButton = page.getByRole('button', { name: 'Primary' });

        // Scroll into view if needed before highlighting
        // await primaryButton.scrollIntoViewIfNeeded();
        await primaryButton.highlight();
        await page.waitForTimeout(2000);

        // Highlight various buttons using nth index
        for (let i = 0; i < 3; i++) {
            const button = primaryButton.locator(`nth=${i}`);
            await button.scrollIntoViewIfNeeded(); // Scroll into view if needed
            await button.highlight();
            await page.waitForTimeout(2000);
        }

        // Example 2: Select and highlight elements with specific attributes or text
        const exampleSelect = page.getByLabel('Example select');
        // await exampleSelect.scrollIntoViewIfNeeded(); // Scroll into view if needed
        await exampleSelect.highlight();
        await page.waitForTimeout(2000);

        // Locate element by role and navigate to parent element
        const parentElement = exampleSelect.locator('..'); // Highlight the parent element
        // await parentElement.scrollIntoViewIfNeeded(); // Scroll into view if needed
        await parentElement.highlight();
        await page.waitForTimeout(2000);

        // Highlight heading elements
        const headingElement = page.getByRole('heading');
        // await headingElement.scrollIntoViewIfNeeded(); // Scroll into view if needed
        await headingElement.highlight();
        await page.waitForTimeout(2000);

        // Filter headings with specific text
        const specificHeading = headingElement.filter({ hasText: 'Heading 2' });
        // await specificHeading.scrollIntoViewIfNeeded(); // Scroll into view if needed
        await specificHeading.highlight();
        await page.waitForTimeout(2000);

        // Close the browser
        await browser.close();
    });
});

// Interview Questions
/**
 * Interview Questions:
 * 1. What are the different locator strategies available in Playwright?
 *    - Playwright provides various strategies like `getByRole`, `getByLabel`, `locator`, `nth`, and `filter`.
 * 
 * 2. How do you highlight elements in Playwright?
 *    - You can use the `highlight()` method on the locator for the element you want to highlight.
 * 
 * 3. Explain the purpose of the slowMo option in Playwright.
 *    - The `slowMo` option slows down Playwright operations by the specified milliseconds, helping in debugging and observing actions more clearly.
 * 
 * 4. How can you scroll the page in Playwright?
 *    - You can use `page.evaluate(() => window.scrollBy(0, amount))` to scroll the page by a specified amount in pixels.
 */
