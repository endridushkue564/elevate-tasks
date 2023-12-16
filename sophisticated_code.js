/* sophisticated_code.js */

// This code calculates the Fibonacci sequence up to a given number
// It uses iteration and memoization to improve performance

function fibonacci(n) {
  // Create a memo array to store calculated Fibonacci numbers
  let memo = [];
  
  // Base cases
  memo[0] = 0;
  memo[1] = 1;

  // Calculate Fibonacci numbers iteratively using memoization
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo;
}

// Prompt the user to enter a number
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Enter a number: ", (num) => {
  const fibonacciSequence = fibonacci(parseInt(num));
  console.log(`Fibonacci sequence up to ${num}: ${fibonacciSequence}`);
  readline.close();
});