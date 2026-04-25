import Image from "next/image"

interface DayImageGridProps {
    images: string[]
}

export function DayImageGrid({ images }: DayImageGridProps) {
    if (!images || !images.length) return null

    return (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {images.map((src, index) => (
                <div
                    key={index}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                >
                    <Image
                        src={src}
                        alt={`Day image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 35vw, 280px"
                    />
                </div>
            ))}
        </div>
    )
}
