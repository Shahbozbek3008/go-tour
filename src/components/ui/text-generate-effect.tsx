"use client"
import { cn } from "@/lib/utils/shadcn"
import { motion, stagger, useAnimate } from "motion/react"
import { useEffect } from "react"

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
}: {
    words: string
    className?: string
    filter?: boolean
    duration?: number
}) => {
    const [scope, animate] = useAnimate()
    const lettersArray = words ? words.split("") : []

    useEffect(() => {
        if (lettersArray.length > 0) {
            animate(
                "span",
                {
                    opacity: 1,
                    filter: filter ? "blur(0px)" : "none",
                },
                {
                    duration: duration ? duration : 1,
                    delay: stagger(0.03),
                },
            )
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scope.current])

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {lettersArray.map((letter, idx) => {
                    return (
                        <motion.span
                            key={letter + idx}
                            className="opacity-0"
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                            }}
                        >
                            {letter}
                        </motion.span>
                    )
                })}
            </motion.div>
        )
    }

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <div className="leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    )
}
