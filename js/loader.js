// Detect a new Live Server session.
// When Live Server restarts or the tab is newly opened, sessionStorage is empty.
if (!sessionStorage.getItem("liveServerSession")) {

    // Check if a user is currently logged in by looking for 'userName' in localStorage.
    const userIsLoggedIn = localStorage.getItem('userName');

    // If NO user is logged in (userIsLoggedIn is null), reset the cart data.
    if (!userIsLoggedIn) {
        localStorage.removeItem("cart");
        localStorage.removeItem("selectedProductId");
        console.log("Live Server: No user logged in, cart has been reset.");
    } else {
        // If a user is logged in, preserve the cart data for a seamless experience.
        console.log("Live Server: User '" + userIsLoggedIn + "' is logged in, cart preserved.");
    }

    // Mark the Live Server session as initialized to prevent resets on simple page refreshes.
    sessionStorage.setItem("liveServerSession", "true");
}

// Fetches an HTML file from the given URL and injects it into the element with the given ID.
async function loadComponent(url, elementId) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
}

// Loads the shared navbar and footer components, then updates the cart badge and active nav link.
async function initLayout() {
    await Promise.all([
        loadComponent('navbar.html', 'nav'),
        loadComponent('footer.html', 'footer')
    ]);

    // Update the cart item count shown in the navbar badge after components are loaded.
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }

    setActiveNavLink();
}

// Highlights the navbar link that matches the current page by adding the "active" class.
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
}

// Initialise the shared layout (navbar + footer) once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', initLayout);