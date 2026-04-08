"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

import chinaImage from "@/assets/images/china.png"
import uaeImage from "@/assets/images/uae.png"
import usaImage from "@/assets/images/usa.png"

const carouselItems = [
    { id: 1, title: "Image 1", image: chinaImage },
    { id: 2, title: "Image 2", image: uaeImage },
    { id: 3, title: "Image 3", image: usaImage },
]

export default function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const getOffsetX = () => {
        if (windowWidth < 640) return 100
        if (windowWidth < 1024) return 120
        return 150 // lg+
    }

    return (
        <div className="relative w-full mx-auto flex justify-center items-center">
            <div className="flex items-center justify-center h-[330px] xsm:h-[400px] sm:h-[440px] md:h-[480px] lg:h-[550px] w-[340px] xsm:w-[420px] lg:w-[580px]">
                {carouselItems.map((item, index) => {
                    let offset = index - currentIndex
                    if (offset < -1) offset += carouselItems.length
                    if (offset > 1) offset -= carouselItems.length

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute"
                            initial={false}
                            animate={{
                                x: offset * getOffsetX(),
                                scale: offset === 0 ? 1 : 0.7,
                                opacity: offset === 0 ? 1 : 1,
                                zIndex: offset === 0 ? 10 : 5,
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={285}
                                height={455}
                                className="w-[140px] xsm:w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-auto rounded-xl object-cover"
                            />
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
