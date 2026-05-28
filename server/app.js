const express = require('express');

// Import the routers for each resource
const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const cartRouter = require('./cart/cart.router');

const app = express();
const PORT = 3000;

// Parse incoming JSON request bodies so that req.body is available in route handlers
app.use(express.json());

// Mount each router under its own base path.
// All routes defined inside each router are relative to these prefixes.
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/cart', cartRouter);

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
