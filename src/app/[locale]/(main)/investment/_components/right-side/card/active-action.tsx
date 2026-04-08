"use client"

import { IconEditGradient } from "@/assets/icons/edit-gradient"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { Link } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { InvestmentItem } from "../../../_types"
import { useInvestmentPersist } from "../../../post/_hooks/use-investment-persist"

interface Props {
    item: InvestmentItem
}

export const ActiveAction = ({ item }: Props) => {
    const t = useTranslations()
    const { setInvestmentPersistState } = useInvestmentPersist()
    const { invalidateByExactMatch } = useRevalidate()
    const { patch } = useRequest()
    const handleArchive = () => {
        patch(
            API.PROFILE.INVESTMENT.ARCHIVE_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    toast.success(t("archived"))
                    invalidateByExactMatch([
                        API.PROFILE.INVESTMENT.ITEMS,
                        API.PROFILE.INFO.ME,
                    ])
                },
            },
        )
    }

    const handleEdit = () => {
        setInvestmentPersistState({
            formData: null,
            previewData: null,
        })
    }

    return (
        <div className="w-full flex justify-between items-center pb-1">
            <Button
                onClick={handleArchive}
                className="h-10 bg-[#ff4c51]/8 hover:bg-[#ff4c51]/8 py-0 max-w-[47.5%] w-full font-medium text-sm text-[#ff4c51]"
            >
                <ClientTranslate translationKey="archive" />
            </Button>
            <Link
                href={getHref({
                    pathname: "/[locale]/investment/post/[slug]",
                    query: { slug: item.slug },
                })}
                onClick={handleEdit}
                className="border-gradient rounded-md max-w-[47.5%] w-full"
            >
                <Button
                    variant="outline"
                    className="h-10 py-0 w-full rounded-md bg-background text-gradient border-0 font-medium text-sm"
                >
                    <ClientTranslate translationKey="edit" />{" "}
                    <IconEditGradient />
                </Button>
            </Link>
        </div>
    )
}
