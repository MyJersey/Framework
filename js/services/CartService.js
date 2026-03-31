/**
 * CartService.js
 * Handles all cart-related business logic
 * Separates cart operations from UI concerns
 */

class CartService {

    /**
     * Adds an item to the cart or increases its quantity if already present
     * @param {number} productId
     * @param {number} quantity default: 1
     * @returns {boolean} true if successful, false if product not found
     */
    static addItem(productId, quantity = 1) {
        const cart = StorageService.getCart()
        const product = products.find(p => p.id === productId)

        // Product doesn't exist
        if (!product) return false

        const existingIndex = cart.findIndex(p => p.id === productId)
        if (existingIndex > -1) {
            // Product already in cart - increase quantity
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity
        } else {
            // New product - add to cart
            const cartItem = { ...product, quantity }
            cart.push(cartItem)
        }

        StorageService.setCart(cart)
        return true
    }

    /**
     * Removes an item from the cart by index
     * @param {number} index of the item to remove
     */
    static removeItem(index) {
        const cart = StorageService.getCart()
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1)
            StorageService.setCart(cart)
        }
    }

    /**
     * Updates the quantity of a cart item
     * If quantity drops below 1, item is removed
     * @param {number} index of the item
     * @param {number} quantity
     */
    static updateQuantity(index, quantity) {
        const cart = StorageService.getCart()
        if (index < 0 || index >= cart.length) return

        if (quantity < 1) {
            this.removeItem(index)
        } else {
            cart[index].quantity = quantity
            StorageService.setCart(cart)
        }
    }

    /**
     * Clears the entire cart
     */
    static clear() {
        StorageService.clearCart()
    }

    /**
     * Calculates the total price of all items in the cart
     * @returns {number} total price and quantities
     */
    static getTotal() {
        return StorageService.getCart().reduce((sum, item) => {
            return sum + (item.price * (item.quantity || 1))
        }, 0)
    }

    /**
     * Calculates the total number of items in the cart
     * @returns {number} total item count
     */
    static getItemCount() {
        return StorageService.getCart().reduce((sum, item) => {
            return sum + (item.quantity || 1)
        }, 0)
    }

    /**
     * Gets the full cart data
     * @returns {Array} of cart items
     */
    static getCart() {
        return StorageService.getCart()
    }
}