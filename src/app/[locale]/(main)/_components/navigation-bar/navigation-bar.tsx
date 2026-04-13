"use client"

import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { usePathname } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { Heart, Home, Search, User } from "lucide-react"
import Link from "next/link"

interface NavItem {
    id: string
    href: string
    label: string
    icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
    {
        id: "home",
        href: "/[locale]",
        label: "Bosh sahifa",
        icon: <Home className="w-6 h-6" />,
    },
    {
        id: "catalog",
        href: "/[locale]/catalog",
        label: "Katalog",
        icon: <Search className="w-6 h-6" />,
    },
    {
        id: "saved",
        href: "/[locale]/favourites",
        label: "Sevimlilar",
        icon: <Heart className="w-6 h-6" />,
    },
    {
        id: "profile",
        href: "/[locale]/my-profile/me/my-account",
        label: "Kabinet",
        icon: <User className="w-6 h-6" />,
    },
]

export function BottomNav() {
    const pathname = usePathname()
    const { isAuthenticated } = useProfileQuery()

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

    return (
        <nav className="fixed z-[50] bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
            <div className="flex items-center justify-around h-20">
                {NAV_ITEMS.map(({ id, href, label, icon }) => {
                    const active = isActive(href)
                    return (
                        <Link
                            key={id}
                            href={getHref({ pathname: href })}
                            className="flex-1"
                        >
                            <div className="flex flex-col items-center justify-center h-20 gap-1">
                                <div
                                    className={cn(
                                        "transition-colors duration-200",
                                        active ? "text-blue-600" : (
                                            "text-gray-400"
                                        ),
                                    )}
                                >
                                    {icon}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-medium transition-colors duration-200",
                                        active ? "text-blue-600" : (
                                            "text-gray-600"
                                        ),
                                    )}
                                >
                                    {id === "profile" && !isAuthenticated ?
                                        "Kirish"
                                    :   label}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
