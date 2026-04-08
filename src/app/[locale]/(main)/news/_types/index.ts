export interface Category {
    id: string
    name: string
}

export interface UserProfile {
    id: string // profile jadvali id
    user_id: string // auth foydalanuvchi id
    first_name: string
    last_name: string
    profile_image: string // URL
    job_title: string
    email: string
    phone_number: string
    created_at: string // ISO 8601
}

export interface MediaImage {
    id: string
    image_url: string
}

export interface MediaVideo {
    id: string
    video_url: string
}

export interface NewsItem {
    category: Category
    user: UserProfile
    name: string
    description: string
    created_at: string // ISO 8601
    main_image_url: string // URL
    slug: string
    is_bookmarked: boolean
    views_count: number
    is_liked: boolean
    is_disliked: boolean
    images: MediaImage[]
    videos: MediaVideo[]
}

export interface NewsItemDetail extends NewsItem {
    likes_count: number
}

export interface NewsGlobal {
    source: {
        id: null
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    url_to_image: string
    published_at: string
    content: string
    category: string
}
