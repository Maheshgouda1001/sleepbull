"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative hidden md:block">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search mattresses..."
        className="w-56 rounded-full border border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-sm outline-none transition focus:border-slate-400 lg:w-72"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
