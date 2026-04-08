import { IconBookmark2 } from "@/assets/icons/bookmark2"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { NewsItem } from "../../../_types"

interface Props {
    item: NewsItem
}

export default function ToggleBookmark({ item }: Props) {
    const [isBookMarked, setIsBookmarked] = useState<boolean>(
        item.is_bookmarked,
    )
    const { invalidateByPatternMatch } = useRevalidate()

    const { post, isPending } = useRequest()

    const toggleBookmark = () => {
        post(
            API.BLOG.BOOKMARK_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    invalidateByPatternMatch([API.BLOG.LIST])
                    setIsBookmarked((prev) => !prev)
                },
            },
        )
    }
    return (
        <Button
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-background/20 h-7 w-7 rounded-full bg-foreground/60"
            isLoading={isPending}
            onClick={toggleBookmark}
        >
            <IconBookmark2 className={cn(isBookMarked && "fill-primary")} />
        </Button>
    )
}
