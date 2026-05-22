const express = require('express');
const { getAllProducts, getProductById } = require('./products.controller');

// A Router is a mini Express app that only handles routes.
// It gets mounted at /products in app.js, so '/' here means GET /products
// and '/:id' means GET /products/:id.
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
