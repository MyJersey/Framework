/**
 * AuthService.js
 * Handles user authentication and session management
 */

class AuthService {

    /**
     * Logs in a user by storing their name
     * @param {string} userName user's name
     */
    static login(userName) {
        StorageService.setUser(userName)
    }

    /**
     * Logs out the current user
     */
    static logout() {
        StorageService.clearUser()
    }

    /**
     * Gets the currently logged-in user name
     * @returns {string|null} user name or null if not logged in
     */
    static getCurrentUser() {
        return StorageService.getUser()
    }

    /**
     * Checks if a user is currently logged in
     * @returns {boolean} true if user is logged in, false otherwise
     */
    static isLoggedIn() {
        return !!this.getCurrentUser()
    }
}