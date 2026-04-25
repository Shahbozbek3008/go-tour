"use client"

import { useCallback, useMemo, useState } from "react"
import {
    COUNTRY_REGION_MAP,
    DEFAULT_FALLBACK_IMAGE,
    FALLBACK_IMAGES,
    INITIAL_VISIBLE_COUNT,
    LOAD_MORE_STEP,
} from "../constants"
import { Destination, DestinationsResponse } from "./use-destinations-query"

// ─── Helpers ────────────────────────────────────────────────────────────────

function resolveImage(dest: Destination): string {
    if (dest.image) return dest.image
    const key = dest.country.toLowerCase()
    return FALLBACK_IMAGES[key] ?? DEFAULT_FALLBACK_IMAGE
}

function resolveRegion(dest: Destination): string {
    return dest.region ?? COUNTRY_REGION_MAP[dest.country] ?? "Xalqaro"
}

function normalise(dest: Destination, featured?: boolean): Destination {
    return {
        ...dest,
        image: resolveImage(dest),
        region: resolveRegion(dest),
        featured: featured ?? dest.featured ?? false,
    }
}

// ─── Hook ───────────────────────────────────────────────────────────────────

/**
 * Merges featured + popular destinations from the API into a single ordered
 * list, handles image / region fallbacks, and exposes pagination state.
 *
 * @param data - Raw data from useDestinationsQuery (or any data source)
 */
export function useDestinations(data: DestinationsResponse) {
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

    // Build the full ordered list once per data change (no re-render cost)
    const allDestinations: Destination[] = useMemo(() => {
        const result: Destination[] = []

        if (data.featured) {
            result.push(normalise(data.featured, true))
        }

        data.popular.forEach((d) => {
            // Avoid duplicating the featured card if the API accidentally includes it
            if (d.id !== data.featured?.id) {
                result.push(normalise(d, false))
            }
        })

        return result
    }, [data.featured, data.popular])

    const visibleDestinations = useMemo(
        () => allDestinations.slice(0, visibleCount),
        [allDestinations, visibleCount],
    )

    const hasMore = visibleCount < allDestinations.length
    const totalCount = allDestinations.length

    const loadMore = useCallback(() => {
        setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, totalCount))
    }, [totalCount])

    const showAll = useCallback(() => {
        setVisibleCount(totalCount)
    }, [totalCount])

    const showLess = useCallback(() => {
        setVisibleCount(INITIAL_VISIBLE_COUNT)
    }, [])

    return {
        visibleDestinations,
        allDestinations,
        hasMore,
        totalCount,
        visibleCount,
        loadMore,
        showAll,
        showLess,
    }
}
