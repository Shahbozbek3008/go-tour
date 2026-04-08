"use client"

import { IconBookmark } from "@/assets/icons/bookmark"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { MarketplaceProduct } from "../../_types"

interface Props {
    item: MarketplaceProduct
}

export default function BookmarkAction({ item }: Props) {
    const { post, isPending } = useRequest()
    const { invalidateByPatternMatch, invalidateByExactMatch } = useRevalidate()
    const [isBookMarked, setIsBookmarked] = useState<boolean>(
        item.is_bookmarked,
    )
    const { redirectToSignIn } = useNoneAuthorized()

    const toggleBookmark = () => {
        redirectToSignIn(() => {
            post(
                API.MARKETPLACE.BOOKMARK_SLUG.replace("{slug}", item.slug),
                {},
                {
                    onSuccess: () => {
                        invalidateByPatternMatch([API.MARKETPLACE.INDEX])
                        invalidateByExactMatch([
                            API.PROFILE.INFO.ME,
                            API.PROFILE.OTHER.USER_INFO,
                        ])
                        setIsBookmarked((prev) => !prev)
                    },
                },
            )
        })
    }

    return (
        <div>
            <Button
                variant="secondary"
                className="text-text-900 w-10 h-10"
                icon={
                    <IconBookmark
                        className={cn(
                            isBookMarked && "fill-primary text-primary",
                        )}
                    />
                }
                isLoading={isPending}
                onClick={toggleBookmark}
            />
        </div>
    )
}
