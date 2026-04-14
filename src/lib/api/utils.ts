export async function safeParseBody<T = unknown>(
    res: Response,
): Promise<T | string | null> {
    if (res.status === 204 || res.status === 205) return null
    const text = await res.text()
    if (!text) return null

    const ct = res.headers.get("content-type") || ""
    if (/application\/json/i.test(ct)) {
        try {
            return JSON.parse(text) as T
        } catch {
            return null
        }
    }
    return text
}

export async function throwError(res: Response) {
    const errorData = await safeParseBody(res)
    throw {
        response: {
            status: res.status,
            statusText: res.statusText,
            data: errorData,
        },
    }
}

export async function processingResponse<T>(response: Response) {
    if (!response.ok) {
        await throwError(response)
    }
    // return response.json()
    const data = await safeParseBody<T>(response)
    return data as T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeParams(params: Record<string, any>): string {
    const urlParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            // Handle arrays (comma-separated like your qs config)
            urlParams.append(key, value.join(","))
        } else if (value !== undefined && value !== null) {
            urlParams.append(key, String(value))
        }
    })

    return urlParams.toString()
}
