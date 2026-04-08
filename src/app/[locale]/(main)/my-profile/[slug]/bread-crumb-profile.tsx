"use client"
import Breadcrumb from "@/components/common/breadcrumb"
import { ProfileInfo } from "@/types/common/profile"
import { useTranslations } from "next-intl"

interface Props {
    isMe: boolean
    res?: ProfileInfo | null
}

export default function BreadCrumbProfile({ isMe, res }: Props) {
    const t = useTranslations()
    return (
        <Breadcrumb
            crumbs={[{ label: isMe ? t("myProfile") : res?.first_name }]}
            className="hidden md:flex"
        />
    )
}
