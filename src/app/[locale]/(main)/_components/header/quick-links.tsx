"use client"

import { IconSpeakerPhone } from "@/assets/icons/speaker-phone"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/hooks/use-language"
import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import Image from "next/image"
import { useState } from "react"
import { Banner, useBannerListQuery } from "./_hooks"

const BannerIcon = ({ src, alt }: { src: string; alt: string }) => {
    const [imgError, setImgError] = useState(false)

    if (imgError || !src) {
        return (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gray-100">
                <IconSpeakerPhone className="w-5 h-5 text-gray-400" />
            </div>
        )
    }

    return (
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
            <Image
                src={src}
                alt={alt}
                width={20}
                height={20}
                className="object-contain"
                unoptimized
                onError={() => setImgError(true)}
            />
        </div>
    )
}

export const QuickLinks = () => {
    const router = useRouter()
    const { isRussian } = useLanguage()
    const { banners, isLoading } = useBannerListQuery()

    if (isLoading) return <QuickLinksSkeleton />
    if (!banners.length) return null

    const handleNavigation = (banner: Banner) => {
        const {
            type,
            tourId,
            destinationId,
            agentId,
            tourCategory,
            link,
            androidLink,
            iosLink,
        } = banner

        switch (type) {
            case "LINK_FOR_MOBILE": {
                if (typeof window === "undefined") return
                const userAgent = navigator.userAgent.toLowerCase()
                const isIos = /iphone|ipad|ipod/.test(userAgent)
                const isAndroid = /android/.test(userAgent)

                const targetLink = isIos ? iosLink : androidLink
                if (targetLink) {
                    window.open(targetLink, "_blank")
                }
                break
            }

            case "BY_LINK": {
                if (link) {
                    if (link.startsWith("http")) {
                        window.open(link, "_blank")
                    } else {
                        router.push(link)
                    }
                }
                break
            }

            case "PROMOTION": {
                router.push(
                    getHref({
                        pathname: "/[locale]/catalog",
                        query: { promotional: "true" },
                    }),
                )
                break
            }

            case "BY_AGENT": {
                if (agentId) {
                    router.push(
                        getHref({
                            pathname: "/[locale]/catalog",
                            query: { agentId: String(agentId) },
                        }),
                    )
                }
                break
            }

            case "BY_TOUR_CATEGORY": {
                if (tourCategory) {
                    router.push(
                        getHref({
                            pathname: "/[locale]/catalog",
                            query: { category: tourCategory },
                        }),
                    )
                }
                break
            }

            case "BY_DESTINATION": {
                if (destinationId) {
                    router.push(
                        getHref({
                            pathname: "/[locale]/catalog",
                            query: { destinations: String(destinationId) },
                        }),
                    )
                }
                break
            }

            case "BY_TOUR": {
                if (tourId) {
                    router.push(
                        getHref({
                            pathname: "/[locale]/tour/[slug]",
                            query: { slug: String(tourId) },
                        }),
                    )
                }
                break
            }

            case "DEFAULT": {
                router.push("/")
                break
            }

            default:
                if (tourId) {
                    router.push(
                        getHref({
                            pathname: "/[locale]/tour/[slug]",
                            query: { slug: String(tourId) },
                        }),
                    )
                }
                break
        }
    }

    return (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
            {banners.map((item, i) => (
                <button
                    key={i}
                    onClick={() => handleNavigation(item)}
                    className="group relative flex items-center gap-3 bg-[#f4f4f4] cursor-pointer hover:border-gray-200 rounded-2xl px-4 py-3.5 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-left shrink-0 w-[200px]"
                >
                    {item?.badge != null && (
                        <span className="absolute top-2 right-2 text-[9px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                            {item.badge}
                        </span>
                    )}
                    <div className="transition-transform duration-200 group-hover:scale-110 shrink-0">
                        <BannerIcon src={item.icon} alt={item.titleUz} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-800 leading-tight mt-0.5">
                            {isRussian ? item?.titleRu : item.titleUz}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}

const QuickLinksSkeleton = () => {
    return (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 bg-[#f4f4f4] rounded-2xl px-4 py-3.5 shrink-0 w-[200px]"
                >
                    <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                    <div className="flex flex-col gap-1.5 w-full">
                        <Skeleton className="h-2 w-1/2 rounded" />
                        <Skeleton className="h-3 w-3/4 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}
