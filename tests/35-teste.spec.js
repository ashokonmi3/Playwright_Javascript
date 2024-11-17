import { test, expect } from '@playwright/test';

test.describe('Playwright Documentation Attribute Tests', () => {
   const URL = "https://playwright.dev/python";

   // Runs once before all tests in the suite
   test.beforeAll(async ({ page }) => {
      // Navigate to the specified URL
      await page.goto(URL);
   });

   test('Validate Docs Link Attributes', async ({ page }) => {
      // Locate the 'Docs' link element by its role and name
      const docsLink = page.getByRole("link", { name: "Docs" });
      await docsLink.click();
      // Expect API: Check if the 'Docs' link has the exact class value
      // await docsLink.scrollIntoViewIfNeeded(); // Scroll into view if needed
      // await expect(docsLink).toHaveClass("navbar__item navbar__link");
      // console.log("Verified that the 'Docs' link has the exact class: 'navbar__item navbar__link'.");

      // // Expect API: Use regular expression to check if the 'Docs' link class contains a partial class value
      // await expect(docsLink).toHaveClass(/navbar__link/); // Using regex for partial match
      // console.log("Verified that the 'Docs' link class contains 'navbar__link' using regex.");

      // // Expect API: Check if the 'href' attribute has a specific value
      // await expect(docsLink).toHaveAttribute("href", "/python/docs/intro");
      // console.log("Verified that the 'Docs' link has the correct href attribute value: '/python/docs/intro'.");
   });

   // Runs once after all tests in the suite
   test.afterAll(async ({ page }) => {
      console.log('Cleanup after all tests');
      // `page.close()` is not needed because Playwright automatically cleans up after each test.
   });
});
