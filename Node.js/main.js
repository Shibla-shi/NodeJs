// // Task 1: Check if a number is odd or even
// function checkOddEven(number) {
//     if (number % 2 === 0) {
//         console.log(number + " is even.");
//     } else {
//         console.log(number + " is odd.");
//     }
// }
// checkOddEven(5);  // Example call

// // Task 2: Sum of the first 100 natural numbers using a for loop
// function sumOfFirst100() {
//     let sum = 0;
//     for (let i = 1; i <= 100; i++) {
//         sum += i;
//     }
//     console.log("Sum of first 100 natural numbers is: " + sum);
// }
// sumOfFirst100();

// // Task 3: Calculate the factorial of a given number
// function factorial(n) {
//     let result = 1;
//     for (let i = 1; i <= n; i++) {
//         result *= i;
//     }
//     return result;
// }
// console.log('factorial : ',factorial(5)); // Example call

// // Task 4: Generate the first `n` numbers in the Fibonacci series
// function fibonacci(n) {
//     let fibSeries = [0, 1];
//     for (let i = 2; i < n; i++) {
//         fibSeries[i] = fibSeries[i - 1] + fibSeries[i - 2];
//     }
//     console.log('first `n` numbers in the Fibonacci series',fibSeries.slice(0, n));
// }
// fibonacci(10);

// // Task 5: Check if a number is prime
// function isPrime(num) {
//     if (num < 2) return false;
//     for (let i = 2; i <= Math.sqrt(num); i++) {
//         if (num % i === 0) return false;
//     }
//     return true;
// }
// console.log('7 is prime number ',isPrime(7)); // Example call

// // Task 6: Check if a given string is a palindrome
// function isPalindrome(str) {
//     const reversed = str.split('').reverse().join('');
//     return str === reversed;
// }
// console.log('madam  is a palindrome',isPalindrome("madam")); // Example call

// // Task 7: Reverse a string
// function reverseString(str) {
//     return str.split('').reverse().join('');
// }
// console.log('reverse the String hello  : ',reverseString("hello")); // Example call

// // Task 8: Find the largest number in a given array
// function findLargest(arr) {
//     return Math.max(...arr);
// }
// console.log('[1, 2, 3, 4, 5]');

// console.log('largest number in the array ',findLargest([1, 2, 3, 4, 5])); // Example call

// // Task 9: Calculate the sum of all elements in an array
// function sumArray(arr) {
//     return arr.reduce((sum, current) => sum + current, 0);
// }
// console.log('[1, 2, 3, 4, 5]');

// console.log('sum of all elements in an array',sumArray([1, 2, 3, 4, 5])); // Example call

// // Task 10: Print a right-angled triangle pattern
// function printTriangle(rows) {
//     console.log('right-angled triangle pattern');

//     for (let i = 1; i <= rows; i++) {
//         console.log('*'.repeat(i));
//     }
// }
// printTriangle(5); // Example call

// // Task 11: Remove duplicate elements from an array
// function removeDuplicates(arr) {
//     return [...new Set(arr)];
// }
// console.log('[1, 2, 2, 3, 4, 4]');
// console.log('Remove duplicate elements from an array');
// console.log(removeDuplicates([1, 2, 2, 3, 4, 4])); // Example call

// // Task 12: Find the intersection of two arrays
// function intersection(arr1, arr2) {
//     return arr1.filter(value => arr2.includes(value));
// }
// console.log('arr1 [1, 2, 3] , arr2 [2, 3, 4]');
// console.log('the intersection of two arrays');
// console.log(intersection([1, 2, 3], [2, 3, 4])); // Example call

// // Task 13: Merge two arrays and remove duplicates
// function mergeAndRemoveDuplicates(arr1, arr2) {
//     return [...new Set([...arr1, ...arr2])];
// }
// console.log('arr1 [1, 2, 3] , arr2 [2, 3, 4]');

// console.log('Merge two arrays and remove duplicates');
// console.log(mergeAndRemoveDuplicates([1, 2, 3], [2, 3, 4])); // Example call




const sum = require('./sum');
const largestModule = require('./operations');

const sumResult = sum(5, 3);
const largestOfTwoResult = largestModule.largestOfTwo(10, 20);
const largestOfThreeResult = largestModule.largestOfThree(10, 5, 20);
const largestOfFourResult = largestModule.largestOfFour(10, 5, 20, 30);

console.log("5 + 3 :", sumResult);
console.log("The largest of two numbers(10,20):", largestOfTwoResult);
console.log("The largest of three numbers(10,5,20):", largestOfThreeResult);
console.log("The largest of four numbers (10,5,20,30) : ", largestOfFourResult);
