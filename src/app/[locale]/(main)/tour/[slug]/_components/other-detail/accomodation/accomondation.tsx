"use client"

import { useLanguage } from "@/hooks/use-language"
import { useTourAccommodationQuery } from "../../../_hooks"
import { AccommodationCard } from "./accomodation-card"

export function Accommodation() {
    const { isRussian } = useLanguage()
    const { accommodation, isLoading } = useTourAccommodationQuery()

    if (isLoading || !accommodation || accommodation.length === 0) return null

    return (
        <section className="w-full my-15">
            <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
                {isRussian ? "Размещение" : "Joylashuv"}
            </h2>
            <div className="flex flex-col gap-4">
                {accommodation.map((option) => (
                    <AccommodationCard key={option.id} option={option} />
                ))}
            </div>
        </section>
    )
}
