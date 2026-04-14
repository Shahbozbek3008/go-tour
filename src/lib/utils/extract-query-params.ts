export default function extractQueryParams(url: unknown) {
    if (!url) return {}
    try {
        const urlObj = new URL(String(url))
        const params = new URLSearchParams(urlObj.search)
        const queryParams: Record<string, string> = {}

        params.forEach((value, key) => {
            queryParams[key] = value
        })

        return queryParams
    } catch (error) {
        console.error("Invalid URL:", error)
        return {}
    }
}
