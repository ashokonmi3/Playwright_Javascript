const { test } = require('@playwright/test');

test.describe('Test Suite with Hooks', () => {
    // Runs once before the entire suite
    test.beforeAll(async () => {
        console.log('Setup before running tests');
    });

    // Runs before each test case
    test.beforeEach(async ({ page }) => {
        console.log('test execution started');

        await page.goto('https://example.com');
    });

    // Test case 1
    test('Test Case 1', async ({ page }) => {
        const title = await page.title();
        console.log('Title:', title);
    });

    // Test case 2
    test('Test Case 2', async ({ page }) => {
        const content = await page.locator('h1').textContent();
        console.log('Content:', content);
    });

    // Runs after each test case
    test.afterEach(async ({ page }) => {
        console.log('test execution complete');

        await page.close();
    });

    // Runs once after all tests in the suite
    test.afterAll(async () => {
        console.log('Cleanup after all tests');
    });
});


// Execute something only once for this complete test suite
// before all --> create log file

// before each launch example.com
// test1
// after each close browser

// launch example.com
// test2
// launch example.com

// launch example.com
// test3
// launch example.com

// launch example.com
// test4
// launch example.com



// after all --> save this file

// test1
// laucnh example.com
// execute test
// close browser 