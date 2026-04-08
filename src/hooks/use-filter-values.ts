"use client"

import {
    AiChatType,
    useAiPersist,
} from "@/components/common/ai-chat/_hooks/use-ai-persist"
import { ChildFilterItem } from "@/components/common/filter/types"
import { useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getArray } from "@/lib/utils/get-array"
import { getHref } from "@/lib/utils/get-href"
import { CheckedState } from "@radix-ui/react-checkbox"
import { Route } from "nextjs-routes"
import { useCallback, useEffect } from "react"
import useSearch from "./use-search"

interface Args {
    filter: ChildFilterItem
    aiChatType?: AiChatType
}

export const useFilterValues = ({ filter, aiChatType }: Args) => {
    const { updateChat } = useAiPersist()
    const { filterKey, type, valuesFromAi } = filter
    const jsonParams = useSearch({ jsonParse: false })
    const router = useRouter()
    const params = useSearch()

    const values = getArray<string>(params[filterKey])

    const setParams = useCallback(
        (nextValues: string[]) => {
            const normalizedValues = [...new Set(nextValues)]
            const getPathname = (): Route["pathname"] => {
                switch (aiChatType) {
                    case "marketplace_filter":
                        return "/[locale]/marketplace"
                    case "investment_filter":
                        return "/[locale]/investment"
                    case "outreach_hub_filter":
                        return "/[locale]/outreach-hub"
                    default:
                        return "/[locale]"
                }
            }
            router.replace(
                getHref({
                    // @ts-expect-error assdf
                    pathname: getPathname(),
                    query: {
                        ...jsonParams,
                        [filterKey]:
                            normalizedValues.length ?
                                JSON.stringify(normalizedValues)
                            :   undefined,
                        [SEARCH_PARAMS.PAGE]: undefined,
                    },
                }),
                { scroll: false },
            )
        },
        [router, jsonParams, filterKey, aiChatType],
    )

    const updateFilters = (value: string, checked?: CheckedState) => {
        const nextValues =
            type === "radio" ? [value]
            : checked === true ? Array.from(new Set([...values, value]))
            : values.filter((id) => id !== value)
        setParams(nextValues)
        resetAiValues()
    }

    function resetAiValues() {
        switch (aiChatType) {
            case "marketplace_filter":
                updateChat<"marketplace_filter">(
                    {
                        categories: [],
                        countries: [],
                        requestTypes: [],
                        tags: [],
                    },
                    "marketplace_filter",
                )
                break
            case "investment_filter":
                updateChat<"investment_filter">(
                    {
                        countries: [],
                        requestTypes: [],
                        tags: [],
                    },
                    "investment_filter",
                )
                break
            case "outreach_hub_filter":
                updateChat<"outreach_hub_filter">(
                    {
                        countries: [],
                        requestTypes: [],
                        tags: [],
                    },
                    "outreach_hub_filter",
                )
                break
        }
    }

    useEffect(() => {
        if (valuesFromAi.length > 0) {
            const updatedValues = [...values, ...valuesFromAi]
            setParams(updatedValues)
        }
    }, [valuesFromAi, values, setParams])

    return {
        updateFilters,
        setParams,
        values,
    }
}
