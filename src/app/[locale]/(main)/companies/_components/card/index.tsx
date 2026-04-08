"use client"

import { IconLocation } from "@/assets/icons/location"
import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { CompanyItem } from "../../_types"

interface Props {
    className?: string
    item: CompanyItem
}

const CompanyCard = ({ className, item }: Props) => {
    const t = useTranslations()
    return (
        <Card
            className={cn(
                "group relative cursor-pointer rounded-3xl border border-card-border bg-background p-2 pb-4 transition hover:shadow-md flex flex-col gap-2.5 justify-between",
                className,
            )}
        >
            {/* Image */}
            <div className="relative">
                <ClientImg
                    fill
                    priority
                    src={item.company_image}
                    alt="image"
                    wrapperClassName="aspect-video mb-2.5"
                    className="rounded-2xl"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
                {/* Business type */}
                <Group className="flex flex-col gap-2">
                    <Badge className="bg-[#F1FFFE] text-black rounded-lg px-3 py-1 w-auto self-start uppercase">
                        {item.business_type ?
                            item.business_type
                        :   t("businessType")}
                    </Badge>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-(--card-title) line-clamp-2">
                            {item.company_name ?
                                item.company_name
                            :   t("companyName") + ":"}
                        </h3>
                    </div>
                </Group>

                {/* Footer */}
                <div className="mt-2 flex flex-col gap-3">
                    <div className="text-xs leading-4 text-(--card-info) line-clamp-3 break-words">
                        {item.company_description ?
                            item.company_description
                        :   t("companyDesc") + ":"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-900">
                        <IconLocation className="text-text-900 shrink-0" />
                        <p>
                            {item.business_address ?
                                item.business_address
                            :   t("companyLocation") + ":"}
                        </p>
                    </div>

                    <Button size="lg">
                        <ClientTranslate translationKey="chatNow" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default CompanyCard
