const fs = require('fs');

function countStudents(path) {
  try {
    // Read the database file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Split the data into lines and filter out empty lines
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // Parse the CSV data
    const students = lines.map(line => line.split(','));

    // Count the total number of students
    const totalStudents = students.length;

    // Count the number of students in each field
    const fieldCounts = {};
    students.forEach(student => {
      const field = student[3].trim(); // Assuming the field is in the 4th column (index 3)
      if (field in fieldCounts) {
        fieldCounts[field]++;
      } else {
        fieldCounts[field] = 1;
      }
    });

    // Log the results
    console.log(`Number of students: ${totalStudents}`);
    Object.entries(fieldCounts).forEach(([field, count]) => {
      const list = students
        .filter(student => student[3].trim() === field)
        .map(student => student[0].trim()) // Assuming the first name is in the 1st column (index 0)
        .join(', ');
      console.log(`Number of students in ${field}: ${count}. List: ${list}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
