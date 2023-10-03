export default function updateStudentGradeByCity(students, city, newGrades) {
  const defaultGrade = { grade: 'N/A' };

  if (students instanceof Array) {
    return students
      .filter((student) => student.location === city)
      .map((student) => {
        const matchingGrade = newGrades.find((grade) => grade.studentId === student.id);
        return {
          id: student.id,
          firstName: student.firstName,
          location: student.location,
          grade: matchingGrade ? matchingGrade.grade : defaultGrade.grade,
        };
      });
  }
  return [];
}
