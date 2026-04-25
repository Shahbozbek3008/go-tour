"use client"

import { cn } from "@/lib/utils/shadcn"
import { format } from "date-fns"
import { Star } from "lucide-react"
import { Review } from "../../../_types"
import { ImageGallery } from "../image-gallery/image-gallery"
import { ReadMore } from "../read-more/read-more"
import { ReviewerAvatar } from "./reviewer-avatar"

interface ReviewCardProps {
    review: Review
    className?: string
}

export function ReviewCard({ review, className }: ReviewCardProps) {
    const { userFullName, rating, createdAt, comment, mediaUrls } = review

    const formattedDate = format(new Date(createdAt), "dd.MM.yyyy")
    
    const galleryImages = mediaUrls?.map((m) => ({
        src: m.url,
        alt: `${userFullName}'s review image`,
    })) || []

    return (
        <div className={cn("py-5", className)}>
            <div className="flex items-center gap-3 mb-3.5">
                <ReviewerAvatar name={userFullName} />
                <div>
                    <div className="flex items-center gap-2">
                        <p className="text-[15px] sm:text-[17px] font-semibold text-foreground">
                            {userFullName}
                        </p>
                        <div className="flex items-center gap-1">
                            <Star className="size-4 fill-[#ADC227] text-[#ADC227]" />
                            <span className="text-[15px] sm:text-[17px] font-semibold text-[#ADC227]">
                                {rating.toFixed(1)}
                            </span>
                        </div>
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-[#A3A3A3] mt-0.5 font-medium">
                        {formattedDate}
                    </p>
                </div>
            </div>

            <ReadMore lines={2} className="mb-4">
                {comment}
            </ReadMore>
            {galleryImages.length > 0 && <ImageGallery images={galleryImages} />}
        </div>
    )
}
