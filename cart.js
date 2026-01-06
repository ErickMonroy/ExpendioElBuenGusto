// Recuperar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar el carrito en la página
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');
    
    cartItems.innerHTML = ''; // Limpiar la lista del carrito
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>El carrito está vacío</li>';
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.quantity} x $${item.price}`;
            cartItems.appendChild(listItem);
            totalPrice += item.quantity * item.price;
        });
    }

    totalPriceElem.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Mostrar el carrito cuando se carga la página
displayCart();


function increaseQuantity(button) {
    var input = button.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
}

function decreaseQuantity(button) {
    var input = button.nextElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value = value > 1 ? value - 1 : 1;
    input.value = value;
}

let currentIndex = 0;

        function showSlide(index) {
            const slides = document.querySelectorAll('.carousel-item');
            if (index >= slides.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        setInterval(nextSlide, 6000); // Change slide every 6 seconds
        window.addEventListener('scroll', function() {
            const socialIcons = document.getElementById('social-icons');
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                socialIcons.style.display = 'flex';
            } else {
                socialIcons.style.display = 'none';
            }
        });

        function toggleMenu() {
            const menu = document.getElementById('menu-list');
            menu.classList.toggle('show');
        }

        function toggleSearchBar() {
            var searchBar = document.getElementById('searchBar');
            if (searchBar.style.display === 'none' || searchBar.style.display === '') {
                searchBar.style.display = 'block';
            } else {
                searchBar.style.display = 'none';
            }
        }

        function search() {
            var input = document.getElementById('searchInput').value.toLowerCase();
            var section = document.getElementById('variedadDePan');
            if (section.innerText.toLowerCase().includes(input)) {
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('No se encontró la sección.');
            }
        }

