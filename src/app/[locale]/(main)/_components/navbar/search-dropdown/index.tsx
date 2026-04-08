"use client"

import IconGradientSearch from "@/assets/icons/gradient-search-icon"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useGet } from "@/hooks/react-query/use-get"
import { useLanguage } from "@/hooks/use-language"
import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import SearchNotFound from "./search-not-found"
import { SearchSection } from "./search-section"
import { ISearchResult } from "./types"
import { useSearchStore } from "./use-search-store"

const DROPDOWN_CONTENT_ID = "search-dropdown-content"

export default function SearchDropdown() {
    const { isArabic } = useLanguage()
    const t = useTranslations()
    const params = useSearch()
    const [search, setSearch] = useState<string | undefined>("")
    const { focus, setSearchState } = useSearchStore()
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const { data } = useGet<ISearchResult>(API.GLOBAL.SEARCH, {
        params: {
            ...params,
            q: search,
        },
        options: {
            enabled: !!search,
        },
    })
    const marketplace = getArray(data?.marketplace_items)
    const investment = getArray(data?.investment_items)
    const outreach_hub = getArray(data?.outreach_hub_items)
    const posts = getArray(data?.posts)
    const notFound =
        !marketplace.length &&
        !investment.length &&
        !posts.length &&
        !outreach_hub.length

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setSearchState({ focus: false })
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [setSearchState])

    useEffect(() => {
        const updateSearchDropdownHeight = () => {
            const dropdownContent = document.getElementById(DROPDOWN_CONTENT_ID)
            if (dropdownContent) {
                setSearchState({
                    searchDropDownContentHeight: dropdownContent.offsetHeight,
                })
            }
        }
        updateSearchDropdownHeight()
        window.addEventListener("resize", updateSearchDropdownHeight)
        return () =>
            window.removeEventListener("resize", updateSearchDropdownHeight)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const sections = {
        marketplace: {
            title: t("marketplace"),
            items: marketplace,
            getPathname: (slug: string) =>
                getHref({
                    pathname: "/[locale]/marketplace/detail/[slug]",
                    query: { slug },
                }),
        },
        investment: {
            title: t("investmentMarket"),
            items: investment,
            getPathname: (slug: string) =>
                getHref({
                    pathname: "/[locale]/investment/detail/[slug]",
                    query: { slug },
                }),
        },
        outreachHub: {
            title: t("outreachhub"),
            items: outreach_hub,
            getPathname: (slug: string) =>
                getHref({
                    pathname: "/[locale]/outreach-hub/detail/[slug]",
                    query: { slug },
                }),
        },
        news: {
            title: t("news"),
            items: posts,
            getPathname: (slug: string) =>
                getHref({
                    pathname: "/[locale]/news/detail/[slug]",
                    query: { slug },
                }),
        },
    }

    const handleItemClick: () => void = () => {
        setSearchState({ focus: false })
        setSearch("")
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <>
            <div
                ref={dropdownRef}
                className={cn("w-full relative z-50 transition-all")}
            >
                <Input
                    ref={inputRef}
                    className={cn(
                        "h-9 pr-6 rounded-full text-secondary bg-foreground border-none transition-all",
                        isArabic ? "pr-7 md:pr-11" : "pr-0",
                        isArabic && focus && "pr-11",
                    )}
                    placeholder={t("search")}
                    handleDebouncedInputValue={(val) => setSearch(val)}
                    onFocus={() => {
                        setSearchState({ focus: true })
                    }}
                    leftNode={!isArabic && <IconGradientSearch />}
                    rightNode={
                        isArabic && <IconGradientSearch className="rotate-90" />
                    }
                />
                {focus && (
                    <Card
                        id={DROPDOWN_CONTENT_ID}
                        className="absolute top-15 w-full bg-foreground p-0 flex flex-col gap-0 rounded-lg transition-all"
                    >
                        {!notFound ?
                            Object.values(sections).map((section) => (
                                <SearchSection
                                    key={section.title}
                                    sectionData={section}
                                    onItemClick={handleItemClick}
                                />
                            ))
                        :   search && <SearchNotFound />}
                    </Card>
                )}
            </div>
        </>
    )
}
