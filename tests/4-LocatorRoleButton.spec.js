const { test, chromium } = require('@playwright/test');

/**
 * Test Suite for demonstrating the usage of Playwright's getByRole locator.
 * This suite will cover the following:
 * 1. Launching a Chromium-based browser.
 * 2. Navigating to a website.
 * 3. Locating a button using its role and name.
 * 4. Highlighting the located button for visual confirmation.
 * 5. Clicking the button and printing the current URL.
 *
 * Accessibility Roles:
 * - 'button': Represents a clickable button.
 * - 'link': Represents a hyperlink.
 * - 'textbox': Represents an input field for text.
 *
 * Why Use Role Locators?
 * 1. Accessibility Compliance: Ensures your application is usable by people with disabilities.
 * 2. Robustness: Less likely to break with HTML changes compared to complex selectors.
 * 3. Readability: Makes tests more expressive and easier to understand.
 */
test.describe('Get By Role Locator Test Suite', () => {
    let browser;   // Variable to hold the browser instance
    let context;   // Variable to hold the browser context
    let page;      // Variable to hold the current page

    // Runs once before the entire test suite
    test.beforeAll(async () => {
        console.log('Setup before running tests');
    });

    // Runs before each test case
    test.beforeEach(async () => {
        // Launch a Chromium-based browser instance
        browser = await chromium.launch({
            headless: false,  // Set to false to run the browser in visible mode
            slowMo: 5000      // Slow down actions by 500 milliseconds for better visibility
        });

        // Create a new browser context with a maximized viewport size
        context = await browser.newContext({
            viewport: { width: 1920, height: 1080 } // Set to a standard max resolution
        });

        // Open a new browser page (tab) in the new context
        page = await context.newPage();
    });

    // Test case: Demonstrate usage of getByRole locator
    test('Test Get By Role Locator', async () => {
        // Navigate to the specified website
        await page.goto("https://bootswatch.com/default/");

        // Locate a button element using its role and name
        // The getByRole locator searches for elements based on their accessibility role.
        // In this case, we are looking for a button with the name "Default button".
        const docsButton = await page.getByRole('button', { name: "Default button" });

        // Optional: Scroll down the page by 1000 pixels if needed
        // await page.evaluate(() => window.scrollBy(0, 1000)); // Uncomment if scrolling is necessary

        // Highlight the located button for visual confirmation
        // This will add a red border around the button for easier identification.
        await docsButton.evaluate((el) => {
            el.style.border = '2px solid red';  // Highlighting the button with a red border
        });

        // Wait for the button to be visible after highlighting
        await docsButton.waitFor({ state: 'visible' });

        // Click the located button
        await docsButton.click();

        // Print the current URL of the page after the click action
        console.log("Current URL:", page.url());
    });

    // Runs after each test case
    test.afterEach(async () => {
        // Close the current page after each test
        await page.close();

        // Close the browser context after each test
        await context.close();

        // Close the browser after each test
        await browser.close();
    });

    // Runs once after all tests in the suite
    test.afterAll(async () => {
        console.log('Cleanup after all tests');
    });
});
