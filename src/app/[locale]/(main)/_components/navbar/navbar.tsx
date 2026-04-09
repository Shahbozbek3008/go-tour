"use client"

import logo from "@/assets/images/logo.png"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LanguageSwitcher } from "../language-switcher"
import { DesktopNavLinks, MobileMenu, NavList } from "./nav-list"

export const Navbar = () => {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <header ref={navRef} className="sticky top-0 z-50 w-full">
            <div className="bg-white border-b border-gray-100">
                <nav className="mx-auto px-6 py-4 lg:px-15  flex items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <Image src={logo} alt="Travel logo" priority />
                    </Link>

                    <DesktopNavLinks pathname={pathname} />

                    <div className="flex items-center gap-2.5">
                        <LanguageSwitcher />

                        <Button
                            size="default"
                            variant="default"
                            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            Kirish
                        </Button>

                        <NavList
                            menuOpen={menuOpen}
                            onMenuToggle={setMenuOpen}
                        />
                    </div>
                </nav>
            </div>
            <MobileMenu
                open={menuOpen}
                pathname={pathname}
                onClose={() => setMenuOpen(false)}
            />
        </header>
    )
}
