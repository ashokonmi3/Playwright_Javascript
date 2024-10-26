// Importing required modules from Playwright
const { test, expect, chromium } = require('@playwright/test');

/**
 * Test Case: Ensuring the CPU Value for Chrome Matches the Displayed Value in a Dynamic Table.
 * 
 * This test demonstrates how to extract and verify values from a dynamically generated table.
 * 
 * Scenario:
 * 1. Navigate to a page with a dynamic table.
 * 2. Extract the CPU percentage from the warning label.
 * 3. Locate the CPU column header.
 * 4. Find the row for "Chrome" and verify its CPU value.
 */
test.describe('Dynamic Table Handling', () => {

   test('Verify Chrome CPU Value', async () => {
      // Launch the Chromium browser with specified configurations
      const browser = await chromium.launch({
         headless: false, // The browser will be visible
         slowMo: 500 // Slow down actions by 500ms for better visibility
      });

      // Create a new browser context and page with specified viewport
      const context = await browser.newContext({
         viewport: { width: 3840, height: 2160 } // Set to your screen resolution
      });
      const page = await context.newPage();

      // Step 1: Navigate to the dynamic table test page
      console.log("Navigating to the dynamic table page...");
      await page.goto("http://uitestingplayground.com/dynamictable");

      // Step 2: Extract the CPU percentage from the warning label
      const label = await page.locator("p.bg-warning").innerText();
      console.log(`Extracted label text: ${label}`);
      // Get the last word which is the CPU percentage
      const percentage = label.split(" ").pop(); // Last word of the label is the CPU percentage
      console.log(`CPU Percentage extracted: ${percentage}`);

      // Step 3: Locate all column headers and find the index for the CPU column
      const columnHeaders = page.getByRole("columnheader");
      let cpuColumn = null;

      for (let index = 0; index < await columnHeaders.count(); index++) {
         const columnHeader = columnHeaders.nth(index);
         if (await columnHeader.innerText() === "CPU") {
            cpuColumn = index;
            console.log(`Found CPU column at index: ${cpuColumn}`);
            break;
         }
      }

      // Ensure CPU column is found
      if (cpuColumn === null) {
         throw new Error("CPU column not found!");
      }

      // Step 4: Locate the row group for values and find the Chrome row
      const rowGroup = page.getByRole("rowgroup").last();
      const chromeRow = rowGroup.getByRole("row").filter({ hasText: "Chrome" });
      const chromeCpu = chromeRow.getByRole("cell").nth(cpuColumn);

      // Step 5: Verify the CPU value for Chrome matches the extracted percentage
      console.log("Verifying CPU value for Chrome...");
      await expect(chromeCpu).toHaveText(percentage);
      console.log("CPU value for Chrome verified successfully!");

      // Close the browser after the test completes
      console.log("Closing the browser...");
      await browser.close();
      console.log("Test execution completed.");
   });

   /**
    * Important Notes for Learning:
    * - **Dynamic Table Handling**: This example demonstrates how to work with dynamic tables 
    *   and extract values for verification.
    * - **Assertions**: Using Playwright’s `expect` API ensures that the CPU value matches 
    *   the expected output.
    */
});

/**
 * Interview Questions:
 * 
 * 1. **Q**: What are dynamic tables and why are they used in web applications?
 *    **A**: Dynamic tables are tables that can update their content without reloading the page. 
 *    They enhance user experience by allowing seamless interaction with data.
 * 
 * 2. **Q**: How can you extract data from a dynamic table using Playwright?
 *    **A**: You can use locators to access elements within the table and extract their text or attributes, 
 *    allowing for validation of the displayed data.
 * 
 * 3. **Q**: Why is it important to verify values in dynamic tables during testing?
 *    **A**: Verifying values ensures data integrity and correctness in applications that rely on dynamic 
 *    data presentation, which is crucial for user trust and application reliability.
 * 
 * 4. **Q**: How does the `expect` function in Playwright help in test verification?
 *    **A**: The `expect` function provides assertions that allow you to check if elements match expected values, 
 *    aiding in the validation of application behavior during tests.
 */
