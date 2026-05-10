import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { formatReviewCount } from "@/lib/utils/format-review"
import { ChevronRight } from "lucide-react"

interface TourMetaProps {
    rating: number
    reviewCount: number
    country: string
    type: string
    discount: number
}

export function TourMeta({
    rating,
    reviewCount,
    country,
    type,
    discount,
}: TourMetaProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">
            {rating === 0 ?
                <Badge
                    variant="default"
                    className="font-semibold text-amber-400 bg-amber-50"
                >
                    <ClientTranslate translationKey="new" />
                </Badge>
            :   <Badge
                    variant="default"
                    className="bg-lime-50 text-lime-700 border border-lime-200"
                >
                    <StarRating
                        rating={rating ? Number(rating.toFixed(1)) : 0}
                        className="mr-1"
                    />
                </Badge>
            }

            {reviewCount && (
                <Badge className="bg-[#eeeef2] text-black text-sm font-medium">
                    {formatReviewCount(reviewCount)}
                    <ChevronRight className="h-3.5 w-3.5 ml-0.5 text-gray-400" />
                </Badge>
            )}

            <Badge variant="gray" className="bg-[#eeeef2] text-black text-sm">
                {country}
            </Badge>
            <Badge variant="gray" className="bg-[#eeeef2] text-black text-sm">
                <ClientTranslate
                    translationKey={`cat_${type}` as TranslationKey}
                />
            </Badge>

            {discount > 0 && (
                <Badge variant="destructive" className="text-sm">
                    <ClientTranslate translationKey="discount_label" />{" "}
                    {discount}%
                </Badge>
            )}
        </div>
    )
}
