function Card({ title, description, source}: { title: string; description: string; source: string}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition shadow-2xl w-75">
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center shrink-0">
                <img src={source} alt="PlayIcon" className="h-20 w-20" />
            </div>
            <div className="text-center sm:text-left">
                <h2 className="font-bold">{title}</h2>
                <p className="text-slate-400 text-sm mt-1">{description}</p>
            </div>
        </div>
        {/* <InnerCard title="Anime" description="Browse entries by popularity, score, or season" /> */}
    </div>
  );
}

export default function InfoSlab() {
  return (
    <div className="transparent p-6 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Anime" description="Browse entries by popularity, score, or season." source="/play-icon-copy.svg" />
            <Card title="Manga" description="Search manga, authors, and publication info." source="/manga-icon.svg" />
            <Card title="Characters & Staff" description="Learn about characters, staff, and voice actors." source="/person-icon.svg" />
        </div>
    </div>
  );
}