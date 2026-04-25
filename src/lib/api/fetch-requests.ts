import fetchInstance from "./fetch-instance"
import { processingResponse, serializeParams } from "./utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomFetchConfig = RequestInit & { params?: Record<string, any> }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRequest = async <T = any>(
    url: string,
    config?: CustomFetchConfig,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    data?: Record<string, unknown>,
): Promise<T> => {
    let finalUrl = `${url}`

    const queryString = serializeParams(config?.params ?? {})
    if (queryString) {
        finalUrl += `?${queryString}`
    }

    const response = await (method === "GET" ?
        fetchInstance.get(finalUrl, config)
    :   fetchInstance.post(finalUrl, data ?? null, config))

    return await processingResponse<T>(response)
}
