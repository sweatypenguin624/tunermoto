import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
    customer: {
        name: string;
        email: string;
        address: string;
    };
}

interface OrderState {
    orders: Order[];
    addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: [],
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
        }),
        {
            name: 'merchstore-orders',
        }
    )
);

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    getSummary: () => { subtotal: number; shipping: number; total: number };
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => set((state) => {
                const existingItemIndex = state.items.findIndex(
                    (item) => item.id === newItem.id && item.size === newItem.size
                );

                if (existingItemIndex > -1) {
                    const updatedItems = [...state.items];
                    // Determine quantity to add (default to 1 if not specified)
                    const qtyToAdd = newItem.quantity || 1;
                    updatedItems[existingItemIndex].quantity += qtyToAdd;
                    return { items: updatedItems };
                }

                return { items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }] };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),

            updateQuantity: (id, delta) => set((state) => {
                const updatedItems = state.items.map((item) => {
                    if (item.id === id) {
                        const newQuantity = Math.max(1, item.quantity + delta);
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
                return { items: updatedItems };
            }),

            clearCart: () => set({ items: [] }),

            getSummary: () => {
                const items = get().items;
                const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                const shipping = subtotal > 100 ? 0 : 15; // Free shipping logic
                const total = subtotal + shipping;
                return { subtotal, shipping, total };
            }
        }),
        {
            name: 'merchstore-cart',
        }
    )
);
