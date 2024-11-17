const { test, expect } = require('@playwright/test');

// Base URL for the API
const baseURL = "https://dummyjson.com";

// Test Suite: User API Tests
test.describe('User API Test Suite', () => {
   // Test to create a new user
   test('Create User', async ({ request }) => {
      // Sending a POST request to add a new user
      const response = await request.post(`${baseURL}/users/add`, {
         data: {
            firstName: "Damien",
            lastName: "Smith",
            age: 27
         }
      });

      const userData = await response.json();

      // Assertions
      console.log("Create User Response:", userData);
      expect(response.status()).toBe(201); // Ensure successful request
      expect(userData.firstName).toBe("Damien");
      expect(userData.lastName).toBe("Smith");
      expect(userData.age).toBe(27);
   });

   // Test to update an existing user
   test('Update User', async ({ request }) => {
      // Sending a PUT request to update the user with ID 1
      const response = await request.put(`${baseURL}/users/1`, {
         data: {
            lastName: "Smith",
            age: 20,
         }
      });

      const userData = await response.json();

      // Assertions
      console.log("Update User Response:", userData);
      expect(response.status()).toBe(200); // Ensure successful request
      expect(userData.lastName).toBe("Smith");
      expect(userData.age).toBe(20);
   });

   // Test to remove a user
   test('Remove User', async ({ request }) => {
      // Sending a DELETE request to remove the user with ID 1
      const response = await request.delete(`${baseURL}/users/1`);

      const userData = await response.json();

      // Assertions
      console.log("Remove User Response:", userData);
      expect(response.status()).toBe(200); // Ensure successful request
      expect(userData.isDeleted).toBe(true);
   });
});
