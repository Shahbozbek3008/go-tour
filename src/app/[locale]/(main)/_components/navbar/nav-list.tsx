"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { NAV_LIST } from "@/lib/constants"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
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
    const { openModal } = useModal(MODAL_KEYS.SIGN_IN_MODAL)

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-[#0F1B2D]/40 backdrop-blur-sm z-[990] md:hidden transition-opacity duration-300",
                    open ?
                        "opacity-100 pointer-events-auto"
                    :   "opacity-0 pointer-events-none",
                )}
                onClick={onClose}
            />
            {/* Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 bottom-0 z-[1000] w-[280px] sm:w-[320px] bg-white shadow-2xl flex flex-col md:hidden",
                    "transition-transform duration-[400ms] ease-[0.25,1,0.5,1]",
                    open ? "translate-x-0" : "translate-x-full",
                )}
                aria-hidden={!open}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <span className="text-lg font-bold text-slate-900 tracking-tight">
                        Menyu
                    </span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        >
                            <path d="M1 1L13 13M1 13L13 1" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-2">
                    <ul className="flex flex-col">
                        {NAV_LIST.map((item) => {
                            const normalizedHref = stripLocale(
                                item.href as string,
                            )
                            const isActive =
                                normalizedPathname === normalizedHref ||
                                (normalizedHref !== "/" &&
                                    normalizedPathname.startsWith(
                                        normalizedHref + "/",
                                    ))

                            return (
                                <li key={item.href as string}>
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            "flex items-center justify-between",
                                            "px-6 py-[16px] w-full",
                                            "text-[15px] font-semibold transition-colors duration-150",
                                            isActive ?
                                                "text-blue-600 bg-blue-50/40"
                                            :   "text-slate-700 hover:bg-gray-50 hover:text-blue-600",
                                        )}
                                    >
                                        <ClientTranslate
                                            translationKey={item.title}
                                        />
                                        {isActive ?
                                            <span className="w-[6px] h-[6px] rounded-full bg-blue-600 flex-shrink-0 shadow-sm shadow-blue-600/50" />
                                        :   <ChevronRightIcon />}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="p-6 border-t border-gray-100 bg-white">
                    <Button
                        type="button"
                        onClick={() => {
                            openModal()
                            onClose()
                        }}
                        className="flex w-full items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all text-[15px]"
                    >
                        <ClientTranslate translationKey="signIn" />
                    </Button>
                </div>
            </div>
        </>
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
