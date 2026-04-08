import { IconDots } from "@/assets/icons/dots"
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
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { IMyNetwork } from "../../_constants/types"

export function MobileActions({
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
                    className="text-sm rounded-[4px] text-destructive bg-red-200 hover:bg-red-300"
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
                    size="sm"
                    onClick={handleRestore}
                    className="bg-primary/10 hover:bg-primary/20 rounded-[4px] text-sm text-primary"
                >
                    <ClientTranslate translationKey="restore" />
                </Button>
                <Button
                    size="sm"
                    onClick={handleDeleteBlock}
                    className="text-sm rounded-[4px] text-destructive bg-red-200 hover:bg-red-300"
                >
                    <ClientTranslate translationKey="delete" />
                </Button>
            </div>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    aria-label="More"
                    className="p-2 rounded-md hover:bg-muted/60"
                >
                    <IconDots className="h-8 w-8 rotate-90" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={handleDelete}>
                    <ClientTranslate translationKey="delete" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBlock}>
                    <ClientTranslate translationKey="block" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
