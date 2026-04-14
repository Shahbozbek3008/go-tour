export const isIOSGoogleApp = () => {
    if (typeof window === "undefined") return false
    const userAgent = window.navigator?.userAgent || ""
    return /iPhone|iPad|iPod/i.test(userAgent) && /GSA|CriOS/i.test(userAgent)
}
