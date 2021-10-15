import { http } from './http.js';
import { ui } from './ui.js';
import { getCartFromLocalStorage } from './localStorage.js';



// Get Products on DOM load
document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    http
        // .get('http://localhost:3000/products')
        .get('https://61363d1f8700c50017ef54cd.mockapi.io/products')
        .then((data) => ui.showAdminProducts(data));
    getCartFromLocalStorage();
       
    
}

