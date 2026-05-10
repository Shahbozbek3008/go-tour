"use client"

import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"
import type { AccommodationImage } from "../../../_types"
import { useMediaViewerStore } from "@/hooks/store/use-media-viewer-store"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"

const VISIBLE_COUNT = 3

interface ImageGalleryProps {
    images: AccommodationImage[]
    className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
    const { setMediaViewerState } = useMediaViewerStore()
    const { openModal } = useMediaViewerModal()

    const visibleImages = images.slice(0, VISIBLE_COUNT)
    const remaining = images.length - VISIBLE_COUNT

    const handleOpen = (index: number) => {
        const media = images.map((img) => ({
            src: img.src,
            alt: img.alt,
            img: true,
            video: false,
        }))
        setMediaViewerState({ media, startIndex: index })
        openModal()
    }

    return (
        <>
            <div className={cn("grid grid-cols-3 gap-2", className)}>
                {visibleImages.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => handleOpen(index)}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 180px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {index === VISIBLE_COUNT - 1 && remaining > 0 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <span className="text-white text-[32px] sm:text-[40px] font-semibold tracking-tight">
                                    + {remaining}
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </>
    )
}
