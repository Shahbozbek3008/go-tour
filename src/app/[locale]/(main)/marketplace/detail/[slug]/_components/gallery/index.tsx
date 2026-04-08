"use client"

import GalleryDesktop from "@/components/common/gallery/desktop"
import GalleryMobile from "@/components/common/gallery/mobile"
import { MediaItem } from "@/hooks/store/use-media-viewer-store"
import { getArray } from "@/lib/utils/get-array"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

export default function Gallery() {
    const { data } = useMarketplaceProductQuery()
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
        <main className="w-full">
            <GalleryMobile items={mediaItems} />
            <GalleryDesktop items={mediaItems} />
        </main>
    )
}
