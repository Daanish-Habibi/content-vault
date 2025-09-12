export default function Slab({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="
                w-full max-w-screen-xl mx-auto   /* ⇦ scales up to ~1280px, then stops */
                rounded-2xl border border-slate-800
                bg-slate-900/70 backdrop-blur shadow-2xl
                px-4 sm:px-8 lg:px-12
                py-6 sm:py-10 lg:py-16
                "
    >
      {children}
    </section>
  );
}
