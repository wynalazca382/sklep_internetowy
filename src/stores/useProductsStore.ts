import { create } from "zustand"

import { Product } from "../data/ProductModel"

const mongoURI = process.env.dbURI;
const mongoose = require('mongoose');

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Funkcja do odczytu wszystkich produktów
	const getAllProducts = async () => {
		try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	
		const allProducts = await Product.find({}); // Pobierz wszystkie produkty z bazy danych
		console.log('All products:', allProducts);
	
		return allProducts;
		} catch (error) {
		console.error('Error while fetching products:', error);
		throw error; // Rzuć błąd, aby obsłużyć go w kodzie, który wywołuje tę funkcję
		}
	};
	const addNewProduct = async (newProductData) => {
		try {
		  await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		  });
		  console.log('Connected to MongoDB');
	  
		  const newProduct = new Product(newProductData); // Stwórz nowy obiekt produktu
		  const savedProduct = await newProduct.save(); // Zapisz nowy produkt do bazy danych
		  console.log('New product saved:', savedProduct);
	  
		  return savedProduct;
		} catch (error) {
		  console.error('Error while saving new product:', error);
		  throw error; // Rzuć błąd, aby obsłużyć go w kodzie, który wywołuje tę funkcję
		}
	  };
	  
	  module.exports = {
		getAllProducts,
		addNewProduct,
	  };
})
.catch((err) => {
  console.error('Connection error', err);
});
