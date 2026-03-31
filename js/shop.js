document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const skinFilters = document.querySelectorAll('.skin-filter');
    const collectionFilters = document.querySelectorAll('.collection-filter');

    updateCartBadge();

    // select collection filter
    applyInitialUrlFilters();

    loadCategories().then(() => {
        fetchProductsWithFilters();
    });


    if (categoryFilter) {
        categoryFilter.addEventListener('change', fetchProductsWithFilters);
    }

    if (skinFilters.length > 0) {
        skinFilters.forEach(filter => {
            filter.addEventListener('change', fetchProductsWithFilters);
        });
    }

    if (collectionFilters.length > 0) {
        collectionFilters.forEach(filter => {
            filter.addEventListener('change', fetchProductsWithFilters);
        });
    }

    function applyInitialUrlFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');

        if (filterParam === 'bestsellers') {
            const bestsellerCheckbox = document.getElementById('colBestsellers');
            if (bestsellerCheckbox) bestsellerCheckbox.checked = true;
        } else if (filterParam === 'new') {
            const newCheckbox = document.getElementById('colNewArrivals');
            if (newCheckbox) newCheckbox.checked = true;
        }
    }

    function loadCategories() {
        if (!categoryFilter) return Promise.resolve();

        return fetch('/categories')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load categories');
                }
                return res.json();
            })
            .then(categories => {
                categoryFilter.innerHTML = '<option value="all">All Products</option>';

                categories.forEach(cat => {
                    categoryFilter.innerHTML += `
                        <option value="${cat}">${cat}</option>
                    `;
                });
            })
            .catch(err => {
                console.error('Failed to load categories:', err);
            });
    }

    function displayProducts(products) {
        if (!productGrid) return;

        productGrid.innerHTML = '';

        if (!products || products.length === 0) {
            productGrid.innerHTML = `
                <div class="col-12 text-center my-5">
                    <h5>No products found.</h5>
                </div>
            `;
            return;
        }

        products.forEach(product => {
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
                </div>
            `;
        });
    }

    function fetchProductsWithFilters() {
        const params = new URLSearchParams();

        // category
        if (categoryFilter) {
            const selectedCategory = categoryFilter.value;
            if (selectedCategory && selectedCategory !== 'all') {
                params.append('category', selectedCategory);
            }
        }

        // skin
        const selectedSkins = Array.from(skinFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        if (selectedSkins.length > 0) {
            params.append('skin', selectedSkins.join(','));
        }

        // collection
        const selectedCollections = Array.from(collectionFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        if (selectedCollections.length > 0) {
            params.append('collection', selectedCollections.join(','));
        }

        const queryString = params.toString();
        const url = queryString ? `/products?${queryString}` : '/products';

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to load products');
                }
                return res.json();
            })
            .then(data => {
                displayProducts(data);
            })
            .catch(err => {
                console.error('Failed to load products:', err);
                displayProducts([]);
            });
    }
});

function goToDetail(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'product-detail.html';
}

function addToCart(event, productId) {
    event.stopPropagation();

    const user = localStorage.getItem('userName') || 'guest';

    fetch(`/cart/${user}/${productId}`, {
        method: 'POST'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to add product to cart');
            }
            return res.text();
        })
        .then(() => {
            updateCartBadge();
            alert('Product added to cart!');
        })
        .catch(err => {
            console.error('Add to cart failed:', err);
            alert('Failed to add product to cart.');
        });
}

function updateCartBadge() {
    const user = localStorage.getItem('userName') || 'guest';

    fetch(`/cart/${user}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to load cart');
            }
            return res.json();
        })
        .then(cart => {
            const badge = document.getElementById('cart-badge');
            if (!badge) return;

            const totalItems = cart.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0);

            badge.innerText = totalItems;
        })
        .catch(err => {
            console.error('Failed to load cart:', err);
        });

    const userName = localStorage.getItem('userName');
    const loginIcon = document.getElementById('login-icon');
    const greeting = document.getElementById('user-greeting');

    if (userName && greeting && loginIcon) {
        loginIcon.style.setProperty('display', 'none', 'important');
        greeting.style.display = 'block';

        greeting.innerHTML = `
            <span class="text-success fw-bold" style="cursor: pointer;" onclick="logoutUser()">
                Hi, ${userName}
            </span>
        `;
    } else if (loginIcon && greeting) {
        loginIcon.style.display = 'block';
        greeting.style.display = 'none';
        greeting.innerHTML = '';
    }
}

function logoutUser() {
    if (confirm('Do you want to log out?')) {
        localStorage.removeItem('userName');
        window.location.reload();
    }
}