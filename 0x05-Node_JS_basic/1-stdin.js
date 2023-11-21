// File: 1-stdin.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to Holberton School, what is your name?');

rl.question('', (name) => {
  console.log(`Your name is: ${name}`);
  console.log('Type "exit" to close the program.');
});

// Listen for the "line" event to detect user input
rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('This important software is now closing');
    rl.close();
  } else {
    // Handle other input if needed
    console.log(`You typed: ${input}`);
  }
});

// Listen for the "close" event to perform cleanup
rl.on('close', () => {
  process.exit(0);
});
