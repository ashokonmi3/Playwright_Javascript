const { test, expect, chromium } = require('@playwright/test');

/**
 * Visibility Test Suite
 * 
 * **Verify Button Visibility After Clicking 'Hide' Button**
 * 
 * Scenario:
 * A web application may alter the visibility of elements in various ways: removing elements from the DOM,
 * adjusting their size, hiding them via styles (opacity, visibility), or moving them offscreen. 
 * 
 * In this test, we:
 * 1. Navigate to the 'Visibility' page.
 * 2. Click the 'Hide' button.
 * 3. Verify the visibility or CSS properties of other buttons, which are hidden or manipulated in different ways.
 * 
 * The goal is to learn how to check the visibility of DOM elements using Playwright's `expect` API.
 * 
 * Buttons checked:
 * - Removed
 * - Zero Width
 * - Overlapped
 * - Opacity 0
 * - Visibility Hidden
 * - Display None
 * - Offscreen
 * 
 * Important Notes for Learning:
 * - **Element Visibility**: This example shows how to check different types of visibility (hidden, zero width, opacity, etc.).
 * - **Error Handling**: Handling errors when an element is not interactable due to being overlapped.
 * - **Assertions**: Using Playwright’s `expect` API to check for hidden elements and CSS properties.
 */

test.describe('Visibility Test Suite', () => {
   test('Verify button visibility after clicking "Hide" button', async () => {
      // Launch the Chromium browser with slow motion and viewport settings
      const browser = await chromium.launch({
         headless: false,
         slowMo: 5000,  // Slow down operations for better visualization
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         // viewport: { width: 1920, height: 1080 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 } // Set to your screen resolution

      });
      const page = await context.newPage();

      console.log("Navigating to the visibility test page...");
      await page.goto("http://uitestingplayground.com/visibility");

      // Locate all the buttons
      const hideButton = page.getByRole('button', { name: 'Hide' });
      const removedButton = page.getByRole('button', { name: 'Removed' });
      const zeroWidthButton = page.getByRole('button', { name: 'Zero Width' });
      const overlappedButton = page.getByRole('button', { name: 'Overlapped' });
      const opacity0Button = page.getByRole('button', { name: 'Opacity 0' });
      const hiddenButton = page.getByRole('button', { name: 'Visibility Hidden' });
      const displayNoneButton = page.getByRole('button', { name: 'Display None' });
      const offscreenButton = page.getByRole('button', { name: 'Offscreen' });

      // Step 1: Click the 'Hide' button to hide all other buttons
      console.log("Clicking the 'Hide' button...");
      await hideButton.click();

      // Step 2: Verify visibility or CSS properties of the other buttons

      // Button removed from DOM
      console.log("Verifying 'Removed' button is no longer in the DOM...");
      await expect(removedButton).toBeHidden();

      // Button has zero width
      console.log("Verifying 'Zero Width' button has zero width...");
      await expect(zeroWidthButton).toHaveCSS('width', '0px');

      // Button is overlapped by another element
      console.log("Verifying 'Overlapped' button is overlapped...");
      await overlappedButton.scrollIntoViewIfNeeded(); // Scroll into view if needed
      try {
         await overlappedButton.click({ timeout: 2000 });
      } catch (e) {
         console.log("'Overlapped' button is not clickable (overlapped).");
      }

      // Button has opacity set to 0
      console.log("Verifying 'Opacity 0' button has opacity set to 0...");
      await expect(opacity0Button).toHaveCSS('opacity', '0');

      // Button visibility set to hidden
      console.log("Verifying 'Visibility Hidden' button is hidden...");
      await expect(hiddenButton).toBeHidden();

      // Button display set to none
      console.log("Verifying 'Display None' button is not displayed...");
      await expect(displayNoneButton).toBeHidden();

      // Button is offscreen
      console.log("Verifying 'Offscreen' button is off the visible viewport...");
      await expect(offscreenButton).not.toBeInViewport();

      console.log("All button visibility checks completed successfully.");

      // Close the browser after the test completes
      await browser.close();
   });
});

/*
    Interview Questions:
    1. **How would you verify if an element is hidden without using CSS visibility properties?**
       - By using Playwright’s `expect` API with `.toBeHidden()`, which confirms that the element is not visible or in the DOM.

    2. **What are common ways to hide an element in HTML/CSS, and how does Playwright handle them?**
       - Common ways include setting `display: none`, `visibility: hidden`, `opacity: 0`, or moving elements offscreen. Playwright provides methods like `.toBeHidden()`, `.toHaveCSS()`, and `.not.toBeInViewport()` to verify these conditions.

    3. **How does the `expect` API in Playwright handle invisible elements due to overlapping?**
       - Playwright checks if an element is interactable (clickable or visible). If it’s overlapped, actions like `click` will timeout or throw an error, which we can handle with a try-catch block.

    4. **Why is it necessary to scroll elements into view before interacting with them in automated tests?**
       - Scrolling ensures that the element is within the visible viewport, which is essential for simulating user interactions accurately and avoiding errors in the test script.

    5. **What would you change in this test to verify visibility for mobile viewports?**
       - Adjust the viewport size in the browser context to match common mobile dimensions and re-run the test to confirm the visibility checks work as expected on smaller screens.
*/
