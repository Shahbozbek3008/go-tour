"use client"

import { IconRu } from "@/assets/icons/ru"
import { IconUz } from "@/assets/icons/uz"
import { cn } from "@/lib/utils/shadcn"
import { ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { RouteLiteral } from "nextjs-routes"
import { useEffect, useRef, useState } from "react"

const LANGUAGES = [
    { code: "uz", label: "UZ", flag: IconUz },
    { code: "ru", label: "RU", flag: IconRu },
] as const

type LangCode = (typeof LANGUAGES)[number]["code"]

interface LanguageSwitcherProps {
    isTransparent?: boolean
}

export const LanguageSwitcher = ({ isTransparent }: LanguageSwitcherProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const currentLocale = (pathname.split("/")[1] as LangCode) ?? "uz"
    const activeLang =
        LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0]

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
        const segments = (pathname as string).split("/")
        if (segments[1] === "uz" || segments[1] === "ru") {
            segments[1] = code
        } else {
            segments.splice(1, 0, code)
        }
        router.push(segments.join("/") as RouteLiteral)
    }

    const ActiveFlag = activeLang.flag

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((p) => !p)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className={cn(
                    "flex items-center gap-1.5 px-2.5 rounded-[10px]  h-10",
                    "text-[13px] font-medium transition-colors duration-150",
                    "focus-visible:outline-none",
                    isTransparent ?
                        "text-white/80  hover:text-white"
                    :   "text-slate-800",
                    open && (isTransparent ? " text-white" : " text-slate-800"),
                )}
            >
                <ActiveFlag />
                <span>{activeLang.label}</span>
                <ChevronDown
                    className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <div
                    role="listbox"
                    className={cn(
                        "absolute right-0 top-[calc(100%+6px)] z-50",
                        "rounded-xl overflow-hidden",
                        "bg-white border border-zinc-200/80",
                        "shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)]",
                    )}
                >
                    {LANGUAGES.filter((l) => l.code !== activeLang.code).map(
                        ({ code, label, flag: Flag }) => (
                            <button
                                key={code}
                                role="option"
                                aria-selected={false}
                                onClick={() => switchLocale(code)}
                                className={cn(
                                    "w-full flex items-center gap-2.5 px-3 py-2.5",
                                    "text-[13px] font-medium text-zinc-700",
                                    "hover:bg-zinc-50 transition-colors duration-100",
                                    "focus-visible:outline-none",
                                )}
                            >
                                <Flag />
                                {label}
                            </button>
                        ),
                    )}
                </div>
            )}
        </div>
    )
}
