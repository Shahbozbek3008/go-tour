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

interface UserProfile {
    fullName: string
    phoneNumber: string
    imageUrl: string | null
    id: number
    birthDate: string | null
    gender: string | null
    email: string | null
}

export interface AuthResponse {
    status: number
    message: string
    data: {
        favoriteCount: number
        userProfile: UserProfile
        token: string | null
        roles: string[] | null
    }
}
