const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite: Interaction with Radio Buttons and Checkboxes
 * 
 * This suite demonstrates how to interact with radio buttons and checkboxes using Playwright.
 * 
 * Understanding Radio Buttons and Checkboxes:
 * ---------------------------------------------
 * Radio buttons allow users to select one option from a set. Only one radio button in a group can be selected at a time.
 * Checkboxes allow users to select multiple options independently. Each checkbox can be checked or unchecked.
 * 
 * Key Methods for Interaction:
 * -----------------------------
 * - `check()`: Selects a checkbox or radio button.
 * - `uncheck()`: Deselects a checkbox.
 * - `isChecked()`: Checks if a checkbox is selected.
 * - `click()`: Simulates a click on any element (useful for radio buttons).
 * 
 * Workflow:
 * ----------
 * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
 * 2. Creates a new page and navigates to "https://bootswatch.com/default/".
 * 3. Sets the viewport size to 3840x2160 pixels.
 * 4. Waits for 2 seconds to ensure the page is fully loaded.
 * 5. Interacts with radio buttons and checkboxes using various actions.
 * 6. Retrieves and prints the checked status of checkboxes.
 * 7. Closes the browser.
 * 
 * Examples:
 * ----------
 * - Example 1: Check and uncheck checkboxes and verify their state.
 * - Example 2: Select and deselect radio buttons.
 */

test.describe('Radio Button and Checkbox Interactions', () => {
    test('test radio and checkbox interactions', async ({ page }) => {
        // Step 1: Launch the browser in non-headless mode with slow motion
        const browser = await chromium.launch({ headless: false, slowMo: 500 });
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
            viewport: { width: 1920, height: 1080 } // Set to your screen resolution
        });

        page = await context.newPage();

        // Step 2: Navigate to the website
        await page.goto('https://bootswatch.com/default/', {
            waitUntil: 'networkidle'
        });

        // Step 3: Wait for 2 seconds before interacting with elements
        await page.waitForTimeout(2000);

        // Example 1: Interact with checkboxes
        // -----------------------------------
        // Locate the radio button using its label
        const radioButton1 = page.getByLabel('Option two can be something else and selecting it will deselect option one');
        await radioButton1.scrollIntoViewIfNeeded(); // Scroll into view if needed
        await radioButton1.check(); // Check the radio button
        await page.waitForTimeout(2000); // Add delay for clarity during teaching

        // Interact with another radio button
        const radioButton2 = page.getByLabel('Option one is this and that—be sure to include why it\'s great');
        await radioButton2.scrollIntoViewIfNeeded();
        await radioButton2.check();
        await page.waitForTimeout(2000);

        // Example 2: Check the state of a checkbox
        // -----------------------------------------
        // Locate another checkbox
        const checkbox3 = page.getByLabel('Default checkbox');
        await checkbox3.check(); // Check it first
        await page.waitForTimeout(2000);

        // Print whether the checkbox is checked
        console.log("Is 'Default checkbox' checked?:", await checkbox3.isChecked());

        // Uncheck the checkbox and check the state again
        await checkbox3.uncheck();
        await page.waitForTimeout(2000);
        console.log("Is 'Default checkbox' checked after unchecking?:", await checkbox3.isChecked());

        // Example 3: Interact with radio buttons
        // --------------------------------------
        // Locate and check a radio button
        const radio1 = page.getByLabel('Default switch checkbox input');
        await radio1.scrollIntoViewIfNeeded();
        await radio1.check();
        await page.waitForTimeout(2000);

        // Close the browser after interaction
        await browser.close();
    });
});

/**
 * Interview Questions:
 * ---------------------
 * 1. What is the difference between `check()` and `click()` in Playwright?
 *    - `check()`: Specifically for selecting checkboxes or radio buttons. Ensures the element is selected.
 *    - `click()`: Simulates a click on any element. It toggles the state (for checkboxes, it can uncheck).
 * 
 * 2. How do you retrieve the checked status of a checkbox in Playwright?
 *    - Use the `isChecked()` method to check if a checkbox is selected.
 * 
 * 3. Why is it important to use `scrollIntoViewIfNeeded()` before interacting with elements?
 *    - This method ensures that the element is visible in the viewport before performing actions, preventing any potential errors.
 * 
 * Key Differences:
 * ----------------
 * Aspect      | check()                           | click()
 * --------------------------------------------------------
 * Purpose     | For checkboxes/radio buttons      | For any clickable element
 * Effect      | Ensures element is selected       | Toggles the element's state
 * Use Case    | Checkbox/radio selection          | Generic click functionality
 * Idempotent  | Yes (does nothing if already checked) | No (toggling may change state)
 */
