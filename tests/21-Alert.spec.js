// const { chromium } = require('playwright'); // Import Playwright library
// const { test } = require('@playwright/test');

// /**
//  * Handle Alert Demo
//  *
//  * This script demonstrates how to handle JavaScript alerts using Playwright.
//  *
//  * It performs the following steps:
//  * 1. Launches a Chromium browser instance.
//  * 2. Navigates to a test page with an alert button.
//  * 3. Sets up an event listener to handle dialog events (alerts).
//  * 4. Clicks the button to trigger the alert.
//  * 5. Waits for a few seconds to ensure the alert is handled.
//  * 6. Closes the browser.
//  *
//  * Key Concepts:
//  * --------------
//  * - Handling alerts: Playwright allows interaction with JavaScript alerts by listening for dialog events.
//  * - Event listeners: Using `page.on('dialog', handlerFunction)` to handle alerts.
//  * - Synchronization: Ensuring that the script waits for the alert to be handled properly.
//  */
// test.describe('Alert Handling Tests', () => {
//     test('should handle JavaScript alerts', async () => {
//         // Launch the browser in non-headless mode with a slow motion delay of 500ms
//         const browser = await chromium.launch({
//             headless: false,
//             slowMo: 500 // Slow down actions for better visibility
//         });
//         const context = await browser.newContext({
//             viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
//         });
//         const page = await context.newPage();

//         // Navigate to the test page with the alert button
//         await page.goto("https://testpages.eviltester.com/styled/alerts/alert-test.html");

//         // Register the event listener for dialog events (alerts)
//         page.on('dialog', handleDialog);

//         // Locate the button that triggers the alert
//         const buttonLocator = page.getByText("Show alert box");

//         // Scroll into view if needed and click the button to trigger the alert
//         await buttonLocator.scrollIntoViewIfNeeded();
//         await buttonLocator.click();

//         // Wait for a few seconds to ensure the alert is handled
//         await page.waitForTimeout(5000); // Adjust this time if needed based on alert appearance

//         // Close the browser
//         await browser.close();
//     });
// });

// /**
//  * Handles the dialog event by printing the alert text and accepting the alert.
//  *
//  * @param {Dialog} dialog - The dialog object representing the JavaScript alert.
//  */
// function handleDialog(dialog) {
//     console.log(`Alert text: ${dialog.message()}`); // Print the alert text to the console
//     dialog.accept(); // Accept the alert
// }
// ===============================
// const { chromium } = require('playwright'); // Import Playwright library
// const { test } = require('@playwright/test');

/**
 * Handle Alert Demo
 *
 * This script demonstrates how to handle JavaScript confirmation alerts using Playwright.
 *
 * It performs the following steps:
 * 1. Launches a Chromium browser instance.
 * 2. Navigates to a test page with a confirmation button.
 * 3. Sets up an event listener to handle dialog events (confirmation alerts).
 * 4. Clicks the button to trigger the confirmation alert.
 * 5. Waits for a few seconds to ensure the alert is handled.
 * 6. Closes the browser.
 *
 * Key Concepts:
 * --------------
 * - Handling alerts: Playwright allows interaction with JavaScript alerts by listening for dialog events.
 * - Event listeners: Using `page.on('dialog', handlerFunction)` to handle alerts.
 * - Synchronization: Ensuring that the script waits for the alert to be handled properly.
 *
 * Notes:
 * -------
 * - Ensure that the selector used for locating the button matches the element on the page.
 * - Adjust the wait duration based on the time required for the alert to appear and be handled.
 */
// test.describe('Alert Handling Tests', () => {
//     test('should handle JavaScript confirmation alerts', async () => {
//         // Launch the browser in non-headless mode with a slow motion delay of 500ms
//         const browser = await chromium.launch({
//             headless: false,
//             slowMo: 500 // Slow down actions for better visibility
//         });
//         const context = await browser.newContext({
//             viewport: { width: 3840, height: 2160 } // Set to your screen resolution
//         });
//         const page = await context.newPage();

//         // Navigate to the test page with the confirmation button
//         await page.goto("https://testpages.eviltester.com/styled/alerts/alert-test.html");

//         // Register the event listener for dialog events (confirmation alerts)
//         page.on('dialog', handleDialog);

//         // Locate the button that triggers the confirmation alert
//         const buttonLocator = page.getByText("Show confirm box");

//         // Scroll into view if needed and click the button to trigger the alert
//         await buttonLocator.scrollIntoViewIfNeeded();
//         await buttonLocator.click();

//         // Wait for a few seconds to ensure the alert is handled
//         await page.waitForTimeout(5000); // Adjust this time if needed based on alert appearance

//         // Close the browser
//         await browser.close();
//     });
// });

// /**
//  * Handles the dialog event by printing the alert text and accepting the confirmation alert.
//  *
//  * @param {Dialog} dialog - The dialog object representing the JavaScript confirmation alert.
//  */
// function handleDialog(dialog) {
//     console.log(`Confirmation alert text: ${dialog.message()}`); // Print the alert text to the console
//     dialog.accept(); // Accept the confirmation alert
// }
// ===================
const { chromium } = require('playwright'); // Import Playwright library
const { test } = require('@playwright/test');

