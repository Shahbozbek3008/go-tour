import IconProfileUser from "@/assets/icons/profile-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils/shadcn"
import Image from "next/image"

interface Props {
    first_name?: string | null
    last_name?: string | null
    src?: string | undefined | null
    wrapperClassName?: string
    className?: string
    width?: number
    height?: number
    fallbackClassName?: string
}

export default function AvatarImageProfile({
    first_name,
    last_name,
    src,
    wrapperClassName,
    fallbackClassName,
    className,
    width = 40,
    height = 40,
}: Props) {
    return (
        <Avatar className={cn("w-10 h-10 cursor-pointer", wrapperClassName)}>
            <AvatarImage asChild src={src || ""}>
                {!!src && (
                    <Image
                        src={src}
                        alt={`${first_name ?? "user"} ${last_name ?? ""}`}
                        fill
                        sizes="100vw"
                        quality={100}
                        className={cn(
                            "rounded-full size-full object-cover",
                            className,
                        )}
                    />
                )}
            </AvatarImage>
            <AvatarFallback className={fallbackClassName}>
                {first_name?.slice(0, 1)}
                {last_name?.slice(0, 1)}
                {!first_name && !last_name && (
                    <IconProfileUser
                        width={width / 1.5}
                        height={height / 1.5}
                    />
                )}
            </AvatarFallback>
        </Avatar>
    )
}
