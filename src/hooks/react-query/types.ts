/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutateOptions, UseMutationOptions } from "@tanstack/react-query"

export type CustomUseMutationOptions<D, E, P> = Partial<
    UseMutationOptions<D, E, P>
>
export type MutationVariables<P> = { url: string; payload?: P }
export type MutateOpts<D, P> = MutateOptions<
    D,
    any,
    MutationVariables<P>,
    unknown
>
export type UseMutationOpts<D, P> = CustomUseMutationOptions<
    D,
    any,
    MutationVariables<P>
>
export type RequestFunction = <T>(
    url: string,
    payload?: T,
    config?: RequestInit,
) => Promise<any>
