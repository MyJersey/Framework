const { readCarts, writeCarts } = require('../data/dataAccess');

function createCart(req, res) {
    const carts = readCarts();
    carts[req.params.user] = [];
    writeCarts(carts);
    res.send(`Basket created for ${req.params.user}`);
}

function addToCart(req, res) {
    const carts = readCarts();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    // auto-create the cart if this user has never had one
    if (!carts[user]) {
        carts[user] = [];
    }

    const existing = carts[user].find(item => item.productId === productId);

    if (existing) {
        // product already in cart: increment quantity
        existing.quantity += 1;
    } else {
        // first time this product is added
        carts[user].push({ productId, quantity: 1 });
    }

    writeCarts(carts);
    res.send('Added');
}

function getCart(req, res) {
    const carts = readCarts();
    // return empty array if the cart doesn't exist yet
    res.json(carts[req.params.user] || []);
}

function removeOneFromCart(req, res) {
    const carts = readCarts();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (!carts[user]) {
        return res.send('Cart not found');
    }

    const item = carts[user].find(p => p.productId === productId);

    if (!item) {
        return res.send('Product not in cart');
    }

    if (item.quantity > 1) {
        // still has more than one unit: just decrement
        item.quantity -= 1;
    } else {
        // last unit: remove the entry entirely
        carts[user] = carts[user].filter(p => p.productId !== productId);
    }

    writeCarts(carts);
    res.send('Updated');
}

function removeAllFromCart(req, res) {
    const carts = readCarts();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (carts[user]) {
        carts[user] = carts[user].filter(p => p.productId !== productId);
    }

    writeCarts(carts);
    res.send('Removed all');
}

module.exports = {
    createCart,
    addToCart,
    getCart,
    removeOneFromCart,
    removeAllFromCart,
};
