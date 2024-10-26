const { test, expect, chromium } = require('@playwright/test');
const LoginPage = require('./PageObject/LoginPage'); // Adjust the path as needed

// Example of how to run the tests (assuming using Playwright Test runner)
test.use({ browserName: 'chromium' }); // Specify to use Chromium browser in UI mode

test('Successful login test', async () => {
   const username = 'dan';
   const password = 'pwd';

   // Launch the browser in UI mode
   const browser = await chromium.launch({ headless: false });
   const page = await browser.newPage();

   const loginPage = new LoginPage(page);

   await loginPage.login(username, password);

   await expect(loginPage.label).toHaveText(`Welcome, ${username}!`);

   // Close the browser after the test
   await browser.close();
});

test('Failed login test', async () => {
   const username = 'dan';
   const password = 'cnasdjc';

   // Launch the browser in UI mode
   const browser = await chromium.launch({ headless: false });
   const page = await browser.newPage();

   const loginPage = new LoginPage(page);

   await loginPage.login(username, password);

   await expect(loginPage.label).toHaveText("Invalid username/password");

   // Close the browser after the test
   await browser.close();
});
