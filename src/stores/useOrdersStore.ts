import { create } from 'zustand';
import { db } from '../utils/firebase';

interface State {
  orders: Order[];
  isLoading: boolean;
  error: any;
}

interface Actions {
  fetchData: (userId:string) => Promise<void>;
}

const INITIAL_STATE: State = {
  orders: [],
  isLoading: false,
  error: null,
};

export const useOrdersStore = create<State & Actions>((set) => ({
  orders: INITIAL_STATE.orders,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  fetchData: async (userId) => {
    try {
      console.log('Fetching data...');
      set({ isLoading: true, error: null });

      const collectionRef = db.collection('orders').doc(userId).collection('zamowienia');
      const snapshot = await collectionRef.get();
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...(doc.data() as Order),
      }));

      console.log('Data:', data);
      set({ orders: data, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ error, isLoading: false });
    }
  },
}));
