"use client"
import placeholder from "@/assets/images/placeholder.jpg"
import { cn } from "@/lib/utils/shadcn"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image, { ImageProps } from "next/image"
import {
    DetailedHTMLProps,
    HTMLAttributes,
    memo,
    useEffect,
    useMemo,
    useState,
} from "react"

interface CustomProps {
    wrapperClassName?: string
    src?: string | StaticImport | null
    wrapperProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >
    fallbackUrl?: string | StaticImport
}

function ClientImgComponentBase({
    src,
    className,
    alt,
    wrapperClassName,
    children,
    wrapperProps,
    fallbackUrl,
    ...props
}: Omit<ImageProps, "src"> & CustomProps) {
    const DEFAULT_PLACEHOLDER = fallbackUrl || placeholder
    const [image, setImage] = useState<string | StaticImport>(
        src || DEFAULT_PLACEHOLDER,
    )

    useEffect(() => {
        if (src) {
            setImage(src)
        }
    }, [src])

    const finalImage = useMemo(() => image, [image])

    return (
        <div
            className={cn(
                "relative w-full h-full overflow-hidden",
                wrapperClassName,
            )}
            {...wrapperProps}
        >
            <Image
                src={finalImage}
                alt={alt}
                className={cn(
                    "object-cover bg-accent w-full h-full rounded-md",
                    className,
                )}
                onError={() => setImage(DEFAULT_PLACEHOLDER)}
                fill={!props.width && !props.height}
                sizes="100vw"
                quality={100}
                {...props}
            />
            {children}
        </div>
    )
}

const ClientImgComponent = memo(ClientImgComponentBase, (prev, next) => {
    return (
        prev.src === next.src &&
        prev.className === next.className &&
        prev.alt === next.alt &&
        prev.wrapperClassName === next.wrapperClassName
    )
})

export default ClientImgComponent
