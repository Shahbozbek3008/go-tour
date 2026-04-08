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
import { IBlog } from "../types"

interface Props {
    item: IBlog
}

export const ActiveAction = ({ item }: Props) => {
    const t = useTranslations()
    // const { setMarketplacePersistState } = useMarketplacePersist()
    const { invalidateByExactMatch } = useRevalidate()
    const { patch } = useRequest()
    const handleArchive = () => {
        patch(
            API.PROFILE.BLOG.ARCHIVE_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    toast.success(t("archived"))
                    invalidateByExactMatch([
                        API.PROFILE.INFO.ME,
                        API.PROFILE.BLOG.INDEX,
                        API.PROFILE.BLOG.ARCHIVE,
                    ])
                },
            },
        )
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-2 gap-3.5 pb-1"
        >
            <Button
                onClick={handleArchive}
                className="h-10 bg-[#ff4c51]/8 hover:bg-[#ff4c51]/8 py-0 w-full font-medium text-sm text-[#ff4c51]"
            >
                <ClientTranslate translationKey="archive" />
            </Button>
            <Link
                href={getHref({
                    pathname: "/[locale]/news/post/[slug]",
                    query: { slug: item.slug },
                })}
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
