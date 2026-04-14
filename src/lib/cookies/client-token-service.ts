import {
    deleteCookie,
    getCookie,
    OptionsType,
    setCookie,
} from "cookies-next/client"
import { COOKIES } from "../constants/cookies"

// Cookie configuration for better security
const cookieOptions: OptionsType = {
    secure: process.env.NODE_ENV === "production", // Only transmitted over HTTPS
    sameSite: "strict" as const, // Protect against CSRF
    path: "/", // Available across the site
}

export const ClientTokenService = {
    // Access Token methods
    getAccessToken: (): string | undefined => {
        return getCookie(COOKIES.ACCESS_TOKEN) as string | undefined
    },

    setAccessToken: (token: string): void => {
        setCookie(COOKIES.ACCESS_TOKEN, token, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
        })
    },

    removeAccessToken: (): void => {
        deleteCookie(COOKIES.ACCESS_TOKEN, { path: "/" })
    },

    // Refresh Token methods
    getRefreshToken: (): string | undefined => {
        return getCookie(COOKIES.REFRESH_TOKEN) as string | undefined
    },

    setRefreshToken: (token: string): void => {
        setCookie(COOKIES.REFRESH_TOKEN, token, {
            ...cookieOptions,
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
        })
    },

    removeRefreshToken: (): void => {
        deleteCookie(COOKIES.REFRESH_TOKEN, { path: "/" })
    },

    // Utility methods
    clearAllTokens: (): void => {
        ClientTokenService.removeAccessToken()
        ClientTokenService.removeRefreshToken()
    },

    hasTokens: (): boolean => {
        return !!(
            ClientTokenService.getAccessToken() &&
            ClientTokenService.getRefreshToken()
        )
    },
}
