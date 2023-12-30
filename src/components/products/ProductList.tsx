import ProductCard from "./ProductCard"
import { Product } from "@/types.d"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export default function ProductList({ products, onEdit, onDelete }: Props) {
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const router = useRouter();

  useEffect(() => {
    sortProducts(sortOption, selectedCategory);
  }, [sortOption, selectedCategory]);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const sortProducts = (selectedOption, category) => {
    let sortedProductsCopy = [...products];

    switch (selectedOption) {
      case 'name-asc':
        sortedProductsCopy = sortedProductsCopy.sort((a, b) =>
          a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
        );
        break;
      case 'name-desc':
        sortedProductsCopy = sortedProductsCopy.sort((a, b) =>
          a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1
        );
        break;
      case 'price-high':
        sortedProductsCopy = sortedProductsCopy.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sortedProductsCopy = sortedProductsCopy.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    filterProducts(selectedOption, category, sortedProductsCopy);
  };

  const filterProducts = (selectedOption, category, productsToFilter) => {
    let filteredProducts = [...productsToFilter];

    if (category !== 'all') {
      filteredProducts = productsToFilter.filter(
        (product) => product.category === category
      );
    }

    switch (selectedOption) {
      case 'name-asc':
        filteredProducts = filteredProducts.sort((a, b) =>
          a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
        );
        break;
      case 'name-desc':
        filteredProducts = filteredProducts.sort((a, b) =>
          a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1
        );
        break;
      case 'price-high':
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    setSortedProducts(filteredProducts);
  };

  return (
    <>
      {router.pathname === '/admin' && (
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-semibold'>Products</h1>
          <div>
            <select value={sortOption} onChange={handleSortChange}>
              <option value='default'>Sort by...</option>
              <option value='name-asc'>Name A-Z</option>
              <option value='name-desc'>Name Z-A</option>
              <option value='price-high'>Price High to Low</option>
              <option value='price-low'>Price Low to High</option>
            </select>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value='all'>All Categories</option>
              {[...new Set(products.map((product) => product.category))].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {sortedProducts.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              {router.pathname === '/admin' && (
                <div className="absolute top-0 right-0 p-2">
                  <button onClick={() => onEdit(product)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => onDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
    </>
  );
}
