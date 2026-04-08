"use client"

import { IconPlus } from "@/assets/icons/plus"
import Breadcrumb from "@/components/common/breadcrumb"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function Navigation() {
    const t = useTranslations()
    return (
        <>
            <Breadcrumb
                className="hidden md:flex"
                crumbs={[{ label: t("news") }]}
            />
            <div className="flex md:hidden justify-between items-center">
                <h2 className="text-2xl font-medium">
                    <ClientTranslate translationKey="news" />
                </h2>
                <Button
                    className="px-6 min-w-[60px]"
                    variant={"gradient"}
                    icon={<IconPlus />}
                />
            </div>
        </>
    )
}
