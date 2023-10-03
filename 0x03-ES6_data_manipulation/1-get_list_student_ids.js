/**
 * Retrieves ids from a list of students.
 * @param {{
 *   id: Number,
 *   firstName: String,
 *   location: String
 * }[]} students - The list of students.
 * @returns
 */
export default function getListStudentIds(students) {
  if (!Array.isArray(students)) {
    return [];
  }

  return students.map(student => student.id);
}
