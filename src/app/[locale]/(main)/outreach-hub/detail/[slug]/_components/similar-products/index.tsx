"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils/shadcn"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import OutreachhubCard from "../../../../_components/card"
import { useOutreachHubSimilarSlugQuery } from "../../_hooks/use-outreachhub-similar-query"

interface CarouselArrowsProps {
    api: CarouselApi | null
    className?: string
}

const CarouselArrows = ({ api, className }: CarouselArrowsProps) => {
    const { isArabic } = useLanguage()
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    useEffect(() => {
        if (!api) return

        const update = () => {
            setCanScrollPrev(api.canScrollPrev())
            setCanScrollNext(api.canScrollNext())
        }

        update()
        api.on("select", update)
        return () => {
            api.off("select", update)
        }
    }, [api])

    return (
        <div className={cn("flex gap-3", className)}>
            <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                    canScrollPrev ?
                        "bg-white text-primary hover:bg-gray-100"
                    :   "bg-transparent text-white border border-white opacity-40 cursor-not-allowed",
                )}
            >
                <ArrowLeft
                    className={cn("w-5 h-5", isArabic && "rotate-180")}
                />
            </button>
            <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer",
                    canScrollNext ?
                        "bg-white text-primary hover:bg-gray-100"
                    :   "bg-transparent text-white border border-white opacity-40 cursor-not-allowed",
                )}
            >
                <ArrowRight
                    className={cn("w-5 h-5", isArabic && "rotate-180")}
                />
            </button>
        </div>
    )
}

const SimilarProducts = () => {
    const { similarList } = useOutreachHubSimilarSlugQuery()
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)

    const [isMobile, setIsMobile] = useState(true)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className={cn("clamp-[pb,10,16]", "gradient-3")}>
            <div className="home-container">
                <div className="flex flex-col gap-10 clamp-[pt,10,16] relative">
                    <div className="flex justify-between items-center">
                        <h2 className="clamp-[text,lg,3xl] text-background w-full lg:w-[55%] font-semibold">
                            <ClientTranslate translationKey="moreWaysToMakeDifference" />
                        </h2>
                        {!isMobile && (
                            <CarouselArrows
                                className="hidden md:flex"
                                api={carouselApi}
                            />
                        )}
                    </div>

                    <Carousel
                        setApi={setCarouselApi}
                        className="w-full"
                        opts={{ slidesToScroll: 1, align: "start" }}
                    >
                        <CarouselContent className="-ml-1">
                            {similarList.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-[80%] md:basis-1/2 lg:basis-1/4 min-w-0 shrink-0"
                                >
                                    <OutreachhubCard
                                        item={item}
                                        className="h-full"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    <CarouselArrows
                        className="flex md:hidden justify-center"
                        api={carouselApi}
                    />
                </div>
            </div>
        </div>
    )
}

export default SimilarProducts
