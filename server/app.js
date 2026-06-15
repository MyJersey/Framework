// import express library
const express = require('express'); 

// import the routers for each resource
const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const cartRouter = require('./cart/cart.router');

const app = express();  // configure server app
const PORT = 3000;

// global middleware
// parse incoming JSON request bodies so that req.body is available in route handlers
app.use(express.json());

// mount each router under its own base path
// all routes defined inside each router are relative to these URL prefixes
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/cart', cartRouter);

// start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
