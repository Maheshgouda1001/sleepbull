"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import {
  CartItem,
  cartSubtotal,
  readCart,
  removeFromCart,
  updateCartQuantity,
} from "@/lib/cart-storage";
import { formatPrice } from "@/lib/helpers";

export default function CartClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  function refresh() {
    setItems(readCart());
  }

  const subtotal = cartSubtotal(items);

  return (
    <Container className="py-16">
      <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[1.5px] text-secondary">
            SleepBull Cart
          </p>
          <h1 className="mt-2 text-4xl font-bold text-text-primary">
            Your sleep setup
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
            <Truck size={16} /> Free doorstep delivery
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
            <ShieldCheck size={16} /> COD available
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-section px-6 py-16 text-center">
          <ShoppingBag className="mx-auto text-primary" size={42} />
          <h2 className="mt-5 text-2xl font-bold">Your cart is empty</h2>
          <p className="mx-auto mt-3 max-w-xl text-text-secondary">
            Choose a mattress and it will wait here while you finish shopping.
          </p>
          <Link
            href="/categories/mattresses"
            className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-text-white transition hover:bg-primary-hover"
          >
            Browse Mattresses
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((item) => {
              const imageSrc = item.product.images[0]?.image ?? "/images/placeholder.svg";
              const itemKey = item.product.cartKey ?? item.product.id;

              return (
                <div
                  key={itemKey}
                  className="grid gap-5 rounded-2xl border border-border bg-white p-4 shadow-sm sm:grid-cols-[150px_1fr]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-section">
                    <Image
                      src={imageSrc}
                      alt={item.product.name}
                      fill
                      unoptimized={imageSrc.startsWith("/api/assets/")}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-5">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[1.2px] text-text-light">
                          {item.product.category.name}
                        </p>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="mt-1 block text-xl font-bold text-text-primary transition hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-2 text-sm text-text-secondary">
                          {[item.product.size, item.product.fabric, item.product.warranty || "SleepBull warranty"]
                            .filter(Boolean)
                            .join(" | ")}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removeFromCart(itemKey);
                          refresh();
                        }}
                        className="h-10 w-10 rounded-full border border-border text-text-light transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        aria-label="Remove item"
                      >
                        <Trash2 className="mx-auto" size={18} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center rounded-full border border-border bg-section p-1">
                        <button
                          type="button"
                          onClick={() => {
                            updateCartQuantity(itemKey, item.quantity - 1);
                            refresh();
                          }}
                          className="grid h-9 w-9 place-items-center rounded-full bg-white text-primary shadow-sm"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => {
                            updateCartQuantity(itemKey, item.quantity + 1);
                            refresh();
                          }}
                          className="grid h-9 w-9 place-items-center rounded-full bg-white text-primary shadow-sm"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-text-light">Item total</p>
                        <p className="text-xl font-bold text-text-primary">
                          {formatPrice(item.product.salePrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-primary p-6 text-text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[1.4px] text-white/60">
              Order Summary
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Delivery</span>
                <strong>Free</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Payment</span>
                <strong>Cash on delivery</strong>
              </div>
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <div className="flex items-end justify-between">
                <span className="text-white/70">Grand total</span>
                <strong className="text-3xl">{formatPrice(subtotal)}</strong>
              </div>
              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-4 font-bold text-primary transition hover:bg-secondary-hover"
              >
                <ShoppingBag size={20} />
                Checkout COD
              </Link>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}
