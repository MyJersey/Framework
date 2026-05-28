const express = require('express');
const { getCategories, getProductsByCategory } = require('./categories.controller');

// This router handles all routes related to categories.
// It is mounted at /categories in app.js, so all paths here are relative to that prefix.
const router = express.Router();

// GET /categories
// Returns the list of all unique category names available in the product catalogue.
router.get('/', getCategories);

// GET /categories/:category/products
// Returns all products belonging to the given category.
// Use "all" as the category value to retrieve products from every category.
// Supports optional query parameters for filtering:
//   ?skin=Dry,Oily                 filters by skin type
//   ?collection=new,bestsellers    filters by collection
router.get('/:category/products', getProductsByCategory);

module.exports = router;
