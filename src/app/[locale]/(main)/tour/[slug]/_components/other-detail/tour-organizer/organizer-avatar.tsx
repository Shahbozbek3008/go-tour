import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"

interface OrganizerAvatarProps {
    src: string
    name: string
    size?: "sm" | "md" | "lg"
}

const sizeMap = {
    sm: "size-12",
    md: "size-16",
    lg: "size-20",
}

export function OrganizerAvatar({
    src,
    name,
    size = "lg",
}: OrganizerAvatarProps) {
    return (
        <div className={cn("relative shrink-0", sizeMap[size])}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 p-0.5">
                <div className="size-full rounded-full overflow-hidden bg-white">
                    <Image
                        src={src}
                        alt={name}
                        fill
                        className="object-cover rounded-full"
                    />
                </div>
            </div>
        </div>
    )
}
