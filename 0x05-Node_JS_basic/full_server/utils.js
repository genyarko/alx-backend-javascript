import fs from 'fs';

/**
 * Reads the database asynchronously.
 * @param {String} filePath - The path to the CSV data file.
 * @returns {Promise} A promise that resolves to an object of arrays of first names per field.
 * @throws {Error} If the file is not accessible.
 */
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    } else {
      const lines = data.trim().split('\n');
      const studentData = {};
      
      for (let i = 1; i < lines.length; i++) {
        const [firstName, , , field] = lines[i].split(',');
        if (!studentData[field]) {
          studentData[field] = [];
        }
        studentData[field].push(firstName);
      }

      resolve(studentData);
    }
  });
});

export default readDatabase;
