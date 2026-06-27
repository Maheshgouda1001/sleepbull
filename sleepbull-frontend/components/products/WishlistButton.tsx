"use client";

import { Heart } from "lucide-react";

interface WishlistButtonProps {
  onClick?: () => void;
}

export default function WishlistButton({
  onClick,
}: WishlistButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-lg transition hover:scale-110"
      aria-label="Wishlist"
    >
      <Heart
        size={18}
        className="text-slate-700"
      />
    </button>
  );
}