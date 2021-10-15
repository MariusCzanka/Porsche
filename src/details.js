import { http } from './http.js';
import { ui } from './ui.js';
import { getCartFromLocalStorage } from './localStorage.js';


window.onload = () => {
    if (window.location.search !== '') {
        const id = window.location.search.split('=')[1];
        http
           
            .get(`https://61363d1f8700c50017ef54cd.mockapi.io/products/${id}`)
            .then((data) => ui.showDetails(data));
        // getCartFromLocalStorage();
        
            
    }
}