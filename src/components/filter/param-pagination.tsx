"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import useSearch from "@/hooks/use-search"
import { usePathname, useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getHref } from "@/lib/utils/get-href"
import { useSearchParams } from "next/navigation"

interface Props {
    count: number | undefined
    pageKey?: string
    className?: string
    pageSize?: number
}

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
    const totalPages = Math.ceil(Number(count) / pageSize) || 0 // Assuming 10 items per page

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
        // If it's the first ellipsis (moving backwards)
        if (pages[index - 1] === 1) {
            handlePageChange(Math.max(1, currentPage - 3))
        }
        // If it's the last ellipsis (moving forwards)
        else if (pages[index + 1] === totalPages) {
            handlePageChange(Math.min(totalPages, currentPage + 3))
        }
    }

    // Generate page numbers to display
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

    if (totalPages < 2) return

    return (
        <Pagination className={className}>
            <PaginationContent className="gap-2">
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                            currentPage <= 1 ?
                                "pointer-events-none opacity-50"
                            :   ""
                        }
                    />
                </PaginationItem>

                {pages.map((page, i) => (
                    <PaginationItem key={i}>
                        {page === "..." ?
                            <PaginationEllipsis
                                onClick={() => handleEllipsisClick(i)}
                                className="cursor-pointer"
                            />
                        :   <PaginationLink
                                onClick={() => {
                                    if (currentPage !== page) {
                                        handlePageChange(Number(page))
                                    }
                                }}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        }
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                            currentPage === totalPages ?
                                "pointer-events-none opacity-50"
                            :   ""
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
