"use client"

import { SearchBar } from "@/components/searchbar"
import {
    Destination,
    useTourShortListQuery,
} from "@/components/searchbar/_hooks"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const HERO_IMAGE =
    "https://uzbekistan.travel/storage/app/media/uploaded-files/samarkand-uzbekistan-kupol-mechet-ploshchad.png"

export const Header = () => {
    const { locale } = useParams() as { locale: string }
    const { tourShortList } = useTourShortListQuery()
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [selectedDest, setSelectedDest] = useState<Destination | null>(null)

    const urlDestinationId = searchParams.get("destination")

    // Sync state with URL query parameter
    useEffect(() => {
        if (urlDestinationId && tourShortList.length > 0) {
            const found = tourShortList.find(
                (item) => String(item.destination.id) === urlDestinationId,
            )
            if (found) {
                setSelectedDest(found.destination)
            }
        } else if (!urlDestinationId) {
            setSelectedDest(null)
        }
    }, [urlDestinationId, tourShortList])

    const handleSelect = (dest: Destination | null) => {
        const params = new URLSearchParams(searchParams.toString())

        if (dest) {
            params.set("destination", String(dest.id))
        } else {
            params.delete("destination")
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const backgroundImage =
        selectedDest?.imageUrl ? selectedDest.imageUrl : HERO_IMAGE

    const title =
        selectedDest ?
            locale === "ru" ?
                `Туры по ${selectedDest.nameRu}`
            :   `${selectedDest.nameUz} bo'ylab turlar`
        : locale === "ru" ? "Найти путешествие своей мечты"
        : "Orzuingizdagi sayohatni toping"

    const description =
        locale === "ru" ?
            "Многодневные, однодневные и необычные приключения"
        :   "Ko'p kunlik, bir kunlik va noyob sarguzashtlar"

    const selectedName =
        selectedDest ?
            locale === "ru" ?
                selectedDest.nameRu
            :   selectedDest.nameUz
        :   null

    return (
        <section className="relative w-full h-[360px] md:h-[420px] rounded-2xl">
            <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl transition-all duration-700 ease-in-out"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 rounded-2xl" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-4">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight tracking-tight drop-shadow-md">
                    {title}
                </h1>
                <p className="text-white/60 text-sm md:text-base text-center max-w-md">
                    {description}
                </p>

                <div className="w-full max-w-2xl mt-2">
                    <SearchBar
                        locationValue={selectedName}
                        onLocationSelect={handleSelect}
                        selectedDestination={selectedDest}
                    />
                </div>
            </div>
        </section>
    )
}
