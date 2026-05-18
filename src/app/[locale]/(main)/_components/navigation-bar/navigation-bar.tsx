"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useModal } from "@/hooks/use-modal"
import { usePathname } from "@/i18n/navigation"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { Heart, Home, Search, User, Users } from "lucide-react"
import Link from "next/link"
import { FormProvider, useForm } from "react-hook-form"
import { Login } from "../login"
import { Verify } from "../login/verify"

interface NavItem {
    id: string
    href: string
    label: string
    icon: React.ReactNode
    requiresAuth?: boolean
}

const NAV_ITEMS: NavItem[] = [
    {
        id: "home",
        href: "/[locale]",
        label: "home",
        icon: <Home className="w-6 h-6" />,
    },
    {
        id: "catalog",
        href: "/[locale]/catalog",
        label: "catalog",
        icon: <Search className="w-6 h-6" />,
    },
    {
        id: "agents",
        href: "/[locale]/agents",
        label: "agents",
        icon: <Users className="w-6 h-6" />,
    },
    {
        id: "saved",
        href: "/[locale]/favourites",
        label: "favourites",
        icon: <Heart className="w-6 h-6" />,
    },
    {
        id: "profile",
        href: "/[locale]/profile/me/my-account",
        label: "profile",
        icon: <User className="w-6 h-6" />,
        requiresAuth: true,
    },
]

function stripLocaleSegment(href: string): string {
    return href.replace("/[locale]", "") || "/"
}

export function BottomNav() {
    const methods = useForm({
        defaultValues: {
            phoneNumber: "",
            smsCode: "",
        },
    })
    const pathname = usePathname()
    const { isAuthenticated, data: profile } = useProfileQuery()
    const { isOpen, openModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)
    const { isOpen: isVerifyOpen } = useModal(MODAL_KEYS.VERIFY_PHONE_MODAL)

    const isActive = (href: string): boolean => {
        const normalizedHref = stripLocaleSegment(href)
        if (normalizedHref === "/") return pathname === "/"
        const baseSegment = normalizedHref.split("/").slice(0, 2).join("/")
        return pathname.startsWith(baseSegment)
    }
    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        item: NavItem,
    ) => {
        if (item.requiresAuth && !isAuthenticated) {
            e.preventDefault()
            openModal()
        }
    }

    return (
        <nav className="fixed z-[50] bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 md:hidden pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-1 h-[72px]">
                {NAV_ITEMS.map((item) => {
                    const { id, href, label, icon } = item
                    const active = isActive(href)
                    const showLoginLabel = id === "profile" && !isAuthenticated
                    const isSaved = id === "saved"
                    const favoriteCount = profile?.data?.favoriteCount ?? 0

                    return (
                        <Link
                            key={id}
                            // @ts-expect-error
                            href={getHref({ pathname: href })}
                            className="flex-1 min-w-0"
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            <div className="flex flex-col items-center justify-center h-full gap-1.5 px-0.5">
                                <div className="relative">
                                    <div
                                        className={cn(
                                            "transition-all duration-300 transform",
                                            active ?
                                                "text-primary scale-110"
                                            :   "text-gray-400 scale-100",
                                        )}
                                    >
                                        {icon}
                                    </div>
                                    {isSaved && favoriteCount > 0 && (
                                        <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[16px] h-4 rounded-full bg-red-500 text-white text-[9px] font-bold leading-none px-1">
                                            {favoriteCount > 99 ?
                                                "99+"
                                            :   favoriteCount}
                                        </span>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "text-[10px] sm:text-xs font-medium transition-colors duration-200 text-center w-full truncate px-0.5",
                                        active ? "text-primary" : (
                                            "text-gray-500"
                                        ),
                                    )}
                                >
                                    {showLoginLabel ?
                                        <ClientTranslate translationKey="signInTitle" />
                                    :   <ClientTranslate
                                            translationKey={label as any}
                                        />
                                    }
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <FormProvider {...methods}>
                {isOpen && <Login />}
                {isVerifyOpen && <Verify />}
            </FormProvider>
        </nav>
    )
}
