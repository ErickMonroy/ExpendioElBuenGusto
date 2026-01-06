// Primero, asegúrate de tener estas librerías en el HTML
// <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

// Recuperar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar el carrito en la página
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');

    cartItems.innerHTML = ''; // Limpiar la lista del carrito
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>🛒 El carrito está vacío</li>';
    } else {
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            const itemTotal = item.quantity * item.price;
            totalPrice += itemTotal;

            // Crear viñeta con número y estilo
            listItem.innerHTML = `
                <span class="bullet">${index + 1}.</span>
                ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} 
                <span class="item-total">= $${itemTotal.toFixed(2)}</span>
                <button onclick="removeItem(${index})" class="remove-btn">🗑️</button>
            `;
            cartItems.appendChild(listItem);
        });
    }

    totalPriceElem.innerHTML = `Total: <strong>$${totalPrice.toFixed(2)}</strong>`;
}

// Función para eliminar un item específico CON ALERT BONITO
function removeItem(index) {
    Swal.fire({
        title: '¿Eliminar producto?',
        text: "¿Estás seguro de eliminar este producto del carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5f3915',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#f8f8f8',
        color: '#333',
        customClass: {
            popup: 'swal-popup-custom'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            
            // Alert de éxito
            Swal.fire({
                title: '¡Eliminado!',
                text: 'El producto ha sido eliminado del carrito.',
                icon: 'success',
                confirmButtonColor: '#5f3915',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

// Función para vaciar el carrito CON ALERT BONITO
function clearCart() {
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: "¿Estás seguro de vaciar todo el carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5f3915',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar',
        background: '#f8f8f8',
        color: '#333'
    }).then((result) => {
        if (result.isConfirmed) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            
            Swal.fire({
                title: '¡Carrito vacío!',
                text: 'Todos los productos han sido eliminados.',
                icon: 'success',
                confirmButtonColor: '#5f3915',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

// FUNCIÓN PARA GENERAR EL TICKET EN PDF
function generateTicketPDF() {
    // Verificar si jsPDF está disponible
    if (typeof window.jspdf === 'undefined') {
        console.error('jsPDF no está cargado');
        Swal.fire({
            title: 'Error',
            text: 'No se pudo generar el ticket. jsPDF no está disponible.',
            icon: 'error',
            confirmButtonColor: '#5f3915'
        });
        return null;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let yPos = 20;
    const marginLeft = 20;
    const pageWidth = doc.internal.pageSize.width;
    
     
    
    // ENCABEZADO
    doc.setFontSize(20);
    doc.setTextColor(95, 57, 21); // Color café #5f3915
    doc.text("EXPENDIO EL BUEN GUSTO", pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Av. Siempre Viva 742, CDMX", pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
    doc.text("Tel: (123) 456-7890", pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    
    // Línea separadora
    doc.setDrawColor(172, 125, 81); // Color #ac7d51
    doc.setLineWidth(0.5);
    doc.line(marginLeft, yPos, pageWidth - marginLeft, yPos);
    yPos += 10;
    
    // INFORMACIÓN DE LA VENTA
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    const fecha = new Date().toLocaleDateString('es-MX');
    const hora = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    doc.text(`Fecha: ${fecha}`, marginLeft, yPos);
    doc.text(`Hora: ${hora}`, pageWidth - marginLeft, yPos, { align: 'right' });
    yPos += 7;
    doc.text(`Ticket: ${Date.now().toString().slice(-8)}`, marginLeft, yPos);
    yPos += 10;
    
    // Línea separadora
    doc.line(marginLeft, yPos, pageWidth - marginLeft, yPos);
    yPos += 10;
    
    // DETALLES DE PRODUCTOS
    doc.setFontSize(13);
    doc.setTextColor(95, 57, 21);
    doc.text("DETALLE DE COMPRA", marginLeft, yPos);
    yPos += 10;
    
    // Encabezados de la tabla
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("PRODUCTO", marginLeft, yPos);
    doc.text("CANT", 120, yPos);
    doc.text("PRECIO", 140, yPos);
    doc.text("TOTAL", 170, yPos);
    yPos += 5;
    
    // Línea debajo de encabezados
    doc.setDrawColor(200, 200, 200);
    doc.line(marginLeft, yPos, pageWidth - marginLeft, yPos);
    yPos += 8;
    
    // LISTA DE PRODUCTOS
    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        subtotal += itemTotal;
        
        // Acortar nombre si es muy largo
        let productName = item.name;
        if (productName.length > 25) {
            productName = productName.substring(0, 25) + '...';
        }
        
        doc.text(productName, marginLeft, yPos);
        doc.text(item.quantity.toString(), 120, yPos);
        doc.text(`$${item.price.toFixed(2)}`, 140, yPos);
        doc.text(`$${itemTotal.toFixed(2)}`, 170, yPos);
        yPos += 8;
        
        // Si se llena la página, crear nueva
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
    });
    
    yPos += 10;
    
    // Línea separadora antes de totales
    doc.setDrawColor(172, 125, 81);
    doc.line(marginLeft, yPos, pageWidth - marginLeft, yPos);
    yPos += 10;
    
    // TOTALES
    doc.setFontSize(12);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, pageWidth - marginLeft, yPos, { align: 'right' });
    yPos += 8;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Total: $${subtotal.toFixed(2)}`, pageWidth - marginLeft, yPos, { align: 'right' });
    doc.setFont(undefined, 'normal');
    yPos += 15;
    
    // PIE DE PÁGINA
    doc.setFontSize(12);
    doc.setTextColor(95, 57, 21);
    doc.text("¡GRACIAS POR SU COMPRA!", pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Vuelva pronto", pageWidth / 2, yPos, { align: 'center' });
    
    // Generar nombre único para el archivo
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `Ticket_ElBuenGusto_${timestamp}.pdf`;
    
    // Guardar el PDF
    doc.save(fileName);
    
    return fileName;
}

// Función para proceder con la compra CON ALERT BONITO Y TICKET
function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Añade productos antes de comprar.',
            icon: 'warning',
            confirmButtonColor: '#5f3915',
            confirmButtonText: 'Entendido',
            background: '#f8f8f8',
            color: '#333'
        });
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    Swal.fire({
        title: '¿Confirmar compra?',
        html: `
            <div style="text-align: center;">
                <p style="font-size: 18px; margin-bottom: 10px;">Total a pagar:</p>
                <p style="font-size: 24px; color: #5f3915; font-weight: bold;">$${total.toFixed(2)}</p>
                <p style="font-size: 14px; color: #666;">${cart.length} producto(s)</p>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#5f3915',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
        background: '#f8f8f8',
        color: '#333',
        customClass: {
            popup: 'swal-popup-custom'
        },
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return new Promise((resolve) => {
                // Pequeña pausa para que se vea el loader
                setTimeout(() => {
                    try {
                        // Generar y descargar ticket
                        const ticketFileName = generateTicketPDF();
                        
                        // Limpiar carrito
                        cart = [];
                        localStorage.setItem('cart', JSON.stringify(cart));
                        displayCart();
                        
                        resolve(ticketFileName);
                    } catch (error) {
                        console.error('Error al generar ticket:', error);
                        Swal.showValidationMessage('Error al generar el ticket');
                    }
                }, 1000);
            });
        }
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            Swal.fire({
                title: '¡Compra exitosa!',
                html: `
                    <div style="text-align: center;">
                        <p style="margin-bottom: 15px;">Gracias por tu compra en <strong>El Buen Gusto</strong></p>
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin: 15px 0;">
                            <p style="margin: 5px 0;">Total pagado: <strong>$${total.toFixed(2)}</strong></p>
                            <p style="margin: 5px 0;">Ticket: <strong>${result.value}</strong></p>
                        </div>
                        <p style="color: #666; font-size: 14px;">El ticket se ha descargado automáticamente</p>
                    </div>
                `,
                icon: 'success',
                confirmButtonColor: '#5f3915',
                confirmButtonText: '¡Excelente!',
                background: '#f8f8f8',
                color: '#333',
                timer: 4000,
                timerProgressBar: true
            });
        }
    });
}

// Mostrar el carrito cuando se carga la página
displayCart();

// ========== FUNCIONES DEL CARRUSEL Y MENÚ ==========
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
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner) {
        carouselInner.style.transform = `translateX(${offset}%)`;
    }
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Iniciar carrusel si existe
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.carousel-item')) {
        setInterval(nextSlide, 6000);
    }
});

function toggleMenu() {
    const menu = document.getElementById('menu-list');
    if (menu) {
        menu.classList.toggle('show');
    }
}

function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
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

// Mostrar/ocultar iconos sociales
window.addEventListener('scroll', function () {
    const socialIcons = document.getElementById('social-icons');
    if (socialIcons) {
        socialIcons.style.display = (window.innerHeight + window.scrollY) >= document.body.offsetHeight ? 'flex' : 'none';
    }
});