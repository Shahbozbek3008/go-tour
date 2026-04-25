"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { Building2 } from "lucide-react"
import type { AccommodationImage, AccommodationOption } from "../../../_types"
import { ImageGallery } from "../image-gallery/image-gallery"
import { ComfortBadge } from "./comfort-badge"

interface AccommodationCardProps {
    option: AccommodationOption
}

export function AccommodationCard({ option }: AccommodationCardProps) {
    const { isRussian } = useLanguage()

    const description = isRussian ? option.descriptionRu : option.descriptionUz

    const galleryImages: AccommodationImage[] =
        option.images?.map((img) => ({
            src: img?.url,
            alt: option?.name,
        })) || []

    return (
        <Card className="w-full border border-border/60 shadow-sm rounded-2xl overflow-hidden bg-card">
            <CardContent className="p-5 sm:p-6 flex flex-col gap-5">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 text-muted-foreground">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                        {option?.name}
                    </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-muted/30 p-4 sm:p-5 flex flex-col gap-4">
                    <ComfortBadge level={option?.comfortLevel} />

                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>

                    {galleryImages?.length > 0 && (
                        <ImageGallery images={galleryImages} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
