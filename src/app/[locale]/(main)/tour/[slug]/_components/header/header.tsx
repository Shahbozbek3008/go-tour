import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { cn } from "@/lib/utils/shadcn"
import { useQueryClient } from "@tanstack/react-query"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useTourDetailQuery } from "../../_hooks"

interface TourHeaderProps {
    title: string
}

export function TourHeader({ title }: TourHeaderProps) {
    const t = useTranslations()
    const queryClient = useQueryClient()
    const { detail } = useTourDetailQuery()
    const { isAuthenticated } = useProfileQuery()
    const { openModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)
    const { post, isPending, remove } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!isAuthenticated) {
            openModal()
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
                    API.TOUR.TOP_SELLING,
                    API.TOUR.PROMOTIONAL,
                    API.TOUR.FAVOURITES_LIST,
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
        <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight flex-1">
                {title}
            </h1>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
                <Button size="icon" variant="outline" aria-label="Comments">
                    <MessageCircle className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    aria-label="Share"
                    onClick={handleShare}
                >
                    <Share2 className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    aria-label="Favorite"
                    onClick={handleFavorite}
                    isLoading={isPending}
                    className="group/heart"
                >
                    <Heart
                        className={cn(
                            "transition-transform duration-200 group-hover/heart:scale-110 group-hover/heart:fill-red-500 group-hover/heart:stroke-red-500 active:scale-95",
                            isAuthenticated &&
                                detail?.isFavorite &&
                                "fill-red-500 stroke-red-500",
                        )}
                    />
                </Button>
            </div>
        </div>
    )
}
