// js/auth.js

// Estado de autenticación
let currentUser = null;

// Función para actualizar la UI según el estado de autenticación
function updateAuthUI(user) {
    const loginLink = document.getElementById('login-link');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');
    const authMenu = document.getElementById('auth-menu');

    if (user) {
        // Usuario está logueado
        loginLink.style.display = 'none';
        userInfo.style.display = 'inline';
        
        // Mostrar nombre del usuario (si existe) o email
        const displayName = user.displayName || user.email.split('@')[0];
        usernameDisplay.textContent = displayName;
        
        // Guardar en localStorage para persistencia
        const userData = {
            uid: user.uid,
            name: displayName,
            email: user.email,
            loggedIn: true
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        currentUser = userData;
        
    } else {
        // Usuario no está logueado
        loginLink.style.display = 'inline';
        userInfo.style.display = 'none';
        
        // Limpiar localStorage
        localStorage.removeItem('currentUser');
        currentUser = null;
    }
}

// Función para cerrar sesión
function logout() {
    Swal.fire({
        title: '¿Cerrar sesión?',
        text: "¿Estás seguro de que quieres salir?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ac7d51',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            auth.signOut()
                .then(() => {
                    // Éxito - la UI se actualiza automáticamente por onAuthStateChanged
                    Swal.fire({
                        icon: 'success',
                        title: 'Sesión cerrada',
                        text: 'Has cerrado sesión correctamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                })
                .catch((error) => {
                    console.error('Error al cerrar sesión:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo cerrar la sesión'
                    });
                });
        }
    });
}

// Función para verificar si el usuario está autenticado
function checkAuth() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            updateAuthUI(user);
            resolve(user);
        });
    });
}

// Función para obtener el usuario actual
function getCurrentUser() {
    if (currentUser) {
        return currentUser;
    }
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        return currentUser;
    }
    
    return null;
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Escuchar cambios en la autenticación
    auth.onAuthStateChanged((user) => {
        updateAuthUI(user);
    });
    
    // También verificar localStorage para mantener sesión
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        try {
            currentUser = JSON.parse(storedUser);
            // Verificar con Firebase si la sesión sigue activa
            auth.currentUser?.getIdToken().then(() => {
                // Token válido, mantener sesión
            }).catch(() => {
                // Token inválido, limpiar
                localStorage.removeItem('currentUser');
                currentUser = null;
            });
        } catch (e) {
            localStorage.removeItem('currentUser');
            currentUser = null;
        }
    }
});