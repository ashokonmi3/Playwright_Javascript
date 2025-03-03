const { test, chromium } = require('@playwright/test');

// test.describe('Test Suite with Hooks', () => {
//     let browser;
//     let page;

//     // Runs once before the entire suite
//     test.beforeAll(async () => {
//         console.log('Setup before running tests');
//     });

//     // Runs before each test case
//     test.beforeEach(async () => {
//         // Manually launch the browser with UI and slowMo
//         browser = await chromium.launch({
//             headless: false, // Runs in UI mode
//             slowMo: 5000,     // Slows down actions by 500ms
//         });
//         page = await browser.newPage();
//         await page.goto('https://example.com');
//     });

//     // Test case 1
//     test('Test Case 1', async () => {
//         const title = await page.title();
//         console.log('Title:', title);
//     });

//     // Test case 2
//     test('Test Case 2', async () => {
//         const content = await page.locator('h1').textContent();
//         console.log('Content:', content);
//     });

//     // Runs after each test case
//     test.afterEach(async () => {
//         await page.close();  // Close the page after each test
//         await browser.close();  // Close the browser after each test
//     });

//     // Runs once after all tests in the suite
//     test.afterAll(async () => {
//         console.log('Cleanup after all tests');
//     });
// });

// use: {
//     headless: false,  // UI mode
//         slowMo: 500,      // Slows down actions by 500ms
//   },

// ====================



test('Multiple contexts with pages for Rediff, Google, Yahoo, and Times of India in Chromium UI mode', async () => {
    // Launch Chromium browser in UI mode (headless: false)
    const browser = await chromium.launch({
        headless: false, // Launch Chromium with UI mode (not headless)
    });

    // Create the first browser context with specific settings for User 1
    const userContext1 = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        userAgent: 'User-Agent-User1', // Custom user agent for User 1
    });

    // Create the second browser context with specific settings for User 2
    const userContext2 = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'User-Agent-User2', // Custom user agent for User 2
    });

    // Create two pages in User 1's context
    const page1 = await userContext1.newPage();
    const page2 = await userContext1.newPage();

    // Create two pages in User 2's context
    const page3 = await userContext2.newPage();
    const page4 = await userContext2.newPage();

    // Navigate the pages to different websites
    await page1.goto('https://www.rediff.com');
    await page2.goto('https://www.timesofindia.indiatimes.com');

    await page3.goto('https://www.google.com');
    await page4.goto('https://www.yahoo.com');

    // User 1 interacts with Rediff website (page1)
    await expect(page1).toHaveURL('https://www.rediff.com'); // Assert User 1 lands on Rediff homepage
    await page1.click('text=Movies'); // Click on the Movies link
    await expect(page1).toHaveURL(/movies/); // Assert the Movies section URL

    // User 1 interacts with Times of India website (page2)
    await expect(page2).toHaveURL('https://www.timesofindia.indiatimes.com'); // Assert User 1 lands on TOI homepage
    await page2.click('text=India'); // Click on the India section
    await expect(page2).toHaveURL(/india/); // Assert the India news section URL

    // User 2 interacts with Google website (page3)
    await expect(page3).toHaveURL('https://www.google.com'); // Assert User 2 lands on Google homepage
    await page3.fill('input[name="q"]', 'Playwright testing'); // Type query into the search bar
    await page3.press('input[name="q"]', 'Enter'); // Press Enter to search
    await expect(page3).toHaveURL(/search/); // Assert search results page URL

    // User 2 interacts with Yahoo website (page4)
    await expect(page4).toHaveURL('https://www.yahoo.com'); // Assert User 2 lands on Yahoo homepage
    await page4.click('text=Mail'); // Click on the Mail link
    await expect(page4).toHaveURL(/mail/); // Assert the Mail section URL

    // Close the contexts and the browser
    await userContext1.close();
    await userContext2.close();
    await browser.close();
});

