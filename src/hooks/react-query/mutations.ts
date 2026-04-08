// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//     deleteRequest,
//     patchRequest,
//     postRequest,
//     putRequest,
// } from "@/lib/api/fetch-requests"
// import { onError } from "@/lib/utils/on-error"
// import { useMutation } from "@tanstack/react-query"
// import {
//     MutateOpts,
//     MutationVariables,
//     RequestFunction,
//     UseMutationOpts,
// } from "./types"

// const createMutationHook = <P = any, D = any>(requestFn: RequestFunction) => {
//     return (options?: UseMutationOpts<D, P>, config?: RequestInit) => {
//         const mutation = useMutation<D, any, MutationVariables<P>>({
//             mutationFn: ({ url, payload }) => {
//                 return requestFn(url, payload, config)
//             },
//             onError,
//             ...(options || {}),
//         })

//         const mutate = (
//             url: string,
//             payload?: P,
//             mutateOptions?: MutateOpts<D, P>,
//         ) => {
//             mutation.mutate({ url, payload }, mutateOptions)
//         }

//         const mutateAsync = (
//             url: string,
//             payload?: P,
//             mutateOptions?: MutateOpts<D, P>,
//         ) => mutation.mutateAsync({ url, payload }, mutateOptions)

//         return { ...mutation, mutate, mutateAsync }
//     }
// }

// // Mutation hooks
// export const usePost = <P = any, D = any>(
//     options?: UseMutationOpts<D, P>,
//     config?: RequestInit,
// ) => createMutationHook<P, D>(postRequest)(options, config)

// export const usePut = <P = any, D = any>(
//     options?: UseMutationOpts<D, P>,
//     config?: RequestInit,
// ) => createMutationHook<P, D>(putRequest)(options, config)

// export const usePatch = <P = any, D = any>(
//     options?: UseMutationOpts<D, P>,
//     config?: RequestInit,
// ) => createMutationHook<P, D>(patchRequest)(options, config)

// export const useDelete = <P = any, D = any>(
//     options?: UseMutationOpts<D, P>,
//     config?: RequestInit,
// ) => createMutationHook<P, D>(deleteRequest)(options, config)
