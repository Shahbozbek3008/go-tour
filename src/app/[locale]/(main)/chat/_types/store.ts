import { UIMessage } from "./message"

export interface ChatState {
    chatId: string | null
    messages: UIMessage[]
}

export interface ChatActions {
    setChatId: (chatId: string | null) => void
    setMessages: (messages: UIMessage[]) => void
    addMessage: (message: UIMessage) => void
    replaceMessage: (tempId: string, newMsg: UIMessage) => void
    updateOrAddMessage: (newMsg: UIMessage) => void
    clearMessages: () => void
}

export interface FilterState {
    folder: string | null
    search: string
}

export interface FilterActions {
    setFolder: (folder: string | null) => void
    setSearch: (value: string) => void
}

export interface ToggleState {
    userOpen: boolean
    profileOpen: boolean
    isCollapsed: boolean
}

export interface ToggleActions {
    closeAll: () => void
    setUserOpen: (open: boolean) => void
    setProfileOpen: (open: boolean) => void
    toggleIsCollapsed: () => void
}
