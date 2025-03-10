// Import Playwright Test library
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite: Non-Breaking Space Button Tests
 *
 * This test suite verifies the handling of non-breaking spaces in XPath selectors.
 *
 * Key Learning Points:
 * - Understanding how non-breaking spaces can affect element selection in automated tests.
 * - Recognizing the importance of correct XPath syntax when dealing with dynamic content.
 *
 * Scenario:
 * 1. Use the following XPath to find the button in your test:
 *    //button[text()='My Button']
 *    Notice that the XPath does not work.
 * 2. Change the space between 'My' and 'Button' to a non-breaking space.
 *    This time the XPath should be valid.
 */

test.describe('Non-Breaking Space Button Tests', () => {
   test('test_non_breaking_space_button', async ({ }) => {
      /**
       * Verifies the handling of non-breaking spaces in XPath selectors.
       * Prevent Line Breaks: Unlike a regular space, a non-breaking space prevents the text 
       * on either side from being separated onto different lines. This is useful for keeping phrases
       * or important text together, ensuring they stay on the same line.
       *
       * The function performs the following actions:
       * - Navigates to a webpage that demonstrates non-breaking spaces.
       * - Attempts to click a button using a normal space in the XPath, which should fail.
       * - Clicks the same button using a non-breaking space in the XPath, which should succeed.
       */

      // Set up the viewport and slow motion for visualization
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500,  // Slow down operations for better visualization
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         // viewport: { width: 1920, height: 1080 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 } // Set to your screen resolution

      });
      const page = await context.newPage();

      // Navigate to the webpage for non-breaking space testing
      await page.goto("http://uitestingplayground.com/nbsp");

      // Attempt to click the button using a normal space
      try {
         await page.locator("//button[text()='My Button']").click({ timeout: 2000 });
         await page.waitForTimeout(2000); // Wait for 2 seconds after click attempt
      } catch (e) {
         console.log(`Expected error when using normal space: ${e}`);
         await page.waitForTimeout(2000); // Wait for 2 seconds before proceeding
      }

      // Scroll into view if needed and click the button using a non-breaking space
      const buttonLocator = page.locator("//button[text()='My\u00a0Button']");
      // unicode respresentation of &nbsp
      //unicode for space \u0020
      //unicode for copywright \uooA9
      
      await buttonLocator.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await buttonLocator.click(); // Click the button with non-breaking space
      await page.waitForTimeout(2000); // Wait for 2 seconds after clicking
   });
});

/**
 * ================================================================
 * Example Questions for Students:
 * ================================================================
 *
 * 1. What issue might arise when using a normal space in an XPath selector?
 *    - Answer: A normal space may not match the actual text in the DOM if the text contains a non-breaking space, causing the selector to fail.
 *
 * 2. How does a non-breaking space differ from a normal space in HTML?
 *    - Answer: A non-breaking space (`&nbsp;` or `\u00a0`) prevents the text from being wrapped to a new line, while a normal space allows wrapping.
 *
 * 3. What is the purpose of the try-catch block in the test?
 *    - Answer: It is used to catch any exceptions raised when clicking the button with a normal space, allowing the test to continue and handle the situation gracefully.
 *
 * 4. Why is slow motion (`slowMo: 500`) used when launching the browser?
 *    - Answer: Slow motion is used to slow down the test execution (0.5 seconds) to make it easier to visualize the actions taking place.
 *
 * 5. What does the `headless: false` option do?
 *    - Answer: This option runs the browser in a visible mode, allowing testers to see the interactions occurring in real-time.
 *
 * ================================================================
 * Advanced Questions:
 * ================================================================
 *
 * 1. How can you verify that an element is present on the page before attempting to interact with it?
 *    - Answer: You can use methods like `page.waitForSelector()` to ensure the element is present before attempting to click or interact with it.
 *
 * 2. What would you do if you encounter a `StaleElementReferenceError`?
 *    - Answer: You should try to locate the element again to get a fresh reference, as the original reference is no longer valid due to changes in the DOM.
 *
 * 3. Explain how XPath differs from CSS selectors in element selection.
 *    - Answer: XPath allows for more complex queries and can navigate through the DOM hierarchy, while CSS selectors are generally simpler and based on element attributes, classes, and IDs.
 *
 * ================================================================
 */
