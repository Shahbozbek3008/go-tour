"use client"

import MediaViewerModal from "@/components/common/media-viewer-modal"
import { useMediaViewerModal } from "@/components/common/media-viewer-modal/use-media-viewer-modal"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useMediaViewerStore } from "@/hooks/store/use-media-viewer-store"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import { useQueryClient } from "@tanstack/react-query"
import { ChevronLeft, Heart, Images, MessageCircle, Share2 } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { toast } from "sonner"
import { VIDEO_EXTENSIONS } from "../../_constants/video-extensions"
import { useTourDetailQuery } from "../../_hooks"
import { VideoThumbnail } from "./video-thumbnail"

interface TourGalleryProps {
    images: {
        main: string
        gallery: string[]
    }
    title: string
}

function isVideoUrl(url: string): boolean {
    if (!url) return false
    const lower = url.toLowerCase()
    return Array.from(VIDEO_EXTENSIONS).some((ext) => lower.endsWith(ext))
}

interface MediaItem {
    src: string
    img: boolean
    video: boolean
    poster?: string
}

export function TourGallery({ images, title }: TourGalleryProps) {
    const router = useRouter()
    const t = useTranslations()
    const queryClient = useQueryClient()
    const { detail } = useTourDetailQuery()
    const { isAuthenticated } = useProfileQuery()
    const { openModal: openLoginModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)
    const { post, isPending, remove } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isAuthenticated) {
            openLoginModal()
            return
        }

        const baseUrl = API.TOUR.FAVOURITES.replace(
            "{slug}",
            String(detail?.id),
        )
        const url = `${baseUrl}?type=FAVORITE`

        const options = {
            onSuccess: () => {
                queryClient.setQueriesData({ queryKey: [] }, (oldData: any) => {
                    if (!oldData) return oldData

                    const updateTour = (t: any) =>
                        t.id === detail?.id ?
                            { ...t, isFavorite: !detail?.isFavorite }
                        :   t

                    if (oldData.pages) {
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page: any) => ({
                                ...page,
                                tours: page.tours?.map(updateTour),
                                results: page.results?.map(updateTour),
                            })),
                        }
                    }

                    if (Array.isArray(oldData.tours)) {
                        return {
                            ...oldData,
                            tours: oldData.tours.map(updateTour),
                        }
                    }
                    if (Array.isArray(oldData.results)) {
                        return {
                            ...oldData,
                            results: oldData.results.map(updateTour),
                        }
                    }
                    if (Array.isArray(oldData)) {
                        return oldData.map(updateTour)
                    }

                    return oldData
                })

                invalidateByExactMatch([
                    API.PROFILE.INFO.ME,
                    API.TOUR.TOUR_SLUG.replace("{slug}", String(detail?.id)),
                ])
            },
        }

        if (detail?.isFavorite) {
            remove(url, {}, options)
        } else {
            post(url, {}, options)
        }
    }

    // Build normalized media array with type detection
    const allMedia: MediaItem[] = useMemo(() => {
        const items: MediaItem[] = []
        if (images?.main) {
            const isVid = isVideoUrl(images.main)
            items.push({
                src: images.main,
                img: !isVid,
                video: isVid,
            })
        }
        if (images?.gallery?.length) {
            images.gallery.forEach((url) => {
                if (!url) return
                const isVid = isVideoUrl(url)
                items.push({
                    src: url,
                    img: !isVid,
                    video: isVid,
                })
            })
        }
        return items
    }, [images])

    const hasOnlyOneMedia = allMedia.length === 1

    const { setMediaViewerState } = useMediaViewerStore()
    const { openModal } = useMediaViewerModal()

    const handleOpenModal = useCallback(
        (index: number) => {
            setMediaViewerState({ media: allMedia, startIndex: index })
            openModal()
        },
        [allMedia, setMediaViewerState, openModal],
    )

    const mainMedia = allMedia[0]
    const gridMedia = allMedia.slice(1, 5) // Max 4 items for grid
    const remainingCount = allMedia.length > 5 ? allMedia.length - 5 : 0

    const handleShare = async () => {
        const shareData = {
            title: title,
            url: window.location.href,
        }

        const copyToClipboard = async () => {
            try {
                await navigator.clipboard.writeText(window.location.href)
                toast.success(t("linkCopied"))
            } catch {
                toast.error(t("failedToCopy"))
            }
        }

        if (navigator.share && navigator.canShare?.(shareData)) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                const error = err as Error
                if (error.name === "AbortError") return
                // share ishlamasa clipboard ga fallback
                await copyToClipboard()
            }
        } else {
            await copyToClipboard()
        }
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
                        onClick={handleShare}
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 group/heart rounded-full bg-white text-gray-700 border-none shadow-[0_2px_10px_min(rgba(0,0,0,0.1),_10%)] hover:bg-gray-50 focus-visible:ring-0 focus-visible:outline-none"
                        aria-label="Favorite"
                        isLoading={isPending}
                        onClick={handleFavorite}
                    >
                        <Heart
                            className={cn(
                                "h-4 w-4 transition-colors group-hover/heart:scale-110 group-hover/heart:fill-red-500 group-hover/heart:stroke-red-500 active:scale-95",
                                detail?.isFavorite &&
                                    "fill-red-500 stroke-red-500",
                            )}
                        />
                    </Button>
                </div>
            </div>

            {/* ─── DESKTOP: Single Item ─── */}
            {hasOnlyOneMedia ?
                <div className="hidden lg:block relative w-full h-[450px] xl:h-[500px] rounded-2xl overflow-hidden shadow-sm group cursor-pointer">
                    {mainMedia.video ?
                        <VideoThumbnail
                            src={mainMedia.src}
                            onClick={() => handleOpenModal(0)}
                            className="w-full h-full"
                            sizes="100vw"
                            priority
                        />
                    :   <>
                            <Image
                                src={mainMedia.src}
                                alt="Tour main"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                    }
                </div>
            :   /* ─── DESKTOP: Grid Layout (2x2 or mixed) ─── */
                <div className="hidden lg:grid grid-cols-2 gap-3 h-[450px] xl:h-[500px] rounded-2xl overflow-hidden">
                    {/* Main media — left half */}
                    <div
                        onClick={() => handleOpenModal(0)}
                        className="relative h-full w-full group cursor-pointer overflow-hidden rounded-l-2xl"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleOpenModal(0)
                        }
                    >
                        {mainMedia.video ?
                            <VideoThumbnail
                                src={mainMedia.src}
                                onClick={() => handleOpenModal(0)}
                                className="w-full h-full"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        :   <>
                                <Image
                                    src={mainMedia.src}
                                    alt="Tour main"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </>
                        }
                    </div>

                    <div
                        className={cn(
                            "grid gap-3 h-full",
                            gridMedia.length === 1 && "grid-cols-1 grid-rows-1",
                            gridMedia.length === 2 && "grid-cols-1 grid-rows-2",
                            gridMedia.length >= 3 && "grid-cols-2 grid-rows-2",
                        )}
                    >
                        {gridMedia.slice(0, 4).map((media, index) => (
                            <div
                                key={index}
                                onClick={() => handleOpenModal(index + 1)}
                                className={cn(
                                    "relative h-full w-full group cursor-pointer overflow-hidden rounded-md",
                                    gridMedia.length === 3 &&
                                        index === 2 &&
                                        "col-span-2",
                                )}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    handleOpenModal(index + 1)
                                }
                            >
                                {media.video ?
                                    <VideoThumbnail
                                        src={media.src}
                                        onClick={() =>
                                            handleOpenModal(index + 1)
                                        }
                                        className="w-full h-full"
                                        sizes="25vw"
                                    />
                                :   <>
                                        <Image
                                            src={media.src}
                                            alt={`Gallery ${index}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="25vw"
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </>
                                }

                                {/* "Show all" button on last visible item */}
                                {index === Math.min(gridMedia.length, 4) - 1 &&
                                    remainingCount > 0 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleOpenModal(0)
                                            }}
                                            className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900/80 backdrop-blur-md text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
                                        >
                                            <Images className="h-4 w-4" />
                                            <ClientTranslate translationKey="showAllPhotos" />
                                        </button>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            }

            {/* ─── MOBILE CAROUSEL ─── */}
            <div className="lg:hidden relative sm:mx-0 sm:w-full">
                <Carousel
                    opts={{ align: "center", loop: false }}
                    className="w-full"
                >
                    <CarouselContent className="m-0">
                        {allMedia.map((media, index) => (
                            <CarouselItem key={index} className="p-0">
                                <div
                                    onClick={() => handleOpenModal(index)}
                                    className="relative h-[300px] sm:h-[350px] w-full overflow-hidden rounded-2xl cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        handleOpenModal(index)
                                    }
                                >
                                    {media.video ?
                                        <VideoThumbnail
                                            src={media.src}
                                            onClick={() =>
                                                handleOpenModal(index)
                                            }
                                            className="w-full h-full"
                                            sizes="(max-width: 640px) 100vw, 100vw"
                                            priority={index === 0}
                                        />
                                    :   <>
                                            <Image
                                                src={media.src}
                                                alt={`Slide ${index}`}
                                                fill
                                                className="object-cover select-none rounded-2xl rounded-b-none"
                                                sizes="(max-width: 640px) 100vw, 100vw"
                                                priority={index === 0}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
                                        </>
                                    }
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
                    <ClientTranslate translationKey="showAllPhotos" />
                </button>
            </div>

            <MediaViewerModal />
        </div>
    )
}
