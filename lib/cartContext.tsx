"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";
import { CartItem, cartUtils, CART_STORAGE_KEY } from "./cart";
import { Product } from "./products";

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isHydrated: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        setItems([]);
      }
    }
    setIsHydrated(true);
  }, []);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems((prevItems) => cartUtils.addToCart(prevItems, product, quantity));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prevItems) => cartUtils.removeFromCart(prevItems, productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prevItems) =>
      cartUtils.updateQuantity(prevItems, productId, quantity),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems(cartUtils.clearCart());
  }, []);

  const getTotalItems = useCallback(() => {
    return cartUtils.getTotalItems(items);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return cartUtils.getTotalPrice(items);
  }, [items]);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isHydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
