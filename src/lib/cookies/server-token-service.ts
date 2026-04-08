import {
    deleteCookie,
    getCookie,
    OptionsType,
    setCookie,
} from "cookies-next/server"
import { cookies } from "next/headers"
import { COOKIES } from "../constants/cookies"

// Cookie configuration for better security
const cookieOptions: OptionsType = {
    secure: process.env.NODE_ENV === "production", // Only transmitted over HTTPS
    sameSite: "strict" as const, // Protect against CSRF
    path: "/", // Available across the site
}

export const ServerTokenService = {
    // Access Token methods
    getAccessToken: async (): Promise<string | undefined> => {
        "use server"
        return (await getCookie(COOKIES.ACCESS_TOKEN, { cookies })) as
            | string
            | undefined
    },

    setAccessToken: async (token: string): Promise<void> => {
        "use server"
        await setCookie(COOKIES.ACCESS_TOKEN, token, {
            ...cookieOptions,
            maxAge: 24 * 60 * 60, // 1 day in seconds
            cookies,
        })
    },

    removeAccessToken: async (): Promise<void> => {
        "use server"
        await deleteCookie(COOKIES.ACCESS_TOKEN, { path: "/", cookies })
    },

    // Refresh Token methods
    getRefreshToken: async (): Promise<string | undefined> => {
        "use server"
        return (await getCookie(COOKIES.REFRESH_TOKEN, { cookies })) as
            | string
            | undefined
    },

    setRefreshToken: async (token: string): Promise<void> => {
        "use server"
        await setCookie(COOKIES.REFRESH_TOKEN, token, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            cookies,
        })
    },

    removeRefreshToken: async (): Promise<void> => {
        "use server"
        await deleteCookie(COOKIES.REFRESH_TOKEN, { path: "/", cookies })
    },

    // Utility methods
    clearAllTokens: (): void => {
        ServerTokenService.removeAccessToken()
        ServerTokenService.removeRefreshToken()
    },

    hasTokens: async (): Promise<boolean> => {
        return !!(
            (await ServerTokenService.getAccessToken()) &&
            (await ServerTokenService.getRefreshToken())
        )
    },
}
