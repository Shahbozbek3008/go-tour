"use client"

import { IconSparkle } from "@/assets/icons/sparkle"
import { IconSparkle2 } from "@/assets/icons/sparkle2"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { BackgroundGradientAnimation } from "./background-gradient-animation"

export default function AiLoader() {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)

    const steps = [
        "Categorizing your cause...",
        "Analyzing data patterns...",
        "Generating insights...",
        "Preparing your post...",
        "Finalizing content...",
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0 // Reset for demo
                }
                return prev + 1
            })
        }, 200)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length)
        }, 2000)

        return () => clearInterval(stepInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="relative h-[calc(100vh-5rem)]">
            <BackgroundGradientAnimation
                gradientBackgroundStart="#fff"
                gradientBackgroundEnd="#fff"
            ></BackgroundGradientAnimation>

            <main className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <div className="text-gradient flex items-center whitespace-nowrap gap-6 clamp-[text,3xl,7xl] font-semibold">
                    <IconSparkle
                        width={70}
                        height={66}
                        className="clamp-[w,2.5rem,4.375rem] clamp-[h,2.5rem,4.375rem]"
                    />
                    AI is Analyzing...
                </div>
                <p className="text-text-800 clamp-[text,xs,lg] font-medium mt-2 line-clamp-1">
                    Preparing your personalized post using AI magic...
                </p>

                <hgroup className="relative flex justify-between max-w-2xl w-full mt-24 mb-14">
                    <div
                        className="absolute z-20 top-2 left-0 h-1 gradient-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                    <div className="absolute z-10 top-2 left-0 h-1 bg-[#CCCDD3] rounded-full w-full"></div>
                    {[0, 25, 50, 75, 100].map((step, index) => (
                        <div
                            key={index}
                            className={`relative z-30 w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                                progress >= step ? "text-purple-500" : (
                                    "text-gray-300"
                                )
                            }`}
                        >
                            {progress >= step ?
                                <div className="relative">
                                    <IconSparkle />
                                    <div className="absolute inset-0 animate-ping opacity-75">
                                        <IconSparkle />
                                    </div>
                                </div>
                            :   <IconSparkle
                                    fill="red"
                                    className="[&_path]:fill-[#CCCDD3] scale-150"
                                />
                            }
                        </div>
                    ))}
                </hgroup>

                <Button
                    variant={"gradient"}
                    className="p-[1px] relative transition-all rounded-xl pointer-events-none"
                >
                    <span className="w-full h-full bg-background rounded-xl clamp-[text,base,lg] font-semibold flex items-center gap-2 p-4 transition-all">
                        <IconSparkle2 />
                        <span className="text-gradient transition-all">
                            {steps[currentStep]}
                        </span>
                    </span>
                </Button>
            </main>
        </div>
    )
}
