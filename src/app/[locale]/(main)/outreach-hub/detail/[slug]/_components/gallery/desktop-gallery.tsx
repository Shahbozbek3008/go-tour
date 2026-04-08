"use client"

import IconPlayerPlay from "@/assets/icons/player-play"
import ClientImg from "@/components/common/client-img"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import ReactPlayer from "@/components/common/react-player"
import { Button } from "@/components/ui/button"
import {
    MediaItem,
    useMediaViewerStore,
} from "@/hooks/store/use-media-viewer-store"
import { cn } from "@/lib/utils/shadcn"
import { useEffect, useState } from "react"

interface Props {
    items: MediaItem[]
}

export default function GalleryDesktop({ items }: Props) {
    const { openModal } = useMediaViewerModal()
    const { setMediaViewerState } = useMediaViewerStore()
    const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>(
        items[0],
    )

    const handleClick = () => {
        openModal()
        setMediaViewerState({
            media: items,
            startIndex: items.findIndex(
                (item) => item.src === selectedItem?.src,
            ),
        })
    }

    useEffect(() => {
        setSelectedItem(items[0])
    }, [items])

    return (
        <div className="hidden md:flex w-full flex-col gap-4">
            <div
                onClick={handleClick}
                className="w-full relative rounded-2xl overflow-hidden aspect-video cursor-pointer"
            >
                {selectedItem?.img && (
                    <ClientImg
                        src={
                            typeof selectedItem?.src === "string" ?
                                selectedItem.src
                            :   ""
                        }
                        fill
                        alt={selectedItem?.alt || "Outreachhub image"}
                    ></ClientImg>
                )}
                {selectedItem?.video && (
                    <div className="z-10 absolute top-0 left-0 w-full h-full grid place-items-center">
                        <span className="grid place-items-center w-16 h-16 rounded-full bg-background/70">
                            <IconPlayerPlay className="w-8 h-8" />
                        </span>
                    </div>
                )}
                {selectedItem?.video && (
                    <ReactPlayer
                        src={selectedItem?.src}
                        controls={false}
                        muted
                    />
                )}
            </div>

            <div className="grid grid-cols-5 gap-3 overflow-x-auto scrollbar-hide">
                {items.map((item, i) => {
                    const isActive = selectedItem?.src === item.src
                    return (
                        <Button
                            key={item.id || i}
                            onClick={() => setSelectedItem(item)}
                            className={cn(
                                "col-span-1 relative w-full h-full aspect-video bg-transparent flex-shrink-0 overflow-hidden rounded-xl border transition-all p-0",
                                isActive ?
                                    "opacity-100 border-blue-400"
                                :   "opacity-50 hover:opacity-80",
                            )}
                        >
                            {item.img && (
                                <ClientImg
                                    src={
                                        typeof item.src === "string" ?
                                            item.src
                                        :   ""
                                    }
                                    alt={item.alt || `img`}
                                    fill
                                />
                            )}
                            {item.video && (
                                <>
                                    <ReactPlayer
                                        src={
                                            typeof item.src === "string" ?
                                                item.src
                                            :   undefined
                                        }
                                        controls={false}
                                        muted
                                    />
                                    <div className="z-10 absolute top-0 left-0 w-full h-full grid place-items-center">
                                        <span className="grid place-items-center w-10 h-10 rounded-full bg-background/70">
                                            <IconPlayerPlay className="w-5 h-5" />
                                        </span>
                                    </div>
                                </>
                            )}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
