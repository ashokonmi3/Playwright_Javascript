// JSON.stringify(): Convert JavaScript objects into a JSON-formatted string.
// JSON.parse(): Convert a JSON-formatted string into JavaScript objects.
// fs.writeFile(): Write JavaScript objects into a JSON file.
// fs.readFile(): Read JSO6k N data from a file and convert it into JavaScript objects.

// JavaScript object to write into a JSON file
// // File System, which is a built -in module in Node.js.
// // It provides functionality to interact with the file system,
// //  allowing you to read from, write to, and manipulate files and directories.
// ---------------------------
// // Sample data to write to a JSON file
// const fs = require('fs');

// const data = {
//    name: "John Doe",
//    age: 30,
//    city: "New York",
//    skills: ["Python", "Machine Learning", "Automation"]
// };

// // // // Write data to a JSON file
// fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
// console.log("Data written to file successfully.");

// // // // Read data from the JSON file
// const jsonData = fs.readFileSync('data.json', 'utf8');
// const parsedData = JSON.parse(jsonData);
// console.log("Data read from file:", parsedData);

// =================
// const fs = require('fs');

// // Reading from a JSON file
// const data = fs.readFileSync('data.json', 'utf8');

// // Parse the JSON data
// const jsonData = JSON.parse(data);

// // Display the data
// console.log("Data read from file:");
// console.log(jsonData);
// console.log(typeof jsonData);
// ======================
// Sample object
// const data = {
//    name: "Jane Smith",
//    age: 25,
//    hobbies: ["Reading", "Gaming", "Cycling"]
// };

// // Convert object to JSON string
// const jsonString = JSON.stringify(data, null, 4);

// // Output the JSON string
// console.log("JSON formatted string:");
// console.log(jsonString);
// =============

// JSON string
// const jsonString = `
// {
//    "name": "Alice",
//    "age": 22,
//    "active": true,
//    "courses": ["Math", "Physics"]
// }
// `;

// // Convert JSON string to JavaScript object
// const data = JSON.parse(jsonString);

// // Display the data
// console.log("Data parsed from JSON string:");
// console.log(data);
// console.log(typeof data); // Output the type
// =======================

// const fs = require('fs');

// // Nested JavaScript object
// const data = {
//    employee: {
//       name: "Tom",
//       age: 35,
//       address: {
//          street: "123 Main St",
//          city: "Los Angeles",
//          state: "CA"
//       }
//    },
//    salary: 60000,
//    status: true
// };

// // Writing the nested object to a JSON file
// fs.writeFile('nested_data.json', JSON.stringify(data, null, 4), (err) => {
//    if (err) {
//       console.error("Error writing to file:", err);
//    } else {
//       console.log("Nested data written to file successfully.");
//    }
// });

// // Reading the nested JSON file
// fs.readFile('nested_data.json', 'utf8', (err, jsonData) => {
//    if (err) {
//       console.error("Error reading file:", err);
//    } else {
//       const readData = JSON.parse(jsonData);
//       console.log("Nested data read from file:");
//       console.log(readData);
//    }
// });
// ========================
// // Error handling
// const invalidJsonString = "{name: John, age: 30}";

// try {
//    const data = JSON.parse(invalidJsonString);
// } catch (error) {
//    console.error("Error decoding JSON:", error.message);
// }

// =======================
// Import fs module to work with file system
// const fs = require('fs');

// // Load existing JSON data
// fs.readFile('data.json', 'utf8', (err, jsonData) => {
//    if (err) {
//       console.error("Error reading file:", err);
//       return;
//    }

//    // Parse JSON data into JavaScript object
//    const data = JSON.parse(jsonData);

//    // Modify data
//    data.age = 35; // Update age
//    data.skills.push("Cloud Computing"); // Add new skill

//    console.log(data); // Display updated data

//    // Write updated data back to JSON file
//    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
//       if (err) {
//          console.error("Error writing file:", err);
//       } else {
//          console.log("Data updated successfully.");
//       }
//    });
// });

/* Study Notes:
1. `fs.readFile` reads the JSON file as a string.
2. `JSON.parse` converts the JSON string into a JavaScript object.
3. Modify the object as needed (e.g., changing values, adding elements).
4. `JSON.stringify` converts the modified object back to a JSON string.
5. `fs.writeFile` saves the updated JSON data to the file.

This process demonstrates updating and saving data in a JSON file.
*/
// ====================
// Import 'https' module to make API requests
// const https = require('https');

// // URL of a sample REST API that returns JSON data
// const url = "https://jsonplaceholder.typicode.com/users";

// // Send a GET request to the API
// https.get(url, (response) => {
//    let data = '';

//    // Collect data chunks
//    response.on('data', (chunk) => {
//       data += chunk;
//    });

//    // Process data after receiving full response
//    response.on('end', () => {
//       if (response.statusCode === 200) {
//          const users = JSON.parse(data); // Parse JSON

//          // Display each user's name, email, and city
//          users.forEach((user) => {
//             console.log(`Name: ${user.name}`);
//             console.log(`Email: ${user.email}`);
//             console.log(`City: ${user.address.city}`);
//             console.log('----------------');
//          });
//       } else {
//          console.error(`Error: ${response.statusCode}`);
//       }
//    });
// }).on('error', (err) => {
//    console.error("Request error:", err.message);
// });
// ================
// const https = require('https');

// // URL of the REST API
// const url = "https://jsonplaceholder.typicode.com/users";

// // Function to fetch and display data from API
// function fetchData() {
//    https.get(url, (res) => {
//       let data = '';

//       // Collect data chunks
//       res.on('data', (chunk) => {
//          data += chunk;
//       });

//       // Process the complete response
//       res.on('end', () => {
//          if (res.statusCode === 200) {
//             const users = JSON.parse(data); // Parse JSON data

//             console.log("User Data from API:");
//             console.log(JSON.stringify(users, null, 4)); // Pretty-print JSON data

//             // Access specific fields
//             users.forEach(user => {
//                console.log(`Name: ${user.name}`);
//                console.log(`Email: ${user.email}`);
//                console.log(`City: ${user.address.city}`);
//                console.log('----------------');
//             });
//          } else {
//             console.log(`Failed to retrieve data. Status code: ${res.statusCode}`);
//          }
//       });
//    }).on('error', (err) => {
//       console.log(`Error occurred: ${err.message}`);
//    });
// }

// // Execute the function
// fetchData();
