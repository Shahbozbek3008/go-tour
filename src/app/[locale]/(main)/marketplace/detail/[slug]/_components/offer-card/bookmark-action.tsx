"use client"

import { IconBookmarkGradient } from "@/assets/icons/bookmark-gradient"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

export default function BookmarkAction() {
    const { data, isPreview } = useMarketplaceProductQuery()
    const { invalidateByPatternMatch } = useRevalidate()
    const [isBookMarked, setIsBookmarked] = useState<boolean | undefined>(
        data?.is_bookmarked,
    )
    const { post, isPending } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()
    const toggleBookmark = () => {
        redirectToSignIn(() => {
            if (isPreview) return
            post(
                API.MARKETPLACE.BOOKMARK_SLUG.replace(
                    "{slug}",
                    data?.slug || "",
                ),
                {},
                {
                    onSuccess: () => {
                        invalidateByPatternMatch([
                            API.MARKETPLACE.LIST,
                            API.MARKETPLACE.SIMILAR_SLUG.replace("{slug}", ""),
                        ])
                        setIsBookmarked((prev) => !prev)
                    },
                },
            )
        })
    }
    return (
        <Button
            variant={"ghost"}
            icon={
                <IconBookmarkGradient
                    className={cn(
                        isBookMarked && "fill-primary [&_defs]:hidden",
                    )}
                />
            }
            isLoading={isPending}
            onClick={toggleBookmark}
        />
    )
}
