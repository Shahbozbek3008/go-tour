export type AdditionalPageType =
    | "privacy_policy"
    | "terms_of_use"
    | "cookie_policy"
    | "nda_confidentiality"
    | "report_misuse_fraud"
    | "explore_marketplace"
    | "investment_opportunities"
    | "post_your_request"
    | "match_with_partners"
    | "smart_search_engine"
    | "about_us"
    | "our_mission_vision"
    | "how_it_works"
    | "outreach_social_impact"

export interface IAdditionalPageDetail {
    slug: AdditionalPageType
    page_type: AdditionalPageType
    page_type_display: string
    data: string
    created_at: string
}
