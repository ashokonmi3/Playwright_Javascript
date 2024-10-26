const { test, expect, firefox, webkit } = require('@playwright/test');

/**
 * Test case that runs only on Firefox.
 * The 'test.use' method specifies that this test will run on the Firefox browser.
 */
test.use({ browserName: 'firefox' });
test('firefox only test', async ({ page }) => {
   // Navigate to the example website
   await page.goto('https://example.com');

   // Assert that the page title matches the expected title
   expect(await page.title()).toBe('Example Domain');
});

/**
 * Test case that skips Firefox.
 * This test is marked with 'test.skip', so it will not run on Firefox.
 */
test.use({ browserName: 'firefox' });
test.skip('skip firefox test', async ({ page }) => {
   // Navigate to the example website
   await page.goto('https://example.com');

   // Assert that the page title matches the expected title
   expect(await page.title()).toBe('Example Domain');
});

/**
 * Parameterized test case to run on multiple browsers.
 * This section defines a list of browsers and runs tests for each browser in the list.
 */
const browsers = ['firefox', 'webkit']; // List of browsers to test

// Loop through each browser name to create parameterized tests
browsers.forEach((customBrowserName) => {
   test(`test on ${customBrowserName}`, async () => {
      // Launch the specified browser (firefox or webkit) in headful mode (visible)
      const browser = await (customBrowserName === 'firefox' ? firefox : webkit).launch({
         headless: false, // Set to false to run in UI mode
         slowMo: 500 // Slow down operations for better visualization
      });

      // Create a new page in the browser context
      const page = await browser.newPage();

      // Navigate to the example website
      await page.goto('https://example.com');

      // Assert that the page title matches the expected title
      expect(await page.title()).toBe('Example Domain');

      // Close the browser after the test is complete
      await browser.close();
   });
});
