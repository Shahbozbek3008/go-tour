/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrency } from "@/app/_providers/currency-provider"
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
    data?: Record<string, unknown>
}

export const useGet = <TData, TQueryFnData = unknown, TError = any>(
    url: string,
    args?: UseGetArgs<TData, TQueryFnData, TError>,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
) => {
    const { deps, config, options, params, data } = args || {}
    const { currency } = useCurrency()

    return useQuery<TQueryFnData, TError, TData>({
        queryKey: (() => {
            const paramValues = Object.values(params || {})
            const dataValues = Object.values(data || {})
            const hasParams = paramValues.length > 0
            const hasData = dataValues.length > 0

            if (deps) {
                return hasParams || hasData ?
                        [url, ...deps, ...paramValues, ...dataValues, currency]
                    :   [url, ...deps, currency]
            }

            return hasParams || hasData ?
                    [url, ...paramValues, ...dataValues, currency]
                :   [url, currency]
        })(),
        queryFn: () => {
            return getRequest(
                url,
                {
                    ...config,
                    params,
                },
                method,
                data,
            )
        },
        ...(options || {}),
    })
}
