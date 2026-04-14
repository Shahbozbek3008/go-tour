"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useModal } from "@/hooks/use-modal"
import { usePathname } from "@/i18n/navigation"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { Heart, Home, Search, User } from "lucide-react"
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
        href: "/[locale]/profile/me/my-account",
        label: "Kabinet",
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
    const { isAuthenticated } = useProfileQuery()
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
        <nav className="fixed z-[50] bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden overflow-x-hidden">
            <div className="flex items-center justify-around h-20">
                {NAV_ITEMS.map((item) => {
                    const { id, href, label, icon } = item
                    const active = isActive(href)
                    const showLoginLabel = id === "profile" && !isAuthenticated

                    return (
                        <Link
                            key={id}
                            // @ts-expect-error
                            href={getHref({ pathname: href })}
                            className="flex-1"
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            <div className="flex flex-col items-center justify-center h-20 gap-1">
                                <div
                                    className={cn(
                                        "transition-colors duration-200",
                                        active ? "text-primary" : (
                                            "text-gray-400"
                                        ),
                                    )}
                                >
                                    {icon}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-medium transition-colors duration-200",
                                        active ? "text-primary" : (
                                            "text-gray-600"
                                        ),
                                    )}
                                >
                                    {showLoginLabel ?
                                        <ClientTranslate translationKey="signInTitle" />
                                    :   label}
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
