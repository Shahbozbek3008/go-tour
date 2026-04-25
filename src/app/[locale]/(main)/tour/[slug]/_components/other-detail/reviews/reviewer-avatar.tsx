import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"

interface ReviewerAvatarProps {
    name: string
    avatarUrl?: string
    className?: string
}

export function ReviewerAvatar({ name, avatarUrl, className }: ReviewerAvatarProps) {
    const initial = name.charAt(0).toUpperCase()

    if (avatarUrl) {
        return (
            <Image
                src={avatarUrl}
                alt={name}
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
