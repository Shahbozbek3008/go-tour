"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils/shadcn"
import { CheckIcon, ChevronDown } from "lucide-react"
import { Locale, useLocale } from "next-intl"
import { useParams } from "next/navigation"
import { useTransition } from "react"

const LanguageSelect = () => {
    const locale = useLocale()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const pathname = usePathname()
    const params = useParams()

    const handleChange = (val: Locale) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: val },
            )
            router.refresh()
        })
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger
                className={cn(
                    "flex items-center gap-1 w-14 shadow-none border-none px-2 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:outline-none uppercase",
                    isPending && "transition-opacity [&:disabled]:opacity-30",
                    "data-[state=open]:[&_svg]:rotate-180",
                )}
            >
                {locale}{" "}
                <span>
                    <ChevronDown size={16} className="transition-all" />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-20">
                {routing.locales.map((l) => {
                    const isActive = l === locale
                    return (
                        <DropdownMenuItem
                            key={l}
                            onClick={() => {
                                handleChange(l)
                            }}
                            className={cn(
                                isActive && "bg-accent",
                                "cursor-pointer",
                            )}
                        >
                            <div className="flex items-center gap-2 w-full uppercase">
                                {/* <Image
                                    width={16}
                                    height={16}
                                    src={item.src}
                                    alt={item.label}
                                    className="w-4 h-4"
                                /> */}
                                {l}
                                {isActive && (
                                    <span className="flex-1 flex justify-end">
                                        <CheckIcon size={16} />
                                    </span>
                                )}
                            </div>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSelect
