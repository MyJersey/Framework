const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));
const PRODUCTS_FILE = './data/products.json';
const CART_FILE = './data/cart.json';

// PRODUCTS API

// get all products
app.get('/products', (req, res) => {

    let data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));

    const { category, skin, collection } = req.query;

    // category filter
    if (category && category !== 'all') {
        data = data.filter(p => p.category === category);
    }

    // skin filter
    if (skin) {
        const skins = skin.split(',');
        data = data.filter(p =>
            skins.includes(p.skinType) || p.skinType === "All types"
        );
    }

    // collection filter
    if (collection) {
        const cols = collection.split(',');

        data = data.filter(p => {
            let match = false;

            if (cols.includes('bestsellers') && p.isBestseller) match = true;
            if (cols.includes('new') && p.isNew) match = true;

            return match;
        });
    }

    res.json(data);
});
// get one product
app.get('/products/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    const product = data.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.json(product);
});

app.get('/categories', (req, res) => {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));
    const categories = [...new Set(data.map(p => p.category))];

    res.json(categories);
});



// BASKET API

// create CART
app.post('/cart/:user', (req, res) => {
    let carts = {};

    if (fs.existsSync(CART_FILE)) {
        carts = JSON.parse(fs.readFileSync(CART_FILE));
    }

    carts[req.params.user] = [];

    fs.writeFileSync(CART_FILE, JSON.stringify(carts, null, 2));

    res.send(`Basket created for ${req.params.user}`);
});

// add products
app.post('/cart/:user/:productId', (req, res) => {
    let carts = {};

    if (fs.existsSync(CART_FILE)) {
        carts = JSON.parse(fs.readFileSync(CART_FILE));
    }

    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (!carts[user]) {
        carts[user] = [];
    }

    const existing = carts[user].find(item => item.productId === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        carts[user].push({
            productId,
            quantity: 1
        });
    }

    fs.writeFileSync(CART_FILE, JSON.stringify(carts, null, 2));

    res.send('Added');
});

app.get('/cart/:user', (req, res) => {
    let carts = {};

    if (fs.existsSync(CART_FILE)) {
        carts = JSON.parse(fs.readFileSync(CART_FILE));
    }

    res.json(carts[req.params.user] || []);
});

app.delete('/cart/:user/:productId', (req, res) => {

    let carts = {};

    if (fs.existsSync(CART_FILE)) {
        carts = JSON.parse(fs.readFileSync(CART_FILE));
    }

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
        item.quantity -= 1;
    } else {
        carts[user] = carts[user].filter(p => p.productId !== productId);
    }

    fs.writeFileSync(CART_FILE, JSON.stringify(carts, null, 2));

    res.send('Updated');
});

app.delete('/cart/:user/:productId/all', (req, res) => {

    let carts = {};

    if (fs.existsSync(CART_FILE)) {
        carts = JSON.parse(fs.readFileSync(CART_FILE));
    }

    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (carts[user]) {
        carts[user] = carts[user].filter(p => p.productId !== productId);
    }

    fs.writeFileSync(CART_FILE, JSON.stringify(carts, null, 2));

    res.send('Removed all');
});


// START SERVER

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});