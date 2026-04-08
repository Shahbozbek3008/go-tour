import { create } from "zustand"
import { LastMessage, MessengerChat } from "../_types/chat"

interface ChatListState {
    chats: MessengerChat[]
    setInitialChats: (chats: MessengerChat[]) => void
    updateChatPosition: (params: {
        chatId: string
        lastMessage: LastMessage | null
        unreadCount: number
    }) => void
    removeChat: (chatId: string) => void
    addChat: (chat: MessengerChat) => void
}

export const useChatListStore = create<ChatListState>((set, get) => ({
    chats: [],
    // setInitialChats: (chats) => {
    //     if (get().chats.length === 0) {
    //         set({ chats })
    //     }
    // },
    setInitialChats: (chats) => {
        if (chats.length > 0) {
            set({ chats: [...chats] })
        }
    },

    removeChat: (chatId: string) =>
        set((state) => ({
            chats: state.chats.filter((c) => c.id !== chatId),
        })),
    addChat: (chat) => {
        const chats = get().chats
        if (!chats.find((c) => c?.id === chat?.id)) {
            set({ chats: [chat, ...chats] })
        }
    },
    updateChatPosition: ({ chatId, lastMessage, unreadCount }) => {
        set((state) => {
            const chats = [...state.chats]
            const idx = chats.findIndex((c) => c?.id === chatId)

            if (idx !== -1) {
                const chat = { ...chats[idx] }
                chat.last_message = lastMessage
                chat.unread_count = unreadCount

                chats.splice(idx, 1)
                chats.unshift(chat)

                return { chats }
            }

            return state
        })
    },
}))
