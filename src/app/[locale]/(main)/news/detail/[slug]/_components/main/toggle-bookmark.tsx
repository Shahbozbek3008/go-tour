import { IconBookmark } from "@/assets/icons/bookmark"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"
import { NewsItemDetail } from "../../../../_types"

interface Props {
    item: NewsItemDetail | undefined
    className?: string
}

export default function ToggleBookmark({ item, className }: Props) {
    const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(
        item?.is_bookmarked,
    )

    const { invalidateByPatternMatch } = useRevalidate()
    const { post, isPending } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()

    const toggleBookmarked = () => {
        redirectToSignIn(() => {
            post(
                API.BLOG.BOOKMARK_SLUG.replace("{slug}", item?.slug || ""),
                {},
                {
                    onSuccess: () => {
                        invalidateByPatternMatch([API.BLOG.LIST])
                        setIsBookmarked((prev) => !prev)
                    },
                },
            )
        })
    }
    return (
        <Button
            variant={"secondary"}
            className={cn("text-text-900 w-12 h-12", className)}
            size={"lg"}
            isLoading={isPending}
            onClick={toggleBookmarked}
        >
            {!isPending && (
                <IconBookmark
                    width={32}
                    height={32}
                    className={cn(isBookmarked && "fill-primary text-primary")}
                />
            )}
        </Button>
    )
}
