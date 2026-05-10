"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useMediaViewerStore } from "@/hooks/store/use-media-viewer-store"
import { useEmblaState } from "@/hooks/use-embla-state"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import ClientImg from "../client-img"
import Modal from "../modal"
import ReactPlayer from "../react-player"

const MediaViewerModal = () => {
    return (
        <Modal
            modalKey={MODAL_KEYS.MEDIA_VIEWER_MODAL}
            className="w-screen max-w-full h-[100dvh] max-h-[100dvh] bg-[#111111] border-none shadow-none rounded-none p-0 flex flex-col m-0"
            closeButtonClassName="text-white hover:text-white/80 top-5 right-5 sm:top-6 sm:right-6 opacity-100 w-8 h-8 z-50 bg-transparent"
            disableInteractOutside={false}
        >
            <Content />
        </Modal>
    )
}
const Content = () => {
    const { media, startIndex, alt } = useMediaViewerStore()
    const { setApi, selectedIndex, scrollTo } = useEmblaState()
    const [api, setLocalApi] = useState<any>()

    useEffect(() => {
        if (api) {
            setApi(api)
        }
    }, [api, setApi])

    if (!media || media.length === 0) return null

    return (
        <div className="flex-1 flex flex-col w-full h-full relative">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full flex items-center justify-center p-5 sm:p-6 z-40 pointer-events-none">
                <span className="text-white font-medium text-[15px] pointer-events-auto">
                    {selectedIndex + 1} из {media.length}
                </span>
            </div>

            {/* Carousel */}
            <Carousel
                setApi={setLocalApi}
                className="w-full h-full flex flex-col relative flex-1 pb-10"
                opts={{
                    loop: true,
                    startIndex,
                }}
            >
                <CarouselContent className="h-full ml-0">
                    {media.map((item, i) => {
                        return (
                            <CarouselItem
                                key={i}
                                className="relative h-full pl-0 flex items-center justify-center"
                            >
                                {item.video && (
                                    <div className="w-full h-[100dvh] p-4 sm:p-16 flex items-center justify-center">
                                        <ReactPlayer
                                            src={item.src}
                                            className="max-h-[85vh] w-auto h-auto rounded-lg shadow-2xl"
                                        />
                                    </div>
                                )}
                                {item.img && (
                                    <div className="w-full h-[100dvh] p-4 sm:p-16 flex items-center justify-center">
                                        <ClientImg
                                            src={item.src}
                                            alt={item.alt || alt || "image"}
                                            wrapperClassName="w-full h-full"
                                            className="object-contain bg-transparent drop-shadow-none sm:drop-shadow-2xl"
                                        />
                                    </div>
                                )}
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>

                {/* Left Arrow */}
                <button
                    onClick={() => api?.scrollPrev()}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/70 transition-colors z-50 focus:outline-none"
                    aria-label="Previous image"
                >
                    <ChevronLeft
                        strokeWidth={1.5}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => api?.scrollNext()}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/70 transition-colors z-50 focus:outline-none"
                    aria-label="Next image"
                >
                    <ChevronRight
                        strokeWidth={1.5}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                </button>
            </Carousel>
        </div>
    )
}

export default MediaViewerModal
