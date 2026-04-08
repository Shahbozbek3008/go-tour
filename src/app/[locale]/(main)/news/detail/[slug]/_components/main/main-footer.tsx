"use client"

import IconEye from "@/assets/icons/eye-icon"
import IconThumbDown from "@/assets/icons/thumb-down"
import IconThumbUp from "@/assets/icons/thumb-up"
import { IconVerifiedGradient } from "@/assets/icons/verified-gradient"
import ClientImg from "@/components/common/client-img"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { useNewDetailQuery } from "../../_hooks/use-new-detail-query"
import ToggleBookmark from "./toggle-bookmark"

export default function MainFooter() {
    const { data } = useNewDetailQuery()

    const { invalidateByPatternMatch } = useRevalidate()
    const [isLiked, setIsLiked] = useState<boolean | undefined>(data?.is_liked)
    const [isDisliked, setIsDisliked] = useState<boolean | undefined>(
        data?.is_disliked,
    )

    const { post, isPending } = useRequest()
    const { post: postDislike, isPending: isPendingDislike } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()

    const toggleLiked = () => {
        redirectToSignIn(() => {
            post(
                API.BLOG.LIKE_SLUG.replace("{slug}", data?.slug || ""),
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
            postDislike(
                API.BLOG.DISLIKE_SLUG.replace("{slug}", data?.slug || ""),
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
        <article className="flex items-center justify-between gap-4">
            <main className="flex flex-col sm:flex-row w-full justify-between gap-4">
                {/* Profile */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <ClientImg
                            src={data?.user?.profile_image}
                            alt={`${data?.user?.first_name} ${data?.user?.last_name}`}
                            wrapperClassName="w-14 h-14 rounded-full"
                            className="rounded-full"
                        />
                        <IconVerifiedGradient className="absolute top-0 -right-2" />
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            {data?.user?.first_name} {data?.user?.last_name}
                        </h3>
                        <p className="text-xs text-text-500">
                            {data?.user?.job_title}
                        </p>
                    </div>
                </div>

                {/* Actions + ToggleBookmark */}
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                    <hgroup className="flex items-center gap-6">
                        <p className="flex items-center gap-1 mr-2 text-sm">
                            <IconEye
                                width={24}
                                height={24}
                                className="[&_circle]:stroke-foreground [&_path]:stroke-foreground [&_circle]:fill-foreground"
                            />
                            {data?.views_count}
                        </p>
                        <div className="w-14 flex items-center gap-1 text-sm">
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="hover:bg-foreground/5 h-8 w-8"
                                onClick={toggleLiked}
                                isLoading={isPending}
                            >
                                {!isPending && (
                                    <IconThumbUp
                                        width={24}
                                        height={24}
                                        className={cn(
                                            "[&_path]:stroke-foreground",
                                            isLiked && "fill-primary",
                                        )}
                                    />
                                )}
                            </Button>
                            {data?.likes_count}
                        </div>
                        <div className="w-14 flex items-center gap-2">
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="hover:bg-foreground/5 h-8 w-8"
                                onClick={toggleDisliked}
                                isLoading={isPendingDislike}
                            >
                                {!isPendingDislike && (
                                    <IconThumbDown
                                        width={24}
                                        height={24}
                                        className={cn(
                                            "[&_path]:stroke-foreground",
                                            isDisliked &&
                                                "fill-primary text-primary",
                                        )}
                                    />
                                )}
                            </Button>
                        </div>
                    </hgroup>

                    <ToggleBookmark
                        item={data}
                        className="order-none ml-auto"
                    />
                </div>
            </main>
        </article>
    )
}
