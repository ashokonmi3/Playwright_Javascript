// login.js
const { chromium } = require('playwright');

(async () => {
   // Launch the browser
   const browser = await chromium.launch({ headless: false, slowMo: 500 });

   // Create a new browser context with stored authentication state
   const context = await browser.newContext({
      storageState: 'playwright/.auth/storage_state.json'
   });

   // Create a new page in the context
   const page = await context.newPage();

   // Visit the login page
   await page.goto("https://www.goodcv.com/login");

   // Optionally pause if you want to manually interact
   // await page.pause();

   // Close the browser
   await browser.close();
})();
