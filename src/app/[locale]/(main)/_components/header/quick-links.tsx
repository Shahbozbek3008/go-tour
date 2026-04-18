import { cn } from "@/lib/utils/shadcn"
import {
    Globe,
    LucideIcon,
    Smartphone,
    Sparkles,
    Star,
    Tag,
} from "lucide-react"

interface QuickLink {
    id: number
    icon: LucideIcon
    label: string
    sublabel?: string
    badge?: string
    iconBg: string
    iconColor: string
}

const QUICK_LINKS: QuickLink[] = [
    {
        id: 1,
        icon: Smartphone,
        label: "Скачать",
        sublabel: "приложение",
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
    },
    {
        id: 2,
        icon: Tag,
        label: "Туры со",
        sublabel: "скидками",
        badge: "до -50%",
        iconBg: "bg-rose-100",
        iconColor: "text-rose-500",
    },
    {
        id: 3,
        icon: Globe,
        label: "Безвизовые",
        sublabel: "страны",
        iconBg: "bg-sky-100",
        iconColor: "text-sky-500",
    },
    {
        id: 4,
        icon: Sparkles,
        label: "Туры",
        sublabel: "новинки",
        badge: "New",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-500",
    },
    {
        id: 5,
        icon: Star,
        label: "Туры",
        sublabel: "месяца!",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-500",
    },
]

export const QuickLinks = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4 ">
            {QUICK_LINKS.map((item) => {
                const Icon = item.icon
                return (
                    <button
                        key={item.id}
                        className="group relative flex items-center gap-3 bg-[#f4f4f4] cursor-pointer  hover:border-gray-200 rounded-2xl px-4 py-3.5  hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-left"
                    >
                        {item.badge && (
                            <span className="absolute top-2 right-2 text-[9px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                                {item.badge}
                            </span>
                        )}
                        <div
                            className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110",
                                item.iconBg,
                            )}
                        >
                            <Icon className={cn("w-5 h-5", item.iconColor)} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-400 leading-none">
                                {item.label}
                            </p>
                            <p className="text-sm font-semibold text-gray-800 leading-tight mt-0.5">
                                {item.sublabel}
                            </p>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
