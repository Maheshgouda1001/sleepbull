"use client";

import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "sleepbull_cart";
export const CART_CHANGED_EVENT = "sleepbull-cart-changed";

function emitCartChanged() {
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

function getCartItemKey(product: Product) {
  return product.cartKey ?? [product.id, product.variantId, product.fabricId].filter(Boolean).join(":");
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitCartChanged();
}

export function cartCount(items = readCart()) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function cartSubtotal(items = readCart()) {
  return items.reduce(
    (total, item) => total + item.product.salePrice * item.quantity,
    0
  );
}

export function addToCart(product: Product, quantity = 1) {
  const items = readCart();
  const productKey = getCartItemKey(product);
  const existing = items.find(
    (item) => getCartItemKey(item.product) === productKey
  );

  if (existing) {
    existing.quantity += quantity;
    writeCart(items);
    return;
  }

  writeCart([...items, { product, quantity }]);
}

export function updateCartQuantity(productId: string, quantity: number) {
  const nextItems = readCart()
    .map((item) =>
      getCartItemKey(item.product) === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )
    .filter((item) => item.quantity > 0);

  writeCart(nextItems);
}

export function removeFromCart(productId: string) {
  writeCart(
    readCart().filter((item) => getCartItemKey(item.product) !== productId)
  );
}

export function clearCart() {
  writeCart([]);
}
