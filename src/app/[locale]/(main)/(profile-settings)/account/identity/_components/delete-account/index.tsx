"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { useState } from "react"

const DeleteAccount = () => {
    const [confirmed, setConfirmed] = useState(false)
    const { remove } = useRequest()

    const handleDelete = () =>
        remove(API.PROFILE.DELETE_ACCOUNT, undefined, {
            onSuccess: () => {
                location.href = getHref({ pathname: "/[locale]" })
            },
        })

    return (
        <div className="profile-card">
            <h4 className="font-medium text-lg">
                <ClientTranslate translationKey="deleteAccount" />
            </h4>
            <div className="px-4 py-3 rounded-md bg-(--warning-o-main) flex flex-col gap-1">
                <h4 className="font-medium clamp-[text,sm,lg] text-(--warning-main) opacity-100">
                    <ClientTranslate translationKey="areYouSure" />
                </h4>
                <p className="clamp-[text,xs,sm] text-(--warning-main)">
                    <ClientTranslate translationKey="onceYouDelete" />
                </p>
            </div>
            <div className="flex items-center gap-3">
                <Checkbox
                    id="terms"
                    checked={confirmed}
                    onCheckedChange={(val) => setConfirmed(Boolean(val))}
                />
                <label
                    htmlFor="terms"
                    className="text-sm text-(--text-secondary) opacity-90"
                >
                    <ClientTranslate translationKey="iConfirmMyAccount" />
                </label>
            </div>
            <Button
                size="lg"
                variant="destructive"
                onClick={handleDelete}
                className={cn("max-w-45 rounded-md text-sm")}
                disabled={!confirmed}
            >
                <ClientTranslate translationKey="deactivateAccount" />
            </Button>
        </div>
    )
}

export default DeleteAccount
