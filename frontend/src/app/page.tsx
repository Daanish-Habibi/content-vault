import Slab from "@/components/Slab";
import IntroHeader from "@/components/IntroHeader"
import InfoSlab from "@/components/InfoSlab";
// import { useEffect, useMemo, useState } from "react";
import NavBar from "@/components/NavBar";
import Stats from "@/components/Stats";
import AnimeCard from "@/components/AnimeCard";

// (Optional) If you add these later, just uncomment the imports + JSX
// import Stats from "@/components/Stats";
// import Thumbnails from "@/components/Thumbnails";

export default function Home() {
  // This is a SERVER component by default (no "use client")
// It just composes sections; any interactive pieces live inside client components.
  return (
    <main className="">
      <Slab>
        <NavBar />
        <IntroHeader />
        <InfoSlab />
        <Stats />
        <AnimeCard 
          heading="Trending Anime"
          limit={8}
          cols={4}
          page={1}
          revalidate={60}
        />
      </Slab>
    </main>
  );
}