import { TranslationKey } from "@/components/common/translation/types"

export const CATEGORY_OPTIONS = [
    {
        id: "you_received_a_connection_invite",
        name: "you_received_a_connection_invite",
    },
    {
        id: "you_sent_a_connection_invite",
        name: "you_received_a_connection_invite",
    },
    {
        id: "you_connection_invite_was_accepted",
        name: "you_connection_invite_was_accepted",
    },
    {
        id: "you_received_a_message_from_marketplace",
        name: "you_received_a_message_from_marketplace",
    },
    {
        id: "you_received_a_message_from_investment",
        name: "you_received_a_message_from_investment",
    },
    {
        id: "you_received_a_message_from_outreach_hub",
        name: "you_received_a_message_from_outreach_hub",
    },
    {
        id: "you_received_a_message_from_chat",
        name: "you_received_a_message_from_chat",
    },
    {
        id: "happy_birthday",
        name: "happy_birthday",
    },
]

interface Categories {
    name: TranslationKey
    id: number | undefined
    category_key: "all" | "system" | "chat" | "user" | "post"
}

export const CATEGORIES: Categories[] = [
    { name: "all", id: undefined, category_key: "all" },
    { name: "systemNotification", id: 2, category_key: "system" },
    { name: "chats", id: 3, category_key: "chat" },
    { name: "user", id: 4, category_key: "user" },
    { name: "post", id: 5, category_key: "post" },
]
