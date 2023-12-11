require('dotenv').config();
import { Product, IProduct } from "../components/products/ProductModel"; 
const mongoURI = process.env.dbURI;
const mongoose = require('mongoose');

mongoose.connect(mongoURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err: any) => {
  console.error('Connection error', err);
});

export const getAllProducts = async () => {
  try {
    console.log('Retrieving all products...');
    const allProducts = await Product.find({}).exec();
    console.log('All products:', allProducts);
    return allProducts;
  } catch (error) {
    console.error('Error while fetching products:', error);
    throw error;
  }
};

export const addNewProduct = async (newProductData: IProduct) => {
  try {
    console.log('Adding a new product...');
    const newProduct = new Product(newProductData);
    const savedProduct = await newProduct.save();
    console.log('New product saved:', savedProduct);
    return savedProduct;
  } catch (error) {
    console.error('Error while saving new product:', error);
    throw error;
  }
};
