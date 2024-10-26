// login.js
const { chromium } = require('playwright');

(async () => {
   // Launch the browser
   const browser = await chromium.launch({ headless: false, slowMo: 500 });

   // Create a new browser context
   const context = await browser.newContext();

   // Create a new page
   const page = await context.newPage();

   // Visit the login page
   await page.goto("https://www.goodcv.com/login");

   // Enter email address
   await page.fill('input[placeholder="Email Address"]', "ashokonmi@gmail.com");

   // Enter password
   await page.fill('input[placeholder="Password"]', "asharma1");

   // Click the Log In button
   await page.click('input[type="submit"][value="Log In"]');

   // Optionally pause if your account has two-factor authentication
   // await page.pause();

   // Save authentication state
   await context.storageState({ path: 'playwright/.auth/storage_state.json' });

   // Close the browser
   await browser.close();
})();