/**
 * Handle Alert Demo
 *
 * This script demonstrates how to handle JavaScript prompts using Playwright.
 *
 * It performs the following steps:
 * 1. Launches a Chromium browser instance.
 * 2. Navigates to a test page with a prompt button.
 * 3. Sets up an event listener to handle dialog events (prompts).
 * 4. Clicks the button to trigger the prompt.
 * 5. Waits for a few seconds to ensure the prompt is handled.
 * 6. Closes the browser.
 *
 * Key Concepts:
 * --------------
 * - Handling prompts: Playwright allows interaction with JavaScript prompts by listening for dialog events.
 * - Event listeners: Using `page.on('dialog', handlerFunction)` to handle prompts.
 * - Synchronization: Waiting for actions to complete to ensure alerts are handled properly.
 *
 * Notes:
 * -------
 * - Ensure that the selector used for locating the button matches the element on the page.
 * - Adjust the wait duration based on the time required for the prompt to appear and be handled.
 */
test.describe('Alert Handling Tests', () => {
    test('should handle JavaScript prompt alerts', async () => {
        // Launch the browser in non-headless mode with a slow motion delay of 500ms
        const browser = await chromium.launch({
            headless: false,
            slowMo: 5000, // Slow down actions for better visibility
        });

        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
            viewport: { width: 3840, height: 2160 } // Set to your screen resolution
        });

        const page = await context.newPage();

        // Navigate to the test page with the prompt button
        await page.goto("https://testpages.eviltester.com/styled/alerts/alert-test.html");

        // Register the event listener for dialog events (prompts)
        page.on('dialog', handleDialog);

        // Locate the button that triggers the prompt
        const buttonLocator = page.getByText("Show prompt box");

        // Scroll into view if needed and click the button to trigger the prompt
        await buttonLocator.scrollIntoViewIfNeeded();
        await buttonLocator.click();

        // Wait for a few seconds to ensure the prompt is handled
        await page.waitForTimeout(5000); // Adjust this time if needed based on prompt appearance

        // Close the browser
        await browser.close();
    });
});

/**
 * Handles the dialog event by printing the prompt text and accepting the prompt.
 *
 * @param {Dialog} dialog - The dialog object representing the JavaScript prompt.
 */
async function handleDialog(dialog) {
    console.log(`Prompt text: ${dialog.message()}`); // Print the prompt text to the console
    await dialog.accept("hello"); // Enter "hello" and accept the prompt
}

// Interview Questions and Answers
/*
1. **What is dialog handling in Playwright?**
   - Dialog handling in Playwright refers to managing browser dialog events (like alerts, confirms, prompts) that appear during page interactions. You can listen for these events and execute custom logic.

2. **How do you register an event listener for dialogs in Playwright?**
   - You can register an event listener by using `page.on('dialog', handlerFunction)`, where `handlerFunction` is a function that defines how to handle the dialog.

3. **What does `dialog.accept()` do?**
   - The `dialog.accept()` method is used to accept the prompt dialog, effectively dismissing it and allowing the script to continue execution. You can also pass a string as a parameter to provide a response to the prompt.

4. **Why is it important to handle prompts in automated tests?**
   - Handling prompts is crucial because they can disrupt the testing flow, affect performance, or alter the appearance of the application, leading to inaccurate test results.

5. **What parameters can you configure when launching a browser with Playwright?**
   - You can configure several parameters, such as `headless` mode, `slowMo` for slowing down actions, and `viewport` size to set the display resolution of the browser window.
*/


// Interview Questions and Answers
/*
1. **What is dialog handling in Playwright?**
   - Dialog handling in Playwright refers to managing browser dialog events (like alerts, confirms, prompts) that appear during page interactions. You can listen for these events and execute custom logic.

2. **How do you register an event listener for dialogs in Playwright?**
   - You can register an event listener by using `page.on('dialog', handlerFunction)`, where `handlerFunction` is a function that defines how to handle the dialog.

3. **What does `dialog.accept()` do?**
   - The `dialog.accept()` method is used to accept the confirmation dialog, effectively dismissing it and allowing the script to continue execution.

4. **Why is it important to handle alerts in automated tests?**
   - Handling alerts is crucial because they can disrupt the testing flow, affect performance, or alter the appearance of the application, leading to inaccurate test results.

5. **What parameters can you configure when launching a browser with Playwright?**
   - You can configure several parameters, such as `headless` mode, `slowMo` for slowing down actions, and `viewport` size to set the display resolution of the browser window.
*/




// Interview Questions and Answers
/*
1. **What is dialog handling in Playwright?**
   - Dialog handling in Playwright refers to managing browser dialog events (like alerts, confirms, prompts) that appear during page interactions. You can listen for these events and execute custom logic.

2. **How do you register an event listener for dialogs in Playwright?**
   - You can register an event listener by using `page.on('dialog', handlerFunction)`, where `handlerFunction` is a function that defines how to handle the dialog.

3. **What does `dialog.accept()` do?**
   - The `dialog.accept()` method is used to accept the dialog, effectively dismissing it and continuing the script execution.

4. **Why is it important to handle alerts in automated tests?**
   - Handling alerts is crucial because they can disrupt the testing flow, affect performance, or alter the appearance of the application, leading to inaccurate test results.

5. **What parameters can you configure when launching a browser with Playwright?**
   - You can configure several parameters, such as `headless` mode, `slowMo` for slowing down actions, and `viewport` size to set the display resolution of the browser window.
*/
