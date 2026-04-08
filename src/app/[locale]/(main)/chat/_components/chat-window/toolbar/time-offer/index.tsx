"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useEffect, useRef, useState } from "react"

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
}

interface TimerOfferProps {
    onExpire: () => void
    time_to_write: string | null
}

const TimeOffer = ({ time_to_write, onExpire }: TimerOfferProps) => {
    const deadlineRef = useRef(0)
    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        if (!time_to_write) return
        const initialTime = parseInt(time_to_write, 10)
        deadlineRef.current = Date.now() + initialTime * 1000
        setTimeLeft(initialTime)

        const interval = setInterval(() => {
            const remaining = Math.floor(
                (deadlineRef.current - Date.now()) / 1000,
            )
            setTimeLeft(Math.max(remaining, 0))
        }, 1000)

        return () => clearInterval(interval)
    }, [time_to_write])

    useEffect(() => {
        if (timeLeft === 0 && time_to_write) {
            onExpire()
        }
    }, [timeLeft, time_to_write, onExpire])

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="w-full py-6 flex flex-col justify-center items-center bg-white rounded-md">
                <h4 className="text-xl text-primary">
                    <ClientTranslate translationKey="youCanSendNextMessage" />
                </h4>
                <p className="text-base text-(--text-300)">
                    <ClientTranslate translationKey="youWillBeAble" />
                </p>
            </div>

            <div className="w-full bg-white py-2 px-4 rounded-md flex items-center justify-between">
                <span />
                <p className="text-sm text-(--text-secondary) opacity-40">
                    <ClientTranslate translationKey="pleaseWaitTillCountdown" />
                </p>
                <h2 className="font-medium text-(--text-300) text-2xl">
                    {formatTime(timeLeft)}
                </h2>
            </div>
        </div>
    )
}

export default TimeOffer
