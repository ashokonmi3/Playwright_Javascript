class HomePage {
    constructor(page) {
        this.page = page;

        // Define locators for the Docs link and search input
        this.docsLink = this.page.locator('a:has-text("Docs")');
        this.searchInput = this.page.locator('button[aria-label="Search"]'); // Adjust locator for search button
        this.searchInputField = this.page.locator('input[placeholder="Search docs"]'); // Adjust for search input field
        this.searchResults = this.page.locator('div.DocSearch-Dropdown');
    }

    // Method to navigate to the Playwright Python documentation page
    async navigate() {
        await this.page.goto("https://playwright.dev/python");
    }

    // Method to click the "Docs" link
    async visitDocs() {
        // Click the Docs link and wait for navigation
        await Promise.all([
            this.page.waitForNavigation(), // Wait for navigation to complete
            this.docsLink.click(),         // Action that triggers navigation
        ]);
    }

    // Method to perform a search
    async search(query) {
        await this.searchInput.click(); // Open the search input
        await this.searchInputField.fill(query); // Fill the search query
        await this.page.waitForTimeout(2000); // Optional: Wait for results to load
    }

    // Method to fetch search results
    async getSearchResults() {
        const resultsText = await this.searchResults.allInnerTexts();
        console.log("Search Results:", resultsText);
        return resultsText;
    }
}

module.exports = HomePage;
