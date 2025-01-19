const { test, expect, chromium } = require('@playwright/test');

test.describe('Login Tests', () => {

   /**
    * Test Successful Login
    * 
    * This test verifies that a user can successfully log in with correct credentials.
    * 
    * Steps:
    * 1. Navigate to the sample login page.
    * 2. Enter a valid username and password.
    * 3. Click the "Log In" button.
    * 4. Verify that the welcome message displays with the correct username.
    * 
    * Expected Outcome:
    * - The page should display "Welcome, [username]!" upon successful login.
    */
   // test('Successful Login', async () => {
   //    // Launch browser with headless mode off
   //    const browser = await chromium.launch({
   //       headless: false,
   //       slowMo: 5000 // Slow down actions for better visualization
   //    });

   //    const context = await browser.newContext({
   //       // viewport: { width: 1920, height: 1080 } // Set viewport for consistency
   //       viewport: { width: 1720, height: 1440 } // Set viewport for consistency

   //    });
   //    const page = await context.newPage();

   //    console.log("Starting test: Successful Login...");

   //    // Navigate to login page
   //    await page.goto('http://uitestingplayground.com/sampleapp');

   //    // Fill in the login form with correct credentials
   //    const username = "dan";
   //    const password = "pwd";

   //    console.log(`Entering username: ${username} and password.`);
   //    await page.getByPlaceholder('User Name').fill(username);
   //    await page.getByPlaceholder('********').fill(password);
   //    // await page.getByRole('textbox', { name: 'User Name' }).fill(username)
   //    console.log("Clicking 'Log In' button...");
   //    await page.getByRole('button', { name: 'Log In' }).click();

   //    // Scroll to the label element to verify successful login message
   //    const label = page.locator('#loginstatus');
   //    await label.scrollIntoViewIfNeeded(); // Scroll into view if needed
   //    console.log("Verifying the welcome message...");

   //    // Expect welcome message
   //    await expect(label).toHaveText(`Welcome, ${username}!`);
   //    console.log("Successful login test completed.");

   //    await browser.close();
   // });
   // =================================================
   /**
    * Test Failed Login
    *
    * This test verifies that entering an incorrect password results in an error message.
    *
    * Steps:
    * 1. Navigate to the sample login page.
    * 2. Enter a valid username but incorrect password.
    * 3. Click the "Log In" button.
    * 4. Verify that an error message is displayed.
    *
    * Expected Outcome:
    * - The page should display "Invalid username/password" upon failed login.
    */
   // -----------------------------
   test('Failed Login', async () => {
      // Launch browser with headless mode off
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500 // Slow down actions for better visualization
      });

      const context = await browser.newContext({
         // viewport: { width: 1920, height: 1080 } // Set viewport for consistency
         viewport: { width: 1720, height: 1440 } // Set to your screen resolution

      });
      const page = await context.newPage();

      console.log("Starting test: Failed Login...");

      // Navigate to login page
      await page.goto('http://uitestingplayground.com/sampleapp');

      // Fill in the login form with incorrect credentials
      const username = "dan";
      const incorrectPassword = "wrongpassword";

      console.log(`Entering username: ${username} and incorrect password.`);
      await page.getByPlaceholder('User Name').fill(username);
      await page.getByPlaceholder('********').fill(incorrectPassword);

      console.log("Clicking 'Log In' button...");
      await page.getByRole('button', { name: 'Log In' }).click();

      // Scroll to the label element to verify error message
      const label = page.locator('#loginstatus');
      await label.scrollIntoViewIfNeeded(); // Scroll into view if needed
      console.log("Verifying the error message...");

      // Expect error message
      await expect(label).toHaveText("Invalid username/password");
      console.log("Failed login test completed.");

      await browser.close();
   });

});

/**
 * Interview Questions:
 * 
 * 1. What method does Playwright use to locate elements on a page?
 *    - Playwright uses methods like `page.getByPlaceholder`, `page.getByRole`, and `locator`.
 * 
 * 2. How does Playwright handle viewport settings for consistency in tests?
 *    - Playwright allows setting viewport size using `setViewportSize` or through the context configuration.
 * 
 * 3. What is the purpose of the `scrollIntoViewIfNeeded()` function?
 *    - It ensures an element is visible in the viewport before performing actions like clicking or verifying text.
 */
