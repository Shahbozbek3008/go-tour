interface CategoryType {
    id: string
    name: string
}

interface UserType {
    id: string
    user_id: string
    first_name: string
    last_name: string
    profile_image: string
    job_title: string
    connections_count: number
    email: string
    phone_number: string
    created_at: string
}

interface ImagesType {
    id: string
    image_url: string
}

interface VideosType {
    id: string
    video_url: string
}

export interface IBlog {
    category: CategoryType
    user: UserType
    name: string
    description: string
    created_at: string
    main_image_url: string
    slug: string
    is_bookmarked: boolean
    views_count: number
    is_liked: boolean
    is_disliked: boolean
    likes_count: number
    is_mine: boolean
    images?: ImagesType[]
    videos?: VideosType[]
}
