const { test, expect } = require('@playwright/test');

// Base URL for the API
const baseURL = "https://dummyjson.com";

// Test to create a new user
test('test_create_user', async ({ request }) => {
   // Sending a POST request to add a new user
   const response = await request.post(`${baseURL}/users/add`, {
      data: {
         firstName: "Damien",
         lastName: "Smith",
         age: 27
      }
   });

   const userData = await response.json();

   // Assert that the user ID and first name match the expected values
   expect(userData.id).toBe(209);
   expect(userData.firstName).toBe("Damien");
});

// Test to update an existing user
test('test_update_user', async ({ request }) => {
   // Sending a PUT request to update the user with ID 1
   const response = await request.put(`${baseURL}/users/1`, {
      data: {
         lastName: "Smith",
         age: 20,
      }
   });

   const userData = await response.json();

   // Assert that the last name and age have been updated correctly
   expect(userData.lastName).toBe("Smith");
   expect(userData.age).toBe(20);
});

// Test to remove a user
test('test_remove_user', async ({ request }) => {
   // Sending a DELETE request to remove the user with ID 1
   const response = await request.delete(`${baseURL}/users/1`);

   const userData = await response.json();

   // Assert that the user has been deleted
   expect(userData.isDeleted).toBe(true);
});
