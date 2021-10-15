import { ui } from './ui.js';
import { getCartFromLocalStorage } from './localStorage.js';


document.addEventListener('DOMContentLoaded', () => {
	let storageItems = getCartFromLocalStorage();
	ui.showProductsCart(storageItems);
	getCartTotal(storageItems);
});

function getCartTotal (storageItems) {
	let total = 0;

	for (let item of storageItems) {
		let numberOfProducts = parseInt(item.count);
		let productPrice = parseInt(item.product.price);
		total = total + numberOfProducts * productPrice;
	}
	console.log(total);
	addEventListener('DOMContentLoaded', () => {
		document.getElementById('total').innerHTML += total + " " + "\u20AC";
		
	});
	return total;
}

let buyProducts = document.getElementById('buyProducts');

buyProducts.addEventListener('click', () => {
	let storageItems = getCartFromLocalStorage();
	if(storageItems == 0) {
		let output = `
		<div class="cos-gol">
			<h3 id="cosGol">Va rog adaugati un produs in cos! </h3>
		</div>`
		document.querySelector('#cos-plin').innerHTML = output
	} else {
		let output = `
		<div class="cos-plin">
			<h3 id="cosPlin">Comanda inregistrata cu succes! </h3>
		</div>`
		document.querySelector('#cos-plin').innerHTML = output
		
	} 
});

