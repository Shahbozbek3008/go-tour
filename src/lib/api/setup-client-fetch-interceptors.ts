import { QueryClient } from "@tanstack/react-query"
import { Locale } from "next-intl"
import { ClientTokenService } from "../cookies/client-token-service"
import fetchInstance from "./fetch-instance"

// Setup interceptors (equivalent to setupAxiosInterceptors)
export function setupClientFetchInterceptors({
    locale,
}: {
    queryClient: QueryClient
    locale: Locale
}) {
    const accessToken = ClientTokenService.getAccessToken()
    // Request interceptor
    fetchInstance.addRequestInterceptor((config) => {
        // Add language header from cookie

        return {
            ...config,
            headers: {
                ...config.headers,
                "Accept-Language": locale,
                // credentials: "include",
                ...(accessToken ?
                    { Authorization: `Bearer ${accessToken}` }
                :   {}),
            },
        }
    })

    // Response interceptor
    fetchInstance.addResponseInterceptor({
        fulfilled: (response) => {
            if (response?.status === 401) {
                // Remove access token on unauthorized response
                ClientTokenService.removeAccessToken()
            }

            return response
        },
        rejected: async (error) => {
            // Handle errors similar to axios interceptor
            // You can implement token refresh logic here

            // Handle unauthorized responses

            // Handle other error statuses as needed
            // if (error.response?.status === 403) {
            //     // Handle forbidden
            // }

            throw error
        },
    })
}
