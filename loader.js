async function loadComponent(url, elementId) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
}

async function initLayout() {
    await Promise.all([
        loadComponent('navbar.html', 'nav'),
        loadComponent('footer.html', 'footer')
    ]);

    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }

    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
}

document.addEventListener('DOMContentLoaded', initLayout);
