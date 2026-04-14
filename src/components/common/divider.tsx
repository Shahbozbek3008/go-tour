import { cn } from "@/lib/utils/shadcn"

interface Props {
    className?: string
}

export const Divider = ({ className }: Props) => (
    <div
        className={cn("md:hidden h-px w-full bg-border my-0", className)}
        aria-hidden
    />
)
