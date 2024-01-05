import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProductsStore } from '../stores/useProductsStore';
import { useCartStore } from '../stores/useCartStore';
import { Product } from '@/types.d';
import Header from '@/components/ui/Header';
import Drawer from '@/components/ui/Drawer';
import Cart from '@/components/minicart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { ProductGallery } from '@/components/products/ProductGallery';

export default function ProductDetails() {
  const router = useRouter();
  const { fetchProductDetails, productDetails, isLoading, products } = useProductsStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const { productId } = router.query;

  useEffect(() => {
    if (productId && !isLoading) {
      fetchProductDetails(productId as string).then(() => {
        setIsDataLoaded(true);
      });
    }
  }, [productId, isLoading, fetchProductDetails]);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const nextPage = () => {
    setStartIndex((prev) => Math.min(prev + itemsPerPage, products.length - itemsPerPage));
  };

  const prevPage = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  return (
    <>
      <Header onCartIconClick={handleCartIconClick} />
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart />
      </Drawer>
      <div>
        {!isDataLoaded && <p>Ładowanie...</p>}
        {isDataLoaded && !productDetails && <p>Produkt nie znaleziony</p>}
        {isDataLoaded && productDetails && (
          <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl flex flex-col p-4 relative'>
            <h1 className='text-2xl font-semibold mb-2'>{productDetails.title}</h1>
            <div className='relative'>
              <img
                src={productDetails.images[0]}
                alt={productDetails.title}
                width={100}
                height={100}
                className='object-contain w-full h-40'
              />
            </div>
            <p>{productDetails.description}</p>
            <p>Cena: ${productDetails.price.toFixed(2)}</p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <p className='mr-2'>Ocena:</p>
                {productDetails.rating > 0 &&
                  Array.from({ length: productDetails.rating }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={solidStar} className='text-yellow-500' />
                  ))}
                <p>({productDetails.rating})</p>
              </div>
            </div>
            <button onClick={() => addToCart(productDetails)}>Dodaj do koszyka</button>
          </div>
        )}
      </div>
      {isDataLoaded && productDetails && (
        <div className='container mx-auto px-4 mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>Inne produkty z tej samej kategorii</h2>
          <div className='flex items-center justify-center'>
            <button onClick={prevPage} disabled={startIndex === 0} className="px-4 py-2 bg-gray-300 rounded">
              {'<'}
            </button>
            <div>
              <ProductGallery
                products={products.filter((prod) => prod.category === productDetails.category && prod.id !== productDetails.id)}
                startIndex={startIndex}
                itemsPerPage={itemsPerPage}
              />
            </div>
            <button onClick={nextPage} disabled={startIndex + itemsPerPage >= products.length} className="px-4 py-2 bg-gray-300 rounded">
              {'>'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
