import { InvestmentItemForm } from "@/app/[locale]/(main)/investment/post/_types"
import { MarketplaceProductForm } from "@/app/[locale]/(main)/marketplace/post/_types"
import { OutreachHubItemForm } from "@/app/[locale]/(main)/outreach-hub/post/_types"
import { LS } from "@/lib/constants/localstorage"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AiGetUserDatasResponse, AiHomeResponse } from "../_types"

export interface AiPersistStateMessage {
    userMessage?: string
    aiMessage?: string
    created_at: string
    id: string
}

// ---------- BASE CHAT ----------
interface BaseChatState {
    threadId: string | null
    messages: AiPersistStateMessage[]
}

// ---------- UNIQUE CHATS ----------
interface MarketplaceAddState extends BaseChatState {
    fields: Partial<MarketplaceProductForm>
}
interface InvestmentAddState extends BaseChatState {
    fields: Partial<InvestmentItemForm>
}
interface OutreachHubAddState extends BaseChatState {
    fields: Partial<OutreachHubItemForm>
}

interface BaseFilterState extends BaseChatState {
    requestTypes: string[]
    tags: string[]
    countries: string[]
    created_at?: string[]
}
type MarketplaceFilterState = BaseFilterState & {
    categories: string[]
}
type InvestmentFilterState = BaseFilterState
type OutreachHubFilterState = BaseFilterState
type RegisterState = BaseChatState & {
    fields: Partial<Omit<AiGetUserDatasResponse["fields"], "message_for_user">>
}
type HomeState = BaseChatState & { redirectTo?: AiHomeResponse["redirect_to"] }

// ---------- MAPPING ----------
type ChatStateMap = {
    marketplace_add: MarketplaceAddState
    investment_add: InvestmentAddState
    outreach_hub_add: OutreachHubAddState
    marketplace_filter: MarketplaceFilterState
    investment_filter: InvestmentFilterState
    outreach_hub_filter: OutreachHubFilterState
    register: RegisterState
    home: HomeState
}

export type AiChatType = keyof ChatStateMap

export interface AiPersistState {
    chatType: AiChatType
    chats: { [K in AiChatType]: ChatStateMap[K] }
}

interface Actions {
    setAiState: (vals: Partial<AiPersistState>) => void
    resetAiState: () => void
    addMessage: (msg: AiPersistStateMessage) => void
    updateChat: <T extends keyof Pick<ChatStateMap, AiChatType>>(
        chatValues: Partial<ChatStateMap[T]>,
        chatType?: AiChatType,
    ) => void
    resetChat: (chatType: AiChatType) => void
    setNewChat: (chatType: AiChatType) => void
}

// ---------- HELPERS ----------
const makeDefaultChat = <T extends BaseChatState>(
    extra?: Omit<T, keyof BaseChatState>,
): T =>
    // @ts-expect-error asdf
    ({
        threadId: null,
        messages: [],
        ...(extra || {}),
    }) as T

const defaultState: AiPersistState = {
    chatType: "register",
    chats: {
        marketplace_add: makeDefaultChat<MarketplaceAddState>({ fields: {} }),
        investment_add: makeDefaultChat<InvestmentAddState>({ fields: {} }),
        outreach_hub_add: makeDefaultChat<OutreachHubAddState>({ fields: {} }),
        marketplace_filter: makeDefaultChat<MarketplaceFilterState>({
            requestTypes: [],
            tags: [],
            countries: [],
            categories: [],
        }),
        investment_filter: makeDefaultChat<InvestmentFilterState>({
            requestTypes: [],
            tags: [],
            countries: [],
        }),
        outreach_hub_filter: makeDefaultChat<OutreachHubFilterState>({
            requestTypes: [],
            tags: [],
            countries: [],
            created_at: [],
        }),
        register: makeDefaultChat<RegisterState>({
            fields: {},
        }),
        home: makeDefaultChat<HomeState>(),
    },
}

/* ---------- STORE ---------- */
export const useAiPersist = create<AiPersistState & Actions>()(
    persist(
        (set) => ({
            ...defaultState,
            setAiState: (vals) => {
                set((state) => ({
                    ...state,
                    ...vals,
                }))
            },
            resetAiState: () => set(defaultState),
            addMessage: (msg) => {
                set((state) => {
                    const { chatType, chats } = state
                    return {
                        chatType,
                        chats: {
                            ...chats,
                            [chatType]: {
                                ...chats[chatType],
                                messages: [...chats[chatType].messages, msg],
                            },
                        },
                    }
                })
            },
            updateChat: (chatValues, typeOfChat) => {
                set((state) => {
                    const { chatType, chats } = state
                    const type = typeOfChat || chatType
                    return {
                        chatType: type,
                        chats: {
                            ...chats,
                            [type]: {
                                ...chats[type],
                                ...chatValues,
                            },
                        },
                    }
                })
            },
            resetChat: (chatType) => {
                set((state) => ({
                    ...state,
                    chats: {
                        ...state.chats,
                        [chatType]: makeDefaultChat(),
                    },
                }))
            },
            setNewChat: (chatType) => {
                set((state) => {
                    const { chats } = state
                    return {
                        ...state,
                        chats: {
                            ...chats,
                            [chatType]: {
                                ...chats[chatType],
                                threadId: null,
                                messages: [],
                            },
                        },
                    }
                })
            },
        }),
        {
            name: LS.AI_CHAT,
            version: 7,
            migrate: (persistedState, version) => {
                if (version < 7) {
                    return defaultState
                }
                return persistedState
            },
        },
    ),
)
