// ─── Fallback / Config ───────────────────────────────────────────────────────

/** Unsplash fallback images keyed by lowercased country name */
export const FALLBACK_IMAGES: Record<string, string> = {
    "maldiv orollari":
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80",
    turkiya:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    fransiya:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80",
    yaponiya:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    baa: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    indoneziya:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    gretsiya:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
}

export const DEFAULT_FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80"

export const COUNTRY_REGION_MAP: Record<string, string> = {
    "Maldiv orollari": "Janubiy Osiyo",
    Turkiya: "Yaqin Sharq",
    Fransiya: "Evropa",
    Yaponiya: "Osiyo",
    BAA: "Yaqin Sharq",
    Indoneziya: "Osiyo",
    Gretsiya: "Evropa",
}

export const INITIAL_VISIBLE_COUNT = 8

export const LOAD_MORE_STEP = 4
