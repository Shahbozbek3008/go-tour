"use client"

import { IconChevronLeft } from "@/assets/icons/chevron-left"
import { IconHome } from "@/assets/icons/home"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils/shadcn"
import { RouteLiteral } from "nextjs-routes"
import ClientTranslate from "./translation/client-translate"

export interface Crumb {
    href?: RouteLiteral
    label?: string
}

interface Props {
    className?: string
    crumbs: Crumb[]
    theme?: "light" | "transparent"
}

const Breadcrumb = ({ crumbs = [], className, theme = "light" }: Props) => {
    return (
        <nav
            className={cn(
                "flex items-center gap-1 overflow-x-auto scrollbar",
                className,
            )}
        >
            <Link href="/" className={cn("flex items-center gap-1 hover:underline underline-offset-4", theme === "transparent" ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-slate-900")}>
                <IconHome />
                <span>
                    <ClientTranslate translationKey="home" />
                </span>
            </Link>
            {crumbs.map((c, i) => {
                return (
                    <div key={i} className="flex items-center gap-1">
                        <span className={theme === "transparent" ? "text-white/60" : "text-gray-400"}>
                            <IconChevronLeft />
                        </span>
                        {c.href ?
                            <Link href={c.href} className={cn("line-clamp-1 hover:underline underline-offset-4", theme === "transparent" ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-slate-900")}>
                                {c.label}
                            </Link>
                        :   <span className={cn("line-clamp-1 font-medium", theme === "transparent" ? "text-white drop-shadow-sm" : "text-gradient")}>
                                {c.label}
                            </span>
                        }
                    </div>
                )
            })}
        </nav>
    )
}

export default Breadcrumb
