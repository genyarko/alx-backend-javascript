import readDatabase from '../utils';

class StudentsController {
  /**
   * Gets all students.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} Express response object with a 200 status and the list of students.
   */
  static async getAllStudents(req, res) {
    try {
      const studentData = await readDatabase(req.app.locals.dbFilePath);
      const responseParts = ['This is the list of our students'];

      Object.keys(studentData)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .forEach((field) => {
          const studentsInField = studentData[field];
          responseParts.push(`Number of students in ${field}: ${studentsInField.length}. List: ${studentsInField.join(', ')}`);
        });

      res.status(200).send(responseParts.join('\n'));
    } catch (error) {
      console.error(`Error processing /students request: ${error.message}`);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  }

  /**
   * Gets all students in a specific major.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} Express response object with a 200 status and the list of students in the specified major.
   */
  static async getAllStudentsByMajor(req, res) {
    try {
      const { major } = req.params;
      if (!['CS', 'SWE'].includes(major)) {
        throw new Error('Major parameter must be CS or SWE');
      }

      const studentData = await readDatabase(req.app.locals.dbFilePath);
      const studentsInMajor = studentData[major] || [];

      res.status(200).send(`List: ${studentsInMajor.join(', ')}`);
    } catch (error) {
      console.error(`Error processing /students/:major request: ${error.message}`);
      res.status(500).send(`Internal Server Error: ${error.message}`);
    }
  }
}

export default StudentsController;
