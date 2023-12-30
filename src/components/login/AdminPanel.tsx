import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Drawer from "@/components/ui/Drawer";
import Cart from "@/components/minicart/Cart";
import ProductList from "@/components/products/ProductList";
import ProductEditor from "@/components/products/ProductEditor"; // Import komponentu do edycji produktów
import { useProductsStore } from "@/stores/useProductsStore";
import { db } from '../../utils/firebase';
import { useRouter } from 'next/router';

const Home =() => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Do śledzenia wybranego produktu do edycji
  const [isEdited, setEdited] = useState(false); 
  const router = useRouter();
  const { products, isLoading, error, fetchData, deleteProduct } = useProductsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
    setEdited(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await db.collection('products').doc(productId).delete();
      console.log(`Usunięto produkt o ID: ${productId}`);
      router.push('/');
      router.push('/admin');
    } catch (error) {
      console.error("Błąd podczas usuwania produktu:", error);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null); // Wyczyszczenie wybranego produktu przed dodaniem nowego
    setIsDrawerOpen(true);
    setEdited(false);
  };
  const handleSaveFunction = async (formData) => {
    try {
      // Konwertuj niektóre wartości do odpowiednich typów
      const price = parseFloat(formData.price);
      const stock = parseInt(formData.stock);
      const rating = parseFloat(formData.rating);
      const discountPercentage = parseFloat(formData.discountPercentage);
  
      const updatedProductData = {
        title: formData.name,
        price: !isNaN(price) ? price : 0, // Upewnij się, że price jest liczbą, inaczej ustaw na 0
        description: formData.description,
        brand: formData.brand,
        category: formData.category,
        stock: !isNaN(stock) ? stock : 0, // Upewnij się, że stock jest liczbą, inaczej ustaw na 0
        rating: !isNaN(rating) ? rating : 0, // Upewnij się, że rating jest liczbą, inaczej ustaw na 0
        thumbnail: formData.thumbnail,
        discountPercentage: !isNaN(discountPercentage) ? discountPercentage : 0, // Upewnij się, że discountPercentage jest liczbą, inaczej ustaw na 0
        images: formData.images || [],
        id: selectedProduct.id,
      };
      if (isEdited) {
        // Jeśli produkt ma ID, to znaczy, że edytujemy istniejący produkt
        await db.collection('products').doc(selectedProduct.docId).update(updatedProductData);
      } else {
        // Jeśli produkt nie ma ID, to znaczy, że dodajemy nowy produkt
        const newProductRef = await db.collection('products').add(updatedProductData);
  
        // Ustaw ID produktu w formie, abyśmy go mieli, gdy będziemy go edytować
        await newProductRef.update({ id: newProductRef.id });
      }
      console.log("Zapisano produkt:", updatedProductData);
      router.push('/');
    } catch (error) {
      console.error("Błąd podczas zapisywania produktu:", error);
    }
  };

  return (
    <>
      <Header onCartIconClick={handleCartIconClick} />
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        {/* Wykorzystaj ProductEditor do edycji i dodawania produktów */}
        <ProductEditor product={selectedProduct} onClose={() => setIsDrawerOpen(false)} handleSave={handleSaveFunction} />
        <Cart />
      </Drawer>
      <h1>Admin panel</h1>
      <main className="container mx-auto md:w-10/12 py-8 px-4">
        <div className="mb-4">
          <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
            Dodaj nowy produkt
          </button>
        </div>
        {isLoading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      </main>
    </>
  );
};

export default Home;