// Import Playwright Test library
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Suite: Mouse Over and Click Counter
 *
 * This test suite demonstrates mouse-over and click interactions using Playwright.
 * Key Learning Points:
 * - Utilize `hover()` to simulate mouse-over events.
 * - Perform consecutive clicks and validate DOM changes.
 * - Make assertions using `expect` to ensure test reliability.
 *
 * Mouse Hover Functionality:
 * ---------------------------
 * The `hover()` method in Playwright simulates placing the mouse pointer over a specified element.
 * This can cause changes in the webpage's DOM, such as displaying tooltips or changing styles.
 *
 * Important Considerations:
 * - Be cautious of "stale element" issues. When hovering causes the DOM to change,
 *   any original references might become invalid.
 * - Ensure that interactions are made on the visible, active element after hover actions.
 */

test.describe('Mouse Over and Click Counter Tests', () => {

   test('test_mouse_over_click_count', async ({ }) => {
      /**
       * Verifies the functionality of mouse-over and click events on a webpage.
       *
       * Actions performed:
       * - Navigates to a webpage with mouse-over interactions.
       * - Hovers over a link to trigger DOM changes.
       * - Performs two consecutive clicks on the "Active link" to increment a click counter.
       * - Asserts that the click counter displays "2" after the clicks.
       */

      // Browser configuration
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500,  // Slow down operations for better visualization
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         viewport: { width: 3840, height: 2160 } // Set to your screen resolution
      });
      const page = await context.newPage();
      await page.goto("http://uitestingplayground.com/mouseover", { waitUntil: 'load' });

      // Hover over the "Click me" link
      const link = page.locator('[title="Click me"]');
      await link.hover();
      console.log("Hovered over 'Click me' link to trigger DOM changes.");

      // Scroll into view and perform two consecutive clicks on the active link
      const activeLink = page.locator('[title="Link Button"]');
      await activeLink.scrollIntoViewIfNeeded();
      await activeLink.click({ clickCount: 2 });
      console.log("Clicked twice on 'Active link' to increment the counter.");

      // Locate and verify the click counter
      const clickCount = page.locator('#clickButtonCount');
      await expect(clickCount).toHaveText("2");
      console.log("Verified that click counter is displayed as '2'.");
   });

});

/**
 * ================================================
 * Example Interview Questions for Students:
 * ================================================
 *
 * 1. **What does the `hover()` method do in Playwright?**
 *    - Answer: The `hover()` method places the mouse pointer over an element, often triggering hover effects like tooltips or DOM changes.
 *
 * 2. **Why use `clickCount: 2` in the `.click()` method?**
 *    - Answer: It simulates a double-click, registering two consecutive clicks on the target element.
 *
 * 3. **What does `expect()` achieve in Playwright tests?**
 *    - Answer: It makes assertions in the test, such as verifying the click counter's displayed text here.
 *
 * 4. **What might cause a "stale element" issue in automated tests?**
 *    - Answer: When an element is modified or replaced in the DOM, previously captured references can become invalid, causing stale element issues.
 *
 * 5. **Why is `slowMo: 500` used?**
 *    - Answer: `slowMo` slows down the execution for better visualization, making it easier to follow the test’s behavior in non-headless mode.
 *
 * 6. **How does `scrollIntoViewIfNeeded()` assist in testing?**
 *    - Answer: It scrolls to ensure an element is visible before interaction, helpful for elements that may be out of view initially.
 *
 * ================================================
 * Advanced Interview Questions:
 * ================================================
 *
 * 1. **How can you handle cases where an element is obscured by another element?**
 *    - Answer: Use Playwright’s visibility checks or `scrollIntoViewIfNeeded()` to ensure an element is interactable.
 *
 * 2. **What if a test requires a triple-click instead of a double-click?**
 *    - Answer: You can adjust the `clickCount` argument to `clickCount: 3` for a triple-click simulation.
 *
 * 3. **How does Playwright manage dynamic DOM updates during tests?**
 *    - Answer: Playwright waits for elements to become stable and interactable using mechanisms like `waitForSelector()`.
 */
