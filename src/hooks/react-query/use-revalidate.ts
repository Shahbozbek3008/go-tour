import { useQueryClient } from "@tanstack/react-query"

export const useRevalidate = () => {
    const queryClient = useQueryClient()

    const invalidateByPatternMatch = (endpoints: string[]) => {
        endpoints.forEach((endpoint) => {
            queryClient.invalidateQueries({
                predicate: (q) => {
                    return (
                        typeof q.queryKey[0] === "string" &&
                        q.queryKey[0].includes(endpoint)
                    )
                },
                type: "all",
            })
        })
    }

    const invalidateByExactMatch = (endpoints: string[]) => {
        endpoints.forEach((endpoint) => {
            queryClient.invalidateQueries({
                queryKey: [endpoint],
            })
        })
    }

    return {
        invalidateByExactMatch,
        invalidateByPatternMatch,
        queryClient,
    }
}
