"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CreditCard, Loader2, MapPin, PackageCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import Container from "@/components/layout/Container";
import { CartItem, cartSubtotal, clearCart, readCart } from "@/lib/cart-storage";
import { formatPrice } from "@/lib/helpers";
import { getProfileClient } from "@/services/auth.service";
import { placeCodOrder } from "@/services/order.service";

export default function CheckoutClient() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setItems(readCart());
    getProfileClient().then((profile) => {
      setIsLoggedIn(Boolean(profile));
      setCheckingAuth(false);
    });
  }, []);

  const subtotal = cartSubtotal(items);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    try {
      const order = await placeCodOrder({
        customerName: String(formData.get("customerName") ?? ""),
        customerEmail: String(formData.get("customerEmail") ?? ""),
        customerPhone: String(formData.get("customerPhone") ?? ""),
        shippingAddress: {
          line1: String(formData.get("line1") ?? ""),
          line2: String(formData.get("line2") ?? ""),
          city: String(formData.get("city") ?? ""),
          state: String(formData.get("state") ?? ""),
          postalCode: String(formData.get("postalCode") ?? ""),
          country: "India",
        },
        items: items.map((item) => ({
          productId: item.product.id,
          variantId: item.product.variantId,
          fabricId: item.product.fabricId,
          quantity: item.quantity,
        })),
      });

      clearCart();
      setItems([]);
      setOrderNumber(order.orderNumber);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to place order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderNumber) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 text-center shadow-xl">
          <CheckCircle2 className="mx-auto text-secondary" size={54} />
          <h1 className="mt-5 text-4xl font-bold text-text-primary">
            Order placed
          </h1>
          <p className="mt-4 text-text-secondary">
            Your cash on delivery order is confirmed. Keep this order number handy.
          </p>
          <p className="mt-6 rounded-xl bg-section px-5 py-4 text-2xl font-bold text-primary">
            {orderNumber}
          </p>
          <Link
            href="/categories/mattresses"
            className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-text-white transition hover:bg-primary-hover"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  if (checkingAuth) {
    return (
      <Container className="py-20">
        <div className="rounded-2xl border border-border bg-section px-6 py-16 text-center">
          <Loader2 className="mx-auto animate-spin text-primary" size={42} />
          <h1 className="mt-5 text-2xl font-bold text-text-primary">
            Checking your login
          </h1>
        </div>
      </Container>
    );
  }

  if (!isLoggedIn) {
    return (
      <Container className="py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
          <PackageCheck className="mx-auto text-primary" size={44} />
          <h1 className="mt-5 text-3xl font-bold text-text-primary">
            Login required
          </h1>
          <p className="mt-3 text-text-secondary">
            Please login before placing a cash on delivery order.
          </p>
          <Link
            href="/profile"
            className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-text-white transition hover:bg-primary-hover"
          >
            Login To Continue
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[1.5px] text-secondary">
          Secure Checkout
        </p>
        <h1 className="mt-2 text-4xl font-bold text-text-primary">
          Cash on delivery
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-section px-6 py-16 text-center">
          <PackageCheck className="mx-auto text-primary" size={44} />
          <h2 className="mt-5 text-2xl font-bold">No items to checkout</h2>
          <Link
            href="/cart"
            className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-text-white transition hover:bg-primary-hover"
          >
            Go To Cart
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <MapPin className="text-primary" size={22} />
              <h2 className="text-2xl font-bold text-text-primary">
                Delivery details
              </h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input name="customerName" required placeholder="Full name" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary" />
              <input name="customerPhone" required placeholder="Phone number" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary" />
              <input name="customerEmail" required type="email" placeholder="Email address" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary sm:col-span-2" />
              <input name="line1" required placeholder="House / street address" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary sm:col-span-2" />
              <input name="line2" placeholder="Apartment, landmark (optional)" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary sm:col-span-2" />
              <input name="city" required placeholder="City" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary" />
              <input name="state" required placeholder="State" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary" />
              <input name="postalCode" required placeholder="Pincode" className="rounded-xl border border-border px-4 py-3 outline-none focus:border-primary" />
              <input value="India" readOnly className="rounded-xl border border-border bg-section px-4 py-3 text-text-secondary outline-none" />
            </div>

            <div className="mt-6 rounded-xl border border-secondary/30 bg-secondary/10 p-4">
              <div className="flex items-center gap-3 font-bold text-primary">
                <CreditCard size={20} />
                Pay with cash when your mattress arrives
              </div>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                No online payment is needed. Our team will confirm your order before dispatch.
              </p>
            </div>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <Loader2 className="animate-spin" size={20} />}
              Place COD Order
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-border bg-section p-5">
            <h2 className="text-xl font-bold text-text-primary">Your order</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => {
                const imageSrc = item.product.images[0]?.image ?? "/images/placeholder.svg";
                const itemKey = item.product.cartKey ?? item.product.id;

                return (
                  <div key={itemKey} className="flex gap-4">
                    <div className="relative h-20 w-24 overflow-hidden rounded-xl bg-white">
                      <Image
                        src={imageSrc}
                        alt={item.product.name}
                        fill
                        unoptimized={imageSrc.startsWith("/api/assets/")}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-text-primary">{item.product.name}</p>
                      <p className="mt-1 text-sm text-text-light">
                        {[item.product.size, item.product.fabric, `Qty ${item.quantity}`]
                          .filter(Boolean)
                          .join(" | ")}
                      </p>
                      <p className="mt-1 font-bold text-primary">
                        {formatPrice(item.product.salePrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <strong className="text-text-primary">{formatPrice(subtotal)}</strong>
              </div>
              <div className="mt-3 flex justify-between text-text-secondary">
                <span>Delivery</span>
                <strong className="text-text-primary">Free</strong>
              </div>
              <div className="mt-5 flex items-end justify-between">
                <span className="text-text-secondary">Total</span>
                <strong className="text-3xl text-primary">{formatPrice(subtotal)}</strong>
              </div>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}
