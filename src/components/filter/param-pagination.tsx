"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import useSearch from "@/hooks/use-search"
import { usePathname, useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { useSearchParams } from "next/navigation"

interface Props {
    count: number | undefined
    pageKey?: string
    className?: string
    pageSize?: number
}

const pgBtn = cn(
    "relative inline-flex items-center justify-center",
    "size-9 rounded-lg",
    "text-[13px] font-medium font-mono tracking-tight",
    "text-muted-foreground bg-transparent border border-transparent",
    "cursor-pointer select-none outline-none",
    "transition-all duration-150 ease-out",
    "-webkit-tap-highlight-color-transparent",
    "hover:text-foreground hover:bg-accent hover:border-border hover:-translate-y-px",
    "active:scale-95 active:translate-y-0",
)

const pgActive = cn(
    "bg-primary! border-primary! text-primary-foreground!",
    "hover:bg-primary! hover:border-primary! hover:text-primary-foreground!",
    "hover:translate-y-0!",
    "cursor-default",
)

const pgDisabled = "opacity-30 cursor-not-allowed pointer-events-none"

const pgNav = cn(
    "w-auto px-2.5 gap-1.5",
    "text-[11px] tracking-widest uppercase font-sans",
)

export function ParamPagination({
    count,
    pageKey = SEARCH_PARAMS.PAGE,
    className,
    pageSize = 10,
}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useSearch({ jsonParse: false })

    const currentPage = Number(searchParams.get(pageKey)) || 1
    const totalPages = Math.ceil(Number(count) / pageSize) || 0

    const createPageURL = (pageNumber: number | string) => {
        return getHref({
            // @ts-expect-error sdf
            pathname,
            query: {
                ...params,
                [pageKey]: pageNumber.toString(),
            },
        })
    }

    const handlePageChange = (pageNumber: number) => {
        router.replace(createPageURL(pageNumber))
    }

    const handleEllipsisClick = (index: number) => {
        if (pages[index - 1] === 1) {
            handlePageChange(Math.max(1, currentPage - 3))
        } else if (pages[index + 1] === totalPages) {
            handlePageChange(Math.min(totalPages, currentPage + 3))
        }
    }

    const generatePagination = () => {
        const pages: (number | string)[] = []

        if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages)
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages)
        } else {
            pages.push(
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages,
            )
        }

        return pages
    }

    const pages = generatePagination()

    if (totalPages < 2) return null

    return (
        <Pagination className={cn("select-none", className)}>
            <PaginationContent className="flex items-center gap-1">
                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={cn(
                            pgBtn,
                            pgNav,
                            "group/prev",
                            currentPage <= 1 && pgDisabled,
                        )}
                        aria-label="Previous page"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="size-3.5 shrink-0 stroke-[1.75] transition-transform duration-150 group-hover/prev:-translate-x-0.5"
                        >
                            <path
                                d="M15 18l-6-6 6-6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Prev</span>
                    </button>
                </PaginationItem>

                <div className="mx-1 h-4 w-px shrink-0 bg-border" />

                {pages.map((page, i) => (
                    <PaginationItem key={i}>
                        {page === "..." ?
                            <button
                                onClick={() => handleEllipsisClick(i)}
                                className={cn(
                                    pgBtn,
                                    "text-[11px] tracking-widest text-muted-foreground/60 hover:text-foreground",
                                )}
                                aria-label="Jump pages"
                            >
                                ···
                            </button>
                        :   <button
                                onClick={() =>
                                    currentPage !== page &&
                                    handlePageChange(Number(page))
                                }
                                className={cn(
                                    pgBtn,
                                    currentPage === page && pgActive,
                                )}
                                aria-label={`Page ${page}`}
                                aria-current={
                                    currentPage === page ? "page" : undefined
                                }
                            >
                                {page}
                            </button>
                        }
                    </PaginationItem>
                ))}

                <div className="mx-1 h-4 w-px shrink-0 bg-border" />

                <PaginationItem>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={cn(
                            pgBtn,
                            pgNav,
                            "group/next",
                            currentPage === totalPages && pgDisabled,
                        )}
                        aria-label="Next page"
                    >
                        <span>Next</span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="size-3.5 shrink-0 stroke-[1.75] transition-transform duration-150 group-hover/next:translate-x-0.5"
                        >
                            <path
                                d="M9 18l6-6-6-6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
