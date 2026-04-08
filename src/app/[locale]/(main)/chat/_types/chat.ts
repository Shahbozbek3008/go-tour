export interface OtherUser {
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

export interface LastMessage {
    id: string
    created_at: string
    text: string
    user_id: string
}

export interface MessengerChat {
    id: string
    name: string
    is_open: string
    last_message: LastMessage | null
    other_user: null | OtherUser | "deleted_user"
    connection_status: string
    created_at: string
    is_anonymous: string
    unread_count: number
}
