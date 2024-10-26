class LoginPage {
    constructor(page) {
        this.page = page;
        // Navigate to the sample app page
        this.page.goto("http://uitestingplayground.com/sampleapp");

        // Define locators for the username input, password input, login button, and status label
        this.usernameInput = this.page.locator('input[placeholder="User Name"]');
        this.passwordInput = this.page.locator('input[placeholder="********"]');
        this.loginBtn = this.page.locator('#login');
        this.label = this.page.locator('label#loginstatus');
    }

    async login(username, password) {
        // Fill in the username and password fields
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        // Click the login button
        await this.loginBtn.click();
    }
}

module.exports = LoginPage;
