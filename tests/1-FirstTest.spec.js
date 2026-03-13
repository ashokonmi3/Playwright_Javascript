const { test, expect } = require('@playwright/test');

// Test suite
test.describe('Example Test Suite', () => {

    // Single test case
    test('example test', async ({ page }) => {
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBe('Example');
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

// ===============================
/*
===========================================================
            SELENIUM vs PLAYWRIGHT COMPARISON
===========================================================

| Feature                              | Selenium                                              | Playwright                                           |
|--------------------------------------|--------------------------------------------------------|------------------------------------------------------|
| Developed By                         | ThoughtWorks / Selenium Project (W3C)                 | Microsoft                                            |
| Primary Languages Supported          | Java, Python, C#, Ruby, JavaScript, Kotlin             | JavaScript, TypeScript, Python, Java, C#             |
| Architecture                         | Uses WebDriver protocol                               | Direct control via browser engine (CDP)              |
| Browser Support                      | Chrome, Firefox, Edge, Safari (via drivers)            | Chromium, Firefox, WebKit (includes Safari)          |
| Speed                                | Slower (WebDriver communication overhead)              | Faster (direct protocol control)                     |
| Installation                         | Requires browser drivers (ChromeDriver, etc.)          | No drivers needed; browsers auto-managed             |
| Synchronization / Waits              | Needs explicit/implicit waits                         | Auto-waits built in                                  |
| Parallel Execution                   | Via TestNG/JUnit/Grid                                 | Built-in parallel support                            |
| Headless Mode                        | Supported with setup                                   | Built-in and default-ready                           |
| Handling Tabs / Windows              | Needs window handle switching                          | Easy via context & page objects                      |
| Mobile Emulation                     | Limited (via dev tools)                                | Built-in device emulation                            |
| Cross-browser Testing                | Requires Grid or cloud setup                           | Built-in local cross-browser support                 |
| Element Locators                     | XPath, CSS, ID, etc.                                   | Same + strict and smart selector engine              |
| Network Interception / Mocking       | Not supported natively                                 | Fully supported                                      |
| Screenshots & Video Recording        | Screenshots supported, video via plugins               | Built-in screenshots, video & trace                  |
| API Testing                          | Not supported natively                                 | Built-in API testing                                 |
| Automatic Waiting (Smart Waits)      | Manual implementation                                 | Auto-wait built-in                                   |
| Execution Reports                    | Needs external libs (Allure, Extent)                   | Built-in HTML reports                                |
| Test Runner                          | Uses TestNG, JUnit, Pytest, etc.                       | Built-in Playwright Test Runner                      |
| Community Maturity                   | Older, very mature ecosystem                           | Newer but rapidly growing                            |
| Use Case                             | Legacy, multi-language projects                        | Modern web apps, CI/CD optimized                     |

-----------------------------------------------------------
SUMMARY:
- Selenium → Mature, widely used, supports multiple languages.
- Playwright → Modern, faster, supports parallel, auto-wait, and built-in tools.
===========================================================
*/
