"use client"

import { IconArrowRight } from "@/assets/icons/arrow-right"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { DATE } from "@/lib/constants/date"
import { formatDate } from "@/lib/utils/format-date"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useMarketplacePersist } from "../../../post/_hooks/use-marketplace-persist"
import { MarketplaceProductForm } from "../../../post/_types"
import { useMarketplaceProductQuery } from "../_hooks/use-marketplace-product-query"

type Payload = Partial<
    Omit<MarketplaceProductForm, "category"> & {
        category: string
    }
>

export default function PreviewActions() {
    const { isPreview } = useMarketplaceProductQuery()
    if (!isPreview) return
    return <Content />
}

const Content = () => {
    const t = useTranslations()
    const router = useRouter()
    const { formData, previewData, reset } = useMarketplacePersist()
    const { post, patch, isPending } = useRequest()
    const { setNewChat } = useAiPersist()

    const onSubmit = () => {
        const payload: Payload = {
            ...Object.fromEntries(
                Object.entries(formData || {}).filter(([_, value]) => !!value),
            ),
            category: formData?.category?.id,
            delivery_start_date:
                formatDate(formData?.delivery_start_date, DATE.SERVER_FORMAT) ||
                undefined,
        }
        if (!previewData?.slug) {
            post(API.PROFILE.MARKETPLACE.ITEMS, payload, {
                onSuccess: () => {
                    router.push(getHref({ pathname: "/[locale]/marketplace" }))
                    reset()
                    toast.success(t("yourPostWillBePublished"))
                    setNewChat("marketplace_add")
                },
            })
        } else {
            patch(
                API.PROFILE.MARKETPLACE.SLUG.replace(
                    "{slug}",
                    previewData?.slug,
                ),
                payload,
                {
                    onSuccess: () => {
                        router.push(
                            getHref({
                                pathname:
                                    "/[locale]/my-profile/[slug]/marketplace/active",
                                query: { slug: "me" },
                            }),
                        )
                        reset()
                        toast.success(t("edited"))
                    },
                },
            )
        }
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <div className="flex justify-center gap-6">
            <Button
                onClick={handleCancel}
                variant={"secondary"}
                className="bg-primary-16-light"
                disabled={isPending}
            >
                <ClientTranslate translationKey="cancel" />
            </Button>
            <Button onClick={onSubmit} isLoading={isPending}>
                <ClientTranslate translationKey="submit" /> <IconArrowRight />
            </Button>
        </div>
    )
}
