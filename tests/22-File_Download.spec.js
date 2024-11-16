const { chromium } = require('playwright');
const { test } = require('@playwright/test');
const path = require('path');
test.describe('File Download Test Suite', () => {
   /**
    * Event handler that is triggered when a download starts.
    * 
    * @param {Download} download - A Playwright Download object representing the file being downloaded.
    * This function saves the downloaded file as 'night21.jpg'.
    */
   async function onDownload(download) {
      console.log("Download received!");
      // Saves the downloaded file after completion.
      const downloadpath = path.join(__dirname, 'night22.jpg');
      console.log(downloadpath);
      await download.saveAs(downloadpath);
      // await download.saveAs("night22.jpg");
      // todo logic to check download completed 
      // check the file exists in that path having a timeout of expected download time
   }

   /**
    * Demonstrates how to handle file downloads in Playwright.
    *
    * Download Event Notes:
    * ---------------------
    * - The download event is triggered when Playwright detects a file download initiation.
    * - This occurs when the server responds with a 'Content-Disposition: attachment' header or 
    *   when a file link is clicked that starts the download.
    * - You can capture the download event using `page.waitForEvent('download')`, which gives access to
    *   a download object containing metadata and methods to handle the file.
    * 
    * Key Playwright Features Demonstrated:
    * -------------------------------------
    * 1. Browser interaction in non-headless mode with slow-motion.
    * 2. How to capture the download event using `page.waitForEvent('download')` listener.
    * 3. Triggering and handling file download in a web page.
    * 4. `saveAs()` method will only be callable after the download completes.
    *
    * Example Workflow:
    * -----------------
    * 1. Open browser and navigate to the target URL.
    * 2. Register an event listener for the download.
    * 3. Trigger the download action using a button click.
    * 4. Handle the download and save the file locally after download completion.
    */
   test('Test File Download', async () => {
      // Launch a browser in non-headless mode with a slow motion delay of 500ms
      const browser = await chromium.launch({
         headless: false,
         slowMo: 5000,
      });

      // Create a new browser context with specific viewport settings
      const context = await browser.newContext({
         ignoreHTTPSErrors: true,
         // viewport: { width: 3840, height: 2160 } // Set to your screen resolution
         viewport: { width: 1720, height: 1440 },
      });

      const page = await context.newPage();

      // Navigate to the page where a file download can be triggered
      await page.goto("https://unsplash.com/photos/NDRwHCC7JuI");

      // Register listener for the download event
      // This will trigger as soon as the download starts, but the file is saved only after it completes.
      page.once("download", onDownload);

      // Locate and click the 'Download free' button
      const btn = await page.locator('text="Download free"');

      // Scroll into view if needed before clicking
      await btn.scrollIntoViewIfNeeded();

      // Trigger download by clicking the button
      await btn.click();
      await browser.close();
   });
});

// Execute the function to demonstrate the download feature

/**
 * Interview Questions:
 * 1. What is the purpose of the `waitForEvent` method in Playwright?
 *    - It allows you to wait for specific events to occur, such as downloads, clicks, etc.
 * 
 * 2. How does Playwright handle file downloads?
 *    - Playwright detects downloads through headers like 'Content-Disposition: attachment' and
 *      allows event listeners to handle them.
 * 
 * 3. Can you set a timeout for download completion in Playwright?
 *    - No, you can only set a timeout for the download initiation, but Playwright waits for 
 *      the download to finish without imposing a timeout.
 * 
 * 4. How do you save a downloaded file in Playwright?
 *    - You can use the `saveAs` method on the Download object once the download has completed.
 */
