"use client"
import { IconEditGradient } from "@/assets/icons/edit-gradient"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { OutreachhubItem } from "../../_types"

interface Props {
    item: OutreachhubItem
}

export const ActiveAction = ({ item }: Props) => {
    const router = useRouter()
    const t = useTranslations()
    const { invalidateByExactMatch } = useRevalidate()
    const { patch } = useRequest()
    const handleArchive = () => {
        patch(
            API.PROFILE.OUTREACH_HUB.ARCHIVE_SLUG.replace("{slug}", item.slug),
            {},
            {
                onSuccess: () => {
                    toast.success(t("archived"))
                    invalidateByExactMatch([
                        API.PROFILE.OUTREACH_HUB.ITEMS,
                        API.PROFILE.OUTREACH_HUB.ITEMS_ARCHIVE,
                        API.PROFILE.INFO.ME,
                    ])
                },
            },
        )
    }
    return (
        <div className="w-full flex justify-between items-center pb-1">
            <Button
                onClick={handleArchive}
                className="h-10 bg-[#ff4c51]/8 hover:bg-[#ff4c51]/8 py-0 max-w-[47.5%] w-full font-medium text-sm text-[#ff4c51]"
            >
                <ClientTranslate translationKey="archive" />
            </Button>
            <div className="border-gradient rounded-md max-w-[47.5%] w-full">
                <Button
                    onClick={() => {
                        router.push(
                            getHref({
                                pathname: "/[locale]/outreach-hub/post/[slug]",
                                query: { slug: item.slug },
                            }),
                        )
                    }}
                    variant="outline"
                    className="h-10 py-0 w-full rounded-md bg-background text-gradient border-0 font-medium text-sm"
                >
                    <ClientTranslate translationKey="edit" />{" "}
                    <IconEditGradient />
                </Button>
            </div>
        </div>
    )
}
