import BaseSelect from "@/components/ui/base-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useSearch from "@/hooks/use-search"
import { usePathname, useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getHref, RouteWithoutLocale } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { useCallback, useDeferredValue, useEffect, useRef } from "react"
import ClientTranslate from "../translation/client-translate"
import { rowsPerPageOptions } from "./utils"

interface IPaginationProps<TData> {
    count: number | undefined
    className?: string
    pageKey?: string
    pageSizeKey?: string
    data?: TData[]
    isLoading?: boolean
}

interface IPagination {
    page?: number
    size?: number
}

export function Pagination<TData>({
    className,
    count,
    pageKey = SEARCH_PARAMS.PAGE,
    pageSizeKey = SEARCH_PARAMS.PAGE_SIZE,
    data,
    isLoading,
}: IPaginationProps<TData>) {
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearch()
    const jsonParams = useSearch({ jsonParse: false })
    const page = search[pageKey] || 1
    const pageSize = search[pageSizeKey] || rowsPerPageOptions[0].id
    const pageCount = count ? Math.ceil(count / pageSize) : 0

    const jumpInputRef = useRef<HTMLInputElement>(null)
    const deferredPage = useDeferredValue(page)

    const setPagination = useCallback(
        ({ page, size }: IPagination) => {
            // Use RequestAnimationFrame to prevent UI blocking
            requestAnimationFrame(() => {
                router.replace(
                    getHref({
                        pathname,
                        query: {
                            ...jsonParams,
                            [pageKey]: JSON.stringify(page),
                            [pageSizeKey]: JSON.stringify(
                                size === undefined ? pageSize : size,
                            ),
                        },
                    } as RouteWithoutLocale),
                )
            })
        },
        [jsonParams, pageKey, pageSize, pageSizeKey, pathname, router],
    )

    const handleJump = useCallback(() => {
        const jumpVal = jumpInputRef.current?.value
        const pageNum = parseInt(jumpVal || "0", 10)

        if (pageNum > 0 && pageNum <= (pageCount || 0)) {
            setPagination({ page: pageNum })
        }
    }, [pageCount, setPagination])

    const handleJumpOnKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const jumpVal = jumpInputRef.current?.value
            const pageNum = parseInt(jumpVal || "0", 10)
            if (
                pageNum > 0 &&
                pageNum <= (pageCount || 0) &&
                e.key === "Enter"
            ) {
                setPagination({ page: pageNum })
            }
        },
        [pageCount, setPagination],
    )

    //
    useEffect(() => {
        if (!!data && !data.length && deferredPage > 1 && !isLoading) {
            setPagination({
                page: deferredPage - 1,
            })
        }
    }, [data, deferredPage, isLoading, setPagination])

    return (
        <footer
            id="pagination"
            className={cn(
                "flex items-center justify-between px-2 mr-12 w-full",
                className,
            )}
        >
            <main
                className={cn(
                    "flex items-center md:justify-between gap-y-3 gap-x-8 w-full flex-wrap sm:flex-nowrap",
                    // !!prev || !!next ? "justify-center" : "",
                )}
            >
                {(count || 0) > rowsPerPageOptions[0].id && (
                    <BaseSelect
                        options={rowsPerPageOptions}
                        value={rowsPerPageOptions.find(
                            (o) => o.id === pageSize,
                        )}
                        onChange={(opt) => {
                            setPagination({
                                page: undefined,
                                size: opt?.id,
                            })
                        }}
                        className="min-w-16"
                        placeholder=""
                        isClearable={false}
                    />
                )}

                {!!pageCount && pageCount > 1 && (
                    <>
                        <main className="flex items-center gap-4">
                            <p className="font-medium whitespace-nowrap">
                                {deferredPage} / {pageCount}
                            </p>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size={"icon"}
                                    onClick={() => {
                                        setPagination({ page: undefined })
                                    }}
                                    disabled={deferredPage < 2}
                                >
                                    <span className="sr-only">
                                        <ClientTranslate translationKey="goToFirstPage" />
                                    </span>
                                    <ChevronsLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    size={"icon"}
                                    onClick={() => {
                                        setPagination({
                                            page: deferredPage - 1,
                                        })
                                    }}
                                    disabled={deferredPage < 2}
                                >
                                    <span className="sr-only">
                                        <ClientTranslate translationKey="goToPreviousPage" />
                                    </span>
                                    <ChevronLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    size={"icon"}
                                    onClick={() => {
                                        setPagination({
                                            page: deferredPage + 1,
                                        })
                                    }}
                                    disabled={deferredPage >= pageCount}
                                >
                                    <span className="sr-only">
                                        <ClientTranslate translationKey="goToNextPage" />
                                    </span>
                                    <ChevronRight />
                                </Button>
                                <Button
                                    variant="outline"
                                    size={"icon"}
                                    onClick={() => {
                                        setPagination({
                                            page: pageCount,
                                        })
                                    }}
                                    disabled={deferredPage >= pageCount}
                                >
                                    <span className="sr-only">
                                        <ClientTranslate translationKey="goToLastPage" />
                                    </span>
                                    <ChevronsRight />
                                </Button>
                            </div>
                        </main>
                        <aside className="flex items-center gap-4">
                            <Input
                                onKeyDown={handleJumpOnKeyDown}
                                ref={jumpInputRef}
                                type="number"
                                className="w-14"
                            />
                            <Button onClick={handleJump}>
                                <ClientTranslate translationKey="toPage" />
                            </Button>
                        </aside>
                    </>
                )}
            </main>
        </footer>
    )
}
