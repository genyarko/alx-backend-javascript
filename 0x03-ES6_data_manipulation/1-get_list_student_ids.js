export function getListStudentIds(listOfStudents) {
  // Check if the argument is an array
  if (!Array.isArray(listOfStudents)) {
    return [];
  }

  // Use the map function to return an array of ids
  const ids = listOfStudents.map((student) => student.id);

  // Return the array of ids
  return ids;
}
