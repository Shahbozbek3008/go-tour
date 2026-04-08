"use client"

import useSearch from "@/hooks/use-search"
import { useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"

interface Props {
    className?: string
}

function CategoriesComponent({ className }: Props) {
    const categories = [
        { id: undefined, name: "BLOG" },
        { id: "business", name: "Business" },
        { id: "technology", name: "Technology" },
    ]

    const search = useSearch()
    const router = useRouter()
    const activeId = search.category

    return (
        <div className={cn("relative -mx-4 px-4 md:mx-0 md:px-0", className)}>
            <div
                className={cn(
                    "w-full overflow-x-auto md:overflow-visible",
                    "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                )}
                role="tablist"
                aria-orientation="horizontal"
            >
                <ul className="md:mt-6 mb-6 flex gap-3 sm:gap-4 md:gap-6 min-w-max snap-x snap-mandatory">
                    {categories.map((c) => {
                        const isActive = activeId === c.id
                        return (
                            <li
                                key={c.name}
                                role="tab"
                                aria-selected={isActive}
                                className={cn(
                                    "text-base shrink-0 whitespace-nowrap snap-start cursor-pointer bg-[#F4F5F7] rounded-lg px-4 py-2",
                                    "md:border-none md:bg-transparent md:text-base md:rounded-none md:px-2 md:py-1 md:hover:underline md:underline-offset-4",
                                    isActive &&
                                        "bg-primary text-primary-foreground md:bg-transparent md:text-primary",
                                )}
                                onClick={() => {
                                    router.push(
                                        getHref({
                                            pathname: "/[locale]/news/tweets",
                                            query: {
                                                category: c.id,
                                                [SEARCH_PARAMS.PAGE]: undefined,
                                            },
                                        }),
                                    )
                                }}
                            >
                                {c.name}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-background to-transparent md:hidden" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-background to-transparent md:hidden" />
        </div>
    )
}

export default CategoriesComponent
