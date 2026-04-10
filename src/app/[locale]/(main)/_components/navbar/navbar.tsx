"use client"

import logo from "@/assets/images/logo.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LanguageSwitcher } from "../language-switcher"
import { Login } from "../login"
import { DesktopNavLinks, MobileMenu, NavList } from "./nav-list"

export const Navbar = () => {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const lastScrollY = useRef(0)
    const navRef = useRef<HTMLElement>(null)
    const { isOpen, openModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)

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

    return (
        <>
            <header
                ref={navRef}
                className={`sticky top-0 z-[50] w-full transition-transform duration-300 ${
                    hidden ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <div
                    className={`transition-all duration-300 ${
                        scrolled ?
                            "bg-white/85 backdrop-blur-md shadow-sm border-b border-transparent"
                        :   "bg-white border-b border-gray-100"
                    }`}
                >
                    <nav
                        className={`mx-auto px-6 lg:px-15 flex items-center justify-between transition-all duration-300 ${
                            scrolled ? "py-2.5" : "py-4"
                        }`}
                    >
                        <Link href="/" className="flex-shrink-0">
                            <Image src={logo} alt="Travel logo" priority />
                        </Link>

                        <DesktopNavLinks pathname={pathname} />

                        <div className="flex items-center gap-2.5">
                            <LanguageSwitcher />

                            <Button
                                size="default"
                                variant="default"
                                className="hidden md:flex rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                onClick={openModal}
                            >
                                <ClientTranslate translationKey="signIn" />
                            </Button>

                            <NavList
                                menuOpen={menuOpen}
                                onMenuToggle={setMenuOpen}
                            />
                        </div>
                    </nav>
                </div>
                {isOpen && <Login />}
            </header>

            {/* MobileMenu is placed outside the header so its 'fixed' positioning binds to viewport, not the transforming header. */}
            <MobileMenu
                open={menuOpen}
                pathname={pathname}
                onClose={() => setMenuOpen(false)}
            />
        </>
    )
}
