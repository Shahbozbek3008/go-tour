"use client"

import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { ChevronLeft, Heart, Images, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useMediaViewerStore } from "@/hooks/store/use-media-viewer-store"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import MediaViewerModal from "@/components/common/media-viewer-modal"

interface TourGalleryProps {
    images: {
        main: string
        gallery: string[]
    }
}

export function TourGallery({ images }: TourGalleryProps) {
    const router = useRouter()
    const allImages = [images.main, ...images.gallery]
    
    const { setMediaViewerState } = useMediaViewerStore()
    const { openModal } = useMediaViewerModal()

    const handleOpenModal = (index: number) => {
        const media = allImages.map((imgUrl) => ({
            src: imgUrl,
            img: true,
            video: false,
        }))
        setMediaViewerState({ media, startIndex: index })
        openModal()
    }

    return (
        <div className="relative w-full overflow-hidden lg:overflow-visible">
            {/* Action Buttons Overlay (Mobile Only) */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none lg:hidden">
                <Button
                    onClick={() => router.back()}
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white text-gray-700 pointer-events-auto border-none shadow-[0_2px_10px_min(rgba(0,0,0,0.1),_10%)] hover:bg-gray-50 focus-visible:ring-0 focus-visible:outline-none"
                    aria-label="Back"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2 pointer-events-auto">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white text-gray-700 border-none shadow-[0_2px_10px_min(rgba(0,0,0,0.1),_10%)] hover:bg-gray-50 focus-visible:ring-0 focus-visible:outline-none"
                        aria-label="Comments"
                    >
                        <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white text-gray-700 border-none shadow-[0_2px_10px_min(rgba(0,0,0,0.1),_10%)] hover:bg-gray-50 focus-visible:ring-0 focus-visible:outline-none"
                        aria-label="Share"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white text-gray-700 border-none shadow-[0_2px_10px_min(rgba(0,0,0,0.1),_10%)] hover:bg-gray-50 focus-visible:ring-0 focus-visible:outline-none"
                        aria-label="Favorite"
                    >
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid grid-cols-2 gap-3 h-[450px] xl:h-[500px] rounded-2xl overflow-hidden shadow-sm">
                <div 
                    onClick={() => handleOpenModal(0)}
                    className="relative h-full w-full group cursor-pointer overflow-hidden rounded-l-2xl"
                >
                    <Image
                        src={images.main}
                        alt="Tour main"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
                    {images.gallery.slice(0, 4).map((image, index) => (
                        <div
                            key={index}
                            onClick={() => handleOpenModal(index + 1)}
                            className="relative h-full w-full group cursor-pointer overflow-hidden rounded-md"
                        >
                            <Image
                                src={image}
                                alt={`Gallery ${index}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="25vw"
                            />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {index === 3 && (
                                <button className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900/80 backdrop-blur-md text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-colors shadow-lg">
                                    <Images className="h-4 w-4" />
                                    Все фото
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Carousel Layout */}
            <div className="lg:hidden relative sm:mx-0 sm:w-full">
                <Carousel
                    opts={{
                        align: "center",
                        loop: false,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="m-0">
                        {allImages.map((image, index) => (
                            <CarouselItem key={index} className="p-0">
                                <div 
                                    onClick={() => handleOpenModal(index)}
                                    className="relative h-[300px] sm:h-[350px] w-full overflow-hidden sm:rounded-2xl cursor-pointer"
                                >
                                    <Image
                                        src={image}
                                        alt={`Slide ${index}`}
                                        fill
                                        className="object-cover select-none rounded-2xl"
                                        sizes="(max-width: 640px) 100vw, 100vw"
                                        priority={index === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <button 
                    onClick={() => handleOpenModal(0)}
                    className="cursor-pointer absolute bottom-4 right-4 lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md text-white border border-white/10 text-[13px] font-semibold rounded-[12px] hover:bg-black/70 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.15)] pointer-events-auto active:scale-95 z-10"
                >
                    <Images className="h-[14px] w-[14px]" />
                    Все фото
                </button>
            </div>
            {/* Make sure the modal is mounted */}
            <MediaViewerModal />
        </div>
    )
}

