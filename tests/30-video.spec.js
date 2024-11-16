const { test, expect, chromium } = require('@playwright/test');

// URL to verify after navigation
const DOCS_URL = "https://playwright.dev/python/docs/intro";

test('Page has Get Started link', async () => {
   // Launch the browser in non-headless mode with slow motion for better visibility
   const browser = await chromium.launch({
      headless: false,
      slowMo: 3000, // Adds delay to observe the actions
      args: ["--start-maximized"], // Starts the browser maximized
   });

   // Create a new browser context with video recording enabled
   const context = await browser.newContext({
      recordVideo: {
         dir: 'video/', // Directory where the video will be saved
         size: { width: 1280, height: 720 }, // Optional: specify video resolution
      },
   });

   // Create a new page in the browser context
   const page = await context.newPage();

   // Navigate to the Playwright documentation page
   await page.goto('https://playwright.dev/python');

   // Locate and click the button to switch between dark and light mode
   const themeBtn = page.locator('button[title="Switch between dark and light mode (currently dark mode)"]');
   await themeBtn.click();

   // Find and click the 'GET STARTED' link
   const getStartedLink = page.locator('a', { hasText: 'GET STARTED' });
   await getStartedLink.click();

   // Assert that the page navigates to the expected URL
   await expect(page).toHaveURL(DOCS_URL);

   // Close the browser context to save the video
   await context.close();
   await browser.close();
});

//  Questions:
/*
1. How do you record a video in Playwright using the test script itself?
   Answer: By creating a browser context with the `recordVideo` option, specifying the directory where the video should be saved and the resolution.

2. What is the impact of video recording on test performance?
   Answer: Video recording can slightly impact test performance, especially for longer tests, as it requires additional resources to capture and store the video.

3. How can you adjust the resolution of the recorded video in Playwright?
   Answer: You can specify the resolution of the video using the `size` option within the `recordVideo` parameter when creating a new browser context.
*/

/**
 * Interview Questions:
 * 
 * 1. **How does Playwright's video recording work?**
 *    - Answer: Playwright allows recording videos of the entire browser context. Each test that uses video recording
 *      saves the video in WebM format in the specified directory. The video gets recorded from the moment the context is created 
 *      until it is closed.
 * 
 * 2. **What should you be mindful of when enabling video recording in tests?**
 *    - Answer: You should consider the length of the test (long tests may generate large video files), available storage space,
 *      performance impact (long recordings might slow down tests), and ensure you have enough disk space for recording.
 * 
 * 3. **How can you improve test execution visibility during video recording?**
 *    - Answer: You can use options like `slowMo` to slow down the interaction speed for better visibility during the test execution,
 *      or run the tests in headful mode (`headless: false`) to visually see the browser's actions.
 */