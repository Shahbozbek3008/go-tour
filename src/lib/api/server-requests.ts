"use server"

import { getLocale } from "next-intl/server"
import { ServerCurrencyService } from "../cookies/server-currency-service" // ← o'zgartiring
import { ServerTokenService } from "../cookies/server-token-service"
import fetchInstance from "./fetch-instance"
import { CustomFetchConfig } from "./fetch-requests"
import { processingResponse, serializeParams } from "./utils"

export const serverGetRequest = async <T = any>(
    url: string,
    config?: CustomFetchConfig,
): Promise<T> => {
    let finalUrl = `${url}`

    const currency = await ServerCurrencyService.getCurrency() // ← o'zgartiring

    const params = {
        ...config?.params,
        currency, // ← o'zgartiring
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
