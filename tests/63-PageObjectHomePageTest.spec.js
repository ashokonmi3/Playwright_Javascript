const { test, expect } = require('@playwright/test');
const HomePage = require('./PageObject/HomePage'); // Adjust the path as needed

// Define the test suite for the Playwright home page
test.describe('Playwright Home Page Tests', () => {
   let homepage;

   // Before each test, initialize the HomePage object and navigate to the URL
   test.beforeEach(async ({ page }) => {
      homepage = new HomePage(page);
      await homepage.navigate(); // Ensure we start from the correct page for all tests
   });

   // Test to validate Docs link navigation
   test('Docs link navigation', async ({ page }) => {
      await homepage.visitDocs();

      // Expect the URL to be correct after clicking the Docs link
      await expect(page).toHaveURL('https://playwright.dev/python/docs/intro');
   });

   // Test to validate the search functionality
   test('Docs search functionality', async ({ page }) => {
      const query = 'assertions';

      // Perform the search
      await homepage.search(query);

      // Verify search results contain expected text
      const resultsText = await homepage.getSearchResults();
      expect(resultsText.some(result => result.includes('assertions'))).toBeTruthy();
   });
});
