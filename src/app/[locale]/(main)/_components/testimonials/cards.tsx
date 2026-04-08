"use client"

import IconGradientQuotationMark from "@/assets/icons/gradient-quotation-mark"
import IconQuotationMark from "@/assets/icons/quotation-mark"
import logo from "@/assets/images/home/img-hexagon-7.png"
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils/shadcn"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Cards() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [width, setWidth] = useState<"horizontal" | "vertical">("vertical")
    const [position, setPosition] = useState<"start" | "center">("center")

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setWidth("vertical")
                setPosition("center")
            } else {
                setWidth("horizontal")
                setPosition("start")
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const data = [
        {
            name: "Aziz Rahimov",
            comment:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum corrupti praesentium molestias quas aliquam quia quaerat animi perferendis facere corporis",
        },
        {
            name: "Bek Olimjon",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate expedita facilis odit! Sed enim corporis voluptatem totam eum magnam, fugiat ad velit ",
        },
        {
            name: "Davronbek Turdiyev",
            comment:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit beatae magni, tempora fugit sed nobis voluptatum ad doloribus.",
        },
        {
            name: "Davronbek Turdiyev",
            comment:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit beatae magni, tempora fugit sed nobis voluptatum ad doloribus.",
        },
        {
            name: "Davronbek Turdiyev",
            comment:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit beatae magni, tempora fugit sed nobis voluptatum ad doloribus.",
        },
    ]

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <Carousel
            orientation={width}
            opts={{
                loop: true,
                align: position,
            }}
            setApi={setApi}
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            className="overflow-hidden"
        >
            <CarouselContent
                className={cn(width === "vertical" ? "h-[36rem]" : "")}
            >
                {data.map((item, i) => {
                    const isActive = i === current
                    return (
                        <CarouselItem
                            key={i}
                            className={cn(
                                "lg:basis-1/3 md:flex-[0_0_48%] sm:flex-[0_0_70%] flex-[0_0_90%]",
                            )}
                        >
                            <div
                                className={cn(
                                    "lg:max-w-lg rounded-xl bg-background relative overflow-hidden flex items-center clamp-[gap,6,9] pt-2 clamp-[pl,6,9] clamp-[pr,3,8] pb-4 text-foreground transition-all duration-500",
                                    !isActive && "lg:ml-16",
                                )}
                            >
                                <div
                                    className={cn(
                                        "absolute top-0 left-0 w-3 bg-border h-full",
                                        isActive && "gradient-1",
                                        position === "start" && "gradient-1",
                                    )}
                                />

                                <div>
                                    <span className="clamp-[w,12,20] clamp-[h,12,20] rounded-full gradient-1 flex items-center justify-center">
                                        <Image
                                            src={logo}
                                            alt="logo"
                                            className="clamp-[w,11,18] clamp-[h,11,18]"
                                        />
                                    </span>
                                </div>

                                <div>
                                    <article className="flex gap-1 items-center mb-1.5">
                                        <h3 className="truncate font-semibold clamp-[text,base,2xl]">
                                            {item.name}
                                        </h3>
                                        {isActive || position === "start" ?
                                            <IconGradientQuotationMark />
                                        :   <IconQuotationMark />}
                                    </article>
                                    <p className="font-medium text-text-500 clamp-[text,0.625rem,base] line-clamp-4">
                                        {item.comment}
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
        </Carousel>
    )
}
