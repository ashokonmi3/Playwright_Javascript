const { test, chromium } = require('@playwright/test');

// test.describe('Text Locator Test Suite', () => {
//     let browser;
//     let page;
//     let context;

//     /**
//      * Runs before each test case to open a fresh browser instance and context.
//      */
//     test.beforeEach(async () => {
//         // Launch Chromium browser in non-headless mode with slow motion enabled for better visibility
//         browser = await chromium.launch({
//             headless: false,   // Browser will be visible
//             slowMo: 1000,      // 5 seconds delay between actions for better visibility
//             // args: ["--start-maximized"] // Start browser maximized
//         });

//         context = await browser.newContext({
//             // viewport: { width: 1920, height: 1080 }, // Set viewport to 4K resolution
//             viewport: { width: 1920, height: 1080 } // Set to a standard max resolution


//         });

//         // Open a new browser page (tab) in the new context
//         page = await context.newPage();

//         // Navigate to the website
//         await page.goto("https://bootswatch.com/default/");
//     });

//     /**
//      * Test case: Interact with text elements on the page using `locator`.
//      * Scrolls into view if needed, highlights, and interacts with various text elements.
//      */
//     test('Test Text Locators and Interaction', async () => {
//         // Locate and highlight the text "with faded secondary text"
//         // Highlights by adding red border
//         const middleButtonText = page.locator('text=Middle');
//         await middleButtonText.scrollIntoViewIfNeeded();
//         await middleButtonText.evaluate(el => el.style.border = '2px solid red');
//         // Locate and highlight the text "Small button"
//         const smallButtonText = page.locator('text=Small button');
//         await smallButtonText.scrollIntoViewIfNeeded();
//         await smallButtonText.evaluate(el => el.style.border = '2px solid red');

//         // Click on the "Middle" button text
//         // const middleButtonText = page.locator('text=Middle');
//         // await middleButtonText.scrollIntoViewIfNeeded();
//         // await middleButtonText.evaluate(el => el.style.border = '2px solid red');

//         await middleButtonText.click(); // Click action

//         const fadedText = page.locator('text=with faded secondary text').first();
//         await fadedText.scrollIntoViewIfNeeded(); // Scrolls into view if not already visible
//         await fadedText.evaluate(el => el.style.border = '2px solid red');

//         // Locate and highlight the text containing "fine print"
//         // const finePrintText = page.locator('text=fine print');
//         // await finePrintText.scrollIntoViewIfNeeded();
//         // await finePrintText.evaluate(el => el.style.border = '2px solid red'); // Highlight with a red border
//     });

//     /**
//      * Runs after each test case to close the page and browser.
//      */
//     test.afterEach(async () => {
//         await page.close();
//         await context.close()      // Close the page
//         await browser.close();   // Close the browser
//     });
// });
// ===========================


// const { test, chromium } = require('@playwright/test');

// test.describe('Alt Text Locator Test Suite', () => {
//     let browser;
//     let page;

//     /**
//      * Runs before each test case to open a fresh browser instance and context.
//      */
//     test.beforeEach(async () => {
//         // Launch Chromium browser in non-headless mode with slow motion enabled for better visibility
//         browser = await chromium.launch({
//             headless: false,   // Browser will be visible
//             slowMo: 1000,      // 5 seconds delay between actions for better visibility
//             args: ["--start-maximized"] // Start browser maximized
//         });

//         // Create a new browser context
//         const context = await browser.newContext({
//             ignoreHTTPSErrors: true,  // Ignore HTTPS certificate issues
//         });

//         // Open a new page (tab) in the browser context
//         page = await context.newPage();

//         // Navigate to the website
//         await page.goto("https://google.com/");
//     });

//     /**
//      * Test case: Locate and highlight an element using its `alt` attribute (e.g., Google logo image).
//      */
//     test('Test Alt Text Locator', async () => {
//         // Locate and highlight the image with alt text "Google"
//         const googleLogo = page.locator('img[alt="Google"]');
//         await googleLogo.scrollIntoViewIfNeeded(); // Scrolls into view if not already visible
//         await googleLogo.evaluate(el => el.style.border = '2px solid red'); // Highlights by adding red border
//         await page.waitForTimeout(5000);

//     });

//     /**
//      * Runs after each test case to close the page and browser.
//      */
//     test.afterEach(async () => {
//         await page.close();      // Close the page
//         await browser.close();   // Close the browser
//     });
// });
// ===========================

// const { test, chromium } = require('@playwright/test');

test.describe('Title Attribute Locator Test Suite', () => {
    let browser;
    let page;

    /**
     * Runs before each test case to open a fresh browser instance and context.
     */
    test.beforeEach(async () => {
        // Launch Chromium browser in non-headless mode with slow motion enabled for better visibility
        browser = await chromium.launch({
            headless: false,   // Browser will be visible
            slowMo: 1000,      // 5 seconds delay between actions for better visibility
            // args: ["--start-maximized"] // Start browser maximized
        });

        // Create a new browser context
        const context = await browser.newContext({
            ignoreHTTPSErrors: true,  // Ignore HTTPS certificate issues
            viewport: { width: 1920, height: 1080 } // Set to your screen resolution (change if needed)

        });

        // Open a new page (tab) in the browser context
        page = await context.newPage();

        // Navigate to the website
        await page.goto("https://bootswatch.com/default/");
    });

    /**
     * Test case: Locate and highlight elements using their `title` attribute.
     */
    test('Test Title Locator', async () => {
        // Locate and highlight the element with the title "attribute"
        const elementWithTitle = page.locator('[title="attribute"]');  // Correctly locate by title attribute
        await elementWithTitle.scrollIntoViewIfNeeded(); // Scrolls into view if not already visible
        await elementWithTitle.evaluate(el => el.style.border = '2px solid red'); // Highlights by adding red border
        await page.waitForTimeout(3000); // Wait for 3 seconds after highlighting

        // Locate and highlight the element with the title "Source Title"
        const elementWithSourceTitle = page.locator('[title="Source Title"]').first();  // Locate the first element by title attribute
        await elementWithSourceTitle.scrollIntoViewIfNeeded(); // Scrolls into view if not already visible
        await elementWithSourceTitle.evaluate(el => el.style.border = '2px solid red'); // Highlight with a red border
        await page.waitForTimeout(3000); // Wait for 3 seconds after highlighting
    });

    /**
     * Runs after each test case to close the page and browser.
     */
    test.afterEach(async () => {
        await page.close();      // Close the page
        await browser.close();   // Close the browser
    });
});
