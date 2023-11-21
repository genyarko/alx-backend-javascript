const http = require('http');
const fs = require('fs').promises; // Using promises for fs
const { countStudents } = require('./3-read_file_async');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => new Promise(async (resolve, reject) => {
  try {
    if (!dataPath) {
      throw new Error('Cannot load the database');
    }

    const data = await fs.readFile(dataPath, 'utf-8');
    const reportParts = [];
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];
      if (!Object.keys(studentGroups).includes(field)) {
        studentGroups[field] = [];
      }
      const studentEntries = studentPropNames.map((propName, idx) => [
        propName,
        studentPropValues[idx],
      ]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce((pre, cur) => (pre || []).length + cur.length, 0);
    reportParts.push(`Number of students: ${totalStudents}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push([
        `Number of students in ${field}: ${group.length}.`,
        'List:',
        group.map((student) => student.firstname).join(', '),
      ].join(' '));
    }
    resolve(reportParts.join('\n'));
  } catch (error) {
    reject(new Error(`Cannot load the database: ${error.message}`));
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    async handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.end(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    async handler(_, res) {
      const responseParts = ['This is the list of our students'];

      try {
        const report = await countStudents(DB_FILE);
        responseParts.push(report);
      } catch (error) {
        responseParts.push(error instanceof Error ? error.message : error.toString());
      }

      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.end(Buffer.from(responseText));
    },
  },
];

app.on('request', async (req, res) => {
  for (const { route, handler } of SERVER_ROUTE_HANDLERS) {
    if (route === req.url) {
      try {
        await handler(req, res);
      } catch (error) {
        console.error(`Error processing request: ${error.message}`);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
