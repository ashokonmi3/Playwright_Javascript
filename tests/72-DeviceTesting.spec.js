// screenshot.spec.js
const { test, expect, devices } = require('@playwright/test');

test('Take screenshot of example.com on Pixel 5', async ({ page }) => {
   // Define the device you want to emulate
   const device = devices['Pixel 5'];

   // Create a new browser context with device emulation
   const context = await page.context().browser().newContext({
      ...device,
   });

   // Create a new page in the context
   const mobilePage = await context.newPage();

   // Navigate to a website
   await mobilePage.goto("https://www.example.com");

   // Take a screenshot of the page
   await mobilePage.screenshot({ path: "example_pixel5.png" });

   // Close the context
   await context.close();
});
