"use client"

import IconPlayerPlay from "@/assets/icons/player-play"
import ClientImg from "@/components/common/client-img"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import {
    MediaItem,
    useMediaViewerStore,
} from "@/hooks/store/use-media-viewer-store"
import { useEmblaState } from "@/hooks/use-embla-state"
import { cn } from "@/lib/utils/shadcn"
import Autoplay from "embla-carousel-autoplay"
import ReactPlayer from "../react-player"

interface Props {
    items: MediaItem[]
}

export default function GalleryMobile({ items }: Props) {
    const { scrollTo, setApi, selectedIndex } = useEmblaState()

    const { openModal } = useMediaViewerModal()
    const { setMediaViewerState } = useMediaViewerStore()

    const handleClick = () => {
        openModal()
        setMediaViewerState({
            media: items,
            startIndex: selectedIndex,
        })
    }

    return (
        <div className="md:hidden">
            <Carousel
                className="w-full"
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
                opts={{ loop: true, align: "start" }}
                setApi={setApi}
            >
                <CarouselContent>
                    {items.map((item, i) => (
                        <CarouselItem
                            key={i}
                            className="basis-[100%] relative"
                            onClick={handleClick}
                        >
                            {item.img && (
                                <ClientImg
                                    src={
                                        typeof item.src === "string" ?
                                            item.src
                                        :   ""
                                    }
                                    alt={item.alt || "image outreachhub"}
                                    fill
                                    wrapperClassName="aspect-video cursor-pointer"
                                />
                            )}

                            {item.video && (
                                <>
                                    <div className="z-10 absolute top-0 left-0 w-full h-full grid place-items-center">
                                        <span className="grid place-items-center w-12 h-12 rounded-full bg-background/80">
                                            <IconPlayerPlay />
                                        </span>
                                    </div>
                                    <ReactPlayer
                                        src={
                                            typeof item.src === "string" ?
                                                item.src
                                            :   undefined
                                        }
                                        controls={false}
                                        muted
                                    />
                                </>
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Dots */}
            <div className="flex justify-center gap-3 py-3.5">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={cn(
                            "transition-all duration-300 focus:outline-none h-2 w-2 rounded-full",
                            selectedIndex === index ? "bg-[#212121]" : (
                                "bg-[#d9d9d9]"
                            ),
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
