const { test, expect } = require('@playwright/test');

// Test suite
test.describe('Example Test Suite', () => {

    // Single test case
    test('example test', async ({ page }) => {
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBe('Example Domain');
    });

    // Test case with multiple assertions
    test('example with assertions', async ({ page }) => {
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBe('Example Domain');
        await expect(page.locator('h1')).toHaveText('Example Domain');
    });

});
