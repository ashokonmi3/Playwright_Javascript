const { test, expect } = require('@playwright/test');

test('test_users_api', async ({ page }) => {
   // Go to the specified URL
   const response = await page.goto("https://dummyjson.com/users/1");

   // Parse JSON data from the response
   const userData = await response.json();
   console.log(userData);

   // Assertions to verify data
   expect(userData).toHaveProperty("firstName");
   expect(userData).toHaveProperty("lastName");

   expect(userData.firstName).toBe("Emily");
   expect(userData.lastName).toBe("Johnson");

   // Close the page
   await page.close();
});
