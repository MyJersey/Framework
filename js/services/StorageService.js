/**
 * StorageService.js
 * Centralized storage manager
 * No direct localStorage access scattered throughout codebase
 */

class StorageService {

    /**
     * Retrieves the current cart from storage
     * @returns {Array} array of cart items
     */
    static getCart() {
        return JSON.parse(localStorage.getItem('cart')) || []
    }

    /**
     * Saves the cart to storage
     * @param {Array} cart array of cart items
     */
    static setCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    /**
     * Clears the entire cart from storage
     */
    static clearCart() {
        localStorage.removeItem('cart')
    }

    /**
     * Retrieves the currently logged-in user name
     * @returns {string|null} user name if logged in, null otherwise
     */
    static getUser() {
        return localStorage.getItem('userName')
    }

    /**
     * Saves the user name to storage
     * @param {string} name user's name
     */
    static setUser(name) {
        localStorage.setItem('userName', name)
    }

    /**
     * Clears the user name from storage
     */
    static clearUser() {
        localStorage.removeItem('userName')
    }

    /**
     * Saves the selected product ID for the detail page
     * @param {number} id product ID
     */
    static setSelectedProductId(id) {
        localStorage.setItem('selectedProductId', id)
    }

    /**
     * Retrieves the selected product ID
     * @returns {string|null} product ID if set, null otherwise
     */
    static getSelectedProductId() {
        return localStorage.getItem('selectedProductId')
    }

    /**
     * Clears the selected product ID
     */
    static clearSelectedProductId() {
        localStorage.removeItem('selectedProductId')
    }

    /**
     * Checks if a Live Server session exists
     * @returns {string|null} session flag if set, null otherwise
     */
    static getLiveServerSession() {
        return sessionStorage.getItem("liveServerSession")
    }

    /**
     * Sets the Live Server session flag
     * @param {string} value value to set
     */
    static setLiveServerSession(value) {
        sessionStorage.setItem("liveServerSession", value)
    }
}