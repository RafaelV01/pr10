import { db } from "./data.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Función para obtener todos los productos desde Firebase
async function getProducts() {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs;
}

// Función para mostrar los detalles del producto en un modal
function showProductDetails(title, description, price, imgSrc) {
    document.getElementById('modal-product-title').innerText = title;
    document.getElementById('modal-product-description').innerText = description;
    document.getElementById('modal-product-price').innerText = `Precio: ${price}`;
    document.getElementById('modal-product-img').src = imgSrc;
    document.querySelector('.modal-title').innerText = title;
    $('#productModal').modal('show');
}

// Función para cargar los productos desde Firebase y mostrarlos en la página
async function loadProducts() {
    const productsListElement = document.getElementById('product-list');
    if (!productsListElement) {
        console.error('Elemento "product-list" no encontrado en el DOM.');
        return;
    }

    try {
        const productsSnapshot = await getProducts();
        productsListElement.innerHTML = '';
        productsSnapshot.forEach((doc) => {
            const product = doc.data();
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4';
            
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.onclick = () => showProductDetails(product.name, product.description, product.price, product.imageUrl);
            
            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.alt = `Producto ${product.name}`;
            
            const h3 = document.createElement('h3');
            h3.innerText = product.name;
            
            const p = document.createElement('p');
            p.innerText = product.price;

            productDiv.appendChild(img);
            productDiv.appendChild(h3);
            productDiv.appendChild(p);
            colDiv.appendChild(productDiv);
            productsListElement.appendChild(colDiv);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);

export { loadProducts, showProductDetails };
