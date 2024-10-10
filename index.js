const sumOfDigits = require('./sumOfDigits');

const number = 12345;
console.log(`Sum of digits of ${number} is:`, sumOfDigits(number));



const sumTwoNumbers = require('./sumTwoNumbers');

const num1 = 10;
const num2 = 20;

console.log(`Sum of ${num1} and ${num2} is:`, sumTwoNumbers(num1, num2));


const _ = require('lodash');

const numbers = [1, 2, 3, 4, 5];
const doubled = _.map(numbers, (n) => n * 2);

console.log('[1, 2, 3, 4, 5]');
console.log('Doubled numbers:', doubled);
