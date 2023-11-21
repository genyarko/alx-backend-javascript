import readDatabase from '../utils';

// Array of valid major values
const VALID_MAJORS = ['CS', 'SWE'];

// Class definition for the StudentsController
class StudentsController {
  // Static method to get information for all students
  static getAllStudents(request, response) {
    // Get the path to the database file from command line arguments
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';

    // Read the database asynchronously
    readDatabase(dataPath)
      .then((studentGroups) => {
        // Prepare the response parts for displaying student information
        const responseParts = ['This is the list of our students'];
        
        // Comparator function for sorting student groups by field name
        const cmpFxn = (a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase());

        // Loop through the sorted student groups and build the response
        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          responseParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        
        // Send a 200 status response with the joined response parts
        response.status(200).send(responseParts.join('\n'));
      })
      .catch((err) => {
        // Send a 500 status response with the error message if an error occurs
        response.status(500).send(err instanceof Error ? err.message : err.toString());
      });
  }

  // Static method to get information for students in a specific major
  static getAllStudentsByMajor(request, response) {
    // Get the path to the database file from command line arguments
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';
    
    // Extract the major parameter from the request
    const { major } = request.params;

    // Check if the major parameter is valid
    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    // Read the database asynchronously
    readDatabase(dataPath)
      .then((studentGroups) => {
        // Initialize the response text
        let responseText = '';

        // Check if the specified major exists in the database
        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }

        // Send a 200 status response with the response text
        response.status(200).send(responseText);
      })
      .catch((err) => {
        // Send a 500 status response with the error message if an error occurs
        response.status(500).send(err instanceof Error ? err.message : err.toString());
      });
  }
}

// Export the StudentsController class
export default StudentsController;
module.exports = StudentsController;
