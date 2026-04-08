"use client"

import { IconBookmark } from "@/assets/icons/bookmark"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { OutreachhubItem } from "../../_types"

interface Props {
    item: OutreachhubItem
}

export default function BookmarkAction({ item }: Props) {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(
        item.is_bookmarked,
    )
    const { invalidateByPatternMatch, invalidateByExactMatch } = useRevalidate()
    const { post, isPending } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()

    const toggleBookmark = () => {
        redirectToSignIn(() => {
            post(
                API.OUT_REACH_HUB.BOOKMARK_SLUG.replace("{slug}", item.slug),
                {},
                {
                    onSuccess: () => {
                        invalidateByPatternMatch([API.OUT_REACH_HUB.INDEX])
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
        <Button
            variant="secondary"
            className="text-text-900 w-10 h-10"
            icon={
                <IconBookmark
                    className={cn(isBookmarked && "fill-primary text-primary")}
                />
            }
            isLoading={isPending}
            onClick={(e) => {
                e.stopPropagation()
                toggleBookmark()
            }}
        />
    )
}
