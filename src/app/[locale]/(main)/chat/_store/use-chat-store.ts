import { create } from "@/configs/zustand"
import type { ChatActions, ChatState } from "../_types/store"

export const useChatStore = create<ChatState & ChatActions>((set) => ({
    chatId: null,
    messages: [],
    setChatId: (chatId) => set({ chatId }),
    setMessages: (messages) => set({ messages }),
    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),
    replaceMessage: (tempId, newMsg) =>
        set((state) => ({
            messages: state.messages.map((m) => (m.id === tempId ? newMsg : m)),
        })),
    updateOrAddMessage: (newMsg) =>
        set((state) => {
            const exists = state.messages.find((m) => m.id === newMsg.id)
            if (exists) {
                return {
                    messages: state.messages.map((m) =>
                        m.id === newMsg.id ? { ...m, ...newMsg } : m,
                    ),
                }
            }
            return { messages: [...state.messages, newMsg] }
        }),
    clearMessages: () => set({ messages: [] }),
}))
