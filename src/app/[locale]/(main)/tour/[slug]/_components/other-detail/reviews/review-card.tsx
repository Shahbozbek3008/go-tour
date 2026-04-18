"use client"

import { cn } from "@/lib/utils/shadcn"
import { Star } from "lucide-react"
import { Review } from "../../../_types"
import { ImageGallery } from "../image-gallery"
import { ReadMore } from "../read-more"
import { ReviewerAvatar } from "./reviewer-avatar"

interface ReviewCardProps {
    review: Review
    className?: string
}

export function ReviewCard({ review, className }: ReviewCardProps) {
    const { reviewer, text, images } = review

    return (
        <div className={cn("py-5", className)}>
            <div className="flex items-center gap-3 mb-3.5">
                <ReviewerAvatar reviewer={reviewer} />
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-[15px] sm:text-[17px] font-semibold text-foreground">
                            {reviewer.name}
                        </p>
                        <div className="flex items-center gap-1">
                            <Star className="size-4 fill-[#ADC227] text-[#ADC227]" />
                            <span className="text-[15px] sm:text-[17px] font-semibold text-[#ADC227]">
                                {reviewer.rating.toFixed(1)}
                            </span>
                        </div>
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-[#A3A3A3] mt-0.5 font-medium">
                        {reviewer.date}
                    </p>
                </div>
            </div>

            <ReadMore lines={2} className="mb-4">
                {text}
            </ReadMore>
            {images && images.length > 0 && <ImageGallery images={images} />}
        </div>
    )
}
