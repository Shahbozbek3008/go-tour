"use client"

import logo from "@/assets/images/logo.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { TranslationKey } from "@/components/common/translation/types"
import Group from "@/components/semantic/group"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { RouteLiteral } from "nextjs-routes"
import { INVESTMENT_REQUEST_TYPES } from "../../../investment/_constants"
import { MARKETPLACE_REQUEST_TYPES } from "../../../marketplace/_constants"
import { OUTREACH_HUB_TYPES } from "../../../outreach-hub/_constants"
import { links as aboutLinksData } from "../../footer/static"
import AuthButtons from "../auth-buttons"
import CurrencySelect from "../currency-select"
import Profile from "../profile"
import { useSearchStore } from "../search-dropdown/use-search-store"

interface ListItemChild {
    key: string
    title: TranslationKey
    href: RouteLiteral
}

interface ListItem {
    title: TranslationKey
    href: RouteLiteral
    childs: ListItemChild[]
}

export default function BurgerMenu() {
    const { focus } = useSearchStore()

    const marketplaceChilds: ListItemChild[] = MARKETPLACE_REQUEST_TYPES.map(
        (t) => ({
            key: t.key,
            title: t.title,
            href: getHref({
                pathname: "/[locale]/marketplace",
                query: { request_type: JSON.stringify([t.key]) },
            }),
        }),
    )

    const investmentChilds: ListItemChild[] = INVESTMENT_REQUEST_TYPES.map(
        (i) => ({
            key: i.key,
            title: i.name,
            href: getHref({
                pathname: "/[locale]/investment",
                query: { request_type: JSON.stringify([i.key]) },
            }),
        }),
    )

    const outreachhubChilds: ListItemChild[] = OUTREACH_HUB_TYPES.map((o) => ({
        key: o.key,
        title: o.name,
        href: getHref({
            pathname: "/[locale]/outreach-hub",
            query: { request_type: JSON.stringify([o.key]) },
        }),
    }))

    const aboutChilds: ListItemChild[] =
        aboutLinksData
            .find((section) => section.title === "aboutInexlynk")
            ?.links.map((link) => ({
                key: link.additionalPageType || link.name,
                title: link.name,
                href:
                    link.additionalPageType ?
                        (getHref({
                            pathname: `/[locale]/additional-pages/[slug]`,
                            query: { slug: link.additionalPageType },
                        }) as RouteLiteral)
                    :   link.href!,
            })) || []

    const list: ListItem[] = [
        {
            title: "marketplace",
            href: getHref({ pathname: "/[locale]/marketplace" }),
            childs: marketplaceChilds,
        },
        {
            title: "investmentMarket",
            href: getHref({ pathname: "/[locale]/investment" }),
            childs: investmentChilds,
        },
        {
            title: "outreachhub",
            href: getHref({ pathname: "/[locale]/outreach-hub" }),
            childs: outreachhubChilds,
        },
        {
            title: "aboutUs",
            href: getHref({ pathname: "/[locale]" }),
            childs: aboutChilds,
        },
    ]
    const { isAuthenticated } = useProfileQuery()
    return (
        <div className={cn(focus && "hidden")}>
            <Drawer direction="left">
                <DrawerTrigger className={cn("flex lg:hidden items-center")}>
                    <Menu />
                </DrawerTrigger>

                <DrawerContent className="bg-foreground border-none text-background p-4">
                    <div className="flex flex-col justify-between h-full">
                        <Group>
                            <div className="flex items-center justify-between">
                                <DrawerClose>
                                    <X />
                                </DrawerClose>
                                <Group className="flex items-center gap-4">
                                    <CurrencySelect />
                                    {!isAuthenticated ?
                                        <AuthButtons />
                                    :   <Profile blur />}
                                </Group>
                            </div>
                            <div className="flex flex-col mt-10 space-y-2 pb-2">
                                <Accordion type="single" collapsible>
                                    {list.map((item, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={item.title}
                                            className="border-b border-b-[#1f1f23] last:border-b-1 cursor-pointer"
                                        >
                                            <AccordionTrigger className="py-2 text-2xl font-bold border-b border-b-secondary24">
                                                <DrawerClose asChild>
                                                    <Link href={item.href}>
                                                        <ClientTranslate
                                                            translationKey={
                                                                item.title
                                                            }
                                                        />
                                                    </Link>
                                                </DrawerClose>
                                            </AccordionTrigger>
                                            <AccordionContent className="space-y-3 pb-6">
                                                {item.childs.map((child) => (
                                                    <DrawerClose
                                                        key={child.title}
                                                        asChild
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            className="text-sm leading-tight block"
                                                        >
                                                            <ClientTranslate
                                                                translationKey={
                                                                    child.title
                                                                }
                                                            />
                                                        </Link>
                                                    </DrawerClose>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                                <DrawerClose asChild>
                                    <Link
                                        href={getHref({
                                            pathname: "/[locale]/news",
                                        })}
                                        className="py-2 text-2xl font-bold border-b border-b-secondary24"
                                    >
                                        <ClientTranslate translationKey="news" />
                                    </Link>
                                </DrawerClose>
                            </div>
                        </Group>

                        <div className="flex justify-center">
                            <Image
                                src={logo}
                                width={130}
                                height={30}
                                alt="logo"
                            />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
