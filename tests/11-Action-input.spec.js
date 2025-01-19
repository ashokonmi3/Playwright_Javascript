const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite: Input Field Interaction in Playwright
 * 
 * This suite demonstrates how to interact with input fields using Playwright.
 * 
 * Input Field Interaction Notes:
 * ------------------------------
 * In Playwright, you can perform various actions on input fields, such as:
 * - `fill`: Sets the value of an input field, clearing any existing value.
 * - `type`: Types text into an input field, simulating user keystrokes.
 * - `clear`: Clears the value of an input field.
 * - `inputValue`: Retrieves the current value of an input field.
 *
 * Basic Actions:
 * --------------
 * - `element.fill("value")`: Sets the input field's value to "value", clearing any existing value.
 * - `element.type("value")`: Types "value" into the input field, with optional delay between keystrokes.
 * - `element.clear()`: Clears the current value of the input field.
 * - `element.inputValue()`: Retrieves the current value from the input field.
 * 
 * Workflow:
 * ----------
 * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
 * 2. Creates a new page and navigates to "https://bootswatch.com/default/".
 * 3. Sets the viewport size to 3840x2160 pixels.
 * 4. Waits for 2 seconds to ensure the page is fully loaded.
 * 5. Selects an input field using various locator strategies.
 * 6. Performs actions such as filling, typing, and clearing values in the input field.
 * 7. Retrieves and prints the value of an input field.
 * 8. Closes the browser.
 */
test.describe('Input Field Interaction Test Suite', () => {
    test('test_input_fields', async ({ page }) => {
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
        // await page.waitForTimeout(2000);

        // Example 1: Interact with an input field by placeholder text
        const inputField = page.getByPlaceholder('Enter email');

        // Scroll into view if needed before highlighting
        await inputField.scrollIntoViewIfNeeded();
        await inputField.highlight(); // Highlight the input field
        // await page.waitForTimeout(2000);

        // Fill the input field with a value, clearing any existing value
        await inputField.fill('ashokonmi@gmail.com');
        await page.waitForTimeout(200);

        // Clear the input field
        await inputField.clear();
        await page.waitForTimeout(200);

        // Type into the input field with simulated keystrokes
        await inputField.type('ashokonmi@gmail.com');
        await page.waitForTimeout(200);

        // Clear the input field again
        await inputField.clear();
        await page.waitForTimeout(200);

        // Type into the input field with a delay between keystrokes
        await inputField.type('ashokonmi@gmail.com', { delay: 200 }); // Delay in milliseconds
        await page.waitForTimeout(200);

        // Clear the input field one more time
        await inputField.clear();

        // Example 2: Retrieve and print the value from an input field by label
        const validInputField = page.getByLabel('Valid input', { exact: true });
        await validInputField.scrollIntoViewIfNeeded(); // Scroll into view if needed
        await validInputField.highlight(); // Highlight the valid input field
        await page.waitForTimeout(200);

        // Retrieve and print the current value of the input field
        const validInputValue = await validInputField.inputValue();
        console.log("Current value of the input field:", validInputValue);

        // Close the browser
        await browser.close();
    });
});

// Interview Questions
/**
 * Interview Questions:
 * 1. What methods can you use to interact with input fields in Playwright?
 *    - You can use `fill()`, `type()`, `clear()`, and `inputValue()` methods to interact with input fields.
 *
 * 2. How does the `fill()` method differ from the `type()` method?
 *    - The `fill()` method sets the input field's value to the specified value, clearing any existing content, 
 *      while the `type()` method simulates typing into the input field and can include delays between keystrokes.
 *
 * 3. What is the purpose of the `scrollIntoViewIfNeeded()` method?
 *    - The `scrollIntoViewIfNeeded()` method ensures that the element is scrolled into the viewport if it's not currently visible.
 *
 * 4. How do you set the viewport size in Playwright?
 *    - You can set the viewport size by passing an object with `width` and `height` properties when creating a new context.
 */
