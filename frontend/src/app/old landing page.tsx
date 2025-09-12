"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import AnimeCard from "@/components/AnimeCard";
import { API_BASE, ENDPOINTS } from "@/lib/api";

type JikanListResponse<T> = {
  data: T[];
  pagination: { current_page: number; has_next_page: boolean; last_visible_page: number };
};

export default function Home() {
  const [section, setSection] = useState<Section>("popular");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Anime[]>([]);
  const [pages, setPages] = useState(1);

  // build query string based on section/search/page
  const params = useMemo(() => {
    const p = new URLSearchParams();
    p.set("page", String(page));
    p.set("limit", "24");
    if (q.trim()) p.set("q", q.trim());

    if (section === "popular") {
      p.set("order_by", "popularity");
      p.set("sort", "asc");
    } else if (section === "top") {
      p.set("order_by", "score");
      p.set("sort", "desc");
    } else if (section === "upcoming") {
      p.set("status", "upcoming");
      // p.set("order_by", "favorites");
      // p.set("sort", "desc");
    }
    return p.toString();
  }, [section, q, page]);

  // fetch data when params change
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}${ENDPOINTS.anime}?${params}`)
      .then((r) => r.json() as Promise<JikanListResponse<Anime>>)
      .then((json) => {
        setItems(json.data || []);
        setPages(json.pagination?.last_visible_page || 1);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [params]);

  // reset to first page when section or search changes
  useEffect(() => {
    setPage(1);
  }, [section, q]);

  return (
    <>
      <Sidebar section={section} onChange={setSection} />
      <main className="px-6 py-5">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="w-full max-w-xl">
            <SearchBar value={q} onChange={setQ} />
          </div>
          <div className="hidden md:block text-sm text-slate-400">
            API: {API_BASE}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-slate-800/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {items.map((a) => (
              <AnimeCard key={a.mal_id} anime={a} />
            ))}
          </div>
        )}

        {/* pagination */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 rounded-lg bg-slate-800/70 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-300">
            Page {page} / {pages}
          </span>
          <button
            onClick={() => setPage((p) => (p < pages ? p + 1 : p))}
            disabled={page >= pages}
            className="px-3 py-2 rounded-lg bg-slate-800/70 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
