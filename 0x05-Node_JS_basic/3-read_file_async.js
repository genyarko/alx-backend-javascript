const fs = require('fs').promises;

/**
 * Count the students in a CSV data file asynchronously and log the results.
 *
 * @param {string} dataPath - The path to the CSV data file.
 * @returns {Promise} - A Promise that resolves with the student count information.
 */
const countStudents = async (dataPath) => {
  try {
    // Read the file content asynchronously
    const fileContent = await fs.readFile(dataPath, 'utf-8');

    // Split the file content into lines
    const fileLines = fileContent.trim().split('\n');

    // Initialize an object to store student records grouped by field
    const studentGroups = {};

    // Extract column names from the first line
    const dbFieldNames = fileLines[0].split(',');
    // Exclude the last column (field) from student properties
    const studentPropNames = dbFieldNames.slice(0, -1);

    // Iterate over each line (skipping the header) to process student records
    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      // Exclude the last column (field) from student properties
      const studentPropValues = studentRecord.slice(0, -1);
      const field = studentRecord[studentRecord.length - 1];

      // Initialize an array for the field if it doesn't exist in the groups object
      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }

      // Create an array of entries (property name and value) for each student
      const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);

      // Convert the array of entries to an object and add it to the corresponding field group
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    // Calculate the total number of students across all fields
    const totalStudents = Object.values(studentGroups).reduce((acc, group) => acc + group.length, 0);

    // Display the total number of students
    console.log(`Number of students: ${totalStudents}`);

    // Display the number of students in each field along with their names
    for (const [field, group] of Object.entries(studentGroups)) {
      const studentNames = group.map((student) => student.firstname).join(', ');
      console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
    }

    // Return an object with the student count information
    return {
      totalStudents,
      studentGroups,
    };
  } catch (error) {
    // If an error occurs during file reading, throw a new error
    throw new Error('Cannot load the database: ' + error.message);
  }
};

module.exports = countStudents;
