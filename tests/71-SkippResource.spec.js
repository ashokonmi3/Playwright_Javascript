const { test, expect, chromium } = require('@playwright/test');

// Define the resources that are not allowed
const NOT_ALLOWED_RESOURCES = ['image', 'font', 'stylesheet', 'media'];

// Function to handle route interception
async function onRoute(route) {
   if (NOT_ALLOWED_RESOURCES.includes(route.request().resourceType())) {
      await route.abort(); // Abort the request for disallowed resources
   } else {
      await route.continue(); // Continue with allowed requests
   }
}

// Set up the test environment
test.beforeEach(async ({ page }) => {
   // Intercept all network requests and apply the routing logic
   await page.route('**', onRoute);
});

// Test to check if the 'docs' link is visible
test('test_page_has_docs_link', async ({ page }) => {
   await page.goto('https://playwright.dev/python'); // Navigate to the page
   const link = await page.getByRole('link', { name: 'docs' }); // Locate the 'docs' link
   await expect(link).toBeVisible(); // Verify that the link is visible
});

// Test to check the 'GET STARTED' link functionality
test('test_get_started_link', async ({ page }) => {
   await page.goto('https://playwright.dev/python'); // Navigate to the page
   const link = await page.getByRole('link', { name: 'GET STARTED' }); // Locate the 'GET STARTED' link
   await link.click(); // Click the link
   await expect(page).toHaveURL('https://playwright.dev/python/docs/intro'); // Verify the new URL
});
