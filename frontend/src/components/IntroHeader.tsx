// A sticky, translucent, rounded container the nav sits inside.
export default function HeaderShell() {
  return (
    <section className="text-center py-16">
      {/* Main heading */}
      <h1 className="text-4xl sm:text-6xl font-bold mb-4">
        AniVault Database
      </h1>

      {/* Subheading */}
      <p className="text-slate-400 text-lg mb-8">
        Explore anime, manga, characters & staff<br />
        Via Jikan API
      </p>

      {/* Call-to-action buttons */}
      <div className="flex justify-center gap-4">
        <a
          href="/anime"
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
        >
          Browse Now
        </a>
        <a
          href="https://github.com/Daanish-Habibi/content-vault"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors font-medium"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
