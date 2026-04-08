type ChatStatus = "online" | "away" | "do_not_disturb" | "offline" | ""
interface ContactPermissionType {
    phone_number_permission: boolean
    email_permission: boolean
    address_permission: boolean
}
interface VerificationType {
    email_verification: boolean
    phone_verification: boolean
    business_licence: boolean
    tax_id_verification: boolean
    address_verification: boolean
}

interface BusinessType {
    company_name: string | null
    business_type: string | null
    company_image: string | null
    company_description: string | null
    purpose_of_business_activity: string | null
    // other user profile fields
    license_number?: string | null
    address?: string | null
    tax_id_number?: string | null
}

interface Connection_StatusType {
    is_your_invite: boolean
    status_display: string
    status: string
}

interface BookmarkType {
    investment: number
    marketplace: number
    outreach_hub: number
    post: number
    total: number
}

interface InvestmentType {
    active: number
    archive: number
    total: number
}

interface MarketplaceType {
    active: number
    archive: number
    total: number
}

interface NetworkType {
    blacklist: number
    connection: number
    invitation: number
    total: number
}

interface OutreachHubType {
    active: number
    archive: number
    total: number
}

interface PostType {
    active: number
    archive: number
    total: number
}

export interface ProfileInfo {
    id: string
    user_id: string
    first_name: string
    last_name: string
    job_title: string
    business_type: string
    about: string
    company_name: string
    profile_image: string | null
    banner_image: string | null
    address: string
    phone_number: string
    email: string
    time_zone: string
    joined_at: string
    chat_status: ChatStatus
    contact_permission: ContactPermissionType
    verification: VerificationType
    is_2fa_enabled: boolean
    business: BusinessType
    connection_status: Connection_StatusType | null
    chat_messages_count: number
    unread_notifications_count: number
    tabs_data_count: {
        bookmark: BookmarkType
        investment: InvestmentType
        marketplace: MarketplaceType
        network: NetworkType
        outreach_hub: OutreachHubType
        post: PostType
    } | null
    connections_count: number
}
