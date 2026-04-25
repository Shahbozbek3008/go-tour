"use client"

import logo from "@/assets/images/logo.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useModal } from "@/hooks/use-modal"
import { useRouter } from "@/i18n/navigation"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CurrencySwitcher } from "../currency-switcher"
import { LanguageSwitcher } from "../language-switcher"
import { Login } from "../login"
import { Verify } from "../login/verify"
import { DesktopNavLinks, MobileMenu, NavList } from "./nav-list"
import { Profile } from "./profile"

export const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const lastScrollY = useRef(0)
    const navRef = useRef<HTMLElement>(null)
    const { isOpen, openModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)
    const { isOpen: isVerifyOpen } = useModal(MODAL_KEYS.VERIFY_PHONE_MODAL)
    const methods = useForm({
        defaultValues: {
            phoneNumber: "",
            smsCode: "",
        },
    })
    const { isAuthenticated, data: profile } = useProfileQuery()

    const isCatalog = pathname.includes("/agents")
    const isTransparent = isCatalog && !scrolled

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }

            if (currentScrollY > 100) {
                if (currentScrollY > lastScrollY.current) {
                    setHidden(false)
                } else if (currentScrollY < lastScrollY.current) {
                    setHidden(true)
                }
            } else {
                setHidden(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    const handleHeartClick = () => {
        if (!isAuthenticated) {
            openModal()
        } else {
            router.push(
                getHref({
                    pathname: "/[locale]/favourites",
                }),
            )
        }
    }

    return (
        <>
            <header
                ref={navRef}
                className={cn(
                    "top-0 z-[50] w-full transition-transform duration-300 ",
                    isCatalog ? "fixed" : "sticky",
                    hidden ? "-translate-y-full" : "translate-y-0",
                )}
            >
                <div
                    className={`transition-all duration-300 ${
                        isTransparent ? "bg-transparent border-transparent"
                        : scrolled ?
                            "bg-white/85 backdrop-blur-md shadow-sm border-b border-white/20"
                        :   "bg-white border-b border-gray-100"
                    }`}
                >
                    <nav
                        className={cn(
                            "flex items-center justify-between transition-all duration-300 home-container",
                            scrolled ? "py-2.5" : "py-4",
                        )}
                    >
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src={logo}
                                alt="Travel logo"
                                priority
                                className={cn(
                                    "transition-all duration-300  mt-2 w-24",
                                    isTransparent && "brightness-0 invert",
                                )}
                            />
                        </Link>

                        <DesktopNavLinks
                            pathname={pathname}
                            isTransparent={isTransparent}
                        />

                        <div className="flex items-center gap-2.5">
                            <div className="relative md:flex hidden">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className={cn(
                                        "rounded-full w-10 h-10 bg-transparent hover:bg-transparent shadow-none border-none",
                                        isTransparent && "brightness-0 invert",
                                    )}
                                    onClick={handleHeartClick}
                                >
                                    <Heart className="w-5 h-5" />
                                </Button>
                                {profile?.data?.favoriteCount! > 0 && (
                                    <span className="absolute top-0 right-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none pointer-events-none">
                                        {profile?.data?.favoriteCount}
                                    </span>
                                )}
                            </div>
                            <LanguageSwitcher isTransparent={isTransparent} />
                            <CurrencySwitcher isTransparent={isTransparent} />
                            {isAuthenticated && (
                                <div className="hidden md:block">
                                    <Profile />
                                </div>
                            )}
                            {!isAuthenticated && (
                                <Button
                                    size="default"
                                    variant="default"
                                    className={cn(
                                        "hidden md:flex rounded-lg font-semibold transition-all shadow-sm",
                                        isTransparent ?
                                            "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
                                        :   "bg-blue-600 hover:bg-blue-700 text-white",
                                    )}
                                    onClick={openModal}
                                >
                                    <ClientTranslate translationKey="signIn" />
                                </Button>
                            )}

                            <NavList
                                menuOpen={menuOpen}
                                onMenuToggle={setMenuOpen}
                                isTransparent={isTransparent}
                            />
                        </div>
                    </nav>
                </div>
                <FormProvider {...methods}>
                    {isOpen && <Login />}
                    {isVerifyOpen && <Verify />}
                </FormProvider>
            </header>

            <MobileMenu
                open={menuOpen}
                pathname={pathname}
                onClose={() => setMenuOpen(false)}
            />
        </>
    )
}
