/**
 * CartService.js
 * Handles all cart-related business logic via the Node.js backend API
 * Separates cart operations from UI concerns
 */

class CartService {

    /**
     * Returns the current user identifier for API calls
     * @returns {string} user name or 'guest'
     */
    static _getUser() {
        return StorageService.getUser() || 'guest'
    }

    /**
     * Adds an item to the cart (one or more units) via API
     * @param {number} productId
     * @param {number} quantity default: 1
     * @returns {Promise<boolean>} true if all requests succeeded
     */
    static async addItem(productId, quantity = 1) {
        const user = this._getUser()
        const requests = []
        for (let i = 0; i < quantity; i++) {
            requests.push(
                fetch(`/cart/${user}/${productId}`, { method: 'POST' })
            )
        }
        const results = await Promise.all(requests)
        return results.every(r => r.ok)
    }

    /**
     * Removes all units of a product from the cart via API
     * @param {number} productId
     */
    static async removeItem(productId) {
        const user = this._getUser()
        await fetch(`/cart/${user}/${productId}/all`, { method: 'DELETE' })
    }

    /**
     * Changes the quantity of a cart item by +1 or -1 via API
     * POST adds one unit, DELETE removes one unit
     * @param {number} productId
     * @param {number} change +1 or -1
     */
    static async changeQuantity(productId, change) {
        const user = this._getUser()
        const method = change > 0 ? 'POST' : 'DELETE'
        await fetch(`/cart/${user}/${productId}`, { method })
    }

    /**
     * Clears the entire cart by removing all items via API
     */
    static async clear() {
        const cart = await this.getCart()
        const user = this._getUser()
        await Promise.all(
            cart.map(item =>
                fetch(`/cart/${user}/${item.productId}/all`, { method: 'DELETE' })
            )
        )
    }

    /**
     * Gets the full cart data from the API
     * Each item has { productId, quantity }
     * @returns {Promise<Array>} array of cart items
     */
    static async getCart() {
        const user = this._getUser()
        const res = await fetch(`/cart/${user}`)
        if (!res.ok) return []
        return res.json()
    }

    /**
     * Calculates the total number of items in the cart
     * @returns {Promise<number>} total item count
     */
    static async getItemCount() {
        const cart = await this.getCart()
        return cart.reduce((sum, item) => sum + item.quantity, 0)
    }
}