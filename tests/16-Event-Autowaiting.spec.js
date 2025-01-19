const { test, expect, chromium } = require('@playwright/test');


// JavaScript Test Suite for demonstrating Playwright's Auto-Waiting mechanism
test.describe('Playwright Auto-Waiting Test Suite', () => {
    /**
     * Demonstrates how Playwright automatically waits for elements to be ready before interacting with them.
     *
     * Auto-Waiting Notes:
     * -------------------
     * Playwright automatically waits for the following:
     * - Element to be attached to the DOM.
     * - Element to be visible.
     * - Element to be enabled.
     * - Element to stop moving or receiving animations (stable).
     * - For clickable elements, it waits for the element to receive pointer events.
     *
     * Workflow:
     * ----------
     * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
     * 2. Creates a new page and navigates to a page with a dropdown element.
     * 3. Demonstrates Playwright's auto-waiting mechanism by interacting with an element without manually adding wait time.
     * 4. Closes the browser.
     *
     * Examples:
     * ----------
     * - Example 1: Click on a dropdown element and interact without manual delays.
     */
    test('should automatically wait for elements before interaction', async () => {
        // Launch a browser in non-headless mode with a slow motion delay of 500ms
        const browser = await chromium.launch({
            headless: false,        // Run in a visible browser
            slowMo: 500,            // Slow down actions to observe
        });

        // Set up the browser context with a viewport size and ignoring HTTPS errors
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
            viewport: { width: 1920, height: 1080 }, // Set to your screen resolution
        });

        // Open a new page in the browser
        const page = await context.newPage();

        // Visit the target website
        await page.goto('https://bootswatch.com/default/');

        // Playwright will automatically wait for the element to be visible and clickable
        const dropdownItem = page.locator('a.dropdown-item').first();

        // Scroll into view if needed before interacting
        await dropdownItem.scrollIntoViewIfNeeded();

        // Interact with the element without manually adding a wait
        await dropdownItem.click({ timeout: 2000 });

        // Close the browser after the test
        await browser.close();
    });
});

/**
 * Interview Questions and Answers:
 * --------------------------------
 * Q1: What does Playwright's auto-waiting feature do?
 * A1: Playwright automatically waits for elements to meet specific conditions such as being visible, enabled, stable, and ready for interaction (e.g., clickable) before performing actions like clicks or typing.

 * Q2: What are the key conditions Playwright waits for before interacting with an element?
 * A2: The conditions are:
 *   - The element must be attached to the DOM.
 *   - The element must be visible.
 *   - The element must be enabled (interactable).
 *   - The element must stop moving (stabilized).
 *   - The element must be able to receive pointer events.

 * Q3: How can you observe the auto-waiting mechanism in Playwright?
 * A3: By using slowMo configuration (e.g., slowMo: 500) or inspecting logs, you can observe Playwright waiting for elements to become ready before interacting. Additionally, any delays in the interaction due to waiting will be logged.

 * Q4: How do you manually adjust Playwright's timeout for an action?
 * A4: You can specify the `timeout` option when performing actions, such as `click()`, to adjust how long Playwright should wait before timing out. For example: `await element.click({ timeout: 2000 });`.

 * Q5: What is the purpose of `scrollIntoViewIfNeeded()` in Playwright?
 * A5: `scrollIntoViewIfNeeded()` ensures that the element is scrolled into the visible viewport if it is not already visible. This is helpful when interacting with elements that may be off-screen or hidden within scrollable sections.
 */
