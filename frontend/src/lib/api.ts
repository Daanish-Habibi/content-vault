export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export const ENDPOINTS = {
  anime: "/api/anime",
  search: "/api/search",
  stats: "api/stats",
};

export async function ping(): Promise<"ok" | string> {
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: "no-store" });
    if (!res.ok) return `HTTP ${res.status}`;
    await res.json(); // assuming your backend returns JSON like {"ok":true}
    return "ok";
  } catch (e: any) {
    return e?.message ?? "error";
  }
}
