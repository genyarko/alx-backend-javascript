import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1245;

// Set the path to the database file in app.locals for use in controllers
app.locals.dbFilePath = path.resolve(process.argv[2]);

// Use the routes defined in full_server/routes/index.js
app.use('/', routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening at -> http://localhost:${PORT}`);
});

export default app;
