"use client"

import { IconRu } from "@/assets/icons/ru"
import { IconUz } from "@/assets/icons/uz"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/shadcn"
import { usePathname, useRouter } from "next/navigation"
import { RouteLiteral } from "nextjs-routes"
import { useEffect, useRef, useState } from "react"

const LANGUAGES = [
    {
        code: "uz",
        label: "UZ",
        flag: IconUz,
    },
    {
        code: "ru",
        label: "RU",
        flag: IconRu,
    },
] as const

type LangCode = (typeof LANGUAGES)[number]["code"]

function UzFlag({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-5 h-4 rounded-[2px] flex-shrink-0", className)}
            viewBox="0 0 30 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="30" height="20" fill="#1EB53A" />
            <rect width="30" height="6.67" fill="#009FCA" />
            <rect y="6.67" width="30" height="1.33" fill="#fff" />
            <rect y="12" width="30" height="1.33" fill="#fff" />
        </svg>
    )
}

function RuFlag({ className }: { className?: string }) {
    return (
        <svg
            className={cn("w-5 h-4 rounded-[2px] flex-shrink-0", className)}
            viewBox="0 0 30 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="30" height="20" fill="#D52B1E" />
            <rect width="30" height="13.33" fill="#003580" />
            <rect width="30" height="6.67" fill="#fff" />
        </svg>
    )
}

export const LanguageSwitcher = () => {
    const router = useRouter()
    const pathname = usePathname()

    // Detect current locale from pathname, e.g. /uz/catalog → "uz"
    const currentLocale = (pathname.split("/")[1] as LangCode) ?? "uz"
    const activeLang =
        LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0]

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleOutside)
        return () => document.removeEventListener("mousedown", handleOutside)
    }, [])

    const switchLocale = (code: LangCode) => {
        setOpen(false)
        // Replace the locale segment in the path
        const segments = pathname.split("/")
        segments[1] = code
        router.push(segments.join("/") as RouteLiteral)
    }

    const ActiveFlag = activeLang.flag

    return (
        <div ref={ref} className="relative">
            {/* Trigger button */}
            <Button
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5",
                    "rounded-lg bg-[#f4f4f4]",
                    "text-sm font-semibold text-gray-700",
                    "hover:bg-gray-50 transition-colors",
                    open && "bg-gray-50",
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <ActiveFlag />
                <span>{activeLang.label}</span>
            </Button>

            {open && (
                <div
                    className={cn(
                        "absolute right-0 top-[calc(100%+6px)] z-50",
                        "min-w-[110px] rounded-xl border bg-white",
                    )}
                    role="listbox"
                >
                    {LANGUAGES.map(({ code, label, flag: Flag }) => {
                        const isActive = code === activeLang.code
                        return (
                            <button
                                key={code}
                                role="option"
                                aria-selected={isActive}
                                onClick={() => switchLocale(code)}
                                className={cn(
                                    "w-full flex items-center gap-2.5 px-3 py-2",
                                    "text-sm font-semibold text-gray-700",
                                    "hover:bg-gray-50 transition-colors",
                                    isActive && "text-blue-600",
                                )}
                            >
                                <Flag />
                                <span>{label}</span>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
