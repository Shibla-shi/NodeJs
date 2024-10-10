// function findLargest(a, b, c) {
//     if (a >= b && a >= c) {
//       return a;
//     } else if (b >= a && b >= c) {
//       return b;
//     } else {
//       return c;
//     }
//   }
  
//   console.log("Largest of 5, 10, and 15 is:", findLargest(5, 10, 15));
  
  

function largestOfThree(a, b, c) {
  return Math.max(a, b, c);
}

module.exports = largestOfThree;
