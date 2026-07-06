"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag, ShoppingCart } from "lucide-react";

import type { Product } from "@/types/product";
import { addToCart } from "@/lib/cart-storage";
import { getProfileClient } from "@/services/auth.service";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(false);
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  async function handleBuyNow() {
    setCheckingLogin(true);
    setMessage("");

    const profile = await getProfileClient();

    if (!profile) {
      addToCart(product);
      setMessage("Please login to continue checkout.");
      router.push("/profile");
      return;
    }

    addToCart(product);
    router.push("/checkout");
    setCheckingLogin(false);
  }

  return (
    <>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white px-5 font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
        >
          {added ? <Check size={20} /> : <ShoppingCart size={20} />}
          {added ? "Added" : "Add To Cart"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={checkingLogin}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        >
          <ShoppingBag size={20} />
          {checkingLogin ? "Checking..." : "Buy Now"}
        </button>
      </div>

      {message && (
        <p className="mt-3 rounded-xl bg-secondary/10 px-4 py-3 text-sm font-semibold text-primary">
          {message}
        </p>
      )}
    </>
  );
}
