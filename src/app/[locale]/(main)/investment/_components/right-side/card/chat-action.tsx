"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useFirstMessageSlugStore } from "@/hooks/store/use-first-message-slug-store"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { MouseEventHandler } from "react"
import { InvestmentItem } from "../../../_types"

interface Props {
    item: InvestmentItem
}

export default function ChatAction({ item }: Props) {
    const { post, isPending } = useRequest()
    const router = useRouter()
    const { redirectToSignIn } = useNoneAuthorized()
    const { setInvestmentSlug } = useFirstMessageSlugStore()
    const handleChatNow: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        redirectToSignIn(() => {
            if (item.is_mine) {
                router.push(
                    getHref({
                        pathname: "/[locale]/chat",
                    }),
                )
            } else {
                setInvestmentSlug(item.slug)
                post(
                    API.MESSENGER.CHATS.CHAT_CREATE_INVESTMENT,
                    { investment_item_slug: item?.slug },
                    {
                        onSuccess: (res) => {
                            router.push(
                                getHref({
                                    pathname: "/[locale]/chat",
                                    query: { chat_id: res?.id },
                                }),
                            )
                        },
                    },
                )
            }
        })
    }

    return (
        <div className="w-full">
            <Button
                className="text-sm w-full rounded-2xl"
                size="lg"
                onClick={handleChatNow}
                isLoading={isPending}
            >
                <ClientTranslate translationKey="makeOffer" />
            </Button>
        </div>
    )
}
