"use client"

import { IconBookmark } from "@/assets/icons/bookmark"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { formatDate } from "@/lib/utils/format-date"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { useInvestmentItemQuery } from "../../../_hooks/use-investment-item-query"

interface Props {
    className?: string
}

export default function Header({ className }: Props) {
    const { data, isPreview } = useInvestmentItemQuery()
    const [isBookMarked, setIsBookMarked] = useState<boolean | undefined>(
        data?.is_bookmarked,
    )
    const { invalidateByPatternMatch } = useRevalidate()

    const { post, isPending } = useRequest()

    const toggleBookmark = () => {
        if (isPreview) return
        post(
            API.INVESTMENT.INVESTMENT_ITEMS.SLUG_BOOKMARK.replace(
                "{slug}",
                data?.slug || "",
            ),
            {},
            {
                onSuccess: () => {
                    invalidateByPatternMatch([API.INVESTMENT.INDEX])
                    setIsBookMarked((prev) => !prev)
                },
            },
        )
    }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Badge className="bg-[#F3F1FF] text-[#0B4B46] hidden md:block">
                {data?.request_type_display}
            </Badge>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold mr-4">{data?.name}</h2>
                    <p className="text-sm text-(--text-600)">
                        <ClientTranslate translationKey="published" />:{" "}
                        {formatDate(data?.created_at)}
                    </p>
                </div>
                <Button
                    variant="secondary"
                    className="w-10 h-10"
                    icon={
                        <IconBookmark
                            className={cn(isBookMarked && "fill-primary")}
                        />
                    }
                    size="lg"
                    isLoading={isPending}
                    onClick={toggleBookmark}
                />
            </div>
        </div>
    )
}
