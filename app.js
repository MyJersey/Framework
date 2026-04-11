const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));
const DATA_FILE = './data/data.json';

function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// PRODUCTS API

// get all products
app.get('/products', (req, res) => {
    const db = readData();
    let products = db.products;

    const { category, skin, collection } = req.query;

    // category filter
    if (category && category !== 'all') {
        products = products.filter(p => p.category === category);
    }

    // skin filter
    if (skin) {
        const skins = skin.split(',');
        products = products.filter(p =>
            skins.includes(p.skinType) || p.skinType === "All types"
        );
    }

    // collection filter
    if (collection) {
        const cols = collection.split(',');
        products = products.filter(p => {
            let match = false;
            if (cols.includes('bestsellers') && p.isBestseller) match = true;
            if (cols.includes('new') && p.isNew) match = true;
            return match;
        });
    }

    res.json(products);
});

// get one product
app.get('/products/:id', (req, res) => {
    const db = readData();
    const product = db.products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

// get all categories
app.get('/categories', (_req, res) => {
    const db = readData();
    const categories = [...new Set(db.products.map(p => p.category))];
    res.json(categories);
});

// Get products for a specific category
app.get('/categories/:category/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE));

    const category = req.params.category;

    // allow /categories/all/products to mean "all"
    if (category === 'all') {
        return res.json(data);
    }

    // filter by category
    const filtered = data.filter(p => p.category === category);

    res.json(filtered);
});


// BASKET API

// create CART
app.post('/cart/:user', (req, res) => {
    const db = readData();
    db.carts[req.params.user] = [];
    writeData(db);
    res.send(`Basket created for ${req.params.user}`);
});

// add products
app.post('/cart/:user/:productId', (req, res) => {
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
});

// get cart
app.get('/cart/:user', (req, res) => {
    const db = readData();
    res.json(db.carts[req.params.user] || []);
});

// remove one unit of a product
app.delete('/cart/:user/:productId', (req, res) => {
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
});

// remove all units of a product
app.delete('/cart/:user/:productId/all', (req, res) => {
    const db = readData();
    const user = req.params.user;
    const productId = parseInt(req.params.productId);

    if (db.carts[user]) {
        db.carts[user] = db.carts[user].filter(p => p.productId !== productId);
    }

    writeData(db);
    res.send('Removed all');
});


// START SERVER

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
