import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Drawer from "@/components/ui/Drawer";
import Cart from "@/components/minicart/Cart";
import ProductList from "@/components/products/ProductList";
import { getAllProducts } from "@/stores/useProductsStore";
import { IProduct } from "@/components/products/ProductModel";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const fetchedProducts: IProduct[] = await getAllProducts(); // Rzutujemy na IProduct[]
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        const err = new Error('Error while fetching products'); // Tworzymy nowy obiekt błędu
        console.error('Error while fetching products:', error);
        setError(err); // Ustawiamy nowy obiekt błędu
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <>
      <Header onCartIconClick={handleCartIconClick} />
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart />
      </Drawer>
      <main className='container mx-auto md:w-10/12 py-8 px-4'>
        {isLoading ? <div className='text-center text-lg'>Loading...</div> : <ProductList products={products || []} />}
        {error && <div className='text-center text-red-500'>Error: {error.message}</div>}
      </main>
    </>
  )
}
