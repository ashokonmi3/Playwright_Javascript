const { test, chromium } = require('@playwright/test');

/**
 * Test Suite for demonstrating interaction with radio buttons and checkboxes using Playwright's getByRole locator.
 * This suite will cover the following:
 * 1. Launching a Chromium-based browser.
 * 2. Navigating to a website.
 * 3. Locating and interacting with radio button and checkbox elements.
 * 4. Highlighting the located elements for visual confirmation.
 * 5. Printing the current URL of the page.
 * 6. Closing the browser.
 *
 * Accessibility Roles:
 * - 'radio': Represents a radio button.
 * - 'checkbox': Represents a checkbox.
 *
 * Why Use Role Locators?
 * 1. Accessibility Compliance: Ensures your application is usable by people with disabilities.
 * 2. Robustness: Less likely to break with HTML changes compared to complex selectors.
 * 3. Readability: Makes tests more expressive and easier to understand.
 */
test.describe('Radio and Checkbox Interaction Test Suite', () => {
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
            slowMo: 5000       // Slow down actions by 500 milliseconds for better visibility
        });

        // Create a new browser context
        context = await browser.newContext({
            viewport: { width: 1920, height: 1080 } // Set to a standard max resolution
        });

        // Open a new browser page (tab) in the new context
        page = await context.newPage();
    });

    // Function to highlight an element by adding a red border
    const highlightElement = async (element) => {
        await element.evaluate((el) => {
            el.style.border = '2px solid red';  // Add a red border for highlighting
            el.style.backgroundColor = 'yellow'; // Optional: change background color for better visibility
        });
        await page.waitForTimeout(2000); // Wait for 2 seconds to observe the highlighted element
    };

    // Test case: Demonstrate interaction with radio button and checkbox
    test('Test Radio and Checkbox Interaction', async () => {
        // Navigate to the specified website
        await page.goto("https://bootswatch.com/default/");
        // // Locate a radio button element using its role and name
        const radioButton = await page.getByRole('radio', { name: "Option one is this and that—be sure to include why it's great" });
    await radioButton.scrollIntoViewIfNeeded();

        // Highlight the located radio button for visual confirmation
        await highlightElement(radioButton);

        // Locate a checkbox element using its role and name
        const checkBox = await page.getByRole('checkbox', { name: "Default checkbox" });
        await checkBox.scrollIntoViewIfNeeded();

        // Highlight the located checkbox for visual confirmation
        // await highlightElement(checkBox);

        // Check the checkbox
        await checkBox.check();

        // Print the current URL of the page after interaction
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

// Execute the test function if the script is run directly
