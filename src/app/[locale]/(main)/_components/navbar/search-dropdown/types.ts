interface SearchItem {
    id: string
    name: string
    slug: string
    description: string
    main_image_url: string
}

export interface ISearchResult {
    posts: SearchItem[]
    investment_items: SearchItem[]
    marketplace_items: SearchItem[]
    outreach_hub_items: SearchItem[]
}
