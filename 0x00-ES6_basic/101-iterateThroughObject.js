export default function iterateThroughObject(reportWithIterator) {
  const employeeNames = [...reportWithIterator]; // Convert the iterator to an array
  return employeeNames.join(' | ');
}
