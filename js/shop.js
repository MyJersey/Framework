// Initialise the shop page once the DOM is ready: set up filters, read URL params, and render products.
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const skinFilters = document.querySelectorAll('.skin-filter'); 
    const collectionFilters = document.querySelectorAll('.collection-filter'); 
    updateCartBadge();

    // Renders a list of product cards into the product grid.
    // Clears previous content and shows a "no results" message when the list is empty.
    function displayProducts(filteredProducts) {
        productGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<div class="col-12 text-center my-5"><h5>No products found.</h5></div>';
            return;
        }
        filteredProducts.forEach(product => {
            productGrid.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="product-card p-3 shadow-sm h-100" onclick="goToDetail(${product.id})">
                        <div class="product-img-wrapper mb-3">
                            <img src="${product.image}" class="img-fluid" alt="${product.name}">
                            ${product.isNew ? '<span class="badge bg-success position-absolute top-0 start-0 m-3">New</span>' : ''}
                        </div>
                        <h6 class="fw-bold">${product.name}</h6>
                        <p class="small text-muted mb-1">${product.category} | ${product.skinType}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="fw-bold">€ ${product.price.toFixed(2)}</span>
                            <button class="btn btn-sm btn-outline-dark" onclick="addToCart(event, ${product.id})">
                                <i class="bi bi-bag-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
        });
    }

    // Reads the current values of all filter controls and re-renders only the matching products.
    function filterProducts() {
        if (!categoryFilter) return;
        const selectedCategory = categoryFilter.value;

        // Collect all checked skin-type checkboxes.
        const activeSkinFilters = Array.from(skinFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        // Collect all checked collection checkboxes (Bestsellers / New Arrivals).
        const activeCollectionFilters = Array.from(collectionFilters || [])
            .filter(input => input.checked)
            .map(input => input.value);

        const filtered = products.filter(product => {
            // Match category: show all when "all" is selected, otherwise check exact match.
            const matchCategory = selectedCategory === 'all' || selectedCategory === 'All' || product.category === selectedCategory;

            // Match skin type: show all products when no filter is checked,
            // always show products labelled "All types".
            const matchSkin = activeSkinFilters.length === 0 ||
                activeSkinFilters.includes(product.skinType) ||
                product.skinType === "All types";

            // Match collection: show all when nothing is checked, otherwise require
            // at least one matching collection flag.
            let matchCollection = true;
            if (activeCollectionFilters.length > 0) {
                const isBestsellerChecked = activeCollectionFilters.includes('bestsellers');
                const isNewChecked = activeCollectionFilters.includes('new');

                matchCollection = false;
                if (isBestsellerChecked && product.isBestseller) matchCollection = true;
                if (isNewChecked && product.isNew) matchCollection = true;
            }

            return matchCategory && matchSkin && matchCollection;
        });

        displayProducts(filtered);
    }

    // Attach change listeners to all filter controls so the grid updates automatically.
    if (productGrid) {
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterProducts);
        }
        if (skinFilters.length > 0) {
            skinFilters.forEach(filter => {
                filter.addEventListener('change', filterProducts);
            });
        }
        if (collectionFilters && collectionFilters.length > 0) {
            collectionFilters.forEach(filter => {
                filter.addEventListener('change', filterProducts);
            });
        }

        // Pre-apply a filter when the page is opened with a "?filter=..." URL parameter
        // (e.g. clicking "Shop All Bestsellers" from the home page).
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

        // Perform the initial render after all filters have been configured.
        filterProducts();
    }
    updateCartBadge();
});

// Saves the selected product's ID to localStorage and navigates to the detail page.
function goToDetail(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'product-detail.html';
}

// Adds the chosen product to the cart (stored in localStorage).
// Increments quantity if the product is already in the cart; otherwise adds a new entry.
// Stops the click event from bubbling up to the parent card (which would open the detail page).
function addToCart(event, id) {
    event.stopPropagation();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(p => p.id === id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
        const product = products.find(p => p.id === id);
        if (product) {
            product.quantity = 1;
            cart.push(product);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert("Product added to cart!");
}



// Updates the cart badge in the navbar with the total number of items currently in the cart.
// Also shows a personalised greeting when the user is logged in, hiding the login icon.
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        badge.innerText = totalItems;
    }

    // Check if a user name was saved during login.
    const user = localStorage.getItem('userName');
    const loginIcon = document.getElementById('login-icon');
    const greeting = document.getElementById('user-greeting');

    if (user && greeting && loginIcon) {
        // Hide the login icon and show a clickable greeting that triggers logout.
        loginIcon.style.setProperty('display', 'none', 'important'); 
        greeting.style.display = 'block'; 

        greeting.innerHTML = `
            <span class="text-success fw-bold" style="cursor: pointer;" onclick="logoutUser()">
                Hi, ${user}
            </span>`;
    } else if (loginIcon && greeting) {
        loginIcon.style.display = 'block';
        greeting.style.display = 'none';
        greeting.innerHTML = '';
    }
}

// Asks the user to confirm, then clears the stored user name and reloads the page to log out.
function logoutUser() {
    if (confirm("Do you want to log out?")) {
        localStorage.removeItem('userName');
        window.location.reload();
    }
}
