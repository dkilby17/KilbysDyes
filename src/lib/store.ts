import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.productId === item.productId && i.size === item.size);
        if (existingItem) {
          return {
            items: state.items.map(i => 
              (i.productId === item.productId && i.size === item.size) 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter(i => !(i.productId === productId && i.size === size))
      })),
      updateQuantity: (productId, size, quantity) => set((state) => ({
        items: state.items.map(i => 
          (i.productId === productId && i.size === size) 
            ? { ...i, quantity } 
            : i
        )
      })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'kilbysdyes-cart', // key in local storage
    }
  )
);
