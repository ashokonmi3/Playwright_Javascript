const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite: Interaction with Select Dropdowns
 * 
 * This suite demonstrates how to interact with single-select and multi-select dropdowns using Playwright.
 * 
 * Select Option Interaction Notes:
 * ---------------------------------
 * In Playwright, you can perform various actions on select dropdowns, such as:
 * - `selectOption`: Selects an option from a dropdown menu by its value, label, or index.
 * - `multiple selection`: Handles selecting multiple options from a multi-select dropdown.
 * - The `<select>` element is used to create a drop-down list of options from which 
 *   the user can select one or more items. This element is commonly used in forms where the user needs to choose from a list of predefined options.
 * 
 * Basic Actions:
 * --------------
 * - `element.selectOption(value)`: Selects an option from the dropdown by its value attribute.
 * - `element.selectOption([value1, value2, ...])`: Selects multiple options from a multi-select dropdown.
 * 
 * Workflow:
 * ----------
 * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
 * 2. Creates a new page and navigates to "https://bootswatch.com/default/".
 * 3. Sets the viewport size to 3840x2160 pixels.
 * 4. Waits for 2 seconds to ensure the page is fully loaded.
 * 5. Selects options from a single-select dropdown and a multi-select dropdown.
 * 6. Closes the browser.
 * 
 * Examples:
 * ----------
 * - Example 1: Select options from a single-select dropdown.
 * - Example 2: Select multiple options from a multi-select dropdown.
 */

test.describe('Select Dropdown Interactions', () => {
    test('test select options', async ({ page }) => {
        // Step 1: Launch the browser in non-headless mode with a slow motion delay
        const browser = await chromium.launch({ headless: false, slowMo: 500 });
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
            viewport: { width: 3840, height: 2160 } // Set to your screen resolution
        });
        page = await context.newPage();

        // Step 2: Visit the website
        await page.goto('https://bootswatch.com/default/', { waitUntil: 'networkidle' });

        // Step 3: Wait for 2 seconds to ensure the page is fully loaded
        await page.waitForTimeout(300);

        // Example 1: Interact with a single-select dropdown
        // ----------------------------------------------
        // Locate the single-select dropdown by its label
        const singleSelect = page.getByLabel('Example select');
        await singleSelect.scrollIntoViewIfNeeded(); // Scroll into view if needed

        // Select options from the single-select dropdown
        await singleSelect.selectOption('4'); // Select by value
        // await page.waitForTimeout(2000); // Wait for 2 seconds to observe the selection

        await singleSelect.selectOption('2'); // Select another option by value
        await page.waitForTimeout(200);

        await singleSelect.selectOption({ index: 2 }); // Select by index
        await page.waitForTimeout(200);

        // Count the number of options available in the dropdown
        const optionCount = await page.locator('select#exampleSelect1 option');
        console.log(`Number of options in single-select: ${await optionCount.count()}`);

        // Example 2: Interact with a multi-select dropdown
        // ----------------------------------------------
        // Locate the multi-select dropdown by its label
        const multiSelect = page.getByLabel('Example multiple select');
        await multiSelect.scrollIntoViewIfNeeded(); // Scroll into view if needed

        // Select multiple options from the multi-select dropdown
        await multiSelect.selectOption(['2', '4']); // Select multiple options
        await page.waitForTimeout(200);

        await multiSelect.selectOption(['1', '3', '5']); // Select another set of options
        await page.waitForTimeout(200);

        // Close the browser
        await browser.close();
    });
});

/**
 * Interview Questions:
 * ---------------------
 * 1. What is the difference between `selectOption()` and `check()` in Playwright?
 *    - `selectOption()`: Specifically for selecting options from dropdowns (both single and multi-select).
 *    - `check()`: Used to select checkboxes or radio buttons.
 * 
 * 2. How do you select multiple options from a multi-select dropdown in Playwright?
 *    - Use `selectOption([...options])` where you pass an array of values to be selected.
 * 
 * 3. Why is it important to use `scrollIntoViewIfNeeded()` before interacting with elements?
 *    - This method ensures that the element is visible in the viewport before performing actions, preventing potential errors due to element visibility.
 * 
 * 4. How can you retrieve the count of options available in a dropdown?
 *    - Use `locator.count()` to get the number of options in a dropdown. For example: `const count = await page.locator('select#exampleSelect1 option').count();`.
 * 
 * Key Differences:
 * ----------------
 * Aspect      | selectOption()                   | check()
 * --------------------------------------------------------
 * Purpose     | For dropdowns                    | For checkboxes/radio buttons
 * Effect      | Selects an option                | Ensures the element is selected
 * Use Case    | Dropdown selection                | Checkbox/radio selection
 * Idempotent  | Yes (does nothing if already selected) | Yes (does nothing if already checked)
 */
