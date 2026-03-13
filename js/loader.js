// Detect a new Live Server session.
if (!sessionStorage.getItem("liveServerSession")) {

    // Controlliamo se esiste un utente loggato
    const userIsLoggedIn = localStorage.getItem('userName');

    // Se l'utente NON è loggato (userIsLoggedIn è null), svuotiamo il carrello
    if (!userIsLoggedIn) {
        localStorage.removeItem("cart");
        localStorage.removeItem("selectedProductId");
        console.log("Live Server: Nessun utente loggato, carrello resettato.");
    } else {
        console.log("Live Server: Utente " + userIsLoggedIn + " loggato, carrello mantenuto.");
    }

    // Segniamo che la sessione di Live Server è iniziata
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