/**
 * UIManager.js
 * Handles all UI rendering and updates
 * Centralizes all DOM manipulation
 */

class UIManager {

    /**
     * Updates the cart badge count in the navbar
     */
    static updateCartBadge() {
        const badge = document.getElementById('cart-badge')
        if (badge) {
            badge.innerText = CartService.getItemCount()
        }
    }

    /**
     * Updates the user greeting in the navbar
     * Shows greeting if user is logged in, shows login icon otherwise
     */
    static updateUserGreeting() {
        const loginIcon = document.getElementById('login-icon')
        const greeting = document.getElementById('user-greeting')

        if (!loginIcon || !greeting) return

        const user = AuthService.getCurrentUser()

        if (user) {
            // User is logged in -> show greeting
            loginIcon.style.display = 'none'
            greeting.style.display = 'block'
            greeting.innerHTML = `
                <span class="text-success fw-bold" style="cursor: pointer;" onclick="handleLogout()">
                    Hi, ${user}
                </span>`
        } else {
            // User is not logged in -> show login icon
            loginIcon.style.display = 'block'
            greeting.style.display = 'none'
            greeting.innerHTML = ''
        }
    }

    /**
     * Refreshes the entire navbar
     */
    static refreshNavbar() {
        this.updateCartBadge()
        this.updateUserGreeting()
    }

    /**
     * Renders the product grid with the given products
     * @param {Array} productList array of products to display
     */
    static renderProductGrid(productList) {
        const grid = document.getElementById('productGrid')
        if (!grid) return

        grid.innerHTML = ''

        if (!productList || productList.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center my-5"><h5>No products found.</h5></div>'
            return
        }

        productList.forEach(product => {
            grid.innerHTML += `
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
                </div>`
        })
    }

    /**
     * Renders the shopping cart table with all items
     * @param {Array} cartItems array of items currently in the cart
     */
    static renderCart(cartItems) {
        const container = document.getElementById('cart-items-container')
        const totalDisplay = document.getElementById('cart-total')
        const finalTotalDisplay = document.getElementById('final-total')

        if (!container) return

        container.innerHTML = ''

        if (!cartItems || cartItems.length === 0) {
            container.innerHTML = '<tr><td colspan="4" class="text-center py-5">Your cart is empty. <a href="shop.html">Back to shop</a></td></tr>'
            if (totalDisplay) totalDisplay.innerText = '€ 0.00'
            if (finalTotalDisplay) finalTotalDisplay.innerText = '€ 0.00'
            return
        }

        let total = 0
        cartItems.forEach((product, index) => {
            const quantity = product.quantity || 1
            total += product.price * quantity

            container.innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 80px; object-fit: cover;" class="me-3">
                            <div>
                                <h6 class="mb-0 fw-bold">${product.name}</h6>
                                <small class="text-muted">${product.category}</small>
                            </div>
                        </div>
                    </td>
                    <td>€ ${product.price.toFixed(2)}</td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group">
                            <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                            <button type="button" class="btn btn-outline-secondary px-3" disabled>${quantity}</button>
                            <button type="button" class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})" title="Remove item">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`
        })

        if (totalDisplay) totalDisplay.innerText = `€ ${total.toFixed(2)}`
        if (finalTotalDisplay) finalTotalDisplay.innerText = `€ ${total.toFixed(2)}`
    }
}