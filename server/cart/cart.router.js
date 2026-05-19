const express = require('express');
const {
    createCart,
    addToCart,
    getCart,
    removeOneFromCart,
    removeAllFromCart,
} = require('./cart.controller');

const router = express.Router();

router.post('/:user', createCart);
router.post('/:user/:productId', addToCart);
router.get('/:user', getCart);
router.delete('/:user/:productId/all', removeAllFromCart);
router.delete('/:user/:productId', removeOneFromCart);

module.exports = router;
