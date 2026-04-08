"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { cn } from "@/lib/utils/shadcn"
import { useEffect, useState } from "react"

interface DeadlineProps {
    deadline: string
    className?: string
}

export default function DeadlineTimer({ deadline, className }: DeadlineProps) {
    const targetDate = new Date(deadline).getTime()
    const [timeLeft, setTimeLeft] = useState<number>(0)

    useEffect(() => {
        if (isNaN(targetDate)) return
        const interval = setInterval(() => {
            setTimeLeft(targetDate - Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [targetDate])

    const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)))
    const hours = Math.max(0, Math.floor((timeLeft / (1000 * 60 * 60)) % 24))
    const minutes = Math.max(0, Math.floor((timeLeft / (1000 * 60)) % 60))
    const seconds = Math.max(0, Math.floor((timeLeft / 1000) % 60))

    return (
        <div className={cn(className)}>
            <p className="text-lg font-semibold md:text-xs md:text-gray-400 mb-2">
                <ClientTranslate translationKey="deadline" />
            </p>
            <div className="grid grid-cols-4 gap-2">
                <TimerBox value={days} label="days" />
                <TimerBox value={hours} label="hours" />
                <TimerBox value={minutes} label="minutes" />
                <TimerBox value={seconds} label="seconds" />
            </div>
        </div>
    )
}

function TimerBox({ value, label }: { value: number; label: TranslationKey }) {
    return (
        <div className="flex flex-col items-center bg-(--primary-100) h-20 rounded-lg py-2">
            <span className="text-3xl font-bold text-primary">{value}</span>
            <span className="text-sm font-bold text-(--primary-200)">
                <ClientTranslate translationKey={label} />
            </span>
        </div>
    )
}
