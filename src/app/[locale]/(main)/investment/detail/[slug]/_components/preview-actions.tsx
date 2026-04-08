"use client"

import { IconArrowRight } from "@/assets/icons/arrow-right"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useInvestmentPersist } from "../../../post/_hooks/use-investment-persist"

export default function PreviewActions() {
    const t = useTranslations()
    const router = useRouter()
    const { formData, previewData, reset } = useInvestmentPersist()
    const { post, patch, isPending } = useRequest()
    const { setNewChat } = useAiPersist()

    const onSubmit = () => {
        const payload = Object.fromEntries(
            Object.entries(formData || {}).filter(([_, value]) => !!value),
        )
        if (!previewData?.slug) {
            post(API.PROFILE.INVESTMENT.ITEMS, payload, {
                onSuccess: () => {
                    router.push(getHref({ pathname: "/[locale]/investment" }))
                    reset()
                    toast.success(t("yourPostWillBePublished"))
                    setNewChat("investment_add")
                },
            })
        } else {
            patch(
                API.PROFILE.INVESTMENT.SLUG.replace(
                    "{slug}",
                    previewData?.slug,
                ),
                formData,
                {
                    onSuccess: () => {
                        router.push(
                            getHref({ pathname: "/[locale]/investment" }),
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
