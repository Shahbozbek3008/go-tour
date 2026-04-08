import { InvestmentItemDetail } from "@/app/[locale]/(main)/investment/_types"
import { MarketplaceProductDetail } from "@/app/[locale]/(main)/marketplace/_types"
import { OutreachhubItemDetail } from "@/app/[locale]/(main)/outreach-hub/_types"

export interface AiChatStartMessage {
    id: 1
    investment_create: string
    investment_filter: string
    marketplace_create: string
    marketplace_filter: string
    outreach_hub_create: string
    outreach_hub_filter: string
    home_page: string
    registration: string
}

type Fields<T> = Partial<
    Omit<T, "tags" | "images" | "videos" | "documents"> & {
        tags: string[]
        offered_tags: string[]
    }
> & { message_for_user: string }

export interface AiMarketplaceAddResponse {
    thread_id: string
    fields: Fields<MarketplaceProductDetail>
    is_full: boolean
}

export interface AiInvestmentAddResponse {
    thread_id: string
    fields: Fields<InvestmentItemDetail>
    is_full: boolean
}

export interface AiOutreachHubAddResponse {
    thread_id: string
    fields: Fields<OutreachhubItemDetail>
    is_full: boolean
}

type AiBaseFilterResponse = {
    thread_id: string
    request_types: string[]
    tags: string[]
    countries: string[]
    message_for_user: string
    is_approved: boolean
}
export interface AiMarketplaceFilterResponse extends AiBaseFilterResponse {
    categories: string[]
}
export type AiInvestmentFilterResponse = AiBaseFilterResponse
export type AiOutreachHubFilterResponse = AiBaseFilterResponse

export interface AiGetUserDatasResponse {
    thread_id: string
    fields: {
        first_name: string
        last_name: string
        job_title: string
        company_name: string
        company_type: string
        message_for_user: string
    }
    is_full: boolean
}

export interface AiHomeResponse {
    thread_id: string
    redirect_to?:
        | "marketplace_post"
        | "investment_post"
        | "outreach_hub_post"
        | "marketplace_filter"
        | "investment_filter"
        | "outreach_hub_filter"
    message_for_user: string
}
