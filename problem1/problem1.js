/*
TASK

Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`

*/

// Solution 1: the sum won't exceed Number.MAX_SAFE_INTEGER
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
}

function sum_to_n_b(n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
}

function sum_to_n_c(n) {
  return (n * (n + 1)) / 2;
}

// Solution 2: the sum might exceed Number.MAX_SAFE_INTEGER
function sum_to_n_a(n) {
  let sum = BigInt(0);
  for (let i = BigInt(1); i <= BigInt(n); i++) {
      sum += i;
  }
  return Number(sum);
}

function sum_to_n_b(n) {
  return Number(Array.from({ length: n }, (_, i) => BigInt(i + 1)).reduce((sum, num) => sum + num, BigInt(0)));
}

function sum_to_n_c(n) {
  return Number((BigInt(n) * BigInt(n + 1)) / BigInt(2));
}