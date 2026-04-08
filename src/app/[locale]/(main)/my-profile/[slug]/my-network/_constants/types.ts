interface Profile {
    user_id: string
    first_name: string | null
    last_name: string | null
    email: string
    job_title: string | null
    business_type: string | null
    about: string | null
    company_name: string | null
    profile_image: string | null
    connections_count: number
}

export interface IMyNetwork {
    id: string
    sender: Profile
    user: Profile
    blocked_user: Profile
    connected_at: string
    status_display: string
}
