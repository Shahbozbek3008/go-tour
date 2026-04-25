export interface LocalizedItem {
    uz: string
    ru: string
}

export interface InclusionsResponse {
    included: LocalizedItem[]
    notIncluded: LocalizedItem[]
}
