// stores/useProductsStore.ts
import { create } from 'zustand';
import { db } from '../utils/firebase';

interface State {
  products: Product[];
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
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
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      console.log('Data:', data);
      set({ products: data, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ error, isLoading: false });
    }
  },
}));
