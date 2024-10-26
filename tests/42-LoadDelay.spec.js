const { test, expect } = require('@playwright/test');

/**
 * Test Case: Handling delayed elements in Playwright
 *
 * This test demonstrates how to handle elements that take time to load on a page,
 * such as buttons that appear after a delay. It waits for an element to become visible
 * before interacting with it.
 *
 * Key Learning Points:
 * 1. Handling elements that dynamically appear after a delay.
 * 2. Using Playwright’s auto-waiting mechanism and manual waiting functions like `waitFor`.
 * 3. Verifying the visibility of delayed elements before performing actions.
 *
 * Steps:
 * 1. Navigate to a page where an element takes time to load.
 * 2. Wait for the delayed button to appear.
 * 3. Verify that the button is visible.
 * 4. Perform actions on the button if necessary.
 */

test.describe('Load Delay Handling Tests', () => {
   test('Handle Delayed Button Appearance', async ({ page }) => {
      // 1. Navigate to the base page with slow motion for better visualization
      await page.goto("http://uitestingplayground.com/", {
         slowMo: 500,
         viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
      });

      // 2. Find the link to the 'Load Delay' page and click it
      const loadDelayLink = page.getByRole("link", { name: "Load Delay" });
      await loadDelayLink.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await loadDelayLink.click();

      // 3. Find the button that appears after a delay
      const delayedButton = page.getByRole("button", { name: "Button Appearing After Delay" });

      // 4. Wait for the button to be available and visible
      await delayedButton.waitFor();

      // 5. Assert that the button is visible
      await expect(delayedButton).toBeVisible();

      // 6. Perform actions on the button if needed (like clicking it)
      await delayedButton.click();
   });
});

/*
Important Notes for Learning:
- **Delayed Elements**: This test demonstrates how to handle elements that may take time to load, such as dynamically loaded content.
- **Waiting for Elements**: Playwright’s auto-waiting mechanism automatically waits for actions like click, type, and navigation. However, for non-action-based checks (like waiting for an element's appearance), `waitFor` is used to pause until certain conditions are met.
- **Assertions**: The `expect` API ensures that elements are in the correct state (visible, clickable, etc.) before performing any interaction, which stabilizes your tests and reduces flakiness.
*/

/*
Interview Questions and Answers:
1. **Question:** What is the purpose of waiting for elements in web testing?
   **Answer:** In web testing, especially with dynamic content, elements may not immediately appear on the page. Waiting for elements ensures that the element is fully loaded and interactable before actions like clicking or typing are performed.

2. **Question:** How does Playwright handle auto-waiting?
   **Answer:** Playwright automatically waits for elements to be in the appropriate state (e.g., visible, enabled, etc.) before performing actions such as clicks or typing. However, for custom waiting scenarios (like waiting for an element to load or a network request to complete), manual waiting functions like `waitFor` can be used.

3. **Question:** Why is it important to use the `expect` API in Playwright?
   **Answer:** The `expect` API is crucial for making assertions about the state of elements before interacting with them. It ensures that elements are in the expected state (e.g., visible, enabled, etc.), which helps in creating stable and reliable tests.

4. **Question:** What are some common challenges with delayed elements in web testing?
   **Answer:** Some common challenges include elements that load slowly due to network latency, elements that are dynamically added to the DOM, or changes in the visibility of elements after user interactions. These require manual waiting or assertions to ensure proper interaction timing.
*/
