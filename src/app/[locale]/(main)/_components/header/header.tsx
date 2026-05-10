"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { SearchBar } from "@/components/searchbar"
import {
    Destination,
    useTourShortListQuery,
} from "@/components/searchbar/_hooks"
import { useLanguage } from "@/hooks/use-language"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const HERO_IMAGE =
    "https://images.unsplash.com/photo-1605382628707-0aa0593fba19?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export const Header = () => {
    const { isRussian } = useLanguage()
    const t = useTranslations()
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

    const title =
        selectedDest ?
            isRussian ? `${t("toursIn")} ${selectedDest.nameRu}`
            :   `${selectedDest.nameUz} ${t("toursIn")}`
        :   t("findYourDreamTrip")

    const selectedName =
        selectedDest ?
            isRussian ? selectedDest.nameRu
            :   selectedDest.nameUz
        :   customName

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
                <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center leading-tight tracking-tight drop-shadow-md">
                    {title}
                </h1>
                <p className="text-white/60 text-sm md:text-base text-center max-w-md">
                    <ClientTranslate translationKey="multiDaySingleDay" />
                </p>

                <div className="w-full max-w-2xl mt-2">
                    <SearchBar
                        locationValue={selectedName}
                        onLocationSelect={handleSelect}
                        onQueryChange={handleQueryChange}
                        selectedDestination={selectedDest}
                        autoOpen={true}
                    />
                </div>
            </div>
        </section>
    )
}
