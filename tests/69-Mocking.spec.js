const { test, expect } = require('@playwright/test');

// Function to handle the API call and modify the response
async function onApiCall(route) {
   // Fetch the original response from the API
   const response = await route.fetch();
   const userData = await response.json();

   // Log the current last name to the console
   console.log("*******".repeat(10));
   console.log(userData.lastName);

   // Modify the user data
   userData.lastName = "Sharma"; // Changing last name to "Smith"
   userData.age = 200; // Updating age to 20

   // Fulfill the original route with the modified data
   await route.fulfill({
      response: response, // Keep the original response object
      json: userData, // Send the modified user data
   });
}

// Test case to interact with the user API
test('test_user_api', async ({ page }) => {
   const USERS_API_URL = "https://dummyjson.com/users/1"; // Define the API URL

   // Intercept the API call and modify the response using the onApiCall function
   await page.route(USERS_API_URL, onApiCall);

   // Navigate to the API URL and capture the response
   const response = await page.goto(USERS_API_URL);

   // Log the response's last name to the console
   console.log("######".repeat(10));
   const data = await response.json();
   console.log(data.lastName);

   // Log the complete response data
   console.log("Got data:", await response.json());
});
