"use client"
import GalleryDesktop from "@/components/common/gallery/desktop"
import GalleryMobile from "@/components/common/gallery/mobile"
import { MediaItem } from "@/hooks/store/use-media-viewer-store"
import { getArray } from "@/lib/utils/get-array"
import { useInvestmentItemQuery } from "../../../_hooks/use-investment-item-query"

const ImageGallery = () => {
    const { data } = useInvestmentItemQuery()
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
        <div className="w-full">
            <GalleryDesktop items={mediaItems} />
            <GalleryMobile items={mediaItems} />
        </div>
    )
}

export default ImageGallery
