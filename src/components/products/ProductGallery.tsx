import React from 'react';
import { Product } from '@/types.d';
import ProductCard from './ProductCard';

export function ProductGallery({ products, startIndex, itemsPerPage }: { products: Product[]; startIndex: number; itemsPerPage: number }) {
  const productsToDisplay = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {productsToDisplay.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
