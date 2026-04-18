import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"
import type { AccommodationOption } from "../../../_types"
import { ImageGallery } from "../image-gallery"
import { ComfortBadge } from "./comfort-badge"

interface AccommodationCardProps {
    option: AccommodationOption
}

export function AccommodationCard({ option }: AccommodationCardProps) {
    return (
        <Card className="w-full border border-border/60 shadow-sm rounded-2xl overflow-hidden bg-card">
            <CardContent className="p-5 sm:p-6 flex flex-col gap-5">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 text-muted-foreground">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                        {option.location}
                    </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-muted/30 p-4 sm:p-5 flex flex-col gap-4">
                    <ComfortBadge
                        level={option.comfortLevel}
                        rating={option.comfortRating}
                        maxRating={option.maxRating}
                    />

                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {option.description}
                    </p>

                    <ImageGallery images={option.images} />
                </div>
            </CardContent>
        </Card>
    )
}
