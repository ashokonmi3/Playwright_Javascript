// Importing necessary modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * This test suite demonstrates how to navigate to the Playwright documentation page,
 * click on the "GET STARTED" link, and validate the navigation. It includes tracing
 * and screenshots for better debugging and understanding of test execution.
 */

// Define the URL you expect after clicking the "GET STARTED" link
const DOCS_URL = "https://playwright.dev/python/docs/intro";

// Test suite for Playwright documentation navigation
test.describe('Playwright Documentation Navigation Tests', () => {

   // Test case for verifying navigation to the "GET STARTED" link
   test('Verify GET STARTED link navigation', async ({ }) => {
      // Launch a Chromium-based browser instance with specified options
      const browser = await chromium.launch({
         headless: false,
         slowMo: 500, // Slow down actions by 500ms for better visibility
         // viewport: { width: 3840, height: 2160 }, // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },

      });

      // Create a new browser context
      const context = await browser.newContext();



      // Create a new page in the context
      const page = await context.newPage();

      // Navigate to the Playwright Python documentation website
      await page.goto('https://playwright.dev/python');

      // Locate the link with the role "link" and name "GET STARTED", then click it
      const link = page.locator('a', { hasText: 'GET STARTED' });
      await link.scrollIntoViewIfNeeded(); // Scroll into view if needed
      await link.click();

      // Assert that the URL is the expected URL after clicking the link
      await expect(page).toHaveURL(DOCS_URL);

      const pageTitle = await page.title();
      console.assert(pageTitle === "Installation | Playwright Python", `Expected title to be 'Installation | Playwright Python', but got '${pageTitle}'`);

      // Expect API: Verifies that the page title matches the expected value
      await expect(page).toHaveTitle(/Installation | Playwright Python/);

      // Close the browser context and browser
      await context.close();
      await browser.close();
   });
});


/*
 * Key Differences Between `assert` and `expect`:
 *
 * | Feature                | assert (JavaScript)                         | expect (Playwright)                                  |
 * |------------------------|---------------------------------------------|------------------------------------------------------|
 * | Use Case               | General programming conditions              | Browser or web element-related conditions            |
 * | Scope                  | Any condition in JavaScript                 | Web page or browser-specific conditions              |
 * | Retries/Timeouts       | No retry, fails immediately if False        | Automatically retries until timeout (default 30s)    |
 * | Asynchronous Support   | Not built-in (use libraries for async)      | Yes, designed for async UI changes                   |
 * | Custom Error Messages  | Can be defined in console.assert            | Built-in detailed error messages                     |
 * | Example Use            | console.assert(value === expected)          | expect(page.locator("button")).toBeVisible()        |
 * | Error Handling         | Logs to console without stopping execution  | Waits for conditions to be met or timeouts           |
 *
 * When to Use:
 * Use console.assert: When you want to check simple, immediate conditions that don’t depend on the state of a web page or browser.
 * It's ideal for checking values, types, or performing simple condition checks in your JavaScript code.
 *
 * Use expect: When you need to assert conditions related to web elements, such as visibility, text content, or attributes.
 * It is specifically built for web automation and includes retry mechanisms, timeouts, and handling of dynamic content changes in modern web applications.
 */

/*
 * Interview Questions and Answers:
 * 
 * Q1: What is the purpose of the expect API in Playwright?
 * A1: The expect API is used for making assertions about the state of web elements. It includes built-in waiting and retry mechanisms, making it suitable for testing dynamic web applications.
 * 
 * Q2: How does expect differ from assert?
 * A2: expect is asynchronous and designed for web testing, allowing for retries and automatic waiting for conditions. assert (or console.assert in JavaScript) is synchronous and used for immediate condition checks.
 * 
 * 
 * Q3: How can we ensure that an element is visible before interacting with it?
 * A4: By using the expect API, such as expect(locator).toBeVisible(), Playwright automatically waits until the element is visible before performing actions.
 */