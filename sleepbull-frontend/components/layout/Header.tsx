"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Container from "./Container";
import Logo from "./Logo";
import TopBar from "./TopBar";
import SearchBar from "@/components/search/SearchBar";
import { CART_CHANGED_EVENT, cartCount } from "@/lib/cart-storage";

import { navigation } from "@/config/navigation";
import {
  User,
  ShoppingBag,
  Heart,
  Package,
  Info,
  Newspaper,
  LifeBuoy,
  LogIn,
  ShoppingCart
} from "lucide-react";
const profileMenu = [
  {
    title: "My Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "My Orders",
    href: "/orders",
    icon: Package,
  },
  {
    title: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    title: "Products",
    href: "/products",
    icon: ShoppingBag,
  },
  {
    title: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    title: "News",
    href: "/blogs",
    icon: Newspaper,
  },
  {
    title: "Help & Support",
    href: "/contact",
    icon: LifeBuoy,
  },
];
export default function Header() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const syncCount = () => setCount(cartCount());

    syncCount();
    window.addEventListener(CART_CHANGED_EVENT, syncCount);
    window.addEventListener("storage", syncCount);

    return () => {
      window.removeEventListener(CART_CHANGED_EVENT, syncCount);
      window.removeEventListener("storage", syncCount);
    };
  }, []);

  return (
    <>
      <TopBar />

      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between gap-6">
            <Logo />

            <nav className="hidden items-center gap-7 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-text-secondary transition hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <SearchBar />

              <Link href="/wishlist" aria-label="Wishlist">
                <Heart size={22} />
              </Link>

              <Link href="/cart" aria-label="Cart" className="relative">
                <ShoppingCart size={22} />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1 text-[10px] font-bold text-primary">
                    {count}
                  </span>
                )}
              </Link>

              <Link href="/profile" aria-label="Wishlist">

    <User size={22} />
              </Link>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
