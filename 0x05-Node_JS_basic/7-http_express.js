const express = require('express');
const { countStudents } = require('./3-read_file_async');

const app = express();
const PORT = 1245;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

// Define a route for the endpoint "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define a route for the endpoint "/students"
app.get('/students', async (req, res) => {
  try {
    const report = await countStudents(DB_FILE);
    const responseText = `This is the list of our students\n${report}`;
    res.setHeader('Content-Type', 'text/plain');
    res.send(responseText);
  } catch (error) {
    console.error(`Error processing /students request: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening at -> http://localhost:${PORT}`);
});

// Export the app variable for external use
module.exports = app;
