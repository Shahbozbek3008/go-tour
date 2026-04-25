import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { TravelAgencyResponse } from "./use-all-agents-query"

const AUTOPLAY_DELAY = 3000
const REPEAT = 3

export const useMultiplyCarousel = (agents: TravelAgencyResponse[]) => {
    const total = agents.length

    const multiplied = useMemo(
        () =>
            total === 0 ?
                []
            :   Array.from({ length: REPEAT }, (_, r) =>
                    agents.map((a, i) => ({ ...a, _key: `${r}-${a.id}-${i}` })),
                ).flat(),
        [agents, total],
    )

    const autoplayPlugin = useRef(
        Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
    )

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            startIndex: total,
        },
        [autoplayPlugin.current],
    )

    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        const idx = emblaApi.selectedScrollSnap() % total
        setSelectedIndex(idx)
    }, [emblaApi, total])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
        return () => {
            emblaApi.off("select", onSelect)
            emblaApi.off("reInit", onSelect)
        }
    }, [emblaApi, onSelect])

    const dotCount = Math.min(total, 8)
    const activeDot = dotCount > 0 ? selectedIndex % dotCount : 0

    const scrollTo = useCallback(
        (dotIdx: number) => {
            if (!emblaApi || total === 0) return
            const targetIdx = total + Math.round((dotIdx / dotCount) * total)
            emblaApi.scrollTo(targetIdx)
        },
        [emblaApi, total, dotCount],
    )

    return { emblaRef, multiplied, activeDot, dotCount, scrollTo }
}
