export default class HolbertonCourse {
  constructor(name, length, students) {
    // Verify types of attributes
    if (typeof name !== 'string' || typeof length !== 'number' || !Array.isArray(students)) {
      throw new TypeError('Invalid attribute types');
    }

    // Initialize attributes with underscores
    this._name = name;
    this._length = length;
    this._students = students;
  }

  // Getter and setter for name
  get name() {
    return this._name;
  }

  set name(name) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this._name = name;
  }

  // Getter and setter for length
  get length() {
    return this._length;
  }

  set length(length) {
    if (typeof length !== 'number') {
      throw new TypeError('Length must be a number');
    }
    this._length = length;
  }

  // Getter and setter for students
  get students() {
    return this._students;
  }

  set students(students) {
    if (!Array.isArray(students)) {
      throw new TypeError('Students must be an array');
    }
    this._students = students;
  }
}
