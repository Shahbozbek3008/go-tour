"use client"

import { SearchBar } from "@/components/searchbar"

const HERO_IMAGE =
    "https://uzbekistan.travel/storage/app/media/uploaded-files/samarkand-uzbekistan-kupol-mechet-ploshchad.png"

export const Header = () => {
    return (
        <section className="relative w-full h-[360px] md:h-[420px] rounded-2xl">
            <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl"
                style={{
                    backgroundImage: `url(${HERO_IMAGE})`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 rounded-2xl" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-4">
                <p className="text-white/70 text-xs tracking-[0.2em] uppercase font-medium">
                    Discover Uzbekistan
                </p>
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight tracking-tight max-w-xl">
                    Find your dream tour
                </h1>
                <p className="text-white/60 text-sm md:text-base text-center max-w-md">
                    Multi-day, one-day and unusual adventures
                </p>

                <div className="w-full max-w-2xl mt-2">
                    <SearchBar />
                </div>
            </div>
        </section>
    )
}
