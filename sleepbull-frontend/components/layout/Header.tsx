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
