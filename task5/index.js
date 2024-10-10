const fs = require('fs');

// Task 1: Create a new file and write some sample content to it
fs.writeFile('sample.txt', 'This is a sample content.', (err) => {
    if (err) throw err;
    console.log('Task 1: File created and content written!');
});

// Task 2: Write using a callback function
function writeFileCallback(content, callback) {
    fs.writeFile('sample2.txt', content, callback);
}

writeFileCallback('Content written using callback.', (err) => {
    if (err) throw err;
    console.log('Task 2: File written with callback!');
});

// Task 3: Error handling when writing to a file
function writeWithErrorHandling(filename, content) {
    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error('Task 3: Error writing to file:', err);
            return;
        }
        console.log('Task 3: File written successfully!');
    });
}

writeWithErrorHandling('sample3.txt', 'Some content with error handling.');

// Task 4: Read content from a file
fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Task 4: File content:', data);
});

// Task 5: Delete a file
function deleteFile(filename) {
    fs.unlink(filename, (err) => {
        if (err) throw err;
        console.log(`Task 5: ${filename} deleted!`);
    });
}

deleteFile('sample3.txt');

// Task 6: Rename a file
function renameFile(oldName, newName) {
    fs.rename(oldName, newName, (err) => {
        if (err) throw err;
        console.log(`Task 6: ${oldName} renamed to ${newName}`);
    });
}

renameFile('sample2.txt', 'renamed_sample.txt');

// Task 7: Append content to a file and read the updated content
function appendAndRead(filename, newContent) {
    fs.appendFile(filename, newContent, (err) => {
        if (err) throw err;
        console.log('Task 7: Content appended!');

        // Read updated content
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) throw err;
            console.log('Task 7: Updated file content:', data);
        });
    });
}

appendAndRead('sample.txt', '\nNew appended content.');

// Task 8: Check if a file exists
function checkFileExists(filename) {
    fs.access(filename, fs.constants.F_OK, (err) => {
        console.log(`Task 8: ${filename} ${err ? 'does not exist' : 'exists'}`);
    });
}

checkFileExists('sample.txt');

// Task 9: List all files in a directory
function listFilesInDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) throw err;
        console.log('Task 9: Files in directory:', files);
    });
}

listFilesInDirectory('./');

// Task 10: Copy content to a new file with validation
function copyFile(source, destination) {
    fs.copyFile(source, destination, (err) => {
        if (err) throw err;
        console.log(`Task 10: Copied from ${source} to ${destination}`);

        // Check if the file was successfully copied
        fs.access(destination, fs.constants.F_OK, (err) => {
            if (!err) {
                console.log(`Task 10: File ${destination} successfully created!`);
            }
        });
    });
}

copyFile('sample.txt', 'copy_of_sample.txt');

// Task 11: Move a file to a new location with error handling
function moveFile(oldPath, newPath) {
    fs.access(oldPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Task 11: ${oldPath} does not exist, cannot move!`);
            return;
        }
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            console.log(`Task 11: Moved file to ${newPath}`);
        });
    });
}

moveFile('copy_of_sample.txt', './moved_sample.txt');

// Task 12: Create and remove directories

// Function to create a directory, if it does not already exist
function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, (err) => {
            if (err) throw err;
            console.log(`Task 12: Directory ${dirPath} created!`);
        });
    } else {
        console.log(`Task 12: Directory ${dirPath} already exists!`);
    }
}

// Function to remove a directory (recursively, if it contains files)
function removeDirectory(dirPath) {
    fs.rm(dirPath, { recursive: true, force: true }, (err) => {
        if (err) throw err;
        console.log(`Task 12: Directory ${dirPath} removed!`);
    });
}

createDirectory('./test_dir');

// Remove the directory after a delay to simulate some work done inside it
setTimeout(() => {
    removeDirectory('./test_dir');
}, 3000);  // Wait 3 seconds before removing


// Task 13: Watch for changes in a file
fs.watch('sample.txt', (eventType, filename) => {
    console.log(`Task 13: File ${filename} has been ${eventType}`);
});

// Task 14: Get file statistics
function getFileStats(filename) {
    fs.stat(filename, (err, stats) => {
        if (err) throw err;
        console.log(`Task 14: Stats for ${filename}:`);
        console.log(`File size: ${stats.size} bytes`);
        console.log(`Created on: ${stats.birthtime}`);
        console.log(`Last modified on: ${stats.mtime}`);
    });
}

getFileStats('sample.txt');
