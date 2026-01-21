// js/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyChflNLXQ9666kML0EDJuw_LEdfCj6VYfg",
  authDomain: "expendiobuengusto-5fb5c.firebaseapp.com",
  projectId: "expendiobuengusto-5fb5c",
  storageBucket: "expendiobuengusto-5fb5c.firebasestorage.app",
  messagingSenderId: "241277656016",
  appId: "1:241277656016:web:afee2b72523f7c4a0b37d5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a Authentication
const auth = firebase.auth();