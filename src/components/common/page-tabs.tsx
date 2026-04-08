"use client"

import { usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils/shadcn"
import Link from "next/link"
import { RouteLiteral } from "nextjs-routes"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export type PageTab = {
    href: RouteLiteral
    label: string
    enabled: boolean
    icon?: React.ReactNode
    activeIcon?: React.ReactNode
    count?: number | null
}

type Props = {
    tabs: PageTab[]
    className?: string
}

export default function PageTabs({ tabs, className }: Props) {
    const pathname = usePathname()
    const activeHref = tabs.find((el) => pathname.includes(el.href))?.href

    return (
        <Tabs value={activeHref}>
            <div className="overflow-x-auto">
                <TabsList
                    className={cn(
                        "w-fit bg-[#f4f5f7] rounded-lg px-0",
                        className,
                    )}
                >
                    {tabs.map(
                        ({ enabled, icon, activeIcon, count, ...t }, index) =>
                            enabled ?
                                <Link
                                    {...t}
                                    key={index}
                                    className="no-underline"
                                >
                                    <TabsTrigger
                                        value={t.href}
                                        className="h-10 rounded-lg bg-transparent py-1 px-4 flex items-center gap-2 text-text-900"
                                    >
                                        {pathname.includes(t.href) ?
                                            activeIcon && (
                                                <span>{activeIcon}</span>
                                            )
                                        :   icon && <span>{icon}</span>}
                                        {t.label}
                                        {count && (
                                            <span
                                                className={cn(
                                                    "w-4 h-4 rounded-full flex items-center justify-center text-[0.625rem]",
                                                    pathname.includes(t.href) ?
                                                        "bg-background text-primary"
                                                    :   "bg-primary text-background",
                                                )}
                                            >
                                                {count}
                                            </span>
                                        )}
                                    </TabsTrigger>
                                </Link>
                            :   null,
                    )}
                </TabsList>
            </div>
        </Tabs>
    )
}
