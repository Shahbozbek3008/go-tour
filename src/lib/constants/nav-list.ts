import { TranslationKey } from "@/components/common/translation/types"
import { RouteLiteral } from "nextjs-routes"
import { getHref } from "../utils/get-href"

interface ListItem {
    title: TranslationKey
    href: RouteLiteral
}

export const NAV_LIST: ListItem[] = [
    {
        title: "home",
        href: getHref({ pathname: "/[locale]" }),
    },
    {
        title: "catalog",
        href: getHref({ pathname: "/[locale]/catalog" }),
    },
    {
        title: "agents",
        href: getHref({ pathname: "/[locale]/agents" }),
    },
    {
        title: "forTourCompanies",
        href: getHref({ pathname: "/[locale]/tour-companies" }),
    },
]
