const fs = require('fs');
const path = require('path');

// __dirname points to the directory of this file, so the path works
// regardless of where the process is started from
const DATA_FILE = path.join(__dirname, 'data.json');

// Reads the whole file from disk every time it's called.
// This is intentional: if one request writes a cart update,
// the next request needs to see that change, not a cached copy.
function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Writes the full data object back to disk.
// null, 2 makes the JSON human-readable (pretty-printed).
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
