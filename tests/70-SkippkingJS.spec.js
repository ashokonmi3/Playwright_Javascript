const { test, expect, chromium } = require('@playwright/test');

// Define the browser, context, and page variables
let browser;
let context;
let page;

// Fixture to create a browser context with JavaScript enabled and provide a page object
test.beforeAll(async () => {
   /**
    * This block runs once before all tests.
    * It launches the browser and creates a context with JavaScript enabled.
    */
   // Launch the browser (not headless for visibility)
   browser = await chromium.launch({ headless: false });
   // Create a new context with JavaScript enabled
   context = await browser.newContext({ javaScriptEnabled: false });
   // Create a new page in the context
   page = await context.newPage();
});

// Cleanup after tests are done
test.afterAll(async () => {
   /**
    * This block runs once after all tests.
    * It closes the page and browser context.
    */
   await page.close(); // Close the page
   await context.close(); // Close the browser context
   await browser.close(); // Close the browser
});

// Test that verifies the visibility of the link for loading movie data for the year 2015
test('test_page_has_docs_link', async () => {
   /**
    * Test to verify that the link for loading movie data for the year 2015 is visible.
    */
   // Navigate to the website
   await page.goto("https://www.scrapethissite.com/pages/ajax-javascript/");

   // Locate the link for loading movie data for the year 2015
   const link = await page.getByRole("link", { name: "2015" });
   console.log("Clicking on the link..."); // Log action
   await link.click(); // Click the link

   console.log("Loading Oscars for 2015..."); // Log loading status
   // Wait for a specific element to appear after clicking
   const firstTableData = page.locator("td.film-title").first();
   await firstTableData.scrollIntoViewIfNeeded(); // Scroll into view if needed
   await firstTableData.waitFor(); // 

   // Check if the link is still visible after clicking
   await expect(link).toBeVisible(); // Assert that the link is still visible
});
