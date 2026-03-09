document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const skinFilters = document.querySelectorAll('.skin-filter'); // Selects all checkboxes
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
        const selectedCategory = categoryFilter.value;
        const activeSkinFilters = Array.from(skinFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        const filtered = products.filter(product => {
            const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
            
            // Logic: If no checkboxes are selected, show all. 
            // Otherwise, show if product matches selected skin type OR is suitable for "All types"
            const matchSkin = activeSkinFilters.length === 0 || 
                              activeSkinFilters.includes(product.skinType) || 
                              product.skinType === "All types";
            
            return matchCategory && matchSkin;
        });

        displayProducts(filtered);
    }

    // Event listeners
    categoryFilter.addEventListener('change', filterProducts);
    skinFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    // Initialization
    displayProducts(products);
    updateCartBadge();
});

function goToDetail(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'product-detail.html';
}

function addToCart(event, id) {
    event.stopPropagation();
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert("Product added to cart!");
}

function updateCartBadge() {
    // 1. Gestione Carrello
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-badge');
    if(badge) badge.innerText = cart.length;

    // 2. Gestione Login (Icona vs Nome)
    const user = localStorage.getItem('userName');
    const loginIcon = document.getElementById('login-icon');
    const greeting = document.getElementById('user-greeting');

    if (user && greeting && loginIcon) {
        // Se l'utente è loggato: nascondi icona, mostra nome
        loginIcon.classList.add('d-none');
        greeting.innerHTML = `<span class="text-success fw-bold">Hi, ${user}</span>`;
        greeting.classList.remove('d-none');
    } else if (loginIcon && greeting) {
        // Se non è loggato: mostra icona, nascondi nome
        loginIcon.classList.remove('d-none');
        greeting.classList.add('d-none');
    }
}