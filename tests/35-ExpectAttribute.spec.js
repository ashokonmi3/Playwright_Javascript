// Import necessary modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite for Playwright Documentation Attribute Assertions
 * This suite demonstrates the usage of the expect API in Playwright
 * for asserting the attributes of web elements on the Playwright page.
 *
 * Steps:
 * - Navigate to the Playwright Python documentation homepage.
 * - Verify that the 'Docs' link has the exact class names.
 * - Use regular expressions to validate that the 'Docs' link contains a partial class name.
 * - Check for the presence of the 'href' attribute and its value.
 */

test.describe('Playwright Documentation Attribute Tests', () => {
   let browser;
   let page;
   const URL = "https://playwright.dev/python";

   // Runs once before the entire suite
   test.beforeAll(async () => {
      // Launch the browser in UI mode
      browser = await chromium.launch({
         headless: false, // Runs in UI mode
         slowMo: 500, // Slows down actions by 500ms for visibility
      });
      page = await browser.newPage({
         // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },
         // viewport: null


      });




      await page.goto(URL); // Navigate to the specified URL
   });

   test('Validate Docs Link Attributes', async () => {
      // Locate the 'Docs' link element by its role and name
      const docsLink = page.getByRole("link", { name: "Docs" });

      // Expect API: Check if the 'Docs' link has the exact class value
      await docsLink.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await expect(docsLink).toHaveClass("navbar__item navbar__link");
      console.log("Verified that the 'Docs' link has the exact class: 'navbar__item navbar__link'.");

      // Expect API: Use regular expression to check if the 'Docs' link class contains a partial class value
      await expect(docsLink).toHaveClass(/navbar__link/); // Using regex for partial match
      console.log("Verified that the 'Docs' link class contains 'navbar__link' using regex.");

      // Expect API: Check if the 'href' attribute has a specific value
      await expect(docsLink).toHaveAttribute("href", "/python/docs/intro");
      console.log("Verified that the 'Docs' link has the correct href attribute value: '/python/docs/intro'.");
   });

   // Runs once after all tests in the suite
   test.afterAll(async () => {
      console.log('Cleanup after all tests');
      await browser.close(); // Close the browser after tests are completed
   });
});

/*
 * Interview Questions:
 * 1. What is the purpose of the `expect` API in Playwright?
 * Answer: The `expect` API is used to make assertions about the state of elements on the page, allowing you to verify conditions like visibility, presence, and attribute values.

 * 2. How do you check if an element has a specific attribute using Playwright?
 * Answer: You can check if an element has a specific attribute by using `await expect(element).toHaveAttribute('attributeName', 'expectedValue')`, which asserts that the attribute is present and matches the expected value.

 * 3. What is the significance of using regular expressions with the `expect` API?
 * Answer: Regular expressions can be used to perform more flexible checks, allowing you to validate that a string contains a certain pattern rather than an exact match.

 * 4. Why is it important to use the `scrollIntoViewIfNeeded` method?
 * Answer: The `scrollIntoViewIfNeeded` method ensures that the element is within the viewport, making it visible for interactions or assertions. This is crucial in automated tests to prevent failures due to elements being off-screen.
 */
