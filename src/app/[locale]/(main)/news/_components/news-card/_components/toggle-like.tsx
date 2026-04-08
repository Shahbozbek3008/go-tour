"use client"

import IconThumbDown from "@/assets/icons/thumb-down"
import IconThumbUp from "@/assets/icons/thumb-up"
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

export default function ToggleLike({ item }: Props) {
    const [isLiked, setIsLiked] = useState<boolean>(item.is_liked)
    const [isDisliked, setIsDisliked] = useState<boolean>(item.is_disliked)

    const { post, isPending } = useRequest()
    const { post: postDislike, isPending: isPendingDislike } = useRequest()
    const { invalidateByPatternMatch } = useRevalidate()

    const toggleLiked = () => {
        post(
            API.BLOG.LIKE_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    invalidateByPatternMatch([API.BLOG.LIST])
                    setIsLiked((prev) => {
                        const next = !prev
                        if (next) setIsDisliked(false)
                        return next
                    })
                },
            },
        )
    }

    const toggleDisliked = () => {
        postDislike(
            API.BLOG.DISLIKE_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    invalidateByPatternMatch([API.BLOG.LIST])
                    setIsDisliked((prev) => {
                        const next = !prev
                        if (next) setIsLiked(false)
                        return next
                    })
                },
            },
        )
    }
    return (
        <>
            <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-foreground/5 h-6 w-6"
                onClick={toggleLiked}
                isLoading={isPending}
            >
                <IconThumbUp
                    className={cn(
                        "[&_path]:stroke-foreground",
                        isLiked && "fill-primary",
                    )}
                />
            </Button>
            <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-foreground/5 h-6 w-6"
                onClick={toggleDisliked}
                isLoading={isPendingDislike}
            >
                <IconThumbDown
                    className={cn(
                        "[&_path]:stroke-foreground",
                        isDisliked && "fill-primary",
                    )}
                />
            </Button>
        </>
    )
}
