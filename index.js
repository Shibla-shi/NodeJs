const fs = require('fs');
const http = require('http');
const nodemailer = require('nodemailer');
const EventEmitter = require('events');
const cron = require('node-cron');
require('dotenv').config();

// Create directories if they don't exist
const tempDir = './temp';
const monitoredDir = './monitored';
const dataFile = './data.txt';

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

if (!fs.existsSync(monitoredDir)) {
    fs.mkdirSync(monitoredDir);
}

if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, ''); // Create empty data.txt if it doesn't exist
}

// Set up the EventEmitter
const eventEmitter = new EventEmitter();

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Function to send email
const sendEmail = (message) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: 'recipient@example.com', // Change to your recipient's email
        subject: 'API Call Notification',
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
};

// Event listener for custom message
eventEmitter.on('customMessage', (message) => {
    console.log('Message received:', message);
    sendEmail(message); // Send an email when the message is received
});

// Event listener for logging API calls
eventEmitter.on('logApiCall', (method, url) => {
    const logMessage = `${new Date().toISOString()} - ${method} ${url}\n`;
    fs.appendFile(dataFile, logMessage, (err) => {
        if (err) throw err;
        console.log('API call logged:', logMessage.trim());
    });
});

// Event listener for file creation
eventEmitter.on('createFile', (fileName, content) => {
    fs.writeFileSync(`${tempDir}/${fileName}`, content, (err) => {
        if (err) throw err;
        console.log(`File created: ${fileName}`);
    });
});

// Event listener for appending to a file
eventEmitter.on('appendToFile', (content) => {
    fs.appendFile(dataFile, content, (err) => {
        if (err) throw err;
        console.log('Content appended to file:', content);
    });
});

// Event listener for checking a keyword in the file
eventEmitter.on('checkKeyword', (keyword) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) throw err;
        if (data.includes(keyword)) {
            console.log(`Keyword "${keyword}" found in the file.`);
        } else {
            console.log(`Keyword "${keyword}" not found in the file.`);
        }
    });
});

// Event listener for deleting a file
eventEmitter.on('deleteFile', (fileName) => {
    const filePath = `${tempDir}/${fileName}`;
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log(`File deleted: ${fileName}`);
        });
    } else {
        console.log(`File not found: ${fileName}`);
    }
});

// HTTP Server setup with different routes
const server = http.createServer((req, res) => {
    eventEmitter.emit('customMessage', `Received ${req.method} request for ${req.url}`);
    eventEmitter.emit('logApiCall', req.method, req.url);  // Log every request

    if (req.url === '/special') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Special endpoint hit!');
        console.log('Endpoint called: /special');
    } else if (req.url === '/createFile') {
        const fileName = 'testFile.txt';
        eventEmitter.emit('createFile', fileName, 'This is a test file content');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File created: ${fileName}`);
    } else if (req.url === '/saveContent') {
        const contentToSave = 'Some important content to append';
        eventEmitter.emit('appendToFile', contentToSave);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Content saved to file');
    } else if (req.url === '/checkKeyword') {
        const keyword = 'important';
        eventEmitter.emit('checkKeyword', keyword);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Checking for keyword: ${keyword}`);
    } else if (req.url === '/deleteFile') {
        const fileNameToDelete = 'testFile.txt';
        eventEmitter.emit('deleteFile', fileNameToDelete);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File deleted: ${fileNameToDelete}`);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Request received');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Cron job to send a message every minute
cron.schedule('* * * * *', () => {
    console.log('Cron job running every minute!');
});

// Cron job to check for new files in the monitored directory every minute
cron.schedule('* * * * *', () => {
    fs.readdir(monitoredDir, (err, files) => {
        if (err) {
            return console.log('Error reading monitored directory:', err);
        }
        files.forEach(file => {
            console.log(`Found file: ${file}`);
        });
    });
});

// Watch the tempDir for file size exceeding the limit
fs.watch(tempDir, (eventType, filename) => {
    if (filename) {
        const filePath = `${tempDir}/${filename}`;
        fs.stat(filePath, (err, stats) => {
            if (err) return console.error(err);
            if (stats.size > 1000000) { // Example size limit (1MB)
                console.log(`File ${filename} exceeds size limit`);
                eventEmitter.emit('customMessage', `File ${filename} exceeds size limit`);
            }
        });
    }
});
