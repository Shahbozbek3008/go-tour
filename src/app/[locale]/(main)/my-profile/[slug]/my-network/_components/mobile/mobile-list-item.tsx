"use client"

import AvatarImageProfile from "@/components/common/avatar-image"
import { IMyNetwork } from "../../_constants/types"
import { MobileActions } from "../actions/mobile-actions"

type Person = {
    first_name?: string | null
    last_name?: string | null
    email?: string | null
    profile_image?: string | null
    company_name?: string | null
    job_title?: string | null
    connections_count?: number | null
    city_name?: string | null
    status_display?: string
}

function pickPerson(row: IMyNetwork, activeTab: string): Person {
    switch (activeTab) {
        case "connections":
            return {
                first_name: row.user?.first_name,
                last_name: row.user?.last_name,
                email: row.user?.email,
                profile_image: row.user?.profile_image,
                company_name: row.user?.company_name,
                job_title: row.user?.job_title,
                connections_count: row.user?.connections_count,
            }
        case "invitations":
            return {
                first_name: row.sender?.first_name,
                last_name: row.sender?.last_name,
                email: row.sender?.email,
                profile_image: row.sender?.profile_image,
                company_name: row.sender?.company_name,
                job_title: row.sender?.job_title,
                connections_count: row.sender?.connections_count,
                status_display: row.status_display,
            }
        case "blocks":
            return {
                first_name: row.blocked_user?.first_name,
                last_name: row.blocked_user?.last_name,
                email: row.blocked_user?.email,
                profile_image: row.blocked_user?.profile_image,
                company_name: row.blocked_user?.company_name,
                job_title: row.blocked_user?.job_title,
                connections_count: row.blocked_user?.connections_count,
            }
        default:
            return {}
    }
}

export default function MobileListItem({
    row,
    activeTab,
}: {
    row: IMyNetwork
    activeTab: string
}) {
    const person = pickPerson(row, activeTab)
    const fullName =
        [person?.first_name, person?.last_name].filter(Boolean).join(" ") ||
        "Unknown"
    const avatarSrc = person.profile_image
    const email = person.email || "—"
    return (
        <li className="px-3 py-2">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <AvatarImageProfile
                        src={avatarSrc}
                        wrapperClassName="w-10 h-10"
                        first_name={person?.first_name}
                        last_name={person?.last_name}
                    />
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                            {fullName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {email}
                        </p>
                    </div>
                </div>
                <MobileActions activeTab={activeTab} row={row} />
            </div>
        </li>
    )
}
