/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchInstance from "@/lib/api/fetch-instance"
import { safeParseBody, throwError } from "@/lib/api/utils"
import { getDeviceInfo } from "@/lib/firebase/get-device-info"
import { onError } from "@/lib/utils/on-error"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { CustomUseMutationOptions, MutateOpts } from "./types"

type Method = "post" | "put" | "delete" | "patch" | "get"

type MutationVariables<P> = {
    url: string
    method: Method
    payload?: P
    config?: RequestInit
}

export const useRequest = <P = any, D = any>({
    options,
    config,
    queryClient,
    device,
}: {
    options?: CustomUseMutationOptions<D, any, MutationVariables<P>>
    config?: RequestInit
    queryClient?: QueryClient
    device?: boolean
} = {}) => {
    const mutation = useMutation<D, any, MutationVariables<P>>(
        {
            onError,
            mutationFn: async ({
                url,
                payload,
                method,
                config: requestConfig,
            }) => {
                const mergedConfig = { ...config, ...requestConfig }
                const updatedPayload =
                    device ?
                        {
                            ...(payload as object),
                            device: await getDeviceInfo(),
                        }
                    :   payload

                let response: Response
                const finalUrl = url

                switch (method) {
                    case "get":
                        response = await fetchInstance.get(
                            finalUrl,
                            mergedConfig,
                        )
                        break
                    case "post":
                        response = await fetchInstance.post(
                            finalUrl,
                            updatedPayload,
                            mergedConfig,
                        )
                        break
                    case "put":
                        response = await fetchInstance.put(
                            finalUrl,
                            updatedPayload,
                            mergedConfig,
                        )
                        break
                    case "patch":
                        response = await fetchInstance.patch(
                            finalUrl,
                            updatedPayload,
                            mergedConfig,
                        )
                        break
                    case "delete":
                        response = await fetchInstance.delete(
                            finalUrl,
                            updatedPayload,
                            mergedConfig,
                        )
                        break
                    default:
                        throw new Error(`Unsupported method: ${method}`)
                }

                if (!response.ok) {
                    await throwError(response)
                }

                if (method === "delete") {
                    return null as D
                }

                const data = await safeParseBody<D>(response)
                return data as D
            },
            ...(options || {}),
        },
        queryClient,
    )

    const handleMutate = (
        variables: MutationVariables<P>,
        mutateOptions?: MutateOpts<D, P>,
    ) => {
        mutation.mutate(variables, mutateOptions)
    }

    const handleMutateAsync = (
        variables: MutationVariables<P>,
        mutateOptions?: MutateOpts<D, P>,
    ) => mutation.mutateAsync(variables, mutateOptions)

    const get = (url: string, cfg?: RequestInit, opt?: MutateOpts<D, P>) =>
        handleMutate({ method: "get", url, config: cfg }, opt)

    const getAsync = (url: string, cfg?: RequestInit, opt?: MutateOpts<D, P>) =>
        handleMutateAsync({ method: "get", url, config: cfg }, opt)

    const post = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutate({ method: "post", url, payload, config: cfg }, opt)

    const postAsync = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutateAsync({ method: "post", url, payload, config: cfg }, opt)

    const put = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutate({ method: "put", url, payload, config: cfg }, opt)

    const putAsync = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutateAsync({ method: "put", url, payload, config: cfg }, opt)

    const patch = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutate({ method: "patch", url, payload, config: cfg }, opt)

    const patchAsync = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutateAsync({ method: "patch", url, payload, config: cfg }, opt)

    const remove = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutate({ method: "delete", url, payload, config: cfg }, opt)

    const removeAsync = (
        url: string,
        payload?: P,
        opt?: MutateOpts<D, P>,
        cfg?: RequestInit,
    ) => handleMutateAsync({ method: "delete", url, payload, config: cfg }, opt)

    return {
        ...mutation,
        get,
        getAsync,
        post,
        postAsync,
        put,
        putAsync,
        patch,
        patchAsync,
        remove,
        removeAsync,
    }
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import fetchInstance from "@/lib/api/fetch-instance"
// import { getDeviceInfo } from "@/lib/firebase/get-device-info"
// import { onError } from "@/lib/utils/on-error"
// import { QueryClient, useMutation } from "@tanstack/react-query"
// import { CustomUseMutationOptions, MutateOpts } from "./types"

// type Method = "post" | "put" | "delete" | "patch" | "get"
// type MutationVariables<P> = {
//     url: string
//     method: Method
//     payload?: P
//     config?: RequestInit
// }

// export const useRequest = <P = any, D = any>({
//     options,
//     config,
//     queryClient,
//     device,
// }: {
//     options?: CustomUseMutationOptions<D, any, MutationVariables<P>>
//     config?: RequestInit
//     queryClient?: QueryClient
//     device?: boolean
// } = {}) => {
//     const mutation = useMutation<D, any, MutationVariables<P>>(
//         {
//             onError,
//             mutationFn: async ({
//                 url,
//                 payload,
//                 method,
//                 config: requestConfig,
//             }) => {
//                 const mergedConfig = { ...config, ...requestConfig }
//                 const updatedPaylod =
//                     device ?
//                         { ...payload, device: await getDeviceInfo() }
//                     :   payload

//                 let response: Response

//                 const finalUrl = url + "/"

//                 switch (method) {
//                     case "get":
//                         response = await fetchInstance.get(
//                             finalUrl,
//                             mergedConfig,
//                         )
//                         break
//                     case "post":
//                         response = await fetchInstance.post(
//                             finalUrl,
//                             updatedPaylod,
//                             mergedConfig,
//                         )
//                         break
//                     case "put":
//                         response = await fetchInstance.put(
//                             finalUrl,
//                             updatedPaylod,
//                             mergedConfig,
//                         )
//                         break
//                     case "patch":
//                         response = await fetchInstance.patch(
//                             finalUrl,
//                             updatedPaylod,
//                             mergedConfig,
//                         )
//                         break
//                     case "delete":
//                         response = await fetchInstance.delete(
//                             finalUrl,
//                             updatedPaylod,
//                             mergedConfig,
//                         )
//                         break
//                     default:
//                         throw new Error(`Unsupported method: ${method}`)
//                 }

//                 if (!response.ok) {
//                     const errorData = await response.json().catch(() => ({
//                         message: "An unexpected error occurred",
//                     }))

//                     throw {
//                         response: {
//                             status: response.status,
//                             statusText: response.statusText,
//                             data: errorData,
//                         },
//                     }
//                 }
//                 if (method !== "delete") {
//                     return response.json()
//                 }
//             },
//             ...(options || {}),
//         },
//         queryClient,
//     )

//     const handleMutate = (
//         variables: MutationVariables<P>,
//         mutateOptions?: MutateOpts<D, P>,
//     ) => {
//         mutation.mutate(variables, mutateOptions)
//     }

//     const handleMutateAsync = (
//         variables: MutationVariables<P>,
//         mutateOptions?: MutateOpts<D, P>,
//     ) => mutation.mutateAsync(variables, mutateOptions)

//     const get = (
//         url: string,
//         config?: RequestInit,
//         mutateOptions?: MutateOpts<D, P>,
//     ) =>
//         handleMutate(
//             {
//                 method: "get",
//                 url,
//                 config,
//             },
//             mutateOptions,
//         )

//     const getAsync = (
//         url: string,
//         config?: RequestInit,
//         mutateOptions?: MutateOpts<D, P>,
//     ) =>
//         handleMutateAsync(
//             {
//                 method: "get",
//                 url,
//                 config,
//             },
//             mutateOptions,
//         )

//     const post = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutate(
//             {
//                 method: "post",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     const postAsync = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutateAsync(
//             {
//                 method: "post",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     const put = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutate(
//             {
//                 method: "put",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     const putAsync = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutateAsync(
//             {
//                 method: "put",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     const patch = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutate(
//             {
//                 method: "patch",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     const patchAsync = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutateAsync(
//             {
//                 method: "patch",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     const remove = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutate(
//             {
//                 method: "delete",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     const removeAsync = (
//         url: string,
//         payload?: P,
//         mutateOptions?: MutateOpts<D, P>,
//         config?: RequestInit,
//     ) =>
//         handleMutateAsync(
//             {
//                 method: "delete",
//                 url,
//                 payload,
//                 config,
//             },
//             mutateOptions,
//         )

//     return {
//         ...mutation,
//         get,
//         getAsync,
//         post,
//         postAsync,
//         put,
//         putAsync,
//         patch,
//         patchAsync,
//         remove,
//         removeAsync,
//     }
// }
