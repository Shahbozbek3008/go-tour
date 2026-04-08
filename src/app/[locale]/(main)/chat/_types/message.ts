// interface Files {
//     id: string
//     file_url: string
// }

export interface MessageUser {
    id: string
    user_id: string
    first_name: string
    last_name: string | null
    profile_image: string | null
    chat_status: "online" | "offline" | string
    job_title: string | null
    about: string | null
    time_zone: string | null
    email: string
}

export interface MessengerMessage {
    id: string
    text: string
    is_read?: boolean
    is_edit?: boolean
    created_at: string
    files?: { id: string; file_url: string }[]
    marketplace_items?: []
    investment_items?: []
    outreach_hub_items?: []
    user?: MessageUser
    user_id: string
    me: boolean
}

export interface UIMessage extends MessengerMessage {
    me: boolean
    pending?: boolean
    chat_id?: string
    updated_at?: string
}

export interface Message {
    id: string
    text: string
    user_id: string
    chat_id: string
    created_at: string
    updated_at: string
    me: boolean
    pending: boolean
}

export interface MessageCreatedEvent {
    type: "message_created"
    message: Message
}
