import { BusinessType } from "../_types"

interface BusinessTypeItem {
    key: BusinessType
    name: string
}

export const COMPANY_BUSINESS_TYPES: BusinessTypeItem[] = [
    {
        key: "IT",
        name: "it",
    },
    {
        key: "CLOUD",
        name: "cloud",
    },
    {
        key: "FINANCE",
        name: "finance",
    },
    {
        key: "MARKETING",
        name: "marketing",
    },
    {
        key: "MEDIA",
        name: "media",
    },
    {
        key: "OTHER",
        name: "other",
    },
]
