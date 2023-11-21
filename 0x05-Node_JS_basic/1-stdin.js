// File: 1-stdin.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Welcome to Holberton School, what is your name?');

rl.question('', (name) => {
  console.log(`Your name is: ${name}`);
  console.log('Press Ctrl+C to exit or enter another name:');
});

rl.on('close', () => {
  console.log('This important software is now closing');
});

// Listen for the 'SIGINT' event (Ctrl+C) to close the program gracefully
process.on('SIGINT', () => {
  rl.close();
});
