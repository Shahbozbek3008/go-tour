import { IMyNetwork } from "@/app/[locale]/(main)/my-profile/[slug]/my-network/_constants/types"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { useOutreachHubItemForm } from "../../../_hooks/use-outreach-hub-item-form"

interface Args {
    connectionsIds: string[]
}

export const useColumns = ({
    connectionsIds,
}: Args): ColumnDef<IMyNetwork>[] => {
    const t = useTranslations()
    const {
        visibilityPermissionUsersIds,
        methods: { setValue },
    } = useOutreachHubItemForm()
    return [
        {
            header: t("user"),
            cell: ({
                row: {
                    original: { user },
                },
            }) => {
                return (
                    <div className="flex items-start gap-4">
                        <AvatarImageProfile
                            src={user?.profile_image}
                            first_name={user?.first_name}
                            last_name={user?.last_name}
                            width={34}
                            height={34}
                        />
                        <div className="flex flex-col">
                            <p className="text-sm">
                                {user?.first_name}
                                {user?.last_name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            header: t("company"),
            accessorFn: (row) => row.user?.company_name,
        },
        { header: t("position"), accessorFn: (row) => row.user?.job_title },
        {
            header: t("connections"),
            accessorFn: (row) => row.user?.connections_count,
            meta: {
                tdClassName: "text-center",
            },
        },
        {
            header: () => (
                <label className="flex items-center gap-2">
                    <Checkbox
                        checked={
                            visibilityPermissionUsersIds.length ===
                                connectionsIds.length ||
                            (visibilityPermissionUsersIds.length ?
                                "indeterminate"
                            :   false)
                        }
                        onCheckedChange={(checkedState) => {
                            if (checkedState) {
                                setValue(
                                    "visibility_permission_users_ids",
                                    connectionsIds,
                                )
                            } else {
                                setValue("visibility_permission_users_ids", [])
                            }
                        }}
                    />
                    <ClientTranslate translationKey="selectAll" />
                </label>
            ),
            accessorKey: "action",
            cell: ({
                row: {
                    original: { user },
                },
            }) => {
                if (!user?.user_id) return
                return (
                    <Checkbox
                        checked={visibilityPermissionUsersIds.includes(
                            user.user_id,
                        )}
                        onCheckedChange={(checkedState) => {
                            if (checkedState) {
                                setValue("visibility_permission_users_ids", [
                                    ...visibilityPermissionUsersIds,
                                    user.user_id,
                                ])
                            } else {
                                setValue(
                                    "visibility_permission_users_ids",
                                    visibilityPermissionUsersIds.filter(
                                        (item) => item !== user.user_id,
                                    ),
                                )
                            }
                        }}
                    />
                )
            },
            meta: {
                fixed: "right",
                tdClassName: "text-center",
            },
        },
    ]
}
