/*===========================
Saving he state
==========================*/

// const { test } = require("@playwright/test");

// test("Generate authentication state", async ({ page, context }) => {
//   await page.goto("https://www.goodcv.com/login");

//   await page.fill('input[placeholder="Email Address"]', "ashokonmi@gmail.com");
//   await page.fill('input[placeholder="Password"]', "asharma1");

//   await page.click('input[type="submit"][value="Log In"]');

//   await context.storageState({
//     path: "playwright/.auth/storage_state.json",
//   });
// });

/*===========================
Reusing the saved state
==========================*/
const { test } = require("@playwright/test");

test("Verify login using stored authentication state", async ({ browser }) => {
  // Create a new browser context with stored authentication state
  const context = await browser.newContext({
    storageState: "playwright/.auth/storage_state.json",
  });

  // Create a new page
  const page = await context.newPage();

  // Navigate to the application
  await page.goto("https://www.goodcv.com/login");

  // Pause for debugging/manual interaction
  await page.pause();

  await context.close();
});
