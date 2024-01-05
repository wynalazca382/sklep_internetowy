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
  const [startIndexSameCategory, setStartIndexSameCategory] = useState(0);
  const [startIndexOthersBought, setStartIndexOthersBought] = useState(0);
  const itemsPerPage = 4;
  const items = 12;

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

  const nextPageSameCategory = () => {
    const productsInCategory = getProductsInCategory(); 
    setStartIndexSameCategory((prev) => Math.min(prev + itemsPerPage, productsInCategory.length - itemsPerPage));
  };

  const prevPageSameCategory = () => {
    setStartIndexSameCategory((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const nextPageOthersBought = () => {
    const topRatedProducts = getTopRatedProducts(); 
    setStartIndexOthersBought((prev) => Math.min(prev + itemsPerPage, topRatedProducts.length - itemsPerPage));
  };

  const prevPageOthersBought = () => {
    setStartIndexOthersBought((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const getProductsInCategory = () => {
    return products.filter(
      (prod) => prod.category === productDetails?.category && prod.id !== productDetails?.id
    );
  };

  const getTopRatedProducts = () => {
    return products.filter(
      (prod) => prod.rating >= 4 && prod.id !== productDetails?.id
    );
  };

  const canGoNextSameCategory = startIndexSameCategory + itemsPerPage < getProductsInCategory().length;
  const canGoPrevSameCategory = startIndexSameCategory > 0;

  const canGoNextOthersBought = startIndexOthersBought + itemsPerPage < items;
  const canGoPrevOthersBought = startIndexOthersBought > 0;

  let filteredProductsSameCategory = getProductsInCategory().slice(startIndexSameCategory, startIndexSameCategory + items);
  let filteredTopProductsOthersBought = getTopRatedProducts().slice(startIndexOthersBought, startIndexOthersBought + items);

  return (
    <>
      <Header onCartIconClick={handleCartIconClick} />
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart />
      </Drawer>
      <div>
        {!isDataLoaded && <p>Loading...</p>}
        {isDataLoaded && !productDetails && <p>Product not found</p>}
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
            <p>Price: ${productDetails.price.toFixed(2)}</p>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <p className='mr-2'>Rating:</p>
                {productDetails.rating > 0 &&
                  Array.from({ length: productDetails.rating }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={solidStar} className='text-yellow-500' />
                  ))}
                <p>({productDetails.rating})</p>
              </div>
            </div>
            <button onClick={() => addToCart(productDetails)}>Add to Cart</button>
          </div>
        )}
      </div>
      {isDataLoaded && productDetails && (
        <div className='container mx-auto px-4 mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>Other Products in the Same Category</h2>
          <div className='flex items-center justify-center w-full mx-auto'>
            <button
              onClick={prevPageSameCategory}
              disabled={!canGoPrevSameCategory}
              className={`px-4 py-2 bg-gray-300 rounded transition-transform duration-300 transform-gpu hover:scale-105 ${
                !canGoPrevSameCategory ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {'<'}
            </button>
            <div className='mx-4'>
              <ProductGallery
                products={filteredProductsSameCategory}
                startIndex={startIndexSameCategory}
                itemsPerPage={itemsPerPage}
              />
            </div>
            <button
              onClick={nextPageSameCategory}
              disabled={!canGoNextSameCategory}
              className={`px-4 py-2 bg-gray-300 rounded transition-transform duration-300 transform-gpu hover:scale-105 ${
                !canGoNextSameCategory ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
      {isDataLoaded && productDetails && (
        <div className='container mx-auto px-4 mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>Others Also Bought</h2>
          <div className='flex items-center justify-center w-full mx-auto'>
            <button
              onClick={prevPageOthersBought}
              disabled={!canGoPrevOthersBought}
              className={`px-4 py-2 bg-gray-300 rounded transition-transform duration-300 transform-gpu hover:scale-105 ${
                !canGoPrevOthersBought ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {'<'}
            </button>
            <div className='mx-4'>
              <ProductGallery
                products={filteredTopProductsOthersBought}
                startIndex={startIndexOthersBought}
                itemsPerPage={itemsPerPage}
              />
            </div>
            <button
              onClick={nextPageOthersBought}
              disabled={!canGoNextOthersBought}
              className={`px-4 py-2 bg-gray-300 rounded transition-transform duration-300 transform-gpu hover:scale-105 ${
                !canGoNextOthersBought ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
