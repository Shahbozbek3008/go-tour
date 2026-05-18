"use client"

import { IconSpeakerPhone } from "@/assets/icons/speaker-phone"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/hooks/use-language"
import { useRouter } from "@/i18n/navigation"
import { BannerType } from "@/lib/constants/banner-types"
import { getHref } from "@/lib/utils/get-href"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
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

    const scrollRef = useRef<HTMLDivElement>(null)
    const [showRightFade, setShowRightFade] = useState(false)
    const [showLeftFade, setShowLeftFade] = useState(false)

    const updateFades = () => {
        const el = scrollRef.current
        if (!el) return
        const { scrollLeft, scrollWidth, clientWidth } = el
        setShowRightFade(scrollLeft + clientWidth < scrollWidth - 4)
        setShowLeftFade(scrollLeft > 4)
    }

    useEffect(() => {
        updateFades()
    }, [banners])

    const scrollBy = (direction: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: direction === "right" ? 240 : -240,
            behavior: "smooth",
        })
    }

    if (isLoading) return <QuickLinksSkeleton />
    if (!banners.length) return null

    const handleNavigation = (banner: Banner) => {
        const {
            type,
            destinationId,
            agentId,
            tourCategory,
            link,
            androidLink,
            iosLink,
            slugRu,
            slugUz,
        } = banner

        switch (type) {
            case BannerType.LINK_FOR_MOBILE: {
                if (typeof window === "undefined") return
                const userAgent = navigator.userAgent.toLowerCase()
                const isIos = /iphone|ipad|ipod/.test(userAgent)
                const targetLink = isIos ? iosLink : androidLink
                if (targetLink) window.open(targetLink, "_blank")
                break
            }

            case BannerType.BY_LINK: {
                if (link) {
                    if (link.startsWith("http")) {
                        window.open(link, "_blank")
                    } else {
                        router.push(link)
                    }
                }
                break
            }

            case BannerType.PROMOTION: {
                router.push(
                    getHref({
                        pathname: "/[locale]/catalog",
                        query: { promotional: "true" },
                    }),
                )
                break
            }

            case BannerType.BY_AGENT: {
                if (agentId) {
                    router.push(
                        getHref({
                            pathname: "/[locale]/agents",
                            query: { agentId: String(agentId) },
                        }),
                    )
                }
                break
            }

            case BannerType.BY_TOUR_CATEGORY: {
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

            case BannerType.BY_DESTINATION: {
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

            case BannerType.BY_TOUR: {
                if (slugRu && slugUz) {
                    router.push(
                        getHref({
                            pathname: "/[locale]/tour/[slug]",
                            query: { slug: isRussian ? slugRu : slugUz },
                        }),
                    )
                }
                break
            }

            default:
                router.push(getHref({ pathname: "/[locale]" }))
                break
        }
    }

    return (
        <div className="relative mt-4">
            {/* Left fade mask */}
            <div
                className={`
                    pointer-events-none absolute left-0 top-0 bottom-2 w-16 z-10
                    bg-gradient-to-r from-white to-transparent
                    transition-opacity duration-200
                    ${showLeftFade ? "opacity-100" : "opacity-0"}
                `}
            />

            {/* Right fade mask */}
            <div
                className={`
                    pointer-events-none absolute right-0 top-0 bottom-2 w-16 z-10
                    bg-gradient-to-l from-white to-transparent
                    transition-opacity duration-200
                    ${showRightFade ? "opacity-100" : "opacity-0"}
                `}
            />

            {/* Left arrow button — only desktop */}
            <button
                onClick={() => scrollBy("left")}
                aria-label="Chapga scroll"
                className={`
                    hidden md:flex
                    absolute left-0 top-1/2 -translate-y-1/2 z-20
                    w-7 h-7 items-center justify-center
                    rounded-full bg-white border border-gray-200 shadow-sm
                    text-gray-500 hover:bg-gray-50 hover:text-gray-800
                    transition-all duration-200
                    ${showLeftFade ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right arrow button — only desktop */}
            <button
                onClick={() => scrollBy("right")}
                aria-label="O'ngga scroll"
                className={`
                    hidden md:flex
                    absolute right-0 top-1/2 -translate-y-1/2 z-20
                    w-7 h-7 items-center justify-center
                    rounded-full bg-white border border-gray-200 shadow-sm
                    text-gray-500 hover:bg-gray-50 hover:text-gray-800
                    transition-all duration-200
                    ${showRightFade ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
            >
                <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scrollable list */}
            <div
                ref={scrollRef}
                onScroll={updateFades}
                className="flex gap-3 overflow-x-auto pb-1 no-scrollbar scroll-smooth"
            >
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
