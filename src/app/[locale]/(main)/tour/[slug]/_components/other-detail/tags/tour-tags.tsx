import { Badge } from "@/components/ui/badge"

interface TourTagsProps {
    tags: string[]
}

export function TourTags({ tags }: TourTagsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-xl px-3 py-1 text-sm font-medium cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                >
                    {tag}
                </Badge>
            ))}
        </div>
    )
}
