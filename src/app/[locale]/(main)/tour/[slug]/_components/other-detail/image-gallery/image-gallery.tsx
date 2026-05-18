"use client"

import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import {
    MediaItem,
    useMediaViewerStore,
} from "@/hooks/store/use-media-viewer-store"
import { cn } from "@/lib/utils/shadcn"
import { Play } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

const VISIBLE_COUNT = 3

function VideoThumbnail({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0.001
        }
    }

    return (
        <video
            ref={videoRef}
            src={src}
            preload="metadata"
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
    )
}

interface MediaGalleryProps {
    media: MediaItem[]
    className?: string
}

export function ImageGallery({ media, className }: MediaGalleryProps) {
    const { setMediaViewerState } = useMediaViewerStore()
    const { openModal } = useMediaViewerModal()

    const visibleMedia = media.slice(0, VISIBLE_COUNT)
    const remaining = media.length - VISIBLE_COUNT

    const handleOpen = (index: number) => {
        setMediaViewerState({ media, startIndex: index })
        openModal()
    }

    return (
        <div className={cn("grid grid-cols-3 gap-2", className)}>
            {visibleMedia.map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleOpen(index)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer bg-muted"
                >
                    {item.img && (
                        <Image
                            src={item.src}
                            alt={item.alt || "media"}
                            fill
                            sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 180px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}

                    {item.video && (
                        <>
                            <VideoThumbnail src={item.src} />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                                </div>
                            </div>
                        </>
                    )}

                    {index === VISIBLE_COUNT - 1 && remaining > 0 && (
                        <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                            <span className="text-white text-[32px] sm:text-[40px] font-semibold tracking-tight">
                                +{remaining}
                            </span>
                        </div>
                    )}
                </button>
            ))}
        </div>
    )
}
