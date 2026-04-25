"use client"

import { IconSpeakerPhone } from "@/assets/icons/speaker-phone"
import { Skeleton } from "@/components/ui/skeleton"
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
    const { banners, isLoading } = useBannerListQuery()

    if (isLoading) return <QuickLinksSkeleton />
    if (!banners.length) return null

    const handleNavigation = (banner: Banner) => {
        if (banner.type === "BY_DESTINATION" && banner.destinationId) {
            router.push(
                getHref({
                    pathname: "/[locale]/catalog",
                    query: { destinationId: String(banner.destinationId) },
                }),
            )
        } else if (banner.tourId) {
            router.push(
                getHref({
                    pathname: "/[locale]/tour/[slug]",
                    query: { slug: String(banner.tourId) },
                }),
            )
        }
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            {banners.map((item, i) => (
                <button
                    key={i}
                    onClick={() => handleNavigation(item)}
                    className="group relative flex items-center gap-3 bg-[#f4f4f4] cursor-pointer hover:border-gray-200 rounded-2xl px-4 py-3.5 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-left"
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
                        <p className="text-sm font-semibold text-gray-800 leading-tight mt-0.5">
                            {item.titleUz}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}

const QuickLinksSkeleton = () => {
    return (
        <div className="mt-4 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 bg-[#f4f4f4] rounded-2xl px-4 py-3.5"
                    >
                        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                        <div className="flex flex-col gap-1.5 w-full">
                            <Skeleton className="h-2 w-1/2 rounded" />
                            <Skeleton className="h-3 w-3/4 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
