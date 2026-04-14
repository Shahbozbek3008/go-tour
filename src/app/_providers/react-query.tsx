"use client"

import { getQueryClient } from "@/lib/api/get-query-client"
import { setupClientFetchInterceptors } from "@/lib/api/setup-client-fetch-interceptors"
import { QueryClientProvider } from "@tanstack/react-query"
import { useLocale } from "next-intl"

export default function ReactQueryProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = getQueryClient()
    const locale = useLocale()
    setupClientFetchInterceptors({ queryClient, locale })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
