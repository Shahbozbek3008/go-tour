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

export const LanguageSwitcher = ({ isTransparent }: { isTransparent?: boolean }) => {
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
        
        let newPath: string = pathname as string
        const segments = newPath.split("/")
        
        if (segments[1] === "uz" || segments[1] === "ru") {
            segments[1] = code
            newPath = segments.join("/")
        } else {
            newPath = `/${code}${newPath === "/" ? "" : newPath}`
        }

        router.push(newPath as RouteLiteral)
    }

    const ActiveFlag = activeLang.flag

    return (
        <div ref={ref} className="relative">
            {/* Trigger button */}
            <Button
                onClick={() => setOpen((prev) => !prev)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5",
                    "rounded-lg",
                    "text-sm font-semibold transition-colors",
                    isTransparent && !open ? 
                        "bg-white/20 text-white hover:bg-white/30 border border-white/20" 
                    : "bg-[#f4f4f4] text-gray-700 hover:bg-gray-50",
                    open && !isTransparent && "bg-gray-50",
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
                    {LANGUAGES.filter((lang) => lang.code !== activeLang.code).map(({ code, label, flag: Flag }) => {
                        return (
                            <button
                                key={code}
                                role="option"
                                aria-selected={false}
                                onClick={() => switchLocale(code)}
                                className={cn(
                                    "w-full flex items-center gap-2.5 px-3 py-2",
                                    "text-sm font-semibold text-gray-700",
                                    "hover:bg-gray-50 transition-colors",
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
