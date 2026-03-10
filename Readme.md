# Playwright Automation Project

This repository contains automated tests built using **Microsoft Playwright**.

Follow the steps below to set up the project on a new machine and run the tests.

---

## 1. Install Node.js and npm

Playwright requires **Node.js**.

1. Go to the Node.js website  
https://nodejs.org

2. Download and install the **LTS version**

3. Verify installation using:

node -v  
npm -v

If both commands return versions, Node.js and npm are installed correctly.

---

## 2. Verify npm Environment Path

Normally Node.js installer automatically adds npm to the system PATH.

Verify using:

npm -v

If npm is not recognized, add the following path to **Environment Variables → PATH**

C:\Program Files\nodejs\

Restart the terminal after updating the PATH.

---

## 3. Clone the Repository

Clone the project repository.

git clone <repository-url>  
cd playwright_javascript

---

## 4. Install Project Dependencies

The project already contains a **package.json** file with required dependencies.

Install dependencies using:

npm install

This will install:

- @playwright/test
- @types/node

It will also create:

- node_modules
- package-lock.json

---

## 5. Install Playwright Browsers

Playwright requires browsers to run tests.

Run the following command:

npx playwright install

This will install:

- Chromium
- Firefox
- WebKit

---

## 6. Verify Playwright Installation

Check the installed Playwright version:

npx playwright --version

---

## 7. Run Tests from Command Line

Run a specific test file:

npx playwright test .\example.spec.ts

Run all tests:

npx playwright test

---

## 8. Run Tests using VS Code Playwright Extension

Microsoft provides an official Playwright extension for Visual Studio Code.

### Install the Extension

1. Open **Visual Studio Code**
2. Click **Extensions**
3. Search for:

Playwright Test for VSCode

Publisher: **Microsoft**

Install the extension.

---

### Features of the Extension

The Playwright extension allows you to:

- Run tests directly from VS Code
- Debug tests
- View test results
- Record new tests
- Run tests in UI mode

---

### Running Tests using the Extension

1. Open the project folder in **VS Code**
2. The extension will detect **playwright.config.js**
3. Run and Debug options will appear beside test files
4. Click **Run Test** to execute the test

You can also run tests from the **Testing panel** in VS Code.

---

## 9. Typical Project Structure

playwright_javascript  
│  
├── package.json  
├── package-lock.json  
├── playwright.config.js  
├── node_modules  
│  
├── tests  
│   └── example.spec.ts  
│  
└── README.md  

---

## 10. Troubleshooting

### PowerShell npm Script Error

If you see this error:

running scripts is disabled on this system

Run PowerShell as Administrator and execute:

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Then run:

npm install

---

## Author

Playwright Automation Project