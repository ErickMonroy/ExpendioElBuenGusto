// Array para almacenar productos añadidos temporalmente
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentIndex = 0;

// ========== FUNCIONES DEL CARRITO ==========

// Función para actualizar el contador del carrito
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.getElementById('cart-counter');
    
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Función para crear el contador del carrito dinámicamente
function createCartCounter() {
    // Buscar el contenedor del carrito
    const cartIconContainer = document.querySelector('.cart-icon');
    
    if (cartIconContainer && !document.getElementById('cart-counter')) {
        // Buscar el ícono del carrito dentro del contenedor
        const cartIcon = cartIconContainer.querySelector('.fa-shopping-cart');
        
        if (cartIcon) {
            const counter = document.createElement('span');
            counter.id = 'cart-counter';
            counter.className = 'cart-counter';
            
            // Hacer el contador clickeable
            counter.style.cursor = 'pointer';
            counter.title = 'Ver carrito';
            counter.onclick = function() {
                window.location.href = 'pages/cart.html';
            };
            
            // Crear un wrapper para el ícono si no existe
            if (!cartIcon.parentNode.classList.contains('cart-icon-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'cart-icon-wrapper';
                wrapper.style.position = 'relative';
                wrapper.style.display = 'inline-block';
                
                // Hacer que todo el wrapper sea clickeable
                wrapper.style.cursor = 'pointer';
                wrapper.onclick = function() {
                    window.location.href = 'pages/cart.html';
                };
                
                // Reemplazar el ícono con el wrapper
                cartIcon.parentNode.replaceChild(wrapper, cartIcon);
                wrapper.appendChild(cartIcon);
                
                // Añadir el contador al wrapper
                wrapper.appendChild(counter);
            } else {
                // Si ya existe el wrapper, hacerlo clickeable
                cartIcon.parentNode.style.position = 'relative';
                cartIcon.parentNode.style.cursor = 'pointer';
                cartIcon.parentNode.onclick = function() {
                    window.location.href = 'pages/cart.html';
                };
                
                // Añadir el contador
                cartIcon.parentNode.appendChild(counter);
            }
            
            updateCartCounter();
        }
    }
}

// Función para añadir al carrito CON NOTIFICACIÓN PEQUEÑA
function addToCart(productName, price, quantityInput) {
    const quantity = parseInt(quantityInput.value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // NOTIFICACIÓN PEQUEÑA (TOAST) en esquina superior derecha
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        customClass: {
            container: 'custom-toast-container',
            popup: 'custom-toast-popup'
        }
    });
    
    Toast.fire({
        icon: 'success',
        title: 'Producto añadido',
        html: `
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <div style="text-align: left;">
             
                    <div style="font-size: 12px; color: #666;">
                        ${quantity} x $${price.toFixed(2)} = <strong>$${(price * quantity).toFixed(2)}</strong>
                    </div>
                </div>
                <div style="background: #5f3915; color: white; border-radius: 20px; padding: 3px 8px; font-size: 12px; font-weight: bold;">
                    ${cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </div>
            </div>
        `,
        background: '#f8f8f8',
        color: '#333'
    });
    
    // Actualizar contador del carrito
    updateCartCounter();
}

// ========== FUNCIONES DE CANTIDAD ==========
function increaseQuantity(button) {
    const input = button.previousElementSibling;
    let value = parseInt(input.value, 10);
    value = isNaN(value) ? 1 : value + 1;
    input.value = value;
}

function decreaseQuantity(button) {
    const input = button.nextElementSibling;
    let value = parseInt(input.value, 10);
    value = isNaN(value) ? 1 : (value > 1 ? value - 1 : 1);
    input.value = value;
}

// ========== FUNCIONES DEL CARRUSEL ==========
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

// ========== FUNCIONES DEL MENÚ Y BÚSQUEDA ==========
function toggleMenu() {
    const menu = document.getElementById('menu-list');
    if (menu) {
        menu.classList.toggle('show');
    }
}

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

function search() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const searchTerm = input.value.toLowerCase();
    const products = document.querySelectorAll('.gallery-item');
    let found = false;

    products.forEach(product => {
        const productName = product.querySelector('h3')?.textContent.toLowerCase();
        if (productName && productName.includes(searchTerm)) {
            product.scrollIntoView({ behavior: 'smooth', block: 'center' });
            product.style.backgroundColor = '#ffffcc';
            setTimeout(() => product.style.backgroundColor = '', 2000);
            found = true;
        }
    });

    if (!found && searchTerm) {
        // Alert bonito para búsqueda sin resultados
        Swal.fire({
            title: 'Sin resultados',
            text: 'No se encontraron productos que coincidan con tu búsqueda.',
            icon: 'info',
            confirmButtonColor: '#5f3915',
            confirmButtonText: 'Entendido',
            background: '#f8f8f8',
            color: '#333',
            timer: 2000,
            showConfirmButton: false
        });
    }
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar carrusel automático
    if (document.querySelector('.carousel-item')) {
        setInterval(nextSlide, 6000);
    }

    // Crear contador del carrito
    createCartCounter();
    
    // Actualizar contador del carrito
    updateCartCounter();

    // Eventos para botones "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.gallery-item');
            const productName = productContainer.querySelector('h3').textContent;
            const price = parseFloat(productContainer.querySelector('p').textContent.replace('$', '').replace(' pza', ''));
            const quantityInput = productContainer.querySelector('.quantity-selector input');
            
            addToCart(productName, price, quantityInput);
        });
    });

    // Mostrar/ocultar iconos sociales al hacer scroll
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

    // Búsqueda con tecla Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                search();
            }
        });
    }
    
    // Inicializar iconos sociales
    const socialIcons = document.getElementById('social-icons');
    if (socialIcons) {
        socialIcons.style.display = 'none';
    }
});

// Función para ir al carrito
function goToCart() {
    window.location.href = 'pages/cart.html';
}