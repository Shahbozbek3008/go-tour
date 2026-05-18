"use client"

import { useCurrency } from "@/app/_providers/currency-provider"
import { ProductCard } from "@/components/card"
import ClientTranslate from "@/components/common/translation/client-translate"
import { useRouter } from "@/i18n/navigation"
import { adaptTours } from "@/lib/adapters/tour.adapter"
import { getHref } from "@/lib/utils/get-href"
import useEmblaCarousel from "embla-carousel-react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { useSimilarToursQuery } from "../../_hooks"

interface SimilarToursProps {
    title?: string
    hasLike?: boolean
}

export const SimilarTours = ({
    title = "similarTours",
    hasLike,
}: SimilarToursProps) => {
    const router = useRouter()
    const { currency } = useCurrency()
    const { similarTours } = useSimilarToursQuery({
        options: {
            queryKey: [currency],
        },
    })
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
    })

    const similar = useMemo(() => {
        return adaptTours(similarTours ?? [])
    }, [similarTours])

    return (
        <div className="flex flex-col">
            {title && (
                <h2 className="text-3xl font-semibold mb-10">
                    <ClientTranslate translationKey={title} />
                </h2>
            )}
            <div
                ref={emblaRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
            >
                <AnimatePresence mode="popLayout">
                    <motion.div className="flex gap-4 pl-0.5 pb-2">
                        {similar?.map((tour) => (
                            <ProductCard
                                key={tour?.id}
                                tour={tour}
                                wrapperClassName="w-[75vw] xs:w-[300px] md:w-[320px] shrink-0"
                                hasLike={hasLike}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
                <div className="flex justify-end mt-10">
                    <button
                        onClick={() =>
                            router.push(
                                getHref({
                                    pathname: "/[locale]/catalog",
                                }),
                            )
                        }
                        className="flex items-center cursor-pointer gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors duration-200 group"
                    >
                        <ClientTranslate translationKey="exploreAll" />
                        <ArrowRight
                            size={15}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
