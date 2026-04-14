import { cn } from "@/lib/utils/shadcn"

export const StarDisplay = ({
    filled,
    total = 5,
}: {
    filled: number
    total?: number
}) => {
    return (
        <span className="flex items-center gap-px">
            {Array.from({ length: total }).map((_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className={cn(
                        "h-[11px] w-[11px]",
                        i < filled ?
                            "fill-amber-400 text-amber-400"
                        :   "fill-zinc-200 text-zinc-200",
                    )}
                >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            ))}
        </span>
    )
}
