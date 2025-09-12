'use client';

import { useEffect, useRef, useState } from 'react';

type StatsTotals = {
  anime_total: number;
  manga_total: number;
  characters_total: number;
  refreshed_at: number; // seconds since epoch (from backend)
  cached: boolean;
};

function fmt(n?: number) {
  if (n == null) return '—';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
  if (n >= 1_000) return Math.round(n / 1_000) + 'K+';
  return n.toString();
}

export default function Stats() {
  const [data, setData] = useState<StatsTotals | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const called = useRef(false); // prevent double-run in dev Strict Mode

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const base = (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/+$/, '');
    const url = `${base}/stats`;

    (async () => {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: StatsTotals = await res.json();
        setData(json);
      } catch (e: any) {
        setErr(String(e));
      }
    })();
  }, []);

  if (err) return <div className="text-red-600">error: {err}</div>;
  if (!data) return <div>loading…</div>;

  return (
    <section className="w-full max-w-screen-xl mx-auto px-45 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center">
        <div>
          <div className="text-4xl font-bold">{fmt(data.anime_total)}</div>
          <div className="text-slate-400 mt-1">Anime</div>
        </div>
        <div>
          <div className="text-4xl font-bold">{fmt(data.manga_total)}</div>
          <div className="text-slate-400 mt-1">Manga</div>
        </div>
        <div>
          <div className="text-4xl font-bold">{fmt(data.characters_total)}</div>
          <div className="text-slate-400 mt-1">Characters</div>
        </div>
      </div>
    </section>
  );
}
