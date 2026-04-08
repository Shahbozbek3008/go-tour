"use client"

import AvatarImageProfile from "@/components/common/avatar-image"
import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import { IMyNetwork } from "../../_constants/types"
import { DesktopActions } from "../actions/desktop-actions"

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

export default function DesktopRow({
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
    const company = person.company_name || "—"
    const job = person.job_title || "—"
    const connCount = person.connections_count || "—"
    const city = person.city_name || "—"
    const status_display = person.status_display || "—"

    return (
        <TableRow>
            <TableCell className="font-medium">
                <div className="flex items-start gap-4">
                    <AvatarImageProfile
                        src={avatarSrc}
                        first_name={person?.first_name}
                        last_name={person?.last_name}
                    />
                    <div className="flex flex-col">
                        <p className="text-sm">{fullName}</p>
                        <p className="text-xs text-gray-500">{email}</p>
                    </div>
                </div>
            </TableCell>

            <TableCell>{company}</TableCell>
            <TableCell>{job}</TableCell>

            <TableCell>
                <Badge className="bg-(--primary-24-main) text-primary">
                    {status_display}
                </Badge>
            </TableCell>

            <TableCell>{connCount}</TableCell>
            <TableCell>{city}</TableCell>

            <TableCell className="flex items-center justify-center">
                <DesktopActions activeTab={activeTab} row={row} />
            </TableCell>
        </TableRow>
    )
}
