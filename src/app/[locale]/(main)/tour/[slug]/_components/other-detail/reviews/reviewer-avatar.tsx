import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"
import { Reviewer } from "../../../_types"

interface ReviewerAvatarProps {
    reviewer: Reviewer
    className?: string
}

export function ReviewerAvatar({ reviewer, className }: ReviewerAvatarProps) {
    const initial = reviewer.name.charAt(0).toUpperCase()

    if (reviewer.avatarUrl) {
        return (
            <Image
                src={reviewer.avatarUrl}
                alt={reviewer.name}
                width={38}
                height={38}
                className={cn("rounded-full object-cover shrink-0", className)}
            />
        )
    }

    return (
        <div
            className={cn(
                "size-[38px] rounded-full bg-muted border border-border flex items-center justify-center",
                "text-sm font-medium text-muted-foreground shrink-0",
                className,
            )}
        >
            {initial}
        </div>
    )
}
