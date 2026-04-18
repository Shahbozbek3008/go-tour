import Image from "next/image"
import { DayImage } from "../../../_types"

interface DayImageGridProps {
    images: DayImage[]
}

export function DayImageGrid({ images }: DayImageGridProps) {
    if (!images.length) return null

    return (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 280px"
                    />
                </div>
            ))}
        </div>
    )
}
