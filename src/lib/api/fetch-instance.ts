import { BASE_URL } from "../constants/base-url"

// Custom fetch instance with default configuration
class FetchInstance {
    private baseURL: string
    private defaultHeaders: Record<string, string>
    private requestInterceptors: Array<
        (config: RequestInit & { url: string }) => RequestInit & { url: string }
    > = []
    private responseInterceptors: Array<{
        fulfilled: (response: Response) => Response | Promise<Response>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected?: (error: any) => any
    }> = []

    constructor(config: { baseURL: string; headers?: Record<string, string> }) {
        this.baseURL = config.baseURL
        this.defaultHeaders = {
            "Content-Type": "application/json", // JSON uchun default
            ...config.headers,
        }
    }

    // Helper: FormData tekshirish
    private isFormDataLike(x: unknown): x is FormData {
        return typeof FormData !== "undefined" && x instanceof FormData
    }

    // Add request interceptor
    addRequestInterceptor(
        interceptor: (
            config: RequestInit & { url: string },
        ) => RequestInit & { url: string },
    ) {
        this.requestInterceptors.push(interceptor)
    }

    // Add response interceptor
    addResponseInterceptor(interceptor: {
        fulfilled: (response: Response) => Response | Promise<Response>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejected?: (error: any) => any
    }) {
        this.responseInterceptors.push(interceptor)
    }

    private async executeRequest(
        url: string,
        config: RequestInit = {},
    ): Promise<Response> {
        // Prepare initial config
        let requestConfig: RequestInit & { url: string } = {
            url: url.startsWith("http") ? url : `${this.baseURL}${url}`,
            headers: {
                ...this.defaultHeaders,
                ...config.headers,
            },
            // credentials: "include", // equivalent to withCredentials: true,
            ...config,
        }

        // Apply request interceptors
        for (const interceptor of this.requestInterceptors) {
            requestConfig = interceptor(requestConfig)
        }

        // ✅ FINAL GUARD:
        // Agar body FormData bo'lsa, Content-Type'ni majburan o'chiramiz
        if (requestConfig.body instanceof FormData) {
            const h = new Headers(requestConfig.headers || {})
            h.delete("Content-Type")
            requestConfig.headers = h
        }

        try {
            // Make the actual fetch request
            // Destructure to remove 'url' before passing to fetch
            const { url: finalUrl, ...fetchConfig } = requestConfig
            let response = await fetch(finalUrl, fetchConfig)

            // Apply response interceptors (fulfilled)
            for (const interceptor of this.responseInterceptors) {
                response = await interceptor.fulfilled(response)
            }

            return response
        } catch (error) {
            // Apply response interceptors (rejected)
            for (const interceptor of this.responseInterceptors) {
                if (interceptor.rejected) {
                    const result = await interceptor.rejected(error)
                    if (result) {
                        return result
                    }
                }
            }
            throw error
        }
    }

    async get(url: string, config?: RequestInit): Promise<Response> {
        return this.executeRequest(url, { ...config, method: "GET" })
    }

    async post(
        url: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: any,
        config?: RequestInit,
    ): Promise<Response> {
        // ❗ FormData bo'lsa stringify QILMAYMIZ
        const body =
            data === undefined || data === null ? undefined
            : this.isFormDataLike(data) ? data
            : JSON.stringify(data)

        return this.executeRequest(url, {
            ...config,
            method: "POST",
            body,
        })
    }

    async put(
        url: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: any,
        config?: RequestInit,
    ): Promise<Response> {
        const body =
            data === undefined || data === null ? undefined
            : this.isFormDataLike(data) ? data
            : JSON.stringify(data)

        return this.executeRequest(url, {
            ...config,
            method: "PUT",
            body,
        })
    }

    async patch(
        url: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: any,
        config?: RequestInit,
    ): Promise<Response> {
        const body =
            data === undefined || data === null ? undefined
            : this.isFormDataLike(data) ? data
            : JSON.stringify(data)

        return this.executeRequest(url, {
            ...config,
            method: "PATCH",
            body,
        })
    }

    async delete(
        url: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: any,
        config?: RequestInit,
    ): Promise<Response> {
        const body =
            data === undefined || data === null ? undefined
            : this.isFormDataLike(data) ? data
            : JSON.stringify(data)

        return this.executeRequest(url, {
            ...config,
            method: "DELETE",
            body,
        })
    }
}

