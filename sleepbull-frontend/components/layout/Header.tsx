"use client";

import Link from "next/link";
import { Heart, ShoppingCart, User } from "lucide-react";

import Container from "./Container";
import Logo from "./Logo";
import TopBar from "./TopBar";
import SearchBar from "@/components/search/SearchBar";

import { navigation } from "@/config/navigation";

export default function Header() {
  return (
    <>
      <TopBar />

      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-20 items-center justify-between gap-6">
            <Logo />

            <nav className="hidden items-center gap-8 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] font-medium text-slate-700 transition hover:text-black"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <SearchBar />

              <Link href="/wishlist" aria-label="Wishlist">
                <Heart size={22} />
              </Link>

              <Link href="/cart" aria-label="Cart">
                <ShoppingCart size={22} />
              </Link>

              <Link href="/profile" aria-label="Profile">
                <User size={22} />
              </Link>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
