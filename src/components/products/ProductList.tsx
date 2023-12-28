import ProductCard from "./ProductCard"
import { Product } from "@/types.d"
import React, { useState, useEffect } from 'react';

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  useEffect(() => {
    sortProducts(sortOption, selectedCategory, ratingFilter, priceFrom, priceTo);
  }, [sortOption, selectedCategory, ratingFilter, priceFrom, priceTo]);

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleRatingFilterChange = (e) => {
    const rating = e.target.value;
    setRatingFilter(rating);
  };

  const handlePriceFromChange = (e) => {
    const price = e.target.value;
    setPriceFrom(price);
  };

  const handlePriceToChange = (e) => {
    const price = e.target.value;
    setPriceTo(price);
  };

  const sortProducts = (selectedOption, category, rating, fromPrice, toPrice) => {
    let sortedProductsCopy = [...products];

    switch (selectedOption) {
      case 'name-asc':
        sortedProductsCopy.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sortedProductsCopy.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-high':
        sortedProductsCopy.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sortedProductsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        sortedProductsCopy.sort((a, b) => b.rating - a.rating);
        break;
      case 'stock':
        sortedProductsCopy.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    let filteredProducts = [...sortedProductsCopy];

    if (category !== 'all') {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    if (rating !== '') {
      filteredProducts = filteredProducts.filter((product) => product.rating >= parseFloat(rating));
    }

    if (fromPrice !== '' && toPrice !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseFloat(fromPrice) && product.price <= parseFloat(toPrice)
      );
    }

    setSortedProducts(filteredProducts);
  };

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-semibold'>Products</h1>
        <div>
          <select value={sortOption} onChange={handleSortChange}>
            <option value='default'>Sort by...</option>
            <option value='name-asc'>Name A-Z</option>
            <option value='name-desc'>Name Z-A</option>
            <option value='price-high'>Price High to Low</option>
            <option value='price-low'>Price Low to High</option>
            <option value='rating'>Rating</option>
            <option value='stock'>Stock</option>
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
          <input
            type='number'
            step='0.5'
            min='1'
            max='5'
            placeholder='Rating'
            value={ratingFilter}
            onChange={handleRatingFilterChange}
          />
          <input
            type='number'
            placeholder='Price from'
            value={priceFrom}
            onChange={handlePriceFromChange}
          />
          <input
            type='number'
            placeholder='Price to'
            value={priceTo}
            onChange={handlePriceToChange}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
