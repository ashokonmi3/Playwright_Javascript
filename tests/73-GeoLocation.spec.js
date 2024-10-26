// setGeolocation.spec.js
const { test, expect } = require('@playwright/test');

test('set and verify geolocation', async ({ browser }) => {
   // Create a new browser context with geolocation set to London
   const context = await browser.newContext({
      geolocation: { latitude: 51.5074, longitude: -0.1278 },
      permissions: ['geolocation'],
   });

   // Create a new page in the context
   const page = await context.newPage();

   // Navigate to the desired URL
   await page.goto('https://example.com'); // Replace with your app's URL

   // Retrieve the geolocation values set in the browser
   const latitude = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords.latitude),
            (error) => reject(error)
         );
      });
   });

   const longitude = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords.longitude),
            (error) => reject(error)
         );
      });
   });

   // Validate the set geolocation values
   const expectedLatitude = 51.5074;
   const expectedLongitude = -0.1278;

   expect(latitude).toBe(expectedLatitude);
   expect(longitude).toBe(expectedLongitude);

   console.log(`Geolocation is set correctly: Latitude: ${latitude}, Longitude: ${longitude}`);

   // Close the context and the browser
   await context.close();
});
