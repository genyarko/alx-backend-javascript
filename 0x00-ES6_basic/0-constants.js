export function taskFirst() {
  // Instantiate variable using const
  const task = 'I prefer const when I can.';

  return task;
}

export function taskNext() {
  // Instantiate variable using let
  let combination = 'But sometimes let';

  // Concatenate the string returned by getLast()
  combination += getLast();

  return combination;
}
