import { getAllProducts, addProduct, deleteProduct, updateProductData } from "./data.js";
import { logOut, archivoimg } from "./global.js";
import { loadProducts, showProductDetails } from "./script.js";

const logoutBtn = document.getElementById("logout-btn");
const createProductBtn = document.getElementById("create-product-btn");
const productsListElement = document.getElementById("products-list");

logoutBtn.addEventListener("click", () => {
  logOut().then(() => {
    window.location.href = "../index.html";
  });
});

createProductBtn.addEventListener("click", () => {
  createProduct();
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadProducts();
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
});

async function createProduct() {
  const card = document.createElement("div");
  card.className = "card";

  const form = document.createElement("form");

  const table = document.createElement("table");

  const nameRow = table.insertRow();
  const nameLabel = nameRow.insertCell();
  nameLabel.textContent = "Nombre:";
  const nameInputCell = nameRow.insertCell();
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "product-name";
  nameInput.name = "productName";
  nameInputCell.appendChild(nameInput);

  const descriptionRow = table.insertRow();
  const descriptionLabel = descriptionRow.insertCell();
  descriptionLabel.textContent = "Descripción:";
  const descriptionInputCell = descriptionRow.insertCell();
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.id = "product-description";
  descriptionInput.name = "productDescription";
  descriptionInputCell.appendChild(descriptionInput);

  const priceRow = table.insertRow();
  const priceLabel = priceRow.insertCell();
  priceLabel.textContent = "Precio:";
  const priceInputCell = priceRow.insertCell();
  const priceInput = document.createElement("input");
  priceInput.type = "text";
  priceInput.id = "product-price";
  priceInput.name = "productPrice";
  priceInputCell.appendChild(priceInput);

  const imageRow = table.insertRow();
  const imageLabel = imageRow.insertCell();
  imageLabel.textContent = "Imagen:";
  const imageInputCell = imageRow.insertCell();
  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "fileimg";
  imageInput.name = "fileimg";
  imageInputCell.appendChild(imageInput);

  const createButton = document.createElement("button");
  createButton.textContent = "Crear Producto";
  createButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const productId = nameInput.value.toLowerCase().replace(/\s/g, "-");
      const archivourl = await archivoimg(imageInput.files[0], nameInput.value);
      await addProduct(productId, nameInput.value, descriptionInput.value, priceInput.value, archivourl);
      alert("Producto creado correctamente.");
      card.remove();
      await loadProducts(); // Actualiza la lista de productos después de crear uno nuevo
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error al crear producto. Consulta la consola para más detalles.");
    }
  });

  form.appendChild(table);
  form.appendChild(createButton);
  card.appendChild(form);
  productsListElement.appendChild(card);
}

