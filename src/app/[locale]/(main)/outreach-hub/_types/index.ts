import { Currency, VisibilityType } from "@/types/common/extra"

export type TimeType = string

export type StatusType = "collected" | "in progress"

interface Tag {
    id: string
    name: string
}

export interface Document {
    id: string
    document_url: string
    name: string
    size: string
}

interface LastUpdates {
    id: string
    text: string
    created_at: string
}

export type OutreachHubRequestType =
    | "sponsorship"
    | "donation"
    | "grand assistance"
    | "aid distribution"
    | "partnership collaboration"
    | "volunteering pro bono services"
    | "awareness advocacy campaign"
    | "development project support"
    | "emergency response appeal"

export interface OutreachhubItem {
    slug: string
    name: string
    request_type: OutreachHubRequestType | null
    request_type_display: string
    user: {
        id: string
        user_id: string
        first_name: string
        last_name: string
        profile_image: string
        job_title: string
        email: string
        phone_number: string
        connections_count: number
    } | null
    description: string
    main_image_url: string
    deadline_date: string
    plan_price_amount: string
    collected_amount: string
    collected_amount_percentage: number
    currency: Currency | null
    converted_currency: Currency | null
    status: StatusType
    is_bookmarked: boolean
    created_at: string
    is_mine: boolean
}

export interface OutreachhubItemDetail extends OutreachhubItem {
    donations_count: number
    images: string[]
    videos: string[]
    documents: Document[]
    cause: string
    type_of_support: string
    type_off_support: string
    location: string
    tags: Tag[]
    last_updates: LastUpdates[]
    final_reports: Document[]
    visibility_type: VisibilityType
    visibility_permission_users_ids: string[]
    is_anonymous: boolean
}
