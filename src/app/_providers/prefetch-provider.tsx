import { CustomFetchConfig } from "@/lib/api/fetch-requests"
import { serverGetRequest } from "@/lib/api/server-requests"
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
    enabled?: boolean
}

export default async function PrefetchProvider({
    endpoint,
    queryKey,
    options,
    children,
    enabled = true,
}: Props) {
    // return children
    const queryClient = new QueryClient()

    if (enabled) {
        await queryClient.prefetchQuery({
            queryKey: (() => {
                const paramValues = Object.values(options?.params || {})
                const hasParams = paramValues.length > 0
                if (queryKey?.length) {
                    return hasParams ?
                            [endpoint, ...queryKey, ...paramValues]
                        :   [endpoint, ...queryKey]
                }
                return hasParams ? [endpoint, ...paramValues] : [endpoint]
            })(),
            queryFn: () => serverGetRequest(endpoint, { ...options }),
        })
    }

    return (
        // Neat! Serialization is now as easy as passing props.
        // HydrationBoundary is a Client Component, so hydration will happen there.
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    )
}
