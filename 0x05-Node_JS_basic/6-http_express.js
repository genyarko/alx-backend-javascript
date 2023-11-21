const express = require('express');

const app = express();
const PORT = 1245;

// Define a route for the endpoint "/"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening at -> http://localhost:${PORT}`);
});

// Export the app variable for external use
module.exports = app;
