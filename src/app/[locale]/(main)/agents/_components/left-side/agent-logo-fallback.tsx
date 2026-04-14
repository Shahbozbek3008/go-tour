import { cn } from "@/lib/utils/shadcn"

export const AgentLogoFallback = ({ name }: { name: string }) => {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()

    const colors = [
        "bg-blue-100 text-blue-600",
        "bg-emerald-100 text-emerald-600",
        "bg-amber-100 text-amber-600",
        "bg-rose-100 text-rose-600",
        "bg-violet-100 text-violet-600",
    ]
    const colorClass = colors[name.charCodeAt(0) % colors.length]

    return (
        <div
            className={cn(
                "w-full h-full flex items-center justify-center",
                "text-[13px] font-bold",
                colorClass,
            )}
        >
            {initials}
        </div>
    )
}
