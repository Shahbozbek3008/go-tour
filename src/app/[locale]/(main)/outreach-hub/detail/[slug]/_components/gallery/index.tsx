"use client"

import GalleryMobile from "@/components/common/gallery/mobile"
import { MediaItem } from "@/hooks/store/use-media-viewer-store"
import { getArray } from "@/lib/utils/get-array"
import { cn } from "@/lib/utils/shadcn"
import { useOutreachhubItemQuery } from "../../_hooks/use-outreachhub-item-query"
import GalleryDesktop from "./desktop-gallery"

interface Props {
    className?: string
}

const ImageGallery = ({ className }: Props) => {
    const { data } = useOutreachhubItemQuery()
    const images: MediaItem[] = getArray(data?.images).map((item) => ({
        src: item,
        img: true,
        video: false,
        alt: data?.name,
    }))

    const videos: MediaItem[] = getArray(data?.videos).map((item) => ({
        src: item,
        img: false,
        video: true,
    }))

    const mediaItems: MediaItem[] = [...images, ...videos]

    return (
        <div className={cn("w-full", className)}>
            <GalleryDesktop items={mediaItems} />
            <GalleryMobile items={mediaItems} />
        </div>
    )
}

export default ImageGallery
