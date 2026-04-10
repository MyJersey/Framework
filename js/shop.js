/**
 * shop.js
 * Handles product shop page functionality: filtering, rendering, and cart operations
 * Fetches products from the Node.js backend API and delegates rendering to UIManager
 */

/**
 * Sets up filters, reads URL parameters, fetches products from API, and attaches event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const skinFilters = document.querySelectorAll('.skin-filter');
    const collectionFilters = document.querySelectorAll('.collection-filter');

    // Pre-apply a filter when the page is opened with a "?filter=..." URL parameter
    // Example: clicking "Shop All Bestsellers" from the home page passes ?filter=bestsellers
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    if (filterParam === 'bestsellers') {
        const bestsellerCheckbox = document.getElementById('colBestsellers');
        if (bestsellerCheckbox) bestsellerCheckbox.checked = true;
    } else if (filterParam === 'new') {
        const newCheckbox = document.getElementById('colNewArrivals');
        if (newCheckbox) newCheckbox.checked = true;
    }

    // Load categories from API into the dropdown and then render products
    loadCategories().then(() => fetchAndRenderProducts());

    // Attach change listeners to all filter controls
    if (categoryFilter) categoryFilter.addEventListener('change', fetchAndRenderProducts);
    skinFilters.forEach(filter => filter.addEventListener('change', fetchAndRenderProducts));
    collectionFilters.forEach(filter => filter.addEventListener('change', fetchAndRenderProducts));

    /**
     * Loads product categories from the API and populates the category dropdown
     */
    async function loadCategories() {
        if (!categoryFilter) return;

        try {
            const res = await fetch('/categories');
            if (!res.ok) throw new Error('Failed to load categories');
            const categories = await res.json();
            categoryFilter.innerHTML = '<option value="all">All Products</option>';
            categories.forEach(cat => {
                categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
            });
        } catch (err) {
            console.error('Failed to load categories:', err);
        }
    }

    /**
     * Builds query params from current filter values, fetches products from API,
     * and renders them using UIManager
     */
    async function fetchAndRenderProducts() {
        const params = new URLSearchParams();

        // Category filter
        if (categoryFilter) {
            const selectedCategory = categoryFilter.value;
            if (selectedCategory && selectedCategory !== 'all') {
                params.append('category', selectedCategory);
            }
        }

        // Skin type filters
        const selectedSkins = Array.from(skinFilters)
            .filter(input => input.checked)
            .map(input => input.value);
        if (selectedSkins.length > 0) {
            params.append('skin', selectedSkins.join(','));
        }

        // Collection filters
        const selectedCollections = Array.from(collectionFilters)
            .filter(input => input.checked)
            .map(input => input.value);
        if (selectedCollections.length > 0) {
            params.append('collection', selectedCollections.join(','));
        }

        const queryString = params.toString();
        const url = queryString ? `/products?${queryString}` : '/products';

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to load products');
            const data = await res.json();
            UIManager.renderProductGrid(data);
        } catch (err) {
            console.error('Failed to load products:', err);
            UIManager.renderProductGrid([]);
        }
    }
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
 * Adds a product to the cart via CartService API
 * @param {Event|null} event
 * @param {number} productId
 * @param {number} quantity (default: 1)
 */
async function addToCart(event, productId, quantity = 1) {
    if (event) {
        event.stopPropagation();
    }

    const success = await CartService.addItem(productId, quantity);
    if (success) {
        await UIManager.refreshNavbar();
        alert("Product added to cart!");
    } else {
        alert("Failed to add product to cart.");
    }
}

/**
 * Changes the quantity of a cart item by +1 or -1 via CartService API
 * Re-renders the cart and refreshes the navbar badge
 * @param {number} productId
 * @param {number} change +1 or -1
 */
async function changeQuantity(productId, change) {
    await CartService.changeQuantity(productId, change);
    await UIManager.renderCart();
    await UIManager.refreshNavbar();
}

/**
 * Removes all units of a product from the cart via CartService API
 * Re-renders the cart and refreshes the navbar badge
 * @param {number} productId
 */
async function removeFromCart(productId) {
    await CartService.removeItem(productId);
    await UIManager.renderCart();
    await UIManager.refreshNavbar();
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