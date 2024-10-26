const { test, chromium } = require('@playwright/test');

test.describe('Test Suite with Hooks', () => {
    let browser;
    let page;

    // Runs once before the entire suite
    test.beforeAll(async () => {
        console.log('Setup before running tests');
    });

    // Runs before each test case
    test.beforeEach(async () => {
        // Manually launch the browser with UI and slowMo
        browser = await chromium.launch({
            headless: false, // Runs in UI mode
            slowMo: 5000,     // Slows down actions by 500ms
        });
        page = await browser.newPage();
        await page.goto('https://example.com');
    });

    // Test case 1
    test('Test Case 1', async () => {
        const title = await page.title();
        console.log('Title:', title);
    });

    // Test case 2
    test('Test Case 2', async () => {
        const content = await page.locator('h1').textContent();
        console.log('Content:', content);
    });

    // Runs after each test case
    test.afterEach(async () => {
        await page.close();  // Close the page after each test
        await browser.close();  // Close the browser after each test
    });

    // Runs once after all tests in the suite
    test.afterAll(async () => {
        console.log('Cleanup after all tests');
    });
});

// use: {
//     headless: false,  // UI mode
//         slowMo: 500,      // Slows down actions by 500ms
//   },