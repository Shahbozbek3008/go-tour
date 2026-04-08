import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { useSearchParams } from "next/navigation"

interface Options {
    jsonParse?: boolean
}

export default function useSearch(
    { jsonParse }: Options = { jsonParse: true },
) {
    const search = useSearchParams()
    const searchObject: { [SEARCH_PARAMS.PAGE]?: string } & Record<
        string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any
    > = {}

    for (const [key, value] of search.entries()) {
        if (value !== "undefined") {
            try {
                // Attempt to parse as JSON first
                searchObject[key] = jsonParse ? JSON.parse(value) : value
            } catch {
                // If parsing fails, use the raw string value
                searchObject[key] = value
            }
        }
    }

    return searchObject
}
