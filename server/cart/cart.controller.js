const { readData, writeData } = require('../data/dataAccess');

function createCart(req, res) {
    const db = readData();
    // prevent overwriting an existing cart that already has products
    if (db.carts[req.params.user]) {
        return res.status(400).send('Cart already exists for this user');
    }
    db.carts[req.params.user] = [];
    writeData(db);
    res.send(`Basket created for ${req.params.user}`);
}

function addToCart(req, res) {
    const db = readData();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    // reject if productId is not a valid number
    if (isNaN(productId)) {
        return res.status(400).send('Invalid product ID');
    }

    // reject if the product does not exist in the catalogue
    const product = db.products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).send('Product not found');
    }

    // auto-create the cart if this user has never had one
    if (!db.carts[user]) {
        db.carts[user] = [];
    }

    const existing = db.carts[user].find(item => item.productId === productId);

    if (existing) {
        // product already in cart: increment quantity
        existing.quantity += 1;
    } else {
        // first time this product is added
        db.carts[user].push({ productId, quantity: 1 });
    }

    writeData(db);
    res.send('Added');
}

function getCart(req, res) {
    const db = readData();
    // return empty array if the cart doesn't exist yet
    res.json(db.carts[req.params.user] || []);
}

function removeOneFromCart(req, res) {
    const db = readData();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    // reject if productId is not a valid number
    if (isNaN(productId)) {
        return res.status(400).send('Invalid product ID');
    }

    if (!db.carts[user]) {
        // use 404 instead of generic 200 so the client knows the resource was missing
        return res.status(404).send('Cart not found');
    }

    const item = db.carts[user].find(p => p.productId === productId);

    if (!item) {
        // use 404 instead of generic 200 so the client knows the resource was missing
        return res.status(404).send('Product not in cart');
    }

    if (item.quantity > 1) {
        // still has more than one unit: just decrement
        item.quantity -= 1;
    } else {
        // last unit: remove the entry entirely
        db.carts[user] = db.carts[user].filter(p => p.productId !== productId);
    }

    writeData(db);
    res.send('Updated');
}

function removeAllFromCart(req, res) {
    const db = readData();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    // reject if productId is not a valid number
    if (isNaN(productId)) {
        return res.status(400).send('Invalid product ID');
    }

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
