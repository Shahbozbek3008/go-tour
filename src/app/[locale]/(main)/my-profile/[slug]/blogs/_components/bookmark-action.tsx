"use client"

import { IconBookmark } from "@/assets/icons/bookmark"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { IBlog } from "../types"

interface Props {
    item: IBlog
}

export default function BookmarkAction({ item }: Props) {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(
        item.is_bookmarked,
    )

    const { invalidateByPatternMatch } = useRevalidate()
    const { post, isPending } = useRequest()

    const toggleBookmark = () => {
        post(API.BLOG.BOOKMARK_SLUG.replace("{slug}", item.slug), undefined, {
            onSuccess: () => {
                invalidateByPatternMatch([API.BLOG.INDEX])
                setIsBookmarked((prev) => !prev)
            },
        })
    }

    return (
        <Button
            variant="secondary"
            className="text-text-900 w-10 h-10"
            size="lg"
            isLoading={isPending}
            onClick={(e) => {
                e.stopPropagation()
                toggleBookmark()
            }}
        >
            {!isPending && (
                <IconBookmark
                    className={cn(isBookmarked && "fill-primary text-primary")}
                />
            )}
        </Button>
    )
}
