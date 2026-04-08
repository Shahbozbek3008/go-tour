"use server"

import { getLocale } from "next-intl/server"
import { ServerTokenService } from "../cookies/server-token-service"
import fetchInstance from "./fetch-instance"

// Setup server-side interceptors
export async function setupServerFetchInterceptors() {
    // Get locale before adding the interceptor
    const locale = await getLocale()
    const accessToken = await ServerTokenService.getAccessToken()

    // Request interceptor
    fetchInstance.addRequestInterceptor((config) => {
        // Add language header from cookies
        return {
            ...config,
            headers: {
                ...config.headers,
                "Accept-Language": locale,
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
                // Create a server action to handle cookie removal
                // ServerTokenService.removeAccessToken()
            }
            return response
        },
        rejected: async (error) => {
            console.error("Server fetch error:", error)
            throw error
        },
    })
}
// Initialize interceptors
// Note: setupServerFetchInterceptors is now async, so we need to await it or handle the promise
// setupServerFetchInterceptors()
