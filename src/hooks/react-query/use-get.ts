/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from "@/lib/api/fetch-requests"
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"

type ICustomUseQueryOptions<TQueryFnData, TError, TData> = Partial<
    UseQueryOptions<TQueryFnData, TError, TData>
>

export type UseGetArgs<TData, TQueryFnData = unknown, TError = any> = {
    deps?: QueryKey
    options?: ICustomUseQueryOptions<TQueryFnData, TError, TData>
    config?: RequestInit
    params?: Record<string, unknown>
}

export const useGet = <TData, TQueryFnData = unknown, TError = any>(
    url: string,
    args?: UseGetArgs<TData, TQueryFnData, TError>,
) => {
    const { deps, config, options, params } = args || {}

    return useQuery<TQueryFnData, TError, TData>({
        queryKey: (() => {
            const paramValues = Object.values(params || {})
            const hasParams = paramValues.length > 0

            if (deps) {
                return hasParams ?
                        [url, ...deps, ...paramValues]
                    :   [url, ...deps]
            }

            return hasParams ? [url, ...paramValues] : [url]
        })(),
        queryFn: () => {
            return getRequest(url, {
                ...config,
                params,
            })
        },
        ...(options || {}),
    })
}
