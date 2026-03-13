const { test, expect, chromium } = require('@playwright/test');

/*
================================================================================
PLAYWRIGHT PSEUDO SELECTORS DEMO
================================================================================

This script demonstrates how Playwright supports advanced CSS-like pseudo
selectors that help locate elements more easily when normal selectors are
not sufficient.

Pseudo selectors are special keywords that allow us to locate elements based on:
1. Text inside the element
2. Relationship with other elements
3. Position of the element among similar elements

Pseudo selectors used in this example:

1. :has-text("text")
   - Selects elements that contain the given text.
   - Example: h1:has-text("Navbars")
   - Meaning: Find an <h1> element that contains the text "Navbars".

2. :nth-match(selector, n)
   - Selects the nth occurrence of a matching element.
   - Example: :nth-match(button:has-text('Primary'), 3)
   - Meaning: Find the 3rd button that contains the text "Primary".

Why these are useful:
- When multiple elements have the same locator
- When elements don't have unique IDs
- When we want to locate elements based on visible text
- Very useful for UI automation and testing dynamic pages

Website used for demo:
https://bootswatch.com/default/

================================================================================
*/

test.describe('Pseudo Classes Test', () => {
    let browser;
    let context;
    let page;

    // Set up before each test
    test.beforeEach(async () => {

        // Launch browser in visible mode (good for training/demo)
        browser = await chromium.launch({
            headless: false,   // Browser UI will be visible
            slowMo: 500,       // Adds 500ms delay between actions so students can see execution
        });

        // Create a new browser context
        context = await browser.newContext({
            ignoreHTTPSErrors: true, // Ignore SSL certificate issues
            viewport: { width: 1920, height: 1080 } // Set screen resolution
        });

        // Open a new tab
        page = await context.newPage();

        // Navigate to the Bootswatch demo site
        await page.goto("https://bootswatch.com/default/");
    });

    test('Highlight Elements Using Pseudo Classes', async () => {

        /*
        ------------------------------------------------------------------------
        Example 1 : Using :has-text() pseudo selector
        ------------------------------------------------------------------------
        Select an <h1> element that contains the text "Navbars"
        */

        let elementByText = page.locator('h1:has-text("Navbars")');
        await highlightElement(elementByText);


        /*
        ------------------------------------------------------------------------
        Example 2 : Another :has-text() example
        ------------------------------------------------------------------------
        Select an <h1> element that contains the text "Navs"
        */

        elementByText = page.locator('h1:has-text("Navs")');
        await highlightElement(elementByText);


        /*
        ------------------------------------------------------------------------
        Example 3 : Using :nth-match()
        ------------------------------------------------------------------------
        :nth-match(selector, n)

        Here we are selecting the 1st button that contains the text "Primary".
        This is useful when multiple elements match the same locator.
        */

        elementByText = page.locator(":nth-match(button:has-text('Primary'), 1)");
        await highlightElement(elementByText);


        /*
        ------------------------------------------------------------------------
        Example 4 : Selecting the 3rd matching element
        ------------------------------------------------------------------------
        Here we select the 3rd button that contains the text "Primary".
        */

        elementByText = page.locator(":nth-match(button:has-text('Primary'), 3)");
        await highlightElement(elementByText);
    });


    /*
    ------------------------------------------------------------------------
    Helper Function
    ------------------------------------------------------------------------
    This function scrolls to the element and highlights it so that
    students can visually see which element Playwright located.
    */

    async function highlightElement(locator) {

        // Scroll element into view if it is not visible
        await locator.scrollIntoViewIfNeeded();

        // Change element background color to highlight it
        await locator.evaluate((el) => {
            el.style.backgroundColor = 'yellow';
        });

        // Pause for 2 seconds so highlight is visible
        await page.waitForTimeout(2000);
    }


    // Cleanup after each test
    test.afterEach(async () => {
        await page.close();     // Close the page
        await context.close();  // Close browser context
        await browser.close();  // Close browser
    });

});