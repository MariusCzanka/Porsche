$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});


import { http } from "./http.js";
import { ui } from "./ui.js";
import { getCartFromLocalStorage } from './localStorage.js';

const productsURL = 'https://61363d1f8700c50017ef54cd.mockapi.io/products';

//Get product from api
document.addEventListener('DOMContentLoaded', getProducts);
function getProducts() {
    http.get(productsURL).then((products) => ui.showProducts(products));
    getCartFromLocalStorage();
    
}
// Add product to db
document.getElementById('btn-addProduct').addEventListener('click', addNewProduct);
function addNewProduct() {
  
    const pictureValue = document.getElementById('picture').value;
    const nameValue = document.getElementById('name').value;
    const descriptionValue = document.getElementById('description').value;
    const priceValue = document.getElementById('price').value;
    const stocValue = document.getElementById('stoc').value;
    
    
    let product = {
        name: nameValue,
        picture: pictureValue,
        price: priceValue,
        description: descriptionValue,
        stoc: stocValue,
       
    };
    console.log(product);
    http
        .post("https://61363d1f8700c50017ef54cd.mockapi.io/products", product)
        .then((data) => getProducts())
        .then(() => {
            window.location.reload();
        });
        
    
}


document.getElementById('products-admin').addEventListener('click', deleteProduct);
function deleteProduct(e) {
    if(e.target.classList.contains('delete')) {
        const id = e.target.id;
        http.delete(`https://61363d1f8700c50017ef54cd.mockapi.io/products/${id}`)
            .then((data) => getProducts())
            .then(() => {
                window.location.reload();
            })
            .catch('Error on delete!')
            
    }
}
