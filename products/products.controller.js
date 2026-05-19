const { readData } = require('../data/dataAccess');

function getAllProducts(req, res) {
    const db = readData();
    let products = db.products;

    const { skin, collection } = req.query;

    if (skin) {
        const skins = skin.split(',');
        products = products.filter(p =>
            skins.includes(p.skinType) || p.skinType === 'All types'
        );
    }

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
    const product = db.products.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
}

module.exports = { getAllProducts, getProductById };
