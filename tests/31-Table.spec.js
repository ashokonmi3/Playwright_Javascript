const { test, expect } = require("@playwright/test");

// test("Handle Web Table", async ({ page }) => {
//   await page.goto("https://testautomationpractice.blogspot.com/");
//   const table = await page.locator("#productTable");
//   await table.scrollIntoViewIfNeeded();

//   // get total number of rows and cols
//   const cols = await table.locator("thead tr th");
//   console.log("number of cols", await cols.count());

//   const rows = await table.locator("tbody tr");
//   console.log("number of rows", await rows.count());

//   //1.assertion
//   expect(await rows.count()).toBe(5);
//   expect(await cols.count()).toBe(4);
//   await page.close();
// });
// =========================
// test("Handle Web Table", async ({ page }) => {
//   await page.goto("https://testautomationpractice.blogspot.com/");
//   const table = await page.locator("#productTable");
//   const rows = await table.locator("tbody tr");

//   const matchedRow = rows.filter({
//     has: page.locator("td"),
//     hasText: "Smartwatch",
//   });
//   await matchedRow.locator("input").check();
//   await page.close();
// });

// =====================

// =========================
test("Handle Web Table", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const table = page.locator("#productTable");
  const rows = table.locator("tbody tr");

  await selectName(rows, page, "Tablet");
  await selectName(rows, page, "Smartphone");

  await page.waitForTimeout(5000);
});

async function selectName(rows, page, name) {
  const matchedRow = rows.filter({
    has: page.locator("td"),
    hasText: name,
  });

  await matchedRow.locator("input[type='checkbox']").check();
}
