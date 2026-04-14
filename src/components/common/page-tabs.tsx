"use client"

import { usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils/shadcn"
import Link from "next/link"
import { RouteLiteral } from "nextjs-routes"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

function getPathSegment(href: RouteLiteral): string {
    const str =
        typeof href === "string" ? href : (
            ((href as { pathname?: string }).pathname ?? "")
        )
    return str.split("?")[0].split("#")[0]
}

function getLastSegment(path: string): string {
    return path.replace(/\/+$/, "").split("/").pop() ?? ""
}

function isActive(pathname: string, href: RouteLiteral): boolean {
    const hrefPath = getPathSegment(href)
    const hrefSegment = getLastSegment(hrefPath)
    const currentSegment = getLastSegment(pathname)
    return currentSegment === hrefSegment
}

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
    const activeHref = tabs.find((el) => isActive(pathname, el.href))?.href

    return (
        <Tabs value={activeHref ? getPathSegment(activeHref) : undefined}>
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
                                        value={getPathSegment(t.href)}
                                        className="h-10 rounded-lg bg-transparent py-1 px-4 flex items-center gap-2 text-text-900"
                                    >
                                        {isActive(pathname, t.href) ?
                                            activeIcon && (
                                                <span>{activeIcon}</span>
                                            )
                                        :   icon && <span>{icon}</span>}
                                        {t.label}
                                        {count && (
                                            <span
                                                className={cn(
                                                    "w-4 h-4 rounded-full flex items-center justify-center text-[0.625rem]",
                                                    isActive(pathname, t.href) ?
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
