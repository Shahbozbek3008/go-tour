import { Star } from "lucide-react"

interface RatingSummaryProps {
    rating: number
    totalCount: number
}

export function RatingSummary({ rating, totalCount }: RatingSummaryProps) {
    return (
        <div className="flex items-center gap-2 mb-6">
            <Star className="size-[18px] fill-amber-400 text-amber-400" />
            <span className="text-2xl font-bold text-foreground tracking-tight">
                Rating {rating} &nbsp;•&nbsp; {totalCount} reviews
            </span>
        </div>
    )
}
