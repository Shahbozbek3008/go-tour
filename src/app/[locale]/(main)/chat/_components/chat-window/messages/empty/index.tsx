"use client"

import { IconVerified } from "@/assets/icons/verified"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"
import { type Partner } from "../../../../_types/user"

interface EmptyMessagesProps {
    partnerProfile?: Partner
}

const EmptyMessages = ({ partnerProfile }: EmptyMessagesProps) => {
    const t = useTranslations()
    if (!partnerProfile) return null

    const {
        first_name = "",
        last_name = "",
        profile_image,
        job_title,
    } = partnerProfile

    const fullName =
        [first_name, last_name].filter(Boolean).join(" ") || t("unknown")

    return (
        <div className="flex flex-col items-center gap-6 mt-6">
            <AvatarImageProfile
                src={profile_image || ""}
                wrapperClassName="w-36 h-36"
                className="object-cover"
                fallbackClassName="text-6xl"
                first_name={first_name}
                last_name={last_name}
            />

            <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-semibold">{fullName}</h1>
                {job_title && (
                    <p className="text-base text-(--text-secondary-70)">
                        {job_title}
                    </p>
                )}
                <Badge
                    variant="secondary"
                    className="h-6 px-2 rounded-2xl flex items-center gap-1"
                >
                    <IconVerified fill="#2962FF" />
                    <span>
                        <ClientTranslate translationKey="premium" />
                    </span>
                </Badge>
            </div>
        </div>
    )
}

export default EmptyMessages
