import { SearchBar } from "@/components/searchbar"

const HERO_IMAGE =
    "https://wallpapers.com/images/hd/uzbekistan-samarkand-garden-5897v9kg6cbf96lh.jpg"

export const CatalogHeader = () => {
    return (
        <section className="relative w-full h-[360px] md:h-[420px] rounded-2xl">
            <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75 rounded-2xl" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-4">
                <p className="text-white/65 text-xs tracking-[0.2em] uppercase font-medium">
                    Tour Catalog
                </p>
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight tracking-tight max-w-2xl">
                    Find Your Perfect Tour
                </h1>
                <p className="text-white/60 text-sm md:text-base text-center max-w-md">
                    Multi-day, one-day and off-the-beaten-path adventures
                </p>

                <div className="w-full max-w-2xl mt-2">
                    <SearchBar />
                </div>
            </div>
        </section>
    )
}
