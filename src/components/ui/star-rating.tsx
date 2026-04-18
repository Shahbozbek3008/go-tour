import { cn } from "@/lib/utils/shadcn"
import { Star } from "lucide-react"

interface StarRatingProps {
    rating: number
    className?: string
}

export function StarRating({ rating, className }: StarRatingProps) {
    return (
        <div className={cn("flex items-center gap-1", className)}>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">
                {rating}
            </span>
        </div>
    )
}
