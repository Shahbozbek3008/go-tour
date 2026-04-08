import { Continent, Currency, VisibilityType } from "@/types/common/extra"

interface Tag {
    id: string
    tag: string
}

export type InvestmentRequestType =
    | "seeking_investment"
    | "looking_to_invest"
    | "looking_for_co_investor"
    | "selling_business"
    | "acquiring_business"
    | "strategic_deal"

interface Country {
    id: string
    name: string
    continent: Continent
    image_url: string
}

export interface InvestmentItem {
    id: string
    slug: string
    name: string
    request_type: InvestmentRequestType | null
    request_type_display: string
    description: string
    main_image_url: string
    start_price: string
    converted_start_price: string
    end_price: string
    converted_end_price: string
    currency: Currency | null
    converted_currency: Currency | null
    profile: {
        id: string
        user_id: string
        first_name: string
        last_name: string
        profile_image: string
        job_title: string
        email: string
        phone_number: string
        created_at: string
    } | null
    is_mine: boolean
    tags: Tag[]
    origin_countries: Country[]
    destination_countries: Country[]
    is_bookmarked: boolean
    created_at: string
    updated_at: string
}

interface Document {
    id: string
    document_url: string
    only_invites_allow: boolean
    order_number?: number
    name: string
    size: string
}

export interface InvestmentItemDetail extends InvestmentItem {
    investment_structure: null | string
    business_stage: null | string
    target_industry: null | string
    strategic_objectives: null | string
    geographic_focus: string
    target_sector: string
    non_financial_preferences: string
    use_of_found_funds: null | string
    investor_type: null | string
    is_archive: boolean
    offering: string
    governance: null | string
    existing_investors: string
    ideal_partner: string
    business_nature: null | string
    reason_for_sale: string
    permits: string
    sale_structure: null | string
    seller_profile: string
    deal_type: null | string
    visibility_type: VisibilityType
    transaction_structure: string
    documents: Document[]
    images: string[]
    videos: string[]
    visibility_type_display: string
    visible_connections?: string[]
    is_anonymous: boolean
}
