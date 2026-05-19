const { readData, writeData } = require('../data/dataAccess');

function createCart(req, res) {
    const db = readData();
    db.carts[req.params.user] = [];
    writeData(db);
    res.send(`Basket created for ${req.params.user}`);
}

function addToCart(req, res) {
    const db = readData();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (!db.carts[user]) {
        db.carts[user] = [];
    }

    const existing = db.carts[user].find(item => item.productId === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        db.carts[user].push({ productId, quantity: 1 });
    }

    writeData(db);
    res.send('Added');
}

function getCart(req, res) {
    const db = readData();
    res.json(db.carts[req.params.user] || []);
}

function removeOneFromCart(req, res) {
    const db = readData();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (!db.carts[user]) {
        return res.send('Cart not found');
    }

    const item = db.carts[user].find(p => p.productId === productId);

    if (!item) {
        return res.send('Product not in cart');
    }

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        db.carts[user] = db.carts[user].filter(p => p.productId !== productId);
    }

    writeData(db);
    res.send('Updated');
}

function removeAllFromCart(req, res) {
    const db = readData();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (db.carts[user]) {
        db.carts[user] = db.carts[user].filter(p => p.productId !== productId);
    }

    writeData(db);
    res.send('Removed all');
}

module.exports = {
    createCart,
    addToCart,
    getCart,
    removeOneFromCart,
    removeAllFromCart,
};
