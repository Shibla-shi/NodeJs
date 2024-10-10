function sumOfDigits(number) {
    return number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

module.exports = sumOfDigits;
