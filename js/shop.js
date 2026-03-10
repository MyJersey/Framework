document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const skinFilters = document.querySelectorAll('.skin-filter'); 
    const collectionFilters = document.querySelectorAll('.collection-filter'); 
    updateCartBadge();

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

    function filterProducts() {
        if (!categoryFilter) return;
        const selectedCategory = categoryFilter.value;
        const activeSkinFilters = Array.from(skinFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        const activeCollectionFilters = Array.from(collectionFilters || [])
            .filter(input => input.checked)
            .map(input => input.value);

        const filtered = products.filter(product => {
            const matchCategory = selectedCategory === 'all' || selectedCategory === 'All' || product.category === selectedCategory;

            const matchSkin = activeSkinFilters.length === 0 ||
                activeSkinFilters.includes(product.skinType) ||
                product.skinType === "All types";

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

        filterProducts();
    }
    updateCartBadge();
});

function goToDetail(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'product-detail.html';
}

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



function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        badge.innerText = totalItems;
    }

    const user = localStorage.getItem('userName');
    const loginIcon = document.getElementById('login-icon');
    const greeting = document.getElementById('user-greeting');

    if (user && greeting && loginIcon) {
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

function logoutUser() {
    if (confirm("Do you want to log out?")) {
        localStorage.removeItem('userName');
        window.location.reload();
    }
}

