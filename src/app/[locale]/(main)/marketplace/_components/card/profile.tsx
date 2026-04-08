"use client"

import { IconClock } from "@/assets/icons/clock"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { useLanguage } from "@/hooks/use-language"
import { formatRelativeDate } from "@/lib/utils/format-relative-date"
import { cn } from "@/lib/utils/shadcn"
import { MarketplaceProduct } from "../../_types"

interface Props {
    item: MarketplaceProduct
}

export default function Profile({ item }: Props) {
    const { locale, isArabic } = useLanguage()
    return (
        <Group className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <AvatarImageProfile
                    src={item.user?.profile_image}
                    wrapperClassName="w-5 h-5"
                    first_name={item.user?.first_name}
                    last_name={item.user?.last_name}
                    fallbackClassName="text-xs"
                />
                {!item.user ?
                    <p className="text-xs">
                        <ClientTranslate translationKey="anonymous" />
                    </p>
                :   <p className="text-xs">
                        {item.user?.first_name}{" "}
                        {item.user?.last_name?.slice(0, 1)}
                        {!isArabic ? "." : ""}
                    </p>
                }
            </div>

            <div
                className={cn(
                    "flex items-center gap-1.5 text-xs text-card-info",
                    isArabic ? "flex flex-row-reverse" : "",
                )}
            >
                <IconClock />
                <p>{formatRelativeDate(item.created_at, locale)}</p>
            </div>
        </Group>
    )
}
