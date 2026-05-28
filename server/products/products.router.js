const express = require('express');
const { getAllProducts, getProductById } = require('./products.controller');

// This router handles all routes related to products.
// It is mounted at /products in app.js, so all paths here are relative to that prefix.
const router = express.Router();

// GET /products
// Returns all products. Supports optional query parameters for filtering:
//   ?skin=Dry,Oily        filters by skin type
//   ?collection=new,bestsellers   filters by collection
router.get('/', getAllProducts);

// GET /products/:id
// Returns a single product matching the given numeric ID.
// Responds with 404 if no product with that ID is found.
router.get('/:id', getProductById);

module.exports = router;
