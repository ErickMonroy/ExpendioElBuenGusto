// Agregué una función para mostrar el mensaje de descuento en la promoción
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

function toggleMenu() {
    const menu = document.getElementById('menu-list');
    menu.classList.toggle('show');
}

