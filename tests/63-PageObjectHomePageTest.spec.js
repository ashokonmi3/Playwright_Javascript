const { test, expect } = require('@playwright/test');
const PlaywrightPage = require('./PageObject/HomePage'); // Adjust the path as needed

test.use({ headless: false }); // Ensure tests run in UI mode

test('Docs link navigation', async ({ page }) => {
   const homepage = new PlaywrightPage(page);
   await homepage.visitDocs();

   // Expect that the URL is correct after visiting the Docs link
   await expect(page).toHaveURL('https://playwright.dev/python/docs/intro');
});

test('Docs search functionality', async ({ page }) => {
   const query = 'assertions';

   const homepage = new PlaywrightPage(page);
   await homepage.search(query);

   // Expect that the search results contain the expected text
   const resultsLocator = await homepage.searchResults(); // Ensure this method returns the correct locator
   await expect(resultsLocator).toContainText('List of assertions');
});
