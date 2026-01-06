        // Array para almacenar productos añadidos temporalmente
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Función para añadir un producto al carrito
        function addToCart(productName, price, quantityInput) {
            const quantity = parseInt(quantityInput.value);
            const existingProduct = cart.find(item => item.name === productName);
        
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({ name: productName, price, quantity });
            }
        
            // Guardar el carrito en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Producto añadido al carrito.');
        }
        
        // Funciones para manejar la cantidad
        function increaseQuantity(button) {
            const quantityInput = button.previousElementSibling;
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }
        
        function decreaseQuantity(button) {
            const quantityInput = button.nextElementSibling;
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        }
        
        // Añadir eventos a los botones "Añadir al carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productContainer = this.closest('.gallery-item');
                const productName = productContainer.querySelector('h3').textContent;
                const price = parseFloat(productContainer.querySelector('p').textContent.replace('$', ''));
                const quantityInput = productContainer.querySelector('.quantity-selector input');
        
                addToCart(productName, price, quantityInput);
            });
        });
        

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
            var products = document.querySelectorAll('.gallery-item');  // Assuming your products are inside this class
            var found = false;
        
            products.forEach(product => {
                var productName = product.querySelector('h3').textContent.toLowerCase();  // Assuming product name is in <h3>
                
                // Remove the highlight from all products initially
                product.classList.remove('highlight');
                
                // Check if the product name includes the search input
                if (productName.includes(input)) {
                    product.scrollIntoView({ behavior: 'smooth' });  // Scroll to the matching product
                    product.classList.add('highlight');  // Add highlight class to matching product
                    found = true;
                }
            });
        
            if (!found) {
                alert('No se encontraron productos que coincidan con tu búsqueda.');
            }
        }
        
        

