import { getStoredCurrency } from "../cookies/currency"
import fetchInstance from "./fetch-instance"
import { processingResponse, serializeParams } from "./utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomFetchConfig = RequestInit & { params?: Record<string, any> }
// API request functions (equivalent to your axios-based functions)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRequest = async <T = any>(
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

    const response = await fetchInstance.get(finalUrl, config)

    return await processingResponse<T>(response)
}

// export const postRequest = async <T>(
//     url: string,
//     payload: T,
//     config: RequestInit = {},
// ) => {
//     const response = await fetchInstance.post(`${url}/`, payload, {
//         headers: {
//             "Content-Type": "application/json",
//         },
//         ...config,
//     })

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     return response.json()
// }

// export const putRequest = async <T>(
//     url: string,
//     payload: T,
//     config?: RequestInit,
// ) => {
//     const response = await fetchInstance.put(`${url}/`, payload, config)

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     return response.json()
// }

// export const patchRequest = async <T>(
//     url: string,
//     payload: T,
//     config?: RequestInit,
// ) => {
//     const response = await fetchInstance.patch(`${url}/`, payload, config)

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     return response.json()
// }

// export const deleteRequest = async <T>(
//     url: string,
//     payload?: T,
//     config?: RequestInit,
// ) => {
//     const response = await fetchInstance.delete(`${url}/`, payload, config)

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     return response.json()
// }
