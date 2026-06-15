const express = require('express');
const { getCategories, getProductsByCategory } = require('./categories.controller');

// this router handles all routes related to categories
const router = express.Router();

// GET /categories
// returns the list of all unique category names available in the product catalogue
router.get('/', getCategories);

// GET /categories/:category/products
// Returns all products belonging to the given category
// Use "all" as the category value to retrieve products from every category
// Supports optional query parameters for filtering
router.get('/:category/products', getProductsByCategory);

module.exports = router;
