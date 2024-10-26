const { test, expect } = require('@playwright/test');

// Test to search for users by name
test('test_users_search', async ({ request }) => {
   const query = "Emily"; // Define the search query

   // Send a GET request to search for users
   const response = await request.get(`https://dummyjson.com/users/search?q=${query}`);

   // Parse the JSON response
   const usersData = await response.json();

   console.log("Users found:", usersData.total); // Log the total number of users found

   // Iterate through the users and check if the first name matches the query
   for (const user of usersData.users) {
      console.log("Checking user:", user.firstName);
      // Assert that the query is part of the user's first name
      expect(user.firstName).toContain(query);
   }
});
