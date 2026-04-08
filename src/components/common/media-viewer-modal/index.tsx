"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useMediaViewerStore } from "@/hooks/store/use-media-viewer-store"
import { useEmblaState } from "@/hooks/use-embla-state"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import ClientImg from "../client-img"
import Modal from "../modal"
import ReactPlayer from "../react-player"

const MediaViewerModal = () => {
    return (
        <Modal
            modalKey={MODAL_KEYS.MEDIA_VIEWER_MODAL}
            className="bg-transparent border-none shadow-none sm:max-w-full"
            closeButtonClassName=""
            disableInteractOutside={false}
        >
            <Content />
        </Modal>
    )
}
const Content = () => {
    const { media, startIndex, alt } = useMediaViewerStore()
    const { setApi, selectedIndex, scrollTo } = useEmblaState()

    return (
        <>
            <Carousel
                setApi={setApi}
                className="rounded-xl overflow-hidden text-background relative"
                opts={{
                    loop: true,
                    startIndex,
                }}
            >
                <CarouselContent className="ml-0">
                    {media.map((item, i) => {
                        return (
                            <CarouselItem key={i} className="relative pl-0">
                                {item.video && (
                                    <ReactPlayer
                                        src={item.src}
                                        className="max-h-[calc(100vh-8rem)]"
                                    />
                                )}
                                {item.img && (
                                    <ClientImg
                                        src={item.src}
                                        alt={item.alt || alt || "image"}
                                        wrapperClassName="aspect-video max-h-[calc(100vh-8rem)] w-auto mx-auto"
                                        className="object-contain"
                                    />
                                )}
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>

                <footer className="absolute z-10 bottom-1 left-0 pl-3 w-full flex justify-center items-center gap-2 text-sm">
                    <div className="h-3.5 rounded-2xl bg-foreground/20 flex items-center gap-1 px-2">
                        {media.map((_, i) => {
                            return (
                                <span
                                    key={i}
                                    className={cn(
                                        "w-1 h-1 rounded-full bg-background/40 transition-all",
                                        i === selectedIndex &&
                                            "w-4 bg-background",
                                    )}
                                    onClick={() => {
                                        scrollTo(i)
                                    }}
                                ></span>
                            )
                        })}
                    </div>
                </footer>

                <CarouselPrevious className="left-3 text-foreground bg-background/80" />
                <CarouselNext className="right-3 text-foreground bg-background/80" />
            </Carousel>
        </>
    )
}

export default MediaViewerModal
