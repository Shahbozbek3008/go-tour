"use client"

import { IconLike } from "@/assets/icons/like"
import { IconLikeDown } from "@/assets/icons/like-down"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { IBlog } from "../types"

interface Props {
    item: IBlog
}

export default function LikeActions({ item }: Props) {
    const [isLiked, setIsLiked] = useState<boolean>(item.is_liked)
    const [isDisliked, setIsDisliked] = useState<boolean>(item.is_disliked)
    const { post: likePost } = useRequest()
    const { post: dislikePost } = useRequest()
    const { invalidateByPatternMatch } = useRevalidate()
    const toggleLike = () => {
        likePost(API.BLOG.LIKE_SLUG.replace("{slug}", item.slug), undefined, {
            onSuccess: () => {
                invalidateByPatternMatch([API.BLOG.INDEX])
                setIsLiked((prev) => !prev)
                if (isDisliked) {
                    setIsDisliked((prev) => !prev)
                }
            },
        })
    }

    const toggleDislike = () => {
        dislikePost(
            API.BLOG.DISLIKE_SLUG.replace("{slug}", item.slug),
            undefined,
            {
                onSuccess: () => {
                    invalidateByPatternMatch([API.BLOG.INDEX])
                    setIsDisliked((prev) => !prev)
                    if (isLiked) {
                        setIsLiked((prev) => !prev)
                    }
                },
            },
        )
    }

    return (
        <>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    toggleLike()
                }}
            >
                <IconLike
                    className={cn(isLiked && "fill-primary text-primary")}
                />
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    toggleDislike()
                }}
            >
                <IconLikeDown
                    className={cn(isDisliked && "fill-primary text-primary")}
                />
            </div>
        </>
    )
}
