"use client"
import { Card } from "@/components/card"
import { TOURS } from "@/lib/constants/tours"
import useEmblaCarousel from "embla-carousel-react"
import { AnimatePresence, motion } from "framer-motion"

export const SpecialOffers = () => {
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    })

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl font-semibold mb-10">Maxsus Takliflar</h2>
            <div
                ref={emblaRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
            >
                <AnimatePresence mode="popLayout">
                    <motion.div className="flex gap-4 pl-0.5 pb-2">
                        {TOURS.map((tour) => (
                            <Card key={`${tour.id}`} tour={tour} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
