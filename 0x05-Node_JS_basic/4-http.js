const http = require('http');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();

// Event listener for handling incoming HTTP requests
app.on('request', (_, res) => {
  // Text to be sent in the response
  const responseText = 'Hello Holberton School!';

  // Set response headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);

  // Set the HTTP status code to 200 (OK)
  res.statusCode = 200;

  // Send the response text
  res.end(responseText);
});

// Event listener for handling server errors
app.on('error', (error) => {
  console.error(`Server error: ${error.message}`);
});

// Start the server and listen on the specified port and host
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

// Export the app variable for external use
module.exports = app;
