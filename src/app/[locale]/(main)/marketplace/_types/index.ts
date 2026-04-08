import { Currency, VisibilityType } from "@/types/common/extra"

export interface MarketplaceCategory {
    id: string
    name: string
    icon_url: string
    information_data: {
        id: number
        information: string
    }[]
}

export type MarketplaceRequestType =
    | "sell"
    | "buy"
    | "seeking_supplier_vendor"
    | "seeking_client_buyer"
    | "seeking_service_provider"
    | "distributor_reseller_needed"
    | "detailed_service"
    | "partnership"
    | "barter_trade_exchange"

export type PricingModelType =
    | "Fixed Price"
    | "Negotiable"
    | "Tender-Based"
    | "Request for Quotation (RFQ)"
    | "Price on Request"
    | "Commission-Based"
    | "Revenue-Linked"
    | "Not Applicable"

export interface PricingModel {
    type: PricingModelType
    type_display: string
    name: string
    start_amount: string | null
    converted_start_amount: string | null
    end_amount: string | null
    converted_end_amount: string | null
    currency: Currency
    converted_currency: Currency
    measurement: string | null
    percentage_type: number | null
    start_percentage: number | null
    end_percentage: number | null
}

export interface MarketplaceProduct {
    name: string
    description: string
    user: {
        id: string
        user_id: string
        first_name: string
        last_name: string
        profile_image: string
        job_title: string
        email: string
        phone_number: string
    } | null
    category: {
        id: string
        full_name: string
        name: string
    } | null
    created_at: string
    main_image_url: string
    request_type: MarketplaceRequestType | null
    request_type_display: string
    pricing_model: PricingModel | null
    slug: string
    is_bookmarked: boolean
    is_mine: boolean
    tags: {
        id: number
        name: string
    }[]
}

export type MarketplaceProductCondition =
    | "new"
    | "republished"
    | "used"
    | "Non standard Inventory"
    | "Not applicable"

export type MarketplaceSupplyRequirement = "monthly" | "yearly" | "one_time"
export type EngagementType = "one_time" | "ongoing"

interface Doc {
    id: string
    url: string
    name: string
    size: string
    extension: string
}
export interface MarketplaceProductDetail extends MarketplaceProduct {
    id: string
    additional_fields: {
        id: string
        field_name: string
        field_value: string
    }[]
    images: string[]
    videos: string[]
    documents: Doc[]
    tags: {
        id: number
        name: string
    }[]
    condition_display: string
    supply_requirement_display: string
    engagement_type_display: string
    exchange_product_condition_display: string | null
    exchange_structure_display: string | null
    updated_at: string
    is_archive: boolean
    visibility_type: VisibilityType | null
    condition: MarketplaceProductCondition | null
    delivery_start_date: string
    quantity: string
    supply_requirement: MarketplaceSupplyRequirement | null
    engagement_type: EngagementType | null
    exchange_product_condition: MarketplaceProductCondition | null
    exchange_structure: "one_to_one" | "one_to_many" | "many_to_many" | null
    origin_countries: string[]
    destination_countries: string[]
    specification: string
    commercial_terms: string
    incoterm: string
    requirements: string
    deliverables: string
    experience: string
    your_contribution: string | null
    partner_contribution: string | null
    collaboration_structure: string | null
    exchange_product_specification: string | null
    procurement_type: string
    delivery_type: string | null
    target_client: string | null
    partner_type: string | null
    right_options: string | null
    support: string | null
    submission_type: string | null
    product_or_service_locations: string
    product_or_service_target_locations: string
    languages: string
    credentials: string | null
    expected_response: string | null
    in_exchange_for: string | null
    cash_component: string | null
    delivery_terms: string | null
    trade_validity: string | null
    documentation_needed: string | null
    is_anonymous: boolean
    visibility_permission_users_ids?: string[]
}
