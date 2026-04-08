"use client"

import IconThumbDown from "@/assets/icons/thumb-down"
import IconThumbUp from "@/assets/icons/thumb-up"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { NewsItem } from "../../_types"

interface LikesButtonsProps {
    item: NewsItem
}

export const LikesButtons = ({ item }: LikesButtonsProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(item.is_liked)
    const [isDisliked, setIsDisliked] = useState<boolean>(item.is_disliked)

    const { invalidateByPatternMatch } = useRevalidate()
    const { post, isPending } = useRequest()
    const { post: postDisliked, isPending: isPendingDisliked } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()

    const toggleLiked = () => {
        redirectToSignIn(() => {
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
        })
    }

    const toggleDisliked = () => {
        redirectToSignIn(() => {
            postDisliked(
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
        })
    }
    return (
        <>
            <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-foreground/5 h-6 w-6"
                onClick={(e) => {
                    e.stopPropagation()
                    toggleLiked()
                }}
                isLoading={isPending}
            >
                {!isPending && (
                    <IconThumbUp
                        className={cn(
                            "[&_path]:stroke-foreground",
                            isLiked && "fill-primary",
                        )}
                    />
                )}
            </Button>
            <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-foreground/5 h-6 w-6"
                onClick={(e) => {
                    e.stopPropagation()
                    toggleDisliked()
                }}
                isLoading={isPendingDisliked}
            >
                {!isPendingDisliked && (
                    <IconThumbDown
                        className={cn(
                            "[&_path]:stroke-foreground",
                            isDisliked && "fill-primary",
                        )}
                    />
                )}
            </Button>
        </>
    )
}
