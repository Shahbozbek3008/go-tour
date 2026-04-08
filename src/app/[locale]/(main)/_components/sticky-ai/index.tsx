"use client"
import { AiButton } from "@/assets/icons/ai-button"
import { useAi } from "@/components/common/ai-chat/_hooks/use-ai"
import useScrollPosition from "@/hooks/use-scroll-position"
import { cn } from "@/lib/utils/shadcn"
import { useEffect, useState } from "react"

export default function StickyAi() {
    const scrollPosition = useScrollPosition()
    const [width, setWidth] = useState(0)
    const [headerHeight, setHeaderHeight] = useState(0)
    const { openAiModal } = useAi()

    const handleAiClick = () => {
        openAiModal("home")
    }

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const updateHeights = () => {
            const header = document.getElementById("header")

            if (header) {
                setHeaderHeight(header.offsetHeight)
            }
        }

        updateHeights()
        window.addEventListener("resize", updateHeights)
        return () => window.removeEventListener("resize", updateHeights)
    }, [])

    return (
        <div
            onClick={handleAiClick}
            className={cn(
                "fixed right-24 bottom-24 z-50 hidden cursor-pointer",
                (
                    (scrollPosition > headerHeight && !!headerHeight) ||
                        width <= 768
                ) ?
                    "block"
                :   "hidden",
            )}
        >
            <span className="w-16 h-16 absolute gradient-3 blur-lg top-0 left-0 rounded-full" />
            <span className="w-16 h-16 flex items-center justify-center gradient-3 rounded-full absolute top-0 left-0 z-10">
                <AiButton />
            </span>
        </div>
    )
}
