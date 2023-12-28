import ProductCard from "./ProductCard"
import SortBy from 'sort-by'
import { Product } from "@/types.d"
import React, { useState } from 'react';

interface Props {
	products: Product[]
}

export default function ProductList({ products }: Props) {
	const [sortedProducts, setSortedProducts] = useState([...products]);
	const [sortOption, setSortOption] = useState('default');
  
	const handleSortChange = (e) => {
	  const selectedOption = e.target.value;
	  setSortOption(selectedOption);
  
	  switch (selectedOption) {
		case 'name-asc':
		  sortByNameAsc();
		  break;
		case 'name-desc':
		  sortByNameDesc();
		  break;
		case 'price-high':
		  sortByPriceHigh();
		  break;
		case 'price-low':
		  sortByPriceLow();
		  break;
		default:
		  setSortedProducts([...products]);
		  break;
	  }
	};
  
	const sortByNameAsc = () => {
	  const sortedByNameAsc = [...products].sort((a, b) =>
		a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
	  );
	  setSortedProducts(sortedByNameAsc);
	};
  
	const sortByNameDesc = () => {
	  const sortedByNameDesc = [...products].sort((a, b) =>
		a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1
	  );
	  setSortedProducts(sortedByNameDesc);
	};
  
	const sortByPriceHigh = () => {
	  const sortedByPriceHigh = [...products].sort((a, b) => b.price - a.price);
	  setSortedProducts(sortedByPriceHigh);
	};
  
	const sortByPriceLow = () => {
	  const sortedByPriceLow = [...products].sort((a, b) => a.price - b.price);
	  setSortedProducts(sortedByPriceLow);
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
			</select>
		  </div>
		</div>
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
		  {sortedProducts.map(product => (
			<ProductCard key={product.id} product={product} />
		  ))}
		</div>
	  </>
	);
  }