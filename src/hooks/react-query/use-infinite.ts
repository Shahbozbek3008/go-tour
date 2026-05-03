/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrency } from "@/app/_providers/currency-provider"
import { getRequest } from "@/lib/api/fetch-requests"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import extractQueryParams from "@/lib/utils/extract-query-params"
import { getArray } from "@/lib/utils/get-array"
import {
    InfiniteData,
    QueryKey,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from "@tanstack/react-query"
import { useEffect } from "react"

export type TQueryFnData<TData> = {
    count?: number
    next?: string | null
    previous?: string | null
    results?: TData[]
    page?: number
    totalPages?: number
    totalElements?: number
    [key: string]: any
}

export type TSelectedData<TData> = InfiniteData<TQueryFnData<TData>> & { 
    items: TData[] 
}

type ICustomUseInfiniteQueryOptions<TData, TError = any> = Partial<
    UseInfiniteQueryOptions<TQueryFnData<TData>, TError, TSelectedData<TData>>
>

export type UseInfiniteArgs<TData, TError = any> = {
    deps?: QueryKey
    options?: ICustomUseInfiniteQueryOptions<TData, TError>
    config?: Omit<RequestInit, "params">
    params?: Record<string, unknown>
    cursorKey?: string
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    data?: Record<string, unknown>
    getResults?: (pageData: TQueryFnData<TData>) => TData[]
    getNextPageParam?: (lastPage: TQueryFnData<TData>, allPages: TQueryFnData<TData>[]) => unknown
}

export const useInfinite = <TData, TError = any>(
    url: string,
    args?: UseInfiniteArgs<TData, TError>,
) => {
    const {
        deps,
        options,
        config,
        params,
        cursorKey = SEARCH_PARAMS.PAGE,
        method = "GET",
        data,
        getResults,
        getNextPageParam: customGetNextPage,
    } = args || {}

    const { currency } = useCurrency()

    const res = useInfiniteQuery<TQueryFnData<TData>, TError, TSelectedData<TData>>({
        queryKey:
            Array.isArray(deps) ?
                [url, params, data, "infinite", ...deps, currency]
            :   [url, params, data, "infinite", currency],
        queryFn: ({ pageParam }) => {
            return getRequest(
                url,
                {
                    ...config,
                    params: {
                        [cursorKey]: pageParam,
                        limit: cursorKey === SEARCH_PARAMS.OFFSET ? 10 : undefined,
                        [SEARCH_PARAMS.PAGE_SIZE]:
                            cursorKey === SEARCH_PARAMS.PAGE || cursorKey === "page" ? 12 : undefined,
                        size: cursorKey === "page" ? 12 : undefined,
                        ...params,
                    },
                },
                method,
                data,
            )
        },
        getNextPageParam: (lastPage, allPages) => {
            if (customGetNextPage) {
                return customGetNextPage(lastPage, allPages)
            }
            if (lastPage.next) {
                return extractQueryParams(lastPage.next)[cursorKey]
            }
            // Standard spring pagination (page is 0-indexed usually or 1-indexed)
            if (lastPage.totalPages !== undefined && lastPage.page !== undefined) {
                if (lastPage.page < lastPage.totalPages - 1) {
                    return lastPage.page + 1
                }
                return undefined
            }
            return undefined
        },
        initialPageParam: cursorKey === "page" ? 0 : undefined,
        select: (data) => {
            const items = data.pages.flatMap((p) => {
                if (getResults) return getResults(p)
                return getArray(p.results || p.tours) as TData[]
            })
            return {
                ...data,
                items,
            }
        },
        retry: false,
        ...(options || {}),
    })
    const r = res

    useEffect(() => {
        if (!deps && !res.data && !res.isFetching) {
            res.fetchNextPage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const firstPage = r.data?.pages?.[0] as any

    return { 
        ...r, 
        data: getArray(r.data?.items),
        pages: r.data?.pages,
        totalElements: firstPage?.totalElements ?? firstPage?.count ?? 0
    }
}
