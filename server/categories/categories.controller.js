const { readData } = require('../data/dataAccess');

// Returns the list of unique category names derived from all products.
// _req is prefixed with underscore to signal that the request object is intentionally unused.
function getCategories(_req, res) {
    const db = readData();
    // Set automatically removes duplicate category names; spread converts it back to an array
    const categories = [...new Set(db.products.map(p => p.category))];
    res.json(categories);
}

// Returns all products belonging to a given category, optionally filtered by skin type and/or collection.
// Route param:
//   category   - a category name, or "all" to return products from every category
// Query params:
//   skin       - comma-separated skin types (e.g. "Dry,Oily")
//   collection - comma-separated collection names (e.g. "bestsellers,new")
function getProductsByCategory(req, res) {
    const db = readData();
    const category = req.params.category;
    const { skin, collection } = req.query;

    // "all" is a special value used by the client when no category filter is active
    let products = category === 'all'
        ? db.products
        : db.products.filter(p => p.category === category);

    // Filter by skin type; products tagged "All types" always pass through
    if (skin) {
        const skins = skin.split(',');
        products = products.filter(p =>
            skins.includes(p.skinType) || p.skinType === 'All types'
        );
    }

    // Filter by collection; a product matches if it belongs to any of the requested collections
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
