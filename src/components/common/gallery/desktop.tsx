"use client"

import IconPlayerPlay from "@/assets/icons/player-play"
import ClientImg from "@/components/common/client-img"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import { Button } from "@/components/ui/button"
import {
    MediaItem,
    useMediaViewerStore,
} from "@/hooks/store/use-media-viewer-store"
import { cn } from "@/lib/utils/shadcn"
import ReactPlayer from "../react-player"

interface Props {
    items: MediaItem[]
}

export default function GalleryDesktop({ items }: Props) {
    const { openModal } = useMediaViewerModal()
    const { setMediaViewerState } = useMediaViewerStore()

    const itemsDisplay = items.slice(0, 5)

    const handleClick = (startIndex: number) => {
        openModal()
        setMediaViewerState({
            media: items,
            startIndex,
        })
    }

    return (
        <div className="hidden md:grid grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] grid-flow-col-dense gap-2">
            {itemsDisplay.map((item, i) => {
                return (
                    <div
                        key={i}
                        className={cn(
                            "cursor-pointer relative rounded-xl",
                            i === 0 && "col-span-2 row-span-2",
                        )}
                        onClick={() => {
                            handleClick(i)
                        }}
                    >
                        {item.img && (
                            <ClientImg
                                key={i}
                                src={item.src}
                                alt={item.alt || "image"}
                                wrapperClassName="aspect-video rounded-xl"
                            />
                        )}
                        {items.length > 5 && i === 4 && (
                            <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-foreground/40 z-20 rounded-xl">
                                <span className="text-4xl font-medium text-background">
                                    +{items.length - 5}
                                </span>
                            </div>
                        )}
                        {item.video && (
                            <div className="z-10 absolute top-0 left-0 w-full h-full grid place-items-center">
                                <span className="grid place-items-center w-12 h-12 rounded-full bg-background/80">
                                    <IconPlayerPlay />
                                </span>
                            </div>
                        )}
                        {item.video && (
                            <Button
                                className={cn(
                                    "relative w-full h-full aspect-video bg-transparent flex-shrink-0 overflow-hidden rounded-xl p-0",
                                )}
                            >
                                <ReactPlayer
                                    src={
                                        typeof item.src === "string" ?
                                            item.src
                                        :   undefined
                                    }
                                    controls={false}
                                    muted
                                />
                            </Button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
