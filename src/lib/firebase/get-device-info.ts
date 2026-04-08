import { getCookie, setCookie } from "cookies-next/client"
import { getFirebaseToken } from "."
import { COOKIES } from "../constants/cookies"
import { isIOSGoogleApp } from "../utils/is-ios-google-app"

export type DeviceInfo = {
    firebase_token?: string
    platform: "web"
    os_version: string
    device_model: string
    location: string
    device_id: string
}

export const getDeviceInfo = async (): Promise<DeviceInfo | null> => {
    // Only attempt to get Firebase token if not in iOS Google app
    const token = !isIOSGoogleApp() ? await getFirebaseToken() : null

    let deviceId = getCookie(COOKIES.DEVICE_ID)

    if (!deviceId) {
        try {
            const newDeviceId = crypto.randomUUID()
            setCookie(COOKIES.DEVICE_ID, newDeviceId, {
                maxAge: 60 * 60 * 24 * 365 * 10, // 10 years in seconds
                httpOnly: false, // Needs to be accessible from client-side
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            })
            deviceId = newDeviceId
        } catch (err) {
            console.error("Failed to generate UUID", err)
            return null
        }
    }

    // Safely access navigator properties
    const platform =
        typeof window !== "undefined" ?
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window.navigator as any)?.userAgentData?.platform ||
            window.navigator?.platform ||
            "unknown"
        :   "unknown"

    const os_version =
        typeof window !== "undefined" ?
            window.navigator?.userAgent || "unknown"
        :   "unknown"

    return {
        firebase_token: token || undefined,
        device_id: deviceId,
        platform: "web",
        os_version,
        device_model: platform,
        location: "unknown",
    }
}
