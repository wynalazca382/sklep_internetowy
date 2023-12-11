import { Product } from "../components/products/ProductModel";

require('dotenv').config();
import mongoose from 'mongoose';

const mongoURI = process.env.dbURI||'mongodb+srv://konradwarchol7:cGjzPJIbPy38zrbx@cluster0.sgownai.mongodb.net/';

mongoose.connect(mongoURI)
.then(async () => {
  console.log('Connected to MongoDB');

  const getAllProducts = async () => {
    try {
      console.log('Retrieving all products...');
      const allProducts = await Product.find({}).exec(); // Załóż, że Product jest poprawnym modelem
      console.log('All products:', allProducts);
      return allProducts;
    } catch (error) {
      console.error('Error while fetching products:', error);
      throw error;
    }
  };

  const addNewProduct = async (newProductData: typeof Product) => {
    try {
      console.log('Adding a new product...');
      const newProduct = new Product(newProductData); // Załóż, że Product jest poprawnym modelem
      const savedProduct = await newProduct.save();
      console.log('New product saved:', savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('Error while saving new product:', error);
      throw error;
    }
  };
  
  module.exports = {
    getAllProducts,
    addNewProduct,
  };
})
.catch((err: any) => {
  console.error('Connection error', err);
});
