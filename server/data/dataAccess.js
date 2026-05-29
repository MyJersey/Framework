const fs = require('fs');
const path = require('path');

const DATA_FILE  = path.join(__dirname, 'data.json');
const CARTS_FILE = path.join(__dirname, 'carts.json');

// Reads the whole file from disk every time it's called.
// This is intentional: if one request writes a cart update,
// the next request needs to see that change, not a cached copy.
function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Reads cart state from the separate carts.json file.
// Returns an empty object if the file doesn't exist yet
// (e.g. first time the server runs on a new machine).
function readCarts() {
    if (!fs.existsSync(CARTS_FILE)) return {};
    try {
        return JSON.parse(fs.readFileSync(CARTS_FILE));
    } catch {
        return {};
    }
}

// Writes cart state back to carts.json.
// null, 2 makes the JSON human-readable (pretty-printed).
function writeCarts(carts) {
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
}

module.exports = { readData, readCarts, writeCarts };
