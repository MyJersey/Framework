const { readData } = require('../data/dataAccess');

// Returns all products, optionally filtered by skin type and/or collection
// Query params:
//   skin       - comma-separated skin types (e.g. "Dry,Oily")
//   collection - comma-separated collection names (e.g. "bestsellers,new")
function getAllProducts(req, res) {
    const db = readData();
    let products = db.products;  // JSON access

    const { skin, collection } = req.query;

    // filter by skin type
    // products tagged "All types" always pass through
    if (skin) {
        const skins = skin.split(',');
        products = products.filter(p =>
            skins.includes(p.skinType) || p.skinType === 'All types'
        );
    }

    // filter by collection
    if (collection) {
        const cols = collection.split(',');
        products = products.filter(p => {
            let match = false;
            if (cols.includes('bestsellers') && p.isBestseller) match = true;
            if (cols.includes('new') && p.isNew) match = true;
            return match;
        });
    }

    res.json(products);
}

// returns a single product by its numeric ID
// responds with 404 if no product with that ID exists
function getProductById(req, res) {
    const db = readData();

    // req.params.id is a string; parseInt ensures a strict decimal numeric comparison
    const product = db.products.find(p => p.id === parseInt(req.params.id, 10));

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
}

module.exports = { getAllProducts, getProductById };
