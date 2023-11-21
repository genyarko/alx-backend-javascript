const http = require('http');
const url = require('url');
const { countStudents } = require('./3-read_file_async');

// Create an HTTP server
const app = http.createServer((req, res) => {
  // Parse the URL to extract the path
  const { pathname } = url.parse(req.url, true);

  // Set the content type to plain text
  res.setHeader('Content-Type', 'text/plain');

  // Handle different URL paths
  if (pathname === '/') {
    // Respond with "Hello Holberton School!" for the root path
    res.end('Hello Holberton School!\n');
  } else if (pathname === '/students') {
    // Respond with student information for the /students path
    // The name of the database file is passed as a command line argument
    const databaseFileName = process.argv[2];
    if (!databaseFileName) {
      res.end('Error: Database file name is missing.\n');
      return;
    }

    // Call the countStudents function from 3-read_file_async.js
    countStudents(databaseFileName)
      .then((studentInfo) => {
        // Display the student information
        res.end(`This is the list of our students\n${studentInfo}`);
      })
      .catch((error) => {
        // Handle errors
        res.end(`Error: ${error.message}\n`);
      });
  } else {
    // Respond with a 404 error for unknown paths
    res.statusCode = 404;
    res.end('Error 404: Not Found\n');
  }
});

// Listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

// Export the app variable
module.exports = app;
