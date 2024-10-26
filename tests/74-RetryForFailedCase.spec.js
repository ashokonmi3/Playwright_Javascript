// example.test.js
const { test, expect } = require('@playwright/test');

test('this test will fail', async ({ page }) => {
   // Navigate to a website
   await page.goto('https://example.com');

   // Intentionally failing assertion
   expect(await page.title()).toBe('This title does not exist'); // This will fail
});
// retries: process.env.CI ? 2 : 2, 2 time retry
// retries: process.env.CI ? 2 : 0, original

