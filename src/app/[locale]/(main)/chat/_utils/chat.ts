"use client"

import { type MessengerChat } from "../_types/chat"

interface OtherUser {
    profile_image?: string | null
    chat_status?: string | null
    first_name?: string | null
    last_name?: string | null
    job_title?: string | null
}

interface UserInfo {
    isDeleted: boolean
    other?: OtherUser
    displayName: string
    jobTitle: string
    initials: string
    isOnline: boolean
}

const translations = {
    en: {
        deletedUser: "Deleted user",
    },
    uz: {
        deletedUser: "O‘chirilgan foydalanuvchi",
    },
    ru: {
        deletedUser: "Удалённый пользователь",
    },
    ar: {
        deletedUser: "المستخدم المحذوف",
    },
    zh: {
        deletedUser: "已删除的用户",
    },
}

export const formatUser = (
    user: MessengerChat,
    locale: keyof typeof translations = "en",
): UserInfo => {
    const isDeleted = user?.other_user === "deleted_user"

    const other =
        !isDeleted && typeof user?.other_user === "object" ?
            (user.other_user as OtherUser)
        :   undefined

    const displayName =
        isDeleted ?
            translations[locale].deletedUser
        :   `${other?.first_name ?? ""} ${other?.last_name ?? ""}`.trim() || "-"

    const jobTitle = isDeleted ? "" : (other?.job_title ?? "")

    const initials = (() => {
        const base = (displayName || user?.name || "").trim()
        if (!base) return "?"
        return base
            .split(/\s+/)
            .map((n) => n[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase()
    })()

    const isOnline = !!other && other.chat_status === "online"

    return {
        isDeleted,
        other,
        displayName,
        jobTitle,
        initials,
        isOnline,
    }
}
