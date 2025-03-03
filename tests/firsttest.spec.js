const { test, expect } = require('@playwright/test')

test.describe('First Test suite', () => {

    test('First Test case', async ({ page }) => {
        await page.goto('https://google.com');
        const title = await page.title();

        expect(title).toBe('Google');


    });


})