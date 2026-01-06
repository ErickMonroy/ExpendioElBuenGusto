// Función para mostrar mensajes de descuento en promociones
function showDiscountMessage() {
    const promotions = document.querySelectorAll('.promocion');

    promotions.forEach((promotion) => {
        const minQuantity = parseInt(promotion.getAttribute('data-min-quantity'));
        const discountMessage = promotion.getAttribute('data-discount-message');
        const promotionText = promotion.querySelector('h2').textContent;

        promotion.querySelector('h2').textContent = `${promotionText} - ${discountMessage}`;
    });
}

// Llamar a la función showDiscountMessage cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    showDiscountMessage();
});

// Función para alternar menú hamburguesa
function toggleMenu() {
    const menu = document.getElementById('menu-list');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Función para alternar barra de búsqueda
function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        if (searchBar.style.display === 'none' || searchBar.style.display === '') {
            searchBar.style.display = 'block';
        } else {
            searchBar.style.display = 'none';
        }
    }
}

// Mostrar/ocultar iconos sociales
window.addEventListener('scroll', function() {
    const socialIcons = document.getElementById('social-icons');
    if (socialIcons) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            socialIcons.style.display = 'flex';
        } else {
            socialIcons.style.display = 'none';
        }
    }
});