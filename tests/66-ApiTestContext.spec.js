const { test, expect, request } = require('@playwright/test');

// In Playwright, request.newContext() is a method used to create a new request context.
// This context allows you to manage HTTP requests independently from other contexts,
// which is particularly useful when you need to customize request settings or manage cookies and authentication.

// Key Features of request.newContext():
// Isolation of Requests: Each request context operates independently.
// This means that cookies, headers, and other settings will not interfere with other contexts,
// allowing for clean testing scenarios.

// Custom Configuration: You can customize headers, user agent strings,
// and other settings specific to the request context. This is useful for testing APIs
// with different authentication mechanisms or for simulating requests from different devices.

// Cookie Management: Each context can manage its own cookies. This is useful for testing scenarios that require different sessions or user states.

// Network Interception: Request contexts can also be used for intercepting network requests,
// enabling you to modify requests and responses on the fly.

test('test_users_api', async ({ playwright }) => {
   // Create a new API context with base URL
   const apiContext = await playwright.request.newContext({
      baseURL: "https://dummyjson.com"
   });

   // Make GET request to the specified endpoint
   const response = await apiContext.get("/users/1");

   // Parse the JSON response
   const userData = await response.json();
   console.log(userData);

   // Assertions to validate the data
   expect(userData).toHaveProperty("firstName");
   expect(userData).toHaveProperty("lastName");

   expect(userData.firstName).toBe("Emily");
   expect(userData.lastName).toBe("Johnson");

   // Dispose of the API context to close the session
   await apiContext.dispose();
});
