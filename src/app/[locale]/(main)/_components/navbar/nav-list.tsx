"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { RouteLiteral } from "nextjs-routes"

interface ListItemChild {
    key: string
    title: TranslationKey
    description: TranslationKey | ""
    href: RouteLiteral
}

interface ListItem {
    title: TranslationKey
    href: RouteLiteral
    childs: ListItemChild[]
}

export default function NavList() {
    const list: ListItem[] = [
        {
            title: "home",
            href: getHref({ pathname: "/[locale]" }),
            childs: [],
        },
        {
            title: "catalog",
            href: getHref({ pathname: "/[locale]/catalog" }),
            childs: [],
        },
        {
            title: "agents",
            href: getHref({ pathname: "/[locale]/agents" }),
            childs: [],
        },
        {
            title: "forTourCompanies",
            href: getHref({ pathname: "/[locale]/for-tour-companies" }),
            childs: [],
        },
    ]

    return (
        <div className="hidden lg:flex items-center gap-6 whitespace-nowrap">
            {list.map((item, i) => (
                <TooltipProvider
                    key={i}
                    delayDuration={0}
                    skipDelayDuration={0}
                >
                    <Tooltip>
                        <TooltipTrigger
                            asChild
                            className="text-background font-medium"
                        >
                            <Link href={item.href} className="text-black">
                                <ClientTranslate translationKey={item.title} />
                            </Link>
                        </TooltipTrigger>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    )
}
