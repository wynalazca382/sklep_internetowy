import { create } from 'zustand';
import { db } from '../utils/firebase';

interface State {
  products: Product[];
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
  fetchProductDetails: (productId: string) => Promise<void>; // Dodana funkcja do pobierania szczegółów produktu
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
};

export const useProductsStore = create<State & Actions>((set) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  fetchData: async () => {
    try {
      console.log('Fetching data...');
      set({ isLoading: true, error: null });

      const collectionRef = db.collection('products');
      const snapshot = await collectionRef.get();
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...(doc.data() as Product),
      }));

      console.log('Data:', data);
      set({ products: data, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ error, isLoading: false });
    }
  },
  fetchProductDetails: async (productId: string) => {
    try {
      console.log('Fetching product details...');
      set({ isLoading: true, error: null });

      const productRef = db.collection('products').doc(productId);
      const doc = await productRef.get();

      if (doc.exists) {
        const productData = { docId: doc.id, ...(doc.data() as Product) };
        console.log('Product Details:', productData);
        set({ products: [productData], isLoading: false }); // Zapisuje tylko jeden produkt do stanu
      } else {
        console.log('No such document!');
        set({ error: 'Product not found', isLoading: false });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      set({ error, isLoading: false });
    }
  },
}));
