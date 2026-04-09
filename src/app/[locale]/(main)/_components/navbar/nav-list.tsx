"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { NAV_LIST } from "@/lib/constants"
import { cn } from "@/lib/utils/shadcn"
import Link from "next/link"

// getHref() already returns a resolved string like "/uz/catalog"
// Strip the locale segment to compare: "/uz/catalog" => "/catalog"
function stripLocale(path: string) {
    return path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/"
}

function BurgerIcon({ open }: { open: boolean }) {
    return (
        <div className="flex flex-col justify-center items-center gap-[5px] w-full h-full">
            <span
                className={cn(
                    "block w-4 h-[1.5px] bg-gray-800 rounded-full",
                    "transition-all duration-[250ms] ease-in-out",
                    open && "translate-y-[6.5px] rotate-45",
                )}
            />
            <span
                className={cn(
                    "block w-4 h-[1.5px] bg-gray-800 rounded-full",
                    "transition-all duration-[250ms] ease-in-out",
                    open && "opacity-0 scale-x-0",
                )}
            />
            <span
                className={cn(
                    "block w-4 h-[1.5px] bg-gray-800 rounded-full",
                    "transition-all duration-[250ms] ease-in-out",
                    open && "-translate-y-[6.5px] -rotate-45",
                )}
            />
        </div>
    )
}

function ChevronRightIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-gray-400 flex-shrink-0"
        >
            <path
                d="M5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

interface MobileMenuProps {
    open: boolean
    pathname: string
    onClose: () => void
}

export function MobileMenu({ open, pathname, onClose }: MobileMenuProps) {
    const normalizedPathname = stripLocale(pathname)

    return (
        <div
            className={cn(
                "md:hidden overflow-hidden",
                "border-b border-gray-100 bg-white",
                "transition-all duration-300 ease-in-out",
                open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
            )}
            aria-hidden={!open}
        >
            <ul className="flex flex-col divide-y divide-gray-100">
                {NAV_LIST.map((item) => {
                    const normalizedHref = stripLocale(item.href as string)
                    const isActive =
                        normalizedPathname === normalizedHref ||
                        (normalizedHref !== "/" &&
                            normalizedPathname.startsWith(normalizedHref + "/"))

                    return (
                        <li key={item.href as string}>
                            <Link
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center justify-between",
                                    "px-6 py-[15px] w-full",
                                    "text-[13.5px] font-semibold transition-colors duration-150",
                                    isActive ?
                                        "text-blue-600 bg-blue-50/50"
                                    :   "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                )}
                            >
                                <ClientTranslate translationKey={item.title} />
                                {isActive ?
                                    <span className="w-[6px] h-[6px] rounded-full bg-blue-600 flex-shrink-0" />
                                :   <ChevronRightIcon />}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export function DesktopNavLinks({ pathname }: { pathname: string }) {
    const normalizedPathname = stripLocale(pathname)

    return (
        <ul className="hidden md:flex items-center gap-10 list-none">
            {NAV_LIST.map((item) => {
                const normalizedHref = stripLocale(item.href as string)
                const isActive =
                    normalizedPathname === normalizedHref ||
                    (normalizedHref !== "/" &&
                        normalizedPathname.startsWith(normalizedHref + "/"))

                return (
                    <li key={item.href as string} className="flex-shrink-0">
                        <Link
                            href={item.href}
                            className={cn(
                                "relative pb-[3px] font-semibold transition-colors duration-150",
                                "hover:text-primary",
                                "after:content-[''] after:absolute after:-bottom-[5px]",
                                "after:left-0 after:right-0 after:h-[2px]",
                                "after:bg-primary after:rounded-full",
                                "after:scale-x-0 after:transition-transform after:duration-200 after:origin-left",
                                "hover:after:scale-x-100",
                                isActive && [
                                    "text-primary",
                                    "after:scale-x-100",
                                ],
                            )}
                        >
                            <ClientTranslate translationKey={item.title} />
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

interface NavListProps {
    onMenuToggle: (open: boolean) => void
    menuOpen: boolean
}

export function NavList({ onMenuToggle, menuOpen }: NavListProps) {
    return (
        <button
            aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={menuOpen}
            onClick={() => onMenuToggle(!menuOpen)}
            className={cn(
                "md:hidden flex items-center justify-center",
                "w-9 h-9 rounded-lg border border-gray-200 bg-white",
                "cursor-pointer transition-colors hover:bg-gray-50 active:bg-gray-100",
                menuOpen && "bg-gray-50",
            )}
        >
            <BurgerIcon open={menuOpen} />
        </button>
    )
}
