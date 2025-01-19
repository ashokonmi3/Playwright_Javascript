const { test, expect } = require('@playwright/test');

// Test suite
test.describe('Example Test Suite', () => {

    // Single test case
    test('example test', async ({ page }) => {
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBe('Example Domain');
    });

    // Test case with multiple assertions
    test('example with assertions', async ({ page }) => {
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBe('Example Domain');
        await expect(page.locator('h1')).toHaveText('Example Domain');
    });

});

// =============================
// Key Feature of Playwright
//Cross - Browser Support
// Automated Testing
// Device Emulation
// Intercepting Network Requests
// Automated Screenshots and Video Recording
// Rich API for Web Interactions

// ================
//   +------------------- +       WebSocket         + --------------------- +
//   | Playwright Test    | < --------------------> | Playwright Server     |
//   | Script / API       |       (Commands)        | (Control Layer)       |
//   +------------------- +                         +--------------------- +
//                                                          |
//                                                          | Handles browser processes and actions
//                                                          |
//                                                          v
//   + --------------------+     WebSocket            + --------------------+
//   | Browser Context     | < -------------------->  | Chromium / Firefox  |
//   | (Isolation)         |                          |   / WebKit Engine   |
//   + --------------------+                          +--------------------+
//             |                                            |
//             | Contains multiple                          | Renders web pages
//             | pages and manages                          | and runs JavaScript
//             | session data                               |
//             v                                            |
//   +--------------------+                                 |
//   | Page               | < ------------------------------+
//   | (Browser Tab)      | < --- User Interaction-- -
//   +--------------------+


// installation npm init playwright@latest
// Execute test through cli
// npx playwright test
// npx playwright show - report
// Test executed in all browser because its configured in playwright.config.ts
// npx playwright test--projet = chromium(only chrome test executed)

// Playrwright run plugin install to execute through click

// UI execution
// npx playwright test--projet = chromium--headed

// Executing test case from single file
// npx playwright test example.spec.ts--project = chromium--headed

// Executing particular test case
// npx playwright test - g "has title" --project = chromium


// ======================================================================
// Feature	         |     JavaScript	         |    TypeScript
//-----------------------------------------------------------------------
// Typing	         |      Dynamic  	         |Static
// Compilation       |    Interpreted	         |Compiled to JavaScript
// Interfaces        |   Not available	         |  Available
// AdditionalFeatures|Limited(no enums, generics)|	Enums, generics, decorators, etc.
// Error Checking	 | Runtime	                 |Compile - time