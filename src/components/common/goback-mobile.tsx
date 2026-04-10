"use client"

import { IconArrowLeft } from "@/assets/icons/arrow-left"
import { IconBookmark } from "@/assets/icons/bookmark"
import { IconShare } from "@/assets/icons/share"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { Button } from "../ui/button"

interface Props {
    bookmarked?: boolean
    className?: string
    bookmarkEndpoint: string
    invalidateByPatternKeys?: string[]
    invalidateByExactKeys?: string[]
    backSlug?: string
    title?: string
}

export const GobackMobile = ({
    bookmarked,
    className,
    bookmarkEndpoint,
    invalidateByExactKeys,
    invalidateByPatternKeys,
    backSlug,
    title,
}: Props) => {
    const [isBookmarked, setIsBookmarked] = useState(bookmarked)

    const { invalidateByPatternMatch, invalidateByExactMatch } = useRevalidate()
    const { post, isPending } = useRequest()

    const toggleBookmark = () => {
        post(
            bookmarkEndpoint,
            {},
            {
                onSuccess: () => {
                    if (invalidateByPatternKeys) {
                        invalidateByPatternMatch(invalidateByPatternKeys)
                    }
                    if (invalidateByExactKeys) {
                        invalidateByExactMatch(invalidateByExactKeys)
                    }
                    setIsBookmarked((prev) => !prev)
                },
            },
        )
    }

    const router = useRouter()

    return (
        <div
            className={cn("flex gap-2 items-center justify-between", className)}
        >
            <div className="flex items-center gap-3">
                <Button
                    className="has-[>svg]:px-0 py-0 text-text-900"
                    icon={<IconArrowLeft />}
                    variant={"ghost"}
                    onClick={() => router.back()}
                />
                {title && <p className="text-xl font-semibold"> {title} </p>}
            </div>

            <div className="flex items-center gap-4">
                <Button
                    className="text-text-900"
                    variant={"secondary"}
                    icon={
                        <IconBookmark
                            className={cn(
                                isBookmarked && "fill-primary text-primary",
                            )}
                        />
                    }
                    isLoading={isPending}
                    onClick={toggleBookmark}
                />
                <Button
                    className="text-text-900"
                    onClick={() => {
                        navigator.share({
                            url: location.href,
                            title: "INexLynk",
                            text: backSlug,
                        })
                    }}
                    icon={<IconShare />}
                    variant={"secondary"}
                />
            </div>
        </div>
    )
}
