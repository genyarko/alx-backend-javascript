export default function taskBlock(trueOrFalse) {
  var task = false;
  var task2 = true;

  if (trueOrFalse) {
    let task = true; // Use let or const here
    let task2 = false; // Use let or const here
  }

  return [task, task2];
}
