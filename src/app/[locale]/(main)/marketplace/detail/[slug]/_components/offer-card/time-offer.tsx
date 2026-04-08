"use client"

import { cn } from "@/lib/utils/shadcn"
import { useEffect, useState } from "react"

interface Props {
    initialSeconds: number
}

function CircleSeparator({ expired }: { expired: boolean }) {
    // rang va o'lchamlar responsiv
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center select-none",
                "mx-1 sm:mx-2",
                expired ? "text-text300/50" : "text-text300",
            )}
            aria-hidden="true"
        >
            <span className="block rounded-full bg-current w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3" />
            <span className="block rounded-full bg-current w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 mt-1 sm:mt-2" />
        </div>
    )
}

export default function TimeOffer({ initialSeconds }: Props) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

    useEffect(() => {
        if (secondsLeft <= 0) return
        const interval = setInterval(
            () => setSecondsLeft((prev) => prev - 1),
            1000,
        )
        return () => clearInterval(interval)
    }, [secondsLeft])

    const days = Math.floor(secondsLeft / (24 * 60 * 60))
    const hours = Math.floor((secondsLeft % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((secondsLeft % (60 * 60)) / 60)
    const seconds = secondsLeft % 60

    const timeParts = [
        { value: days, label: "Day" },
        { value: hours, label: "Hours" },
        { value: minutes, label: "Minutes" },
        { value: seconds, label: "Seconds" },
    ]

    const isExpired = secondsLeft <= 0

    return (
        <div className="md:hidden">
            <h2 className="text-lg mb-4 text-text300">Deadline</h2>
            <div className="flex justify-center items-center max-w-[60rem] mx-auto">
                {timeParts.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center"
                    >
                        {/* Card */}
                        <div
                            className={cn(
                                "rounded-md flex flex-col items-center justify-center",
                                "clamp-[w,4.5rem,8rem] clamp-[h,4.75rem,8rem]",
                                isExpired ?
                                    "bg-primary-100/50 text-white"
                                :   "bg-primary-100 text-primary",
                            )}
                        >
                            <div
                                className={cn(
                                    "text-3xl sm:text-4xl md:text-5xl font-bold",
                                    isExpired ? "text-primary/70" : (
                                        "text-primary"
                                    ),
                                )}
                            >
                                {String(item.value).padStart(2, "0")}
                            </div>
                            <div
                                className={cn(
                                    "text-sm sm:text-base md:text-xl mt-1 sm:mt-2",
                                    isExpired ? "text-primary/30" : (
                                        "text-primary/50"
                                    ),
                                )}
                            >
                                {item.label}
                            </div>
                        </div>

                        {index !== timeParts.length - 1 && (
                            <div className="flex items-center h-full">
                                <CircleSeparator expired={isExpired} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
