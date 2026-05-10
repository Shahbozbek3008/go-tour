import { Star } from "lucide-react"

interface OrganizerRatingProps {
    rating: number
    reviewCount: number
}

export function OrganizerRating({ rating, reviewCount }: OrganizerRatingProps) {
    return (
        <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-foreground">
                {rating}
            </span>
            <span className="text-muted-foreground text-xs">·</span>
            <a
                href="#reviews"
                className="text-sm text-primary hover:text-primary/80 underline-offset-2 hover:underline transition-colors"
            >
                {reviewCount} reviews
            </a>
        </div>
    )
}
