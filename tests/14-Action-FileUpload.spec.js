// tests/fileUpload.spec.js

// const { test, expect, chromium } = require('@playwright/test');

// /**
//  * Demonstrates how to interact with file upload inputs using Playwright.
//  *
//  * File Upload Interaction Notes:
//  * ------------------------------
//  * In Playwright, you can perform actions on file input elements to upload files:
//  * - `setInputFiles`: Sets the files to be uploaded by the file input element.
//  *
//  * Basic Actions:
//  * --------------
//  * - `element.setInputFiles(filePath)`: Sets the file to be uploaded by the file input element.
//  * - `element.setInputFiles([filePath1, filePath2, ...])`: Sets multiple files to be uploaded by the file input element.
//  *
//  * Workflow:
//  * ----------
//  * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
//  * 2. Creates a new browser context and page, and navigates to a page with a file input element.
//  * 3. Sets the viewport size to 3840x2160 pixels.
//  * 4. Waits for 2 seconds to ensure the page is fully loaded.
//  * 5. Scrolls to make sure the file input element is visible.
//  * 6. Interacts with the file input element to upload files.
//  * 7. Closes the browser context.
//  *
//  * Examples:
//  * ----------
//  * - Example 1: Upload a single file.
//  * - Example 2: Upload multiple files.
//  */

// test.describe('File Upload Tests', () => {
//     test('should upload a file successfully', async () => {
//         // Launch a browser in non-headless mode with a slow motion delay of 500ms
//         const browser = await chromium.launch({ headless: false, slowMo: 500 });

//         // Create a new browser context with the specified viewport size
//         const context = await browser.newContext({
//             ignoreHTTPSErrors: true,
//             viewport: { width: 1920, height: 1080 } // Set to your screen resolution
//         });

//         // Create a new page
//         const page = await context.newPage();

//         // Visit the website with a file input element
//         await page.goto('https://bootswatch.com/default/');

//         // Wait for 2 seconds to ensure the page is fully loaded
//         await page.waitForTimeout(2000);

//         // Locate the file input element by its type and upload a file
//         const fileInput = page.locator("input[type='file']");
//         await fileInput.scrollIntoViewIfNeeded(); // Scroll into view if needed

//         // Upload a single file
//         await fileInput.setInputFiles('D:\\Study\\Playwright\\python-playwright\\test.txt');

//         // Optional: To upload multiple files (uncomment to use)
//         // await fileInput.setInputFiles(['D:\\Study\\Playwright\\python-playwright\\test.txt', 'D:\\Study\\Playwright\\python-playwright\\test2.txt']);

//         // Wait for a few seconds to observe the file upload
//         await page.waitForTimeout(5000);

//         // Optionally, you can verify if the file upload was successful
//         // For example, check if the file name appears in the UI

//         // Close the browser context
//         await context.close();
//         await browser.close();
//     });
// });
// ==========================

// tests/fileUpload.spec.js

const { test, expect, chromium } = require('@playwright/test');

/**
 * Demonstrates how to interact with file upload inputs using Playwright.
 *
 * File Upload Interaction Notes:
 * ------------------------------
 * In Playwright, you can perform actions on file input elements to upload files:
 * - `setInputFiles`: Sets the files to be uploaded by the file input element.
 * - `page.expectFileChooser()`: Handles file chooser dialogs that appear when interacting with file inputs.
 *
 * Basic Actions:
 * --------------
 * - `element.setInputFiles(filePath)`: Sets the file to be uploaded by the file input element.
 * - `element.setInputFiles([filePath1, filePath2, ...])`: Sets multiple files to be uploaded by the file input element.
 * - `page.expectFileChooser()`: Waits for and handles file chooser dialogs, allowing you to specify files to be selected.
 *
 * Workflow:
 * ----------
 * 1. Launches a browser in non-headless mode with a slow motion delay of 500ms.
 * 2. Creates a new browser context with the specified viewport size.
 * 3. Waits for 2 seconds to ensure the page is fully loaded.
 * 4. Locates the file input element and scrolls into view.
 * 5. Sets the files to be uploaded in the file chooser.
 * 6. Waits for 5 seconds to observe the file upload.
 * 7. Closes the browser.
 *
 * Examples:
 * ----------
 * - Example 1: Upload a single file by setting the file path directly.
 * - Example 2: Handle file chooser dialogs and specify files to upload.
 */

test.describe('File Upload Tests', () => {
    test('should upload a file successfully', async () => {
        // Launch a browser in non-headless mode with a slow motion delay of 500ms
        const browser = await chromium.launch({
            headless: false,
            slowMo: 500,
        });

        // Create a new browser context with the specified viewport size
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,
            viewport: { width: 1920, height: 1080 } // Set to your screen resolution
        });

        // Create a new page
        const page = await context.newPage();

        // Visit the website with a file input element
        await page.goto('https://bootswatch.com/default/');

        // Wait for 2 seconds to ensure the page is fully loaded
        await page.waitForTimeout(2000);

        // Locate the file input element
        const fileInput = page.locator("input[type='file']");
        await fileInput.scrollIntoViewIfNeeded(); // Scroll into view if needed

        // Interact with the file input element and handle the file chooser dialog
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'), // Wait for the file chooser event
            fileInput.click() // Trigger the file chooser dialog
        ]);

        // Set the file to be uploaded
        await fileChooser.setFiles('FileUpload.txt');

        // Wait for a few seconds to observe the file upload
        await page.waitForTimeout(5000);

        // Close the browser
        await context.close();
        await browser.close();
    });
});

/**
 * Interview Questions:
 * -----------------------
 * 1. What is Playwright and how does it differ from other testing frameworks?
 *    - Playwright is a Node.js library for browser automation. Unlike Selenium, it supports multiple browsers with a single API and provides better handling of asynchronous operations.
 *
 * 2. How do you handle file uploads in Playwright?
 *    - File uploads can be handled by locating the file input element and using the `setInputFiles()` method to specify the files to be uploaded. Additionally, you can use the `expectFileChooser()` method to handle file chooser dialogs.
 *
 * 3. What are some of the benefits of using Playwright for testing?
 *    - Playwright supports multiple browsers, provides a simple and powerful API, allows for parallel test execution, and can handle complex user interactions easily.
 *
 * 4. Explain the concept of context in Playwright.
 *    - A context in Playwright is an isolated environment for pages that allows for managing browser sessions, cookies, local storage, etc., separately for each context.
 */


/**
 * Interview Questions:
 * -----------------------
 * 1. What is Playwright and how does it differ from other testing frameworks?
 *    - Playwright is a Node.js library for browser automation. Unlike Selenium, it supports multiple browsers with a single API and provides better handling of asynchronous operations.
 *
 * 2. How do you handle file uploads in Playwright?
 *    - File uploads can be handled by locating the file input element and using the `setInputFiles()` method to specify the files to be uploaded.
 *
 * 3. What are some of the benefits of using Playwright for testing?
 *    - Playwright supports multiple browsers, provides a simple and powerful API, allows for parallel test execution, and can handle complex user interactions easily.
 *
 * 4. Explain the concept of context in Playwright.
 *    - A context in Playwright is an isolated environment for pages that allows for managing browser sessions, cookies, local storage, etc., separately for each context.
 */
