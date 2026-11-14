import { CartItem } from "../types/cart.type";

const CART_KEY = "keranjang";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(CART_KEY);

  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);

  if (!Array.isArray(parsed)) {
    throw new Error("Format keranjang tidak valid.");
  }

  return parsed as CartItem[];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("keranjang-updated"));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);

  window.dispatchEvent(new Event("keranjang-updated"));
};