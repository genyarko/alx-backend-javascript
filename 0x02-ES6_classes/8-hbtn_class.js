export default class HolbertonClass {
  constructor(size, location) {
    this._size = size;
    this._location = location;
  }

  // Getter for size
  get size() {
    return this._size;
  }

  // Getter for location
  get location() {
    return this._location;
  }

  // toString() method for casting to a string
  toString() {
    return this._location;
  }

  // valueOf() method for casting to a number
  valueOf() {
    return this._size;
  }
}
