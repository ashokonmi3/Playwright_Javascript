const { test, expect } = require('@playwright/test');
const path = require('path');

// function getFileUrl(fileName) {
//   return 'file://' + path.resolve(__dirname, fileName).replace(/\\/g, '/');
// }

const DEMO_PAGE = "file:///E:/Playwright_training/Originalcode/Playwright_Javascript/playwright_demo_html_file_playwright_test_code.html";
test.use({ headless: false });
test.describe('Playwright — Multiple Locator Test Suite', () => {

  //
  // TEST CASE 1 — AND condition (chaining + filter + has)
  //
  test('AND condition with chaining, filter, has, hasText', async ({ page }) => {
    await page.goto(DEMO_PAGE);

    const userRow = page.locator('.userRow', {
      has: page.locator('.role', { hasText: 'Admin' }),
    }).filter({
      has: page.locator('.status', { hasText: 'Active' })
    });

    await userRow.locator('.editBtn').click();

    await expect(userRow).toHaveClass(/highlight/);
  });


  //
  // TEST CASE 2 — OR condition using .or()
  //
test('OR condition using .or()', async ({ page }) => {
  await page.goto(DEMO_PAGE);

  const actionBtn =
    page.locator('#primaryAction')
        .or(page.locator('.alternativeAction'));

  await actionBtn.first().click();

  await expect(page.locator('#actionResult')).toContainText(/CLICKED/);
});

  //
  // TEST CASE 3 — has + hasText (product card)
  //
  test('has + hasText to find product card', async ({ page }) => {
    await page.goto(DEMO_PAGE);

    const product = page.locator('.product', {
      has: page.locator('.title', { hasText: 'Wireless Mouse' })
    });

    await product.locator('.buy').click();

    await expect(product).toHaveClass(/highlight/);
  });

});
