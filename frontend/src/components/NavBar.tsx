"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  const [q, setQ] = useState("");

  return (
      <nav className="flex items-center gap-6 px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-12">
          <Image src="/vault-logo.svg" alt="AniVault" width={40} height={40} />
          <span className="text-lg font-semibold tracking-tight">AniVault Database</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-5 text-sm text-slate-300">
          <Link href="/anime" className="hover:text-white">Anime</Link>
          <Link href="/manga" className="hover:text-white">Manga</Link>
          <Link href="/genre" className="hover:text-white">Genre</Link>
          <Link href="/characters" className="hover:text-white">Characters</Link>
          <Link href="/people" className="hover:text-white">People</Link>
          <Link href="/seasons" className="hover:text-white">Seasons</Link>
          <Link href="/schedules" className="hover:text-white">Schedules</Link>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search (compact, rounded, icon on left) */}
        <form
          action="/anime"
          className="
                    hidden sm:flex items-center gap-2 h-10
                    rounded-full bg-white/5
                    px-4 transition
                    focus-within:bg-white/10
                    "
          onSubmit={(e) => {
            // optional: route to /anime?q=...
            e.preventDefault();
            window.location.href = `/anime?q=${encodeURIComponent(q)}`;
          }}
        >
          <span aria-hidden className="text-slate-400 text-3xl">⌕</span>
          <input
            className="bg-transparent outline-none text-sm w- md:w-64 placeholder:text-slate-400"
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
      </nav>
  );
}
