const { readData } = require('../data/dataAccess');

// _req signals intentionally unused parameter (Express always passes req and res)
function getCategories(_req, res) {
    const db = readData();
    // Set removes duplicates; spread converts it back to an array
    const categories = [...new Set(db.products.map(p => p.category))];
    res.json(categories);
}

function getProductsByCategory(req, res) {
    const db = readData();
    const category = req.params.category;
    const { skin, collection } = req.query;

    // "all" is a special value used by the client when no category is selected
    let products = category === 'all'
        ? db.products
        : db.products.filter(p => p.category === category);

    // same skin and collection filter logic as in products.controller.js
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
