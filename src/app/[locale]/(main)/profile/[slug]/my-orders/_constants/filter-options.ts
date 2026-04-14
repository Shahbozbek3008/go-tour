type FilterOption = {
    value: string
    label: string
    count?: number
}

export const FILTER_OPTIONS: FilterOption[] = [
    { value: "all", label: "Barchasi" },
    { value: "new", label: "Yangi" },
    { value: "in_progress", label: "Jarayonda" },
    { value: "success", label: "Muvaffaqiyat" },
    { value: "cancelled", label: "Bekor qilingan" },
]
