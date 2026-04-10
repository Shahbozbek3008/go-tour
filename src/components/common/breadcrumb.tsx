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
}

const Breadcrumb = ({ crumbs = [], className }: Props) => {
    return (
        <nav
            className={cn(
                "flex items-center gap-1 overflow-x-auto scrollbar",
                className,
            )}
        >
            <Link href="/" className="flex items-center gap-1">
                <IconHome />
                <span>
                    <ClientTranslate translationKey="home" />
                </span>
            </Link>
            {crumbs.map((c, i) => {
                return (
                    <div key={i} className="flex items-center gap-1">
                        <span>
                            <IconChevronLeft />
                        </span>
                        {c.href ?
                            <Link href={c.href} className="line-clamp-1">
                                {c.label}
                            </Link>
                        :   <span className="text-gradient line-clamp-1">
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
