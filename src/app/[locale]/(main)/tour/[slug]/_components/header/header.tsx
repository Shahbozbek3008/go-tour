import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface TourHeaderProps {
    title: string
}

export function TourHeader({ title }: TourHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight flex-1">
                {title}
            </h1>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
                <Button size="icon" variant="outline" aria-label="Comments">
                    <MessageCircle className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline" aria-label="Favorite">
                    <Heart className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
