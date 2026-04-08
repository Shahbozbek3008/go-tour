"use client"

import ClientImg from "@/components/common/client-img"
import AutoScroll from "embla-carousel-auto-scroll"
import useEmblaCarousel from "embla-carousel-react"
import { usePartnesQuery } from "./use-partners-query"

export default function Partners() {
    const { partners } = usePartnesQuery()

    const [emblaRefTop] = useEmblaCarousel(
        {
            loop: true,
            dragFree: true,
            align: "start",
            skipSnaps: true,
        },
        [
            AutoScroll({
                playOnInit: true,
                speed: 1.0,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                direction: "backward",
            }),
        ],
    )

    const [emblaRefBottom] = useEmblaCarousel(
        {
            loop: true,
            dragFree: true,
            align: "start",
            skipSnaps: true,
        },
        [
            AutoScroll({
                playOnInit: true,
                speed: 1.0,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
                direction: "forward",
            }),
        ],
    )

    return (
        <section dir="ltr" className="bg-muted lg:py-[10%] py-[8%] relative">
            <main className="relative z-10 flex flex-col gap-8">
                <div className="overflow-hidden" ref={emblaRefTop}>
                    <div className="flex">
                        {partners.map((item) => (
                            <div key={item.id} className="flex-[0_0_auto] px-8">
                                <ClientImg
                                    key={item.id}
                                    src={item.image}
                                    width={100}
                                    height={30}
                                    alt="partner logo"
                                    className="h-10 w-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRefBottom}>
                    <div className="flex">
                        {partners.map((item) => (
                            <div key={item.id} className="flex-[0_0_auto] px-8">
                                <ClientImg
                                    key={item.id}
                                    src={item.image}
                                    width={100}
                                    height={30}
                                    alt="partner logo"
                                    className="h-10 w-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <span className="absolute top-0 left-[60%] w-36 h-44 bg-[#E666FB] blur-[150px]" />
                <span className="absolute top-1/2 left-1/2 w-32 h-36 bg-[#04F] blur-[160px]" />
            </div>
        </section>
    )
}
