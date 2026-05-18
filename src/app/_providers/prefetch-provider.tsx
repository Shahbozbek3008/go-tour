import { CustomFetchConfig } from "@/lib/api/fetch-requests"
import { serverGetRequest } from "@/lib/api/server-requests"
import { ServerCurrencyService } from "@/lib/cookies/server-currency-service"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
    QueryKey,
} from "@tanstack/react-query"
import { ReactNode } from "react"

interface Props {
    endpoint: string
    children: ReactNode
    queryKey?: QueryKey
    options?: CustomFetchConfig
    data?: Record<string, unknown>
    enabled?: boolean
}

export default async function PrefetchProvider({
    endpoint,
    queryKey,
    options,
    data,
    children,
    enabled = true,
}: Props) {
    const queryClient = new QueryClient()

    if (enabled) {
        const currency = await ServerCurrencyService.getCurrency()
        await queryClient.prefetchQuery({
            queryKey: (() => {
                const paramValues = Object.values(options?.params || {})
                const dataValues = Object.values(data || {})
                const hasParams = paramValues.length > 0
                const hasData = dataValues.length > 0

                if (queryKey?.length) {
                    return hasParams || hasData ?
                            [
                                endpoint,
                                ...queryKey,
                                ...paramValues,
                                ...dataValues,
                                currency,
                            ]
                        :   [endpoint, ...queryKey, currency]
                }
                return hasParams || hasData ?
                        [endpoint, ...paramValues, ...dataValues, currency]
                    :   [endpoint, currency]
            })(),
            queryFn: () =>
                serverGetRequest(endpoint, {
                    ...options,
                    params: {
                        ...options?.params,
                        ...data,
                    },
                }),
        })
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    )
}
