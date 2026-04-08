"use server"

import { getLocale } from "next-intl/server"
import { getStoredCurrency } from "../cookies/currency"
import { ServerTokenService } from "../cookies/server-token-service"
import fetchInstance from "./fetch-instance"
import { CustomFetchConfig } from "./fetch-requests"
import { processingResponse, serializeParams } from "./utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverGetRequest = async <T = any>(
    url: string,
    config?: CustomFetchConfig,
): Promise<T> => {
    let finalUrl = `${url}/`

    // Handle query parameters
    const params = {
        ...config?.params,
        currency: getStoredCurrency(),
    }
    const queryString = serializeParams(params)
    if (queryString) {
        finalUrl += `?${queryString}`
    }

    const locale = await getLocale()
    const accessToken = await ServerTokenService.getAccessToken()

    const response = await fetchInstance.get(finalUrl, {
        ...config,
        headers: {
            ...config?.headers,
            "Accept-Language": locale,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
    })

    return await processingResponse<T>(response)
}
