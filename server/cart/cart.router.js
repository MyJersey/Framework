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

// /all must be registered before /:productId, otherwise Express would
// interpret the string "all" as a productId value and call the wrong handler.
router.delete('/:user/:productId/all', removeAllFromCart);
router.delete('/:user/:productId', removeOneFromCart);

module.exports = router;
