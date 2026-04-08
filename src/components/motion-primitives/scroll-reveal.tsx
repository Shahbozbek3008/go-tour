"use client"

import { cn } from "@/lib/utils/shadcn"
import { motion, useAnimation, useInView } from "motion/react"
import { useEffect, useRef } from "react"

export interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 0.5,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start({
                y: 0,
                opacity: 1,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: "easeOut",
                },
            })
        }
    }, [controls, isInView, delay, duration])

    return (
        <motion.div
            ref={ref}
            initial={{ y: 50, opacity: 0 }}
            animate={controls}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}
