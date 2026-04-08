"use client"

import { IconVerified } from "@/assets/icons/verified"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useLanguage } from "@/hooks/use-language"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

export const VerifiedPopover = () => {
    const { isArabic } = useLanguage()
    const [open, setOpen] = useState(true)
    const [side, setSide] = useState<"right" | "left" | "bottom">("bottom")

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setSide(isArabic ? "left" : "right")
            } else {
                setSide("bottom")
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [isArabic])

    return (
        <Popover open={open}>
            <PopoverTrigger>
                <Badge
                    onClick={() => setOpen(true)}
                    onMouseEnter={() => setOpen(true)}
                    className=" focus:outline-none rounded-[30px] bg-warning-main/20 text-(--card-title) cursor-pointer"
                >
                    <IconVerified fill="#ff9f43" />
                    <ClientTranslate translationKey="notVerified" />
                </Badge>
            </PopoverTrigger>
            <PopoverContent
                side={side}
                align="center"
                className="w-full h-10 flex items-center !px-3 bg-misc-snackbar border-none z-0"
            >
                <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-background whitespace-nowrap">
                        <ClientTranslate translationKey="verifyYourProfile" />
                    </p>
                    <Link
                        href={getHref({
                            pathname: "/[locale]/account/identity",
                        })}
                    >
                        <Button className="h-[1.625rem] py-0 !px-2 rounded-[0.375rem]">
                            <ClientTranslate translationKey="verifiedNow" />
                        </Button>
                    </Link>
                    <Button
                        onClick={() => setOpen(false)}
                        className="h-[1.625rem] py-0 !px-0 rounded-[0.375rem] bg-transparent hover:bg-transparent"
                    >
                        <X />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
