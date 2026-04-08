import GalleryMobile from "@/components/common/gallery/mobile"
import { MediaItem } from "@/hooks/store/use-media-viewer-store"
import { getArray } from "@/lib/utils/get-array"
import { cn } from "@/lib/utils/shadcn"
import { useNewDetailQuery } from "../../_hooks/use-new-detail-query"
import GalleryDesktop from "./desktop-gallery"

interface Props {
    className?: string
}

const ImageGallery = ({ className }: Props) => {
    const { data } = useNewDetailQuery()

    const images: MediaItem[] = getArray(data?.images).map((item) => ({
        id: item.id,
        src: item.image_url,
        img: true,
        video: false,
        alt: data?.name,
    }))

    const videos: MediaItem[] = getArray(data?.videos).map((item) => ({
        id: item.id,
        src: item.video_url,
        img: false,
        video: true,
    }))

    const mediaItems: MediaItem[] = [...images, ...videos]

    return (
        <div className={cn("w-full", className)}>
            <GalleryMobile items={mediaItems} />
            <GalleryDesktop items={mediaItems} />
        </div>
    )
}

export default ImageGallery
