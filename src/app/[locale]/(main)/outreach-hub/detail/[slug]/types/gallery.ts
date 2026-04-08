import { type StaticImageData } from "next/image"

type GalleryImage = StaticImageData | string

export type ImageGalleryProps = {
    images: GalleryImage[]
}
