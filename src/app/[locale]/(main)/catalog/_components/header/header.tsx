"use client"

import { SearchBar } from "@/components/searchbar"
import {
    Destination,
    useTourShortListQuery,
} from "@/components/searchbar/_hooks"
import { useTranslations } from "next-intl"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const HERO_IMAGE =
    "https://plus.unsplash.com/premium_photo-1707944422462-b3afab23da95?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export const CatalogHeader = () => {
    const { locale } = useParams() as { locale: string }
    const { tourShortList } = useTourShortListQuery()
    const searchParams = useSearchParams()

    const [selectedDest, setSelectedDest] = useState<Destination | null>(null)
    const [customName, setCustomName] = useState<string | null>(null)

    const urlDestinationId = searchParams.get("destinations")
    const urlName = searchParams.get("name")

    // Sync state with URL query parameter
    useEffect(() => {
        if (urlDestinationId && tourShortList.length > 0) {
            const found = tourShortList.find(
                (item) => String(item.destination.id) === urlDestinationId,
            )
            if (found) {
                setSelectedDest(found.destination)
                setCustomName(null)
            }
        } else if (urlName) {
            setCustomName(urlName)
            setSelectedDest(null)
        } else {
            setSelectedDest(null)
            setCustomName(null)
        }
    }, [urlDestinationId, urlName, tourShortList])

    const handleSelect = (dest: Destination | null) => {
        setSelectedDest(dest)
        setCustomName(null)
    }

    const handleQueryChange = (q: string) => {
        setCustomName(q)
        if (q) setSelectedDest(null)
    }

    const backgroundImage =
        selectedDest?.imageUrl ? selectedDest.imageUrl : HERO_IMAGE

    const t = useTranslations()
    const title =
        selectedDest ?
            t("catalogHeaderToursIn", {
                destination:
                    locale === "ru" ? selectedDest.nameRu : selectedDest.nameUz,
            })
        :   t("catalogHeaderTitle")

    const description = t("catalogHeaderDescription")

    const selectedName =
        selectedDest ?
            locale === "ru" ?
                selectedDest.nameRu
            :   selectedDest.nameUz
        :   customName

    return (
        <section className="relative w-full h-[320px] md:h-[420px] rounded-2xl">
            <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl transition-all duration-700 ease-in-out"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75 rounded-2xl" />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-3 md:gap-4">
                <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center leading-tight tracking-tight max-w-2xl drop-shadow-md">
                    {title}
                </h1>
                <p className="text-white/60 text-sm md:text-base text-center max-w-md">
                    {description}
                </p>

                <div className="w-full max-w-2xl mt-2">
                    <SearchBar
                        locationValue={selectedName}
                        onLocationSelect={handleSelect}
                        onQueryChange={handleQueryChange}
                        selectedDestination={selectedDest}
                    />
                </div>
            </div>
        </section>
    )
}
