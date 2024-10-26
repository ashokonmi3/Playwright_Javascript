class PlaywrightPage {
    constructor(page) {
        this.page = page;
        // Navigate to the Playwright Python documentation page
        this.page.goto("https://playwright.dev/python");

        // Define locators for the Docs link and search input
        this.docsLink = this.page.locator('a:has-text("Docs")');

        this.searchInput = this.page.locator('span.DocSearch-Button-Placeholder'); // If it's a text input without a placeholder
        this.searchButtonPlaceholder = this.page.locator('.DocSearch-Input');

    }

    async visitDocs() {
        // Click the Docs link
        await this.docsLink.click();
    }

    async search(query) {
        // Press Control + K to focus on the search input
        await this.searchInput.click();
        await this.page.waitForTimeout(2000); // Wait for 2 seconds

        // Fill the search input with the query
        await this.searchButtonPlaceholder.fill(query);
    }

    async searchResults() {
        console.log("Search Results:");
        // Iterate through all search result titles and log their inner text
        const results = await this.page.locator('span.DocSearch-Hit-title').all();
        for (const result of results) {
            console.log(await result.innerText());
        }

        // Return the locator for the search dropdown
        return this.page.locator('div.DocSearch-Dropdown');
    }
}

module.exports = PlaywrightPage;
