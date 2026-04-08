import { ActionTypes } from "./action"

interface SenderUser {
    first_name: string | null
    last_name: string | null
    profile_image: string | null
}

interface ChatMessage {
    id: string
    chat_id: string
    text: string
    is_read: boolean
}

export interface Notification {
    id: string
    title: string
    body: string
    created_at: string
    is_read: boolean
    action_type: ActionTypes
    source_type: string
    action_type_display: ActionTypes
    source_type_display: "system" | "chat" | "user" | "post"
    chat_message: null | ChatMessage
    connection_invite: string | null
    marketplace_item: string | null
    investment_item: string | null
    outreach_hub_item: string | null
    post: string | null
    sender_user: SenderUser | null
    connection_invite_status: string
}
