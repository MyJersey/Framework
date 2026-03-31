/**
 * shop.js
 * Handles product shop page functionality: filtering, rendering, and cart operations
 * Manages product filters and handles product/cart interactions
 */

/**
 * Sets up filters, reads URL parameters, renders products, and attaches event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const skinFilters = document.querySelectorAll('.skin-filter');
    const collectionFilters = document.querySelectorAll('.collection-filter');

    UIManager.refreshNavbar();

    /**
     * Filters products based on current filter control values
     * Returns products matching all selected criteria (category AND skin type AND collection)
     * @returns {Array} array of product objects that match all active filters
     */
    function getFilteredProducts() {
        // Get selected category from dropdown, default to 'all' if element doesn't exist
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all'

        // Collect all checked skin-type checkboxes
        const activeSkinFilters = Array.from(skinFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        // Collect all checked collection checkboxes
        const activeCollectionFilters = Array.from(collectionFilters || [])
            .filter(input => input.checked)
            .map(input => input.value);

        return products.filter(product => {
            // Match category: show all when "all" is selected, otherwise check exact match
            const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;

            // Match skin type: show all products when no filter is checked,
            // always show products labelled "All types"
            const matchSkin = activeSkinFilters.length === 0 ||
                              activeSkinFilters.includes(product.skinType) ||
                              product.skinType === "All types";

            // Match collection: show all when nothing checked, or if product matches selected collections
            const isBestsellerChecked = activeCollectionFilters.includes('bestsellers');
            const isNewChecked = activeCollectionFilters.includes('new');
            const matchCollection = activeCollectionFilters.length === 0 ||
                                    (isBestsellerChecked && product.isBestseller) ||
                                    (isNewChecked && product.isNew);

            return matchCategory && matchSkin && matchCollection;
        });
    }

    /**
     * Gets filtered products and renders them
     */
    function onFilterChange() {
        const filtered = getFilteredProducts();
        UIManager.renderProductGrid(filtered);
    }

    // Attach change listeners to all filter controls
    if (categoryFilter) categoryFilter.addEventListener('change', onFilterChange);
    skinFilters.forEach(filter => filter.addEventListener('change', onFilterChange));
    collectionFilters.forEach(filter => filter.addEventListener('change', onFilterChange));

    // Pre-apply a filter when the page is opened with a "?filter=..." URL parameter
    // Example: clicking "Shop All Bestsellers" from the home page passes ?filter=bestsellers
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam === 'bestsellers') {
        const bestsellerCheckbox = document.getElementById('colBestsellers');
        if (bestsellerCheckbox) {
            bestsellerCheckbox.checked = true;
        }
    } else if (filterParam === 'new') {
        const newCheckbox = document.getElementById('colNewArrivals');
        if (newCheckbox) {
            newCheckbox.checked = true;
        }
    }

    // Recall the render on filters
    onFilterChange();
});

/**
 * Saves the selected product's ID to storage
 * Navigates to the product detail page
 * @param {number} id product ID
 */
function goToDetail(id) {
    StorageService.setSelectedProductId(id);
    window.location.href = 'product-detail.html';
}

/**
 * Adds a product to the cart with the specified quantity
 * @param {Event|null} event
 * @param {number} id
 * @param {number} quantity (default: 1)
 */
function addToCart(event, id, quantity = 1) {
    if (event) {
        event.stopPropagation();
    }

    if (CartService.addItem(id, quantity)) {
        UIManager.refreshNavbar();
        alert("Product added to cart!");
    }
}

/**
 * Removes an item from the cart by index
 * Updates the cart display and navbar badge
 * @param {number} index of the item
 */
function removeFromCart(index) {
    CartService.removeItem(index);
    UIManager.renderCart(CartService.getCart());
    UIManager.refreshNavbar();
}

/**
 * Updates the quantity of a cart item by a given change amount
 * If quantity drops below 1, the item is removed from the cart
 * Updates the cart display and navbar badge
 * @param {number} index of the item in the cart
 * @param {number} change
 */
function updateQuantity(index, change) {
    const cart = CartService.getCart();
    const currentQuantity = (cart[index].quantity || 1) + change;

    if (currentQuantity < 1) {
        removeFromCart(index);
    } else {
        CartService.updateQuantity(index, currentQuantity);
        UIManager.renderCart(CartService.getCart());
        UIManager.refreshNavbar();
    }
}

/**
 * Handles user logout
 */
function handleLogout() {
    if (confirm("Do you want to log out?")) {
        AuthService.logout();
        UIManager.refreshNavbar();
        window.location.href = 'index.html';
    }
}