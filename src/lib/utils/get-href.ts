import { DynamicRoute, Query, Route, route } from "nextjs-routes"

type RemoveLocale<T> =
    T extends DynamicRoute<infer P, infer Q> ?
        {
            pathname: P
            query: Omit<Q, "locale">
        }
    :   never

type CleanedRoute = RemoveLocale<Route>

export type RouteWithoutLocale = {
    [R in CleanedRoute as R["pathname"]]: R["query"] extends (
        Record<string, never>
    ) ?
        {
            pathname: R["pathname"]
            query?: R["query"] | Query
            hash?: string | null | undefined
        }
    :   {
            pathname: R["pathname"]
            query: R["query"] & Query
            hash?: string | null | undefined
        }
}[CleanedRoute["pathname"]]

export function getHref(routeWithoutLocale: RouteWithoutLocale) {
    // @ts-expect-error sdf
    const resolvedHref: Route = {
        ...routeWithoutLocale,
        query: {
            ...routeWithoutLocale.query,
        },
    }
    return route(resolvedHref)
}
