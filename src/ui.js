import { addProductsInLocalStorage, updateQuantityInLocalStorage, getElementFromLocalStorage, removeElementFromLocalStorage } from './localStorage.js';
    
    class UI {
	constructor() {
		this.productContainer = document.getElementById('products');
		this.tableBody = document.getElementById('table-body');
		this.picture = document.getElementById('picture');
		this.name = document.getElementById('name');
		this.description = document.getElementById('description');
		this.price = document.getElementById('price');
		this.stoc = document.getElementById('stoc');
		this.id = document.getElementById('id');
        this.detailsDiv = document.getElementById('wrapper');
        this.cartBody = document.getElementById('tablecart-body');
        this.quantity = document.getElementById('quantity');
        this.cartDiv = document.getElementById('container-cart');
        this.updateIconCart = document.getElementById('cart-basket');
	}

	showProducts(products) {
		let output = '';
		products.forEach((product) => {
			output += `
            <div class="card">
               <h2>${product.name}</h2>
               <img src="${product.picture}"/>
               <h3> Pret :${product.price} \u20AC  <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="btn btn-info my-3" id="btn-details">Detalii</button></h3>
            </div>`;
			this.productContainer.innerHTML = output;
		});
	}
	showAdminProducts(products) {
        let output = '';
        products.forEach((product) => {
            output = `
                    <tr>
                        <td><img class="admin-image" src="${product.picture}" alt="..."></td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.price} \u20AC</td>
						<td>${product.stoc}</td>
                        <td><button class="removeBtn delete" id="${product.id}">Sterge</button></td>
                    </tr>
            `;
            this.tableBody.innerHTML += output;
        });
	}
	showDetails(product) {
        let output = '';
        
            output += `
                <div class="product-img"><img src="${product.picture}" alt="..."></div>
                <div class="product-info">
                    <div class="product-text">
                        <h1 class="card-title">${product.name}</h1>
                        <p class="card-description"><span id="detalii">Detalii</span>: ${product.description}</p>
                        <h2 class="card-author">În stoc: ${product.stoc} buc.</h2>
                        <h2 class="card-author">Cantitate:<input id="quantity" type="number" value="1" min="1" max="100"></h2>
                    </div>
                    <div class="product-price-btn">
                        <p><span class="product-price">Pret: ${product.price} \u20AC </span></p>
                        <button id="addtocartBtn" type="button">Adaugă în coș</button>
                    </div>
                </div>
                `;
                this.detailsDiv.innerHTML = output;

                let addProductToCart = document.getElementById('addtocartBtn');
                addProductToCart.addEventListener('click',() => {
                    let count = parseInt(quantity.value);
                    if (isNaN(count)) {
                        count = 1;
                    }
                    addProductsInLocalStorage(product, count);
                    Swal.fire({
                        title: 'Produsul a fost adăugat în coș!',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                      });
    }
    showProductsCart(storageItems) {
        let output = "";
        storageItems.forEach((item) => {
        output = `
        <table id="table-cart">
            <tbody id="tablecart-body">
                <tr id="cart-row">
                    <td ><img id="foto" src="${item.product.picture}" class="admin-card-img"</td>
                    <a href="details.html?id=${item.product.id}"<td>${item.product.name}</td></a>
                    <td>${item.product.price} \u20AC</td>
                    <td><input value=${item.count} type="number" min="1" max="10"/></td>
                    <td id="subtotal">${item.product.price*item.count} \u20AC</td>
                    <td><button id=${item.product.id} type="button" class="removeBtn delete" id="btndelezte" onclick="removeBtn delete">Sterge</button></td>
                </tr>
            </tbody>
       </table>
        `;
    this.cartBody.innerHTML += output;
    });

let inputFields = document.querySelectorAll("input");
    inputFields.forEach( (inputElement) => {
        let row = inputElement.parentElement.parentElement;
        let removeButton = row.lastElementChild.firstElementChild;

        let productId = removeButton.id;
        inputElement.addEventListener('change', (e) => {
            let count = parseInt(e.target.value);
            if(!isNaN(count) && count > 0) {
                updateQuantityInLocalStorage(productId, count);
                return window.location.reload();
            } else {
                let storageElement = getElementFromLocalStorage(productId);
                e.target.value = storageElement.count;
            }
        });  
        
        removeButton.addEventListener('click', (e) => {
            removeElementFromLocalStorage(e.target.id);
            row.remove();
            return window.location.reload();
        });  
    });
        }
         
}

export const ui = new UI();