import placeholder from "@/assets/images/placeholder.jpg"
import { cn } from "@/lib/utils/shadcn"
import Image, { ImageProps } from "next/image"

type Props = {
    wrapperClassName?: string
    src?: string
}

export default async function ServerImg({
    src = "",
    wrapperClassName,
    className,
    alt,
    ...props
}: Omit<ImageProps, "src"> & Props) {
    let isValid = false

    try {
        if (typeof src === "string") {
            const res = await fetch(src, { method: "HEAD" })
            isValid = res.ok
        }
    } catch (e) {
        isValid = false
        console.error(e)
    }

    return (
        <div
            className={cn(
                "relative w-full h-full overflow-hidden",
                wrapperClassName,
            )}
        >
            <Image
                src={isValid ? src : placeholder}
                alt={alt}
                className={cn(
                    "object-cover bg-accent w-full h-full",
                    className,
                )}
                fill={!props.width && !props.height ? true : false}
                sizes="100vw"
                quality={100}
                {...props}
            />
        </div>
    )
}
