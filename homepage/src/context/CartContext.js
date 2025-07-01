import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const PRODUCTS_URL = `${process.env.PUBLIC_URL}/products.json`;

const cartReducer = (state, action) => {
  console.log('🛒 CartReducer: Action dispatched:', action.type, action.payload);
  
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD_ITEM': {
      const { item } = action.payload;
      const product = state.products.find((p) => p.id === item.id);

      // Don't add if product not found or out of stock
      if (!product || product.inventory <= 0) return state;

      const updatedProducts = state.products.map((p) =>
        p.id === item.id ? { ...p, inventory: p.inventory - 1 } : p
      );

      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return { ...state, items: updatedItems, products: updatedProducts };
      }
      
      const updatedItems = [...state.items, { ...item, quantity: 1 }];
      return { ...state, items: updatedItems, products: updatedProducts };
    }
    case 'REMOVE_ITEM': {
        const { id } = action.payload;
        const itemToRemove = state.items.find((i) => i.id === id);
        const product = state.products.find((p) => p.id === id);
        if (!itemToRemove || !product) return state;

        const updatedProducts = state.products.map((p) =>
            p.id === id ? { ...p, inventory: p.inventory + itemToRemove.quantity } : p
        );
        const updatedItems = state.items.filter((i) => i.id !== id);
        return { ...state, items: updatedItems, products: updatedProducts };
    }
    case 'UPDATE_QUANTITY': {
        const { id, quantity } = action.payload;
        const itemToUpdate = state.items.find((i) => i.id === id);
        const product = state.products.find((p) => p.id === id);
        if (!itemToUpdate || !product) return state;

        const quantityChange = quantity - itemToUpdate.quantity;

        // Don't allow quantity to exceed available inventory
        if (quantityChange > product.inventory) return state;

        const updatedProducts = state.products.map((p) =>
            p.id === id ? { ...p, inventory: p.inventory - quantityChange } : p
        );
        const updatedItems = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
        ).filter(item => item.quantity > 0); // Remove if quantity is 0 or less
        
        return { ...state, items: updatedItems, products: updatedProducts };
    }
    case 'CLEAR_CART': {
        const updatedProducts = state.products.map(p => {
            const itemInCart = state.items.find(i => i.id === p.id);
            if (itemInCart && p.inventory !== undefined) {
                return { ...p, inventory: p.inventory + itemInCart.quantity };
            }
            return p;
        });
        return { ...state, items: [], products: updatedProducts };
    }
    case 'LOAD_CART': {
      // Filter out items that don't have corresponding products
      const validItems = action.payload.items.filter(item => 
        state.products.find(p => p.id === item.id)
      );
      return { ...state, items: validItems };
    }
    default:
      return state;
  }
};

const initialState = {
  items: [],
  products: [], // Products will be loaded from fetch
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Fetch products and then load cart from localStorage
    const fetchData = async () => {
      try {
        const productsResponse = await fetch(PRODUCTS_URL);
        const productsData = await productsResponse.json();
        dispatch({ type: 'SET_PRODUCTS', payload: productsData });

        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: { items: parsedCart.items || [] } });
        }
      } catch (error) {
        console.error("Failed to fetch products or load cart:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (state.products.length > 0) {
      localStorage.setItem('shoppingCart', JSON.stringify({ items: state.items }));
    }
  }, [state.items, state.products]);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: { item } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cart = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}; 