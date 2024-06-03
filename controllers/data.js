import { app } from "./global.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const db = getFirestore(app);

export { db }; 

export const getAllProducts = async () => {
  const productsSnapshot = await getDocs(collection(db, "productos"));
  const productsList = [];
  productsSnapshot.forEach((doc) => {
    productsList.push({ id: doc.id, ...doc.data() }); // Incluye el ID del documento
  });
  return productsList;
};

export const addProduct = async (id, name, description, price, imageUrl) => {
  try {
    await setDoc(doc(collection(db, "productos"), id), {
      id: id,
      name: name,
      description: description,
      price: price,
      addm : false,
      imageUrl: imageUrl // Agrega la URL de la imagen
    });
    console.log("Producto agregado correctamente a la base de datos.");
    return true;
  } catch (error) {
    console.error("Error al agregar producto:", error);
    return false;
  }
};

export const getProductData = async (id) => await getDoc(doc(db, "productos", id));

export const deleteProduct = async (id) => 
  await deleteDoc(doc(db, "productos", id));

export const updateProductData = async (id, newData) => {
  try {
    const productRef = doc(db, "productos", id);
    await updateDoc(productRef, newData);
    console.log("Datos del producto actualizados correctamente.");
    return true;
  } catch (error) {
    console.error("Error al actualizar datos del producto:", error);
    return false;
  }
};
