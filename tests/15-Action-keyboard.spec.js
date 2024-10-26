
/**
 * @fileoverview
 * Demonstrates how to simulate keypress interactions using Playwright.
 * 
 * Key Press Interaction in Playwright:
 * -------------------------------------
 * Playwright allows you to simulate various keyboard actions such as pressing individual keys or typing text into input fields.
 * Common functions for keypress interactions:
 *  - `press`: Simulates pressing a key.
 *  - `type`: Types a sequence of characters into a field, one at a time, with real-time delays.
 *  - `fill`: Sets the value of an input element immediately without triggering individual keystrokes.
 * 
 * Workflow:
 * -----------
 * 1. Launch a Chromium browser in non-headless mode with a slow motion delay of 500ms for demonstration purposes.
 * 2. Create a new page and navigate to the target website.
 * 3. Set the viewport size to 3840x2160 pixels (adjusted to your screen resolution).
 * 4. Scroll to the target textarea element if needed.
 * 5. Simulate various key presses including typing text and pressing individual keys.
 * 6. Close the browser after observing the keypress interaction.
 * 
 * Example Use Cases:
 * -------------------
 * 1. Simulating text input in a form.
 * 2. Automating keyboard shortcuts.
 * 3. Testing keyboard navigation.
 */

const { test, expect, chromium } = require('@playwright/test');

test.describe('Keypress Simulation Test Suite', () => {
    test('should simulate keypress actions in the textarea', async () => {
        // Launch browser in non-headless mode with slow motion and adjusted viewport
        const browser = await chromium.launch({
            headless: false,
            slowMo: 500 // Slow down actions for better visibility
        });
        const context = await browser.newContext({
            viewport: { width: 3840, height: 2160 }, // Set viewport size to screen resolution
            ignoreHTTPSErrors: true
        });

        const page = await context.newPage();

        // Navigate to the website containing the textarea
        await page.goto('https://bootswatch.com/default/');

        // Wait for 2 seconds to ensure the page is fully loaded
        await page.waitForTimeout(2000);

        // Locate the textarea element by its label
        // const textarea = await page.locator('textarea[placeholder="Example textarea"]');
        const textarea = await page.locator('label[for="exampleTextarea"] + textarea');

        // Scroll into view if needed before interacting with the textarea
        await textarea.scrollIntoViewIfNeeded();

        // Clear any existing text in the textarea
        await textarea.fill('');

        // Simulate typing "Hello, World!" into the textarea
        await textarea.type('Hello, World!');

        // Simulate pressing specific keys individually
        await textarea.press('KeyW'); // Press 'W'
        await page.waitForTimeout(1000); // Wait for observation
        await textarea.press('KeyA'); // Press 'A'
        await page.waitForTimeout(1000);
        await textarea.press('KeyB'); // Press 'B'
        await page.waitForTimeout(1000);
        await textarea.press('KeyC'); // Press 'C'
        await textarea.press('Shift+KeyC'); // Press 'Shift + C' (capital C)

        // Wait for a few seconds to observe the keypress interactions
        await page.waitForTimeout(5000);

        // Close the browser
        await browser.close();
    });
});

/**
 * Interview Questions & Answers:
 * ------------------------------
 * 1. **Q: What is the difference between `type` and `press` in Playwright?**
 *    A: `type` simulates typing a sequence of characters into a text field, triggering real-time keystroke events. `press` sends a single keypress event like pressing a letter or a combination of keys (e.g., `Shift+C`).
 * 
 * 2. **Q: How does `scrollIntoViewIfNeeded()` function work?**
 *    A: `scrollIntoViewIfNeeded()` scrolls the element into the visible area of the browser window only if it's not already visible. It ensures that the element is in the viewport before interacting with it.
 * 
 * 3. **Q: What does the `slowMo` option do in Playwright?**
 *    A: The `slowMo` option slows down Playwright operations by the given time (in milliseconds), which is useful for debugging and demonstrating interactions visually at a slower pace.
 * 
 * 4. **Q: Why would you use `headless: false` in Playwright testing?**
 *    A: Running a browser in non-headless mode (`headless: false`) allows you to visually observe the test interactions in real-time, which is helpful for debugging and manual verification during development.
 * 
 * 5. **Q: How do you simulate a combination of key presses like 'Shift+C' in Playwright?**
 *    A: To simulate a combination of key presses, you can use `press` and pass the keys as a combination string. For example, `press('Shift+KeyC')` simulates pressing the 'Shift' key while pressing 'C' to type a capital 'C'.
 */
