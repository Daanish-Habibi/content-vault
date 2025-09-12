// Server Component: fetches on the server and renders HTML.
// No "use client" here.

type JikanImageSet = {
  jpg?: { image_url?: string };
  webp?: { image_url?: string };
};

type JikanAnime = {
  mal_id: number;
  title: string;
  images?: JikanImageSet;
  score?: number | null;
  episodes?: number | null;
  type?: string | null;
  status?: string | null;
};

type AnimeApiResponse = {
  data: JikanAnime[];
  pagination?: {
    current_page?: number;
    has_next_page?: boolean;
    items?: { count?: number; total?: number; per_page?: number };
  };
};

function pickImage(img?: JikanImageSet) {
  return img?.webp?.image_url || img?.jpg?.image_url || "";
}

function gridColsClass(cols: 4 | 6) {
  // 4-up: 2 on mobile → 4 on md
  if (cols === 4) return "grid-cols-2 sm:grid-cols-2 md:grid-cols-4";
  // 6-up: 2→3→4→6
  return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
}

export default async function AnimeGrid({
  q,
  page = 1,
  limit = 24,
  cols = 6, // 6 for full page, 4 for landing
  heading,
  revalidate = 60, // Next.js cache window (server-side)
}: {
  q?: string;
  page?: number;
  limit?: number;
  cols?: 4 | 6;
  heading?: string;
  revalidate?: number;
}) {
  const base = process.env.NEXT_PUBLIC_API_BASE!;
  const url = new URL(`${base}/anime`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  if (q) url.searchParams.set("q", q);

  const res = await fetch(url.toString(), { next: { revalidate } });
  if (!res.ok) throw new Error(`Failed to load anime: ${res.status}`);
  const json: AnimeApiResponse = await res.json();
  const items = json.data ?? [];

  return (
    <section className="mt-6">
      {heading && <h2 className="text-xl font-semibold mb-3">{heading}</h2>}
      <div className={`grid ${gridColsClass(cols)} gap-4`}>
        {items.map((a) => {
          const img = pickImage(a.images);
          return (
            <article
              key={a.mal_id}
              className="rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
              title={a.title}
            >
              <div className="aspect-[2/3] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img || "/placeholder.png"}
                  alt={a.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium line-clamp-2">{a.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                  {a.type && <span>{a.type}</span>}
                  {a.episodes != null && <span>• {a.episodes} ep</span>}
                </div>
                {a.score != null && (
                  <div className="mt-1 text-xs text-gray-700">⭐ {a.score}</div>
                )}
                {a.status && (
                  <div className="mt-1 text-[10px] uppercase tracking-wide text-gray-500">
                    {a.status}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
