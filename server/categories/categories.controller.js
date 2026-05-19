const { readData } = require('../data/dataAccess');

function getCategories(_req, res) {
    const db = readData();
    const categories = [...new Set(db.products.map(p => p.category))];
    res.json(categories);
}

function getProductsByCategory(req, res) {
    const db = readData();
    const category = req.params.category;
    const { skin, collection } = req.query;

    let products = category === 'all'
        ? db.products
        : db.products.filter(p => p.category === category);

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

module.exports = { getCategories, getProductsByCategory };
