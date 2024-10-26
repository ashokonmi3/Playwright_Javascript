const { test } = require('@playwright/test');

test.describe('Test Suite with Hooks', () => {
    // Runs once before the entire suite
    test.beforeAll(async () => {
        console.log('Setup before running tests');
    });

    // Runs before each test case
    test.beforeEach(async ({ page }) => {
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
        await page.close();
    });

    // Runs once after all tests in the suite
    test.afterAll(async () => {
        console.log('Cleanup after all tests');
    });
});
