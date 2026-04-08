"use client"

import { IconVerified } from "@/assets/icons/verified"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Badge } from "@/components/ui/badge"
import { ProfileInfo } from "@/types/common/profile"
import { VerifiedPopover } from "../verified-popover"

interface Props {
    isMe: boolean
    profileData: ProfileInfo | undefined
    otherData: ProfileInfo | undefined
}

export default function VerifiedButton({
    isMe,
    profileData,
    otherData,
}: Props) {
    const isVerifiedMe =
        profileData?.verification?.email_verification &&
        profileData?.verification?.phone_verification &&
        profileData?.verification?.business_licence &&
        profileData?.verification?.tax_id_verification &&
        profileData?.verification?.address_verification

    const isVerifiedOther =
        otherData?.verification?.email_verification &&
        otherData?.verification?.phone_verification &&
        profileData?.verification?.business_licence &&
        profileData?.verification?.tax_id_verification &&
        profileData?.verification?.address_verification

    return (
        <>
            {isMe ?
                isVerifiedMe ?
                    <Badge className="rounded-[30px] bg-(--primary-8-lighter) text-(--card-title)">
                        <IconVerified fill="#2962FF" />
                        <ClientTranslate translationKey="verified" />
                    </Badge>
                :   <VerifiedPopover />
            : isVerifiedOther ?
                <Badge className="rounded-[30px] bg-(--primary-8-lighter) text-(--card-title)">
                    <IconVerified fill="#2962FF" />
                    <ClientTranslate translationKey="verified" />
                </Badge>
            :   <Badge className="rounded-[30px] bg-warning-main/20 text-(--card-title)">
                    <IconVerified fill="#ff9f43" />
                    <ClientTranslate translationKey="notVerified" />
                </Badge>
            }
        </>
    )
}
