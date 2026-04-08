"use client"

import { useSlug } from "@/app/_providers/slug-provider"
import { IconBuilding } from "@/assets/icons/building"
import { IconCheck } from "@/assets/icons/check"
import { IconMark } from "@/assets/icons/mark"
import IconProfileUser from "@/assets/icons/profile-user"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Link } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { ProfileInfo } from "@/types/common/profile"
import { useTranslations } from "next-intl"

interface Props {
    data: ProfileInfo
}

export default function Verification({ data }: Props) {
    const t = useTranslations()
    const slug = useSlug()
    const isMe = slug === "me"

    const identityVerified =
        data?.verification?.email_verification &&
        data?.verification?.phone_verification

    const businessVerified =
        data?.verification?.business_licence &&
        data?.verification?.tax_id_verification &&
        data?.verification?.address_verification

    return (
        <div className="space-y-6 p-6 rounded-md bg-white shadow-[var(--card-shadow)]">
            <div className="flex items-center justify-between">
                <span className="text-(--text-secondary) opacity-40 text-sm">
                    <ClientTranslate translationKey="trustAndVerification" />
                </span>
                {isMe && (
                    <Link
                        href={getHref({
                            pathname: "/[locale]/account/identity",
                        })}
                        className="text-primary text-sm"
                    >
                        <ClientTranslate translationKey="viewDetail" />
                    </Link>
                )}
            </div>

            <div className="grid sm:grid-cols-2 gap-18 mt-4">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-full",
                                identityVerified ?
                                    "bg-(--primary-24-main)"
                                :   "bg-warning-main/20",
                            )}
                        >
                            {identityVerified ?
                                <IconProfileUser stroke="#2962FF" />
                            :   <IconProfileUser stroke="#FF9f43" />}
                        </span>
                        <div className="flex flex-col">
                            <p className="text-(--text-900) font-medium text-sm">
                                <ClientTranslate translationKey="identityVerification" />
                            </p>
                            <span
                                className={cn(
                                    "text-sm",
                                    identityVerified ? "text-primary" : (
                                        "text-warning-main"
                                    ),
                                )}
                            >
                                {identityVerified ? "Complete" : "Not Verified"}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                        <p className="flex items-center gap-2 text-sm text-(--text-900)">
                            {data?.verification?.email_verification ?
                                <IconCheck />
                            :   <IconMark />}
                            <ClientTranslate translationKey="emailVerification" />
                        </p>
                        <p className="flex items-center gap-2 text-sm text-(--text-900)">
                            {data?.verification?.phone_verification ?
                                <IconCheck />
                            :   <IconMark />}
                            <ClientTranslate translationKey="phoneVerification" />
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                "flex items-center justify-center w-12 h-12 bg-(--success-500) rounded-full",
                                businessVerified ? "bg-(--success-500)" : (
                                    "bg-warning-main/20"
                                ),
                            )}
                        >
                            {businessVerified ?
                                <IconBuilding />
                            :   <IconBuilding stroke="#FF9f43" />}
                        </span>
                        <div className="flex flex-col">
                            <p className="text-(--text-900) font-medium text-sm">
                                <ClientTranslate translationKey="businessVerification" />
                            </p>
                            <span
                                className={cn(
                                    "text-sm",
                                    businessVerified ? "text-success" : (
                                        "text-warning-main"
                                    ),
                                )}
                            >
                                {businessVerified ?
                                    t("complete")
                                :   t("notVerified")}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                        <p className="flex items-center gap-2 text-sm text-(--text-900)">
                            {data?.verification?.business_licence ?
                                <IconCheck stroke="#28C76F" />
                            :   <IconMark />}
                            <ClientTranslate translationKey="businessLicence" />
                        </p>
                        <p className="flex items-center gap-2 text-sm text-(--text-900)">
                            {data?.verification?.tax_id_verification ?
                                <IconCheck stroke="#28C76F" />
                            :   <IconMark />}
                            <ClientTranslate translationKey="taxIdVerification" />
                        </p>
                        <p className="flex items-center gap-2 text-sm text-(--text-900)">
                            {data?.verification?.address_verification ?
                                <IconCheck stroke="#28C76F" />
                            :   <IconMark />}
                            <ClientTranslate translationKey="addressVerification" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
