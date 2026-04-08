"use client"

import IconChat from "@/assets/icons/chat-icon"
import { IconShare } from "@/assets/icons/share"
import { IconUser } from "@/assets/icons/user"
import MoneyText from "@/components/common/money-text"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { formatCount, getCurrencySign } from "@/lib/utils/money"
import { cn } from "@/lib/utils/shadcn"
import { MouseEventHandler } from "react"
import { useOutreachhubItemQuery } from "../../_hooks/use-outreachhub-item-query"
import DeadlineTimer from "./deadline-timer"

const DonutCard = () => {
    const router = useRouter()
    const { data, isPreview } = useOutreachhubItemQuery()
    const { symbol } = getCurrencySign(data?.converted_currency)
    const { post, isPending } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()

    const handleChatNow: MouseEventHandler<HTMLButtonElement> = () => {
        redirectToSignIn(() => {
            if (isPreview) return
            if (data?.is_mine) {
                router.push(
                    getHref({
                        pathname: "/[locale]/chat",
                    }),
                )
            } else {
                post(
                    API.MESSENGER.CHATS.CHAT_CREATE_OUTREACH_HUB,
                    { outreach_hub_item_slug: data?.slug },
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
        <div className="max-w-[45rem] mx-auto w-full rounded-2xl border p-4 flex flex-col gap-6 bg-white">
            <div className="order-2 md:order-1 w-full bg-[#e6e6e6] clamp-[h,2,4] rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full",
                        data?.status === "collected" ?
                            "bg-(--success-main)"
                        :   "bg-(--warning-main)",
                    )}
                    style={{
                        width: `${data?.collected_amount_percentage || 0}%`,
                    }}
                />
            </div>
            <div className="order-3 md:order-2 flex items-start justify-between flex-wrap">
                <div
                    className={cn(
                        "clamp-[text,2xl,5xl] font-bold",
                        Number(data?.collected_amount) === 0 ? "text-[#a2a2a2]"
                        : data?.status === "collected" ? "text-(--success-main)"
                        : "text-(--warning-main)",
                    )}
                >
                    {symbol ? symbol : "$"}
                    <MoneyText value={data?.collected_amount} isShowZero />
                </div>
                <div
                    className={cn(
                        "text-lg sm:text-3xl font-semibold text-(--warning-main)",
                        Number(data?.collected_amount_percentage) === 0 ?
                            "text-[#a2a2a2]"
                        : data?.status === "collected" ? "text-(--success-main)"
                        : "text-(--warning-main)",
                    )}
                >
                    {data?.collected_amount_percentage || 0}%
                </div>
            </div>
            <div className="order-4 md:order-3 font-medium text-lg text-text700 md:text-(--text-300) -mt-2 sm:-mt-3">
                <ClientTranslate translationKey="goal" />:{" "}
                {symbol ? symbol : "$"}
                <MoneyText value={data?.plan_price_amount} isShowZero />
                <hr className="mt-6" />
            </div>
            <div className="order-5 md:order-4 flex flex-col">
                <div className="flex items-center gap-1 text-blue-600  sm:text-lg font-semibold">
                    <IconUser />
                    <span className="text-4xl">
                        {formatCount(data?.donations_count)}
                    </span>
                </div>
                <span className="font-medium text-base text-text700 md:text-xs md:text-gray-400">
                    <ClientTranslate translationKey="donations" />
                </span>
                <hr className="hidden md:block mt-6" />
            </div>

            <div className="order-5 md:order-4 flex flex-col gap-y-2">
                <ClientTranslate
                    translationKey="typeOfSupport"
                    className="text-text-900 font-medium text-lg"
                />
                <span className="font-medium text-sm text-gradient">
                    {data?.type_off_support}
                </span>
                <hr className="hidden md:block mt-6" />
            </div>
            <div className="order-5 md:order-4 flex flex-col gap-y-2">
                <ClientTranslate
                    translationKey="location"
                    className="text-text-900 font-medium text-lg"
                />
                <span className="font-medium text-sm text-gradient">
                    {data?.location}
                </span>
                <hr className="hidden md:block mt-6" />
            </div>
            <DeadlineTimer
                className="order-1 md:order-5"
                deadline={data?.deadline_date || ""}
            />

            <div className="hidden md:flex order-6 md:order-6 flex-col gap-2">
                <Button onClick={handleChatNow} isLoading={isPending}>
                    <IconChat /> <ClientTranslate translationKey="chatNow" />
                </Button>
                <Button
                    variant={"ghost"}
                    onClick={() => {
                        if (isPreview) return
                        navigator.share({
                            url: location.href,
                            title: "INexLynk",
                            text: data?.slug,
                        })
                    }}
                    className="bg-(--primary-100) hover:bg-(--primary-100) text-primary"
                >
                    <IconShare className="w-6 h-6" stroke="var(--primary)" />{" "}
                    <ClientTranslate translationKey="share" />
                </Button>
            </div>
        </div>
    )
}

export default DonutCard
