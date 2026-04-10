/**
 * loader.js
 * Handles page initialization: component loading, session management, and navigation setup
 * Loads shared HTML components (navbar, footer) and manages Live Server sessions
 */

/**
 * Handle Live Server session management
 */
if (!StorageService.getLiveServerSession()) {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
        console.log("Live Server: User '" + currentUser + "' is logged in.");
    } else {
        console.log("Live Server: No user logged in.");
    }

    // Mark the Live Server session as initialized to prevent resets on refreshes
    StorageService.setLiveServerSession("true");
}

/**
 * Fetches an HTML file from the given URL and injects it into the specified element
 * @param {string} url of the HTML file to fetch
 * @param {string} elementId of the DOM element where content will be injected
 * @throws {Error} the fetch request fails or element ID is not found
 */
async function loadComponent(url, elementId) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
}

/**
 * Initializes the shared layout. Waits for both components to load,
 * then refreshes navbar state and sets active nav link
 */
async function initLayout() {
    await Promise.all([
        loadComponent('navbar.html', 'nav'),
        loadComponent('footer.html', 'footer')
    ]);

    await UIManager.refreshNavbar();
    setActiveNavLink();
}

/**
 * Highlights the navbar link that matches the current page by adding the "active" class
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
}

/**
 * Initialize the shared layout (navbar + footer) once the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', initLayout);