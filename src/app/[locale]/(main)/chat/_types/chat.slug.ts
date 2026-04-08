export interface ChatUser {
    id: string
    user_id: string
    first_name: string
    last_name: string
    profile_image: string
    chat_status: "online" | "offline" | "away" | string
    job_title: string
    about: string
    time_zone: string
    email: string
}

export interface ChatSlug {
    id: string
    name: string
    is_open: boolean
    last_message: string | null
    other_user: ChatUser
    connection_status: string | null
    created_at: string
    is_anonymous: boolean
    can_send_message: boolean
    connection_invite: string | null
    time_to_write: string | null
    action_required: boolean
}
