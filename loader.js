function loadComponent(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error(`There was a problem loading the component from ${url}:`, error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar.html', 'nav');  // Load the navbar
    loadComponent('footer.html', 'footer'); // Load the footer
});
