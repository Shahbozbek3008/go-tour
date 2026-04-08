"use client"

import { IconEditGradient } from "@/assets/icons/edit-gradient"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { toast } from "sonner"
import { MarketplaceProduct } from "../../_types"
import { useMarketplacePersist } from "../../post/_hooks/use-marketplace-persist"

interface Props {
    item: MarketplaceProduct
}

export const ActiveAction = ({ item }: Props) => {
    const t = useTranslations()
    const { setMarketplacePersistState } = useMarketplacePersist()
    const { invalidateByExactMatch } = useRevalidate()
    const { patch } = useRequest()
    const handleArchive = () => {
        patch(
            API.PROFILE.MARKETPLACE.ARCHIVE_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    toast.success(t("archived"))
                    invalidateByExactMatch([
                        API.PROFILE.MARKETPLACE.ARCHIVE,
                        API.PROFILE.MARKETPLACE.ITEMS,
                        API.PROFILE.INFO.ME,
                    ])
                },
            },
        )
    }

    const handleEdit = () => {
        setMarketplacePersistState({
            formData: null,
            previewData: null,
        })
    }

    return (
        <div className="grid grid-cols-2 gap-3.5 pb-1">
            <Button
                onClick={handleArchive}
                className="h-10 bg-[#ff4c51]/8 hover:bg-[#ff4c51]/8 py-0 w-full font-medium text-sm text-[#ff4c51]"
            >
                <ClientTranslate translationKey="archive" />
            </Button>
            <Link
                href={getHref({
                    pathname: "/[locale]/marketplace/post/[slug]",
                    query: { slug: item.slug },
                })}
                onClick={handleEdit}
                className="border-gradient rounded-md"
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
