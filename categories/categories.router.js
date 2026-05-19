const express = require('express');
const { getCategories, getProductsByCategory } = require('./categories.controller');

const router = express.Router();

router.get('/', getCategories);
router.get('/:category/products', getProductsByCategory);

module.exports = router;