// Create fetch instance
const fetchInstance = new FetchInstance({
    baseURL: BASE_URL ?? "",
    headers: {
        // JSON default yuqorida bor; bu yerda qo'shimcha headerlar bo'lsa yozing
    },
})

export default fetchInstance

// import { BASE_URL } from "../constants/base-url"

// // Custom fetch instance with default configuration
// class FetchInstance {
//     private baseURL: string
//     private defaultHeaders: Record<string, string>
//     private requestInterceptors: Array<
//         (config: RequestInit & { url: string }) => RequestInit & { url: string }
//     > = []
//     private responseInterceptors: Array<{
//         fulfilled: (response: Response) => Response | Promise<Response>
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         rejected?: (error: any) => any
//     }> = []

//     constructor(config: { baseURL: string; headers?: Record<string, string> }) {
//         this.baseURL = config.baseURL
//         this.defaultHeaders = {
//             "Content-Type": "application/json",
//             ...config.headers,
//         }
//     }

//     // Add request interceptor
//     addRequestInterceptor(
//         interceptor: (
//             config: RequestInit & { url: string },
//         ) => RequestInit & { url: string },
//     ) {
//         this.requestInterceptors.push(interceptor)
//     }

//     // Add response interceptor
//     addResponseInterceptor(interceptor: {
//         fulfilled: (response: Response) => Response | Promise<Response>
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         rejected?: (error: any) => any
//     }) {
//         this.responseInterceptors.push(interceptor)
//     }

//     private async executeRequest(
//         url: string,
//         config: RequestInit = {},
//     ): Promise<Response> {
//         // Prepare initial config
//         let requestConfig: RequestInit & { url: string } = {
//             url: url.startsWith("http") ? url : `${this.baseURL}${url}`,
//             headers: {
//                 ...this.defaultHeaders,
//                 ...config.headers,
//             },
//             // credentials: "include", // equivalent to withCredentials: true,
//             ...config,
//         }

//         // Apply request interceptors
//         for (const interceptor of this.requestInterceptors) {
//             requestConfig = interceptor(requestConfig)
//         }

//         try {
//             // Make the actual fetch request
//             // Destructure to remove 'url' before passing to fetch
//             const { url, ...fetchConfig } = requestConfig
//             let response = await fetch(requestConfig.url, fetchConfig)

//             // Apply response interceptors (fulfilled)
//             for (const interceptor of this.responseInterceptors) {
//                 response = await interceptor.fulfilled(response)
//             }

//             return response
//         } catch (error) {
//             // Apply response interceptors (rejected)
//             for (const interceptor of this.responseInterceptors) {
//                 if (interceptor.rejected) {
//                     const result = await interceptor.rejected(error)
//                     if (result) {
//                         return result
//                     }
//                 }
//             }
//             throw error
//         }
//     }

//     async get(url: string, config?: RequestInit): Promise<Response> {
//         return this.executeRequest(url, { ...config, method: "GET" })
//     }

//     async post(
//         url: string,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         data?: any,
//         config?: RequestInit,
//     ): Promise<Response> {
//         return this.executeRequest(url, {
//             ...config,
//             method: "POST",
//             body: data ? JSON.stringify(data) : undefined,
//         })
//     }

//     async put(
//         url: string,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         data?: any,
//         config?: RequestInit,
//     ): Promise<Response> {
//         return this.executeRequest(url, {
//             ...config,
//             method: "PUT",
//             body: data ? JSON.stringify(data) : undefined,
//         })
//     }

//     async patch(
//         url: string,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         data?: any,
//         config?: RequestInit,
//     ): Promise<Response> {
//         return this.executeRequest(url, {
//             ...config,
//             method: "PATCH",
//             body: data ? JSON.stringify(data) : undefined,
//         })
//     }

//     async delete(
//         url: string, // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         data?: any,
//         config?: RequestInit,
//     ): Promise<Response> {
//         return this.executeRequest(url, {
//             ...config,
//             method: "DELETE",
//             body: data ? JSON.stringify(data) : undefined,
//         })
//     }
// }

// // Create fetch instance
// const fetchInstance = new FetchInstance({
//     baseURL: BASE_URL ?? "",
//     headers: {
//         "Content-Type": "application/json",
//     },
// })

// export default fetchInstance
