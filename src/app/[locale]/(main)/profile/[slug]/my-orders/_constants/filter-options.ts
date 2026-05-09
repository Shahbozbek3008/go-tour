type FilterOption = {
    value: string
    label: string
    count?: number
}

export const FILTER_OPTIONS: FilterOption[] = [
    { value: "all", label: "all2" },
    { value: "new", label: "new" },
    { value: "in_progress", label: "inProgress" },
    { value: "success", label: "success" },
    { value: "cancelled", label: "cancelled" },
]
