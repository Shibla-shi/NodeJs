const http = require('http');
const url = require('url');

// Helper functions
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function factorial(n) {
    if (n < 0) return -1;
    else if (n === 0) return 1;
    else return n * factorial(n - 1);
}

function fibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n);
}

// Create the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const pathname = parsedUrl.pathname;

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Task 1 - Create a simple GET endpoint
    if (pathname === '/get') {
        res.end('Hello, this is your GET request response!');

    // Task 2 - Display HTML content
    } else if (pathname === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to My Server</h1><p>This is a simple HTML page.</p>');

    // Task 3 - Handle multiple URLs
    } else if (pathname === '/home') {
        res.end('Welcome to the Home page!');
    } else if (pathname === '/about') {
        res.end('This is the About page.');

    // Task 4 - Return current time in human-readable format
    } else if (pathname === '/time') {
        const currentTime = new Date().toLocaleString();
        res.end(`Current time is: ${currentTime}`);

    // Task 5 - Return the square of a number
    } else if (pathname === '/square') {
        const number = parseInt(query.number);
        if (!isNaN(number)) {
            res.end(`Square of ${number} is ${number * number}`);
        } else {
            res.end('Please provide a valid number.');
        }

    // Task 6 - Check if a number is prime
    } else if (pathname === '/isprime') {
        const number = parseInt(query.number);
        if (!isNaN(number)) {
            const result = isPrime(number);
            res.end(`Is ${number} a prime number? ${result}`);
        } else {
            res.end('Please provide a valid number.');
        }

    // Task 7 - Return the sum of three numbers
    } else if (pathname === '/sum') {
        const a = parseInt(query.a);
        const b = parseInt(query.b);
        const c = parseInt(query.c);
        if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
            res.end(`Sum of ${a}, ${b}, and ${c} is ${a + b + c}`);
        } else {
            res.end('Please provide three valid numbers.');
        }

    // Task 8 - Return the reverse of a string
    } else if (pathname === '/reverse') {
        const str = query.string;
        if (str) {
            res.end(`Reverse of "${str}" is "${str.split('').reverse().join('')}"`);
        } else {
            res.end('Please provide a string.');
        }

    // Task 9 - Return a personalized greeting
    } else if (pathname === '/greet') {
        const name = query.name;
        if (name) {
            res.end(`Hello, ${name}! Welcome to our website.`);
        } else {
            res.end('Please provide a name.');
        }

    // Task 10 - Calculate factorial of a number
    } else if (pathname === '/factorial') {
        const number = parseInt(query.number);
        if (!isNaN(number) && number >= 0) {
            res.end(`Factorial of ${number} is ${factorial(number)}`);
        } else {
            res.end('Please provide a valid non-negative number.');
        }

    // Task 11 - Return the multiplication of two numbers
    } else if (pathname === '/multiply') {
        const a = parseInt(query.a);
        const b = parseInt(query.b);
        if (!isNaN(a) && !isNaN(b)) {
            res.end(`Multiplication of ${a} and ${b} is ${a * b}`);
        } else {
            res.end('Please provide two valid numbers.');
        }

    // Task 12 - Return Fibonacci sequence up to a given number of terms
    } else if (pathname === '/fibonacci') {
        const n = parseInt(query.terms);
        if (!isNaN(n) && n > 0) {
            res.end(`Fibonacci sequence up to ${n} terms: ${fibonacci(n).join(', ')}`);
        } else {
            res.end('Please provide a valid number of terms.');
        }

    // Task 13 - Return the length of a string
    } else if (pathname === '/length') {
        const str = query.string;
        if (str) {
            res.end(`The length of "${str}" is ${str.length}`);
        } else {
            res.end('Please provide a string.');
        }

    // If no matching route
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
