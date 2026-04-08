"use client"

import { IconDots } from "@/assets/icons/dots"
import { IconTrash } from "@/assets/icons/trash"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { Lock } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { IMyNetwork } from "../../_constants/types"

export function DesktopActions({
    activeTab,
    row,
}: {
    activeTab: string
    row: IMyNetwork
}) {
    const t = useTranslations()
    const { invalidateByPatternMatch, invalidateByExactMatch } = useRevalidate()
    const { remove, post } = useRequest()

    const onSuccessAction = () => {
        invalidateByPatternMatch([API.PROFILE.NETWORK.INDEX])
        invalidateByExactMatch([API.PROFILE.INFO.ME])
    }

    const handleDelete = () => {
        remove(
            API.PROFILE.NETWORK.CONNECTIONS_ID.replace("{id}", String(row.id)),
            undefined,
            {
                onSuccess: () => {
                    toast.success(t("connectionDeleted"))
                    onSuccessAction()
                },
            },
        )
    }

    const handleBlock = () => {
        post(
            API.PROFILE.NETWORK.CONNECTIONS_ID_BLOCK.replace(
                "{user_id}",
                String(row.user.user_id),
            ),
            undefined,
            {
                onSuccess: () => {
                    toast.success(t("connectionBlocked"))
                    onSuccessAction()
                },
            },
        )
    }

    const handleAccept = () => {
        post(
            API.PROFILE.NETWORK.INVITATIONS_ID_ACCEPT.replace(
                "{id}",
                String(row.id),
            ),
            undefined,
            {
                onSuccess: () => {
                    toast.success(t("connectionAccepted"))
                    onSuccessAction()
                },
            },
        )
    }

    const handleIgnore = () => {
        post(
            API.PROFILE.NETWORK.INVITATIONS_ID_IGNORE.replace(
                "{id}",
                String(row.id),
            ),
            undefined,
            {
                onSuccess: () => {
                    toast.success(t("connectionIgnored"))
                    onSuccessAction()
                },
            },
        )
    }

    const handleRestore = () => {
        post(
            API.PROFILE.NETWORK.BLOCKS_ID_RESTORE.replace(
                "{user_id}",
                String(row.blocked_user.user_id),
            ),
            undefined,
            {
                onSuccess: () => {
                    toast.success(t("restored"))
                    onSuccessAction()
                },
            },
        )
    }

    const handleDeleteBlock = () => {
        remove(
            API.PROFILE.NETWORK.BLOCKS_ID.replace("{id}", String(row.id)),
            undefined,
            {
                onSuccess: () => {
                    toast.success(t("deleted"))
                    onSuccessAction()
                },
            },
        )
    }

    if (activeTab === "invitations") {
        return (
            <div className="flex items-center gap-1.5">
                <Button
                    size="sm"
                    onClick={handleAccept}
                    className="bg-success hover:bg-success rounded-[4px] text-sm"
                >
                    <ClientTranslate translationKey="accept" />
                </Button>
                <Button
                    size="sm"
                    onClick={handleIgnore}
                    className="bg-[#ff4c5129] hover:bg-[#ff4c5129] text-[#FF4C51] text-sm rounded-[4px]"
                >
                    <ClientTranslate translationKey="ignore" />
                </Button>
            </div>
        )
    }

    if (activeTab === "blocks") {
        return (
            <div className="flex items-center gap-1.5">
                <Button
                    onClick={handleRestore}
                    size="sm"
                    className="bg-[#2962ff]/8 hover:bg-[#2962ff]/8 text-[#2962FF] rounded-[4px] text-sm"
                >
                    <ClientTranslate translationKey="restore" />
                </Button>
                <Button
                    size="sm"
                    onClick={handleDeleteBlock}
                    className="text-sm rounded-[4px] bg-[#ff4c5129] hover:bg-[#ff4c5129] text-[#FF4C51]"
                >
                    <ClientTranslate translationKey="delete" />
                </Button>
            </div>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button aria-label="More" className="p-2 rounded-md">
                    <IconDots className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="flex flex-col bg-[#EEF2FF] gap-y-0.5 p-1"
            >
                <DropdownMenuItem
                    onClick={handleBlock}
                    className="
                        rounded-[4px] py-2.5 px-4
                        bg-[#cddaff] text-[#2962FF] text-base
                    "
                >
                    <Lock className="mr-2 h-4 w-4" color="#2962FF" />
                    <ClientTranslate translationKey="block" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="
                        rounded-[4px] py-2.5 px-4
                        bg-[#FF4C51]/8 text-red-500
                        hover:bg-red-300/50 focus:bg-red-500
                        data-[highlighted]:bg-red-300/50 data-[state=open]:bg-red-300/50
                        focus:text-red-500 data-[highlighted]:text-red-500 text-base
                    "
                >
                    <IconTrash className="mr-2 h-4 w-4" />
                    <ClientTranslate translationKey="delete" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
