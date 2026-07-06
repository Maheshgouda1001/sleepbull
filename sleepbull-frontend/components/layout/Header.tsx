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

              <div className="group relative">
  <button
    aria-label="Profile"
    className="flex items-center"
  >
    <User size={22} />
  </button>

  <div className="invisible absolute right-0 top-10 z-50 w-64 translate-y-2 rounded-xl border border-border bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

    <div className="border-b px-5 py-4">
      <p className="font-semibold text-slate-900">
        Welcome 👋
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Manage your account
      </p>
    </div>

    <div className="py-2">
  {profileMenu.map(({ title, href, icon: Icon }) => (
    <Link
      key={href}
      href={href}
      className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0d253d]"
    >
      <Icon size={18} />
      {title}
    </Link>
  ))}
</div>
  </div>
</div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
