import getListStudents from "./0-get_list_students.js";

const students = getListStudents();
const newGrades = [
  { studentId: 1, grade: 95 },
  { studentId: 5, grade: 88 },
  // Add more grades as needed
];

const city = 'San Francisco';
const updatedStudents = updateStudentGradeByCity(students, city, newGrades);
console.log(updatedStudents);
