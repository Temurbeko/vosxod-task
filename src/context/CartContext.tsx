"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Product } from "@/types";
import { formatMoney } from "@/utils";

const CartContext = createContext<
  ReturnType<typeof useCartContext> | undefined
>(undefined);
const useCartContext = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const incrementQuantity = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const getTotalPrice = () => {
    return formatMoney(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  return {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
    getCartCount,
  };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const props = useCartContext();
  return <CartContext.Provider value={props}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
