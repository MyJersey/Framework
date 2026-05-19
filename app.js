const express = require('express');

const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const cartRouter = require('./cart/cart.router');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
