// flaky.test.js
const { test, expect } = require('@playwright/test');

function getRandomBoolean() {
   return Math.random() >= 0.5; // Returns true or false randomly
}

test('this test will pass', async () => {
   expect(true).toBe(true); // This will always pass
});

test('this test may fail', async () => {
   const result = getRandomBoolean();
   expect(result).toBe(true); // This may fail randomly
});

test('this test will also pass', async () => {
   expect(1 + 1).toBe(2); // This will always pass
});


// npx playwright test 75 - RetryallfailedCase.spec.js--retries = 3