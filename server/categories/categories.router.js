const express = require('express');
const { getCategories, getProductsByCategory } = require('./categories.controller');

const router = express.Router();

router.get('/', getCategories);
// This is the explicit sub-resource route: GET /categories/:category/products
// It replaced the old ?category= query parameter approach.
router.get('/:category/products', getProductsByCategory);

module.exports = router;
