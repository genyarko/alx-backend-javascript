process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on('data', (key) => {
  if (key.toString() === '\u0017') {
    // Ctrl+Q was pressed
    process.stdout.write('This important software is now closing\n');
    process.exit(0);
  } else {
    process.stdout.write(`Your name is: ${key}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
