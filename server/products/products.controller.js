const { readData } = require('../data/dataAccess');

function getAllProducts(req, res) {
    const db = readData();
    let products = db.products;

    const { skin, collection } = req.query;

    // ?skin= accepts a comma-separated list, e.g. ?skin=Dry,Sensitive
    if (skin) {
        const skins = skin.split(',');
        // "All types" products are returned regardless of which skin is filtered
        products = products.filter(p =>
            skins.includes(p.skinType) || p.skinType === 'All types'
        );
    }

    // ?collection= accepts "bestsellers", "new", or both comma-separated.
    // Multiple collections are OR-ed: a product matches if it fits any of them.
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

function getProductById(req, res) {
    const db = readData();
    // == instead of === because req.params.id is a string and p.id is a number
    const product = db.products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
}

module.exports = { getAllProducts, getProductById };
