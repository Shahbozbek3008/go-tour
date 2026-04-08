import { Continent } from "@/types/common/extra"

export type BusinessType =
    | "IT"
    | "MEDIA"
    | "MARKETING"
    | "FINANCE"
    | "CLOUD"
    | "OTHER"

interface Country {
    id: string
    name: string
    continent: Continent
    continent_display: string
    image_url: string
}

export interface CompanyItem {
    user_id: string
    company_name: string
    company_image: string
    company_description: string
    business_type: BusinessType
    purpose_of_business_activity: string
    business_address: string
    country: Country[]
}
