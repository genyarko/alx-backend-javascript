import ClassRoom from './0-classroom.js';

function initializeRooms() {
  const rooms = [];

  for (const size of [19, 20, 34]) {
    rooms.push(new ClassRoom(size));
  }

  return rooms;
}

export default initializeRooms;
