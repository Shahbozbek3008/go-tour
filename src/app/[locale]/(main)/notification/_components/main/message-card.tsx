import { IconVerifiedGradient } from "@/assets/icons/verified-gradient"
import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { API } from "@/lib/constants/api-endpoints"
import { CategoryEnums } from "@/lib/constants/notifications.enum"
import { formatDistance } from "@/lib/utils/format-date"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { ActionTypes } from "../../_types/action"
import { Notification } from "../../_types/notification"

interface MessageCardProps {
    item: Notification
}

type ConnectionTypes = "accept" | "ignore"

export default function MessageCard({ item }: MessageCardProps) {
    const t = useTranslations()
    const { post, isPending } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()
    const [activeAction, setActiveAction] = useState<ConnectionTypes | null>(
        null,
    )

    const actionEndpoints: Record<ConnectionTypes, string> = {
        accept: API.PROFILE.NETWORK.INVITATIONS_ID_ACCEPT,
        ignore: API.PROFILE.NETWORK.INVITATIONS_ID_IGNORE,
    }

    const handleActions = (actionType: ConnectionTypes) => {
        const endpoint = actionEndpoints[actionType]?.replace(
            "{id}",
            String(item?.connection_invite),
        )

        if (!endpoint) return
        setActiveAction(actionType)

        post(
            endpoint,
            {},
            {
                onSuccess: () => {
                    invalidateByExactMatch([
                        API.NOTIFICATIONS.EXTRA_NOTIFICATIONS,
                    ])
                },
            },
        )
    }

    const getMessagePrefix = (actionType: ActionTypes) => {
        switch (actionType) {
            case CategoryEnums.you_sent_a_connection_invite:
                return t("youSentConnection")
            case CategoryEnums.your_connection_invite_was_accepted:
                return t("yourConnectionWasAccepted")
            case CategoryEnums.you_received_a_connection_invite:
                return t("yourReceivedAconnectionFrom")
            default:
                return ""
        }
    }

    return (
        <div className="flex justify-between gap-4 border-2 border-stroke-gray rounded-xl bg-[#FDFDFD] py-5 pl-3 clamp-[pr,3,8]">
            <hgroup className="flex items-center clamp-[gap,3,8]">
                <div className="flex items-center gap-3">
                    {!item?.is_read && (
                        <span className="hidden md:block w-2 h-2 rounded-full bg-stroke-gray" />
                    )}
                    <hgroup className="w-14 h-14 rounded-full bg-success grid place-items-center relative">
                        <ClientImg
                            src={item?.sender_user?.profile_image}
                            alt="user"
                            wrapperClassName="rounded-full"
                        />
                        <IconVerifiedGradient className="absolute top-0 -right-2" />
                    </hgroup>
                </div>
                <div>
                    <h4 className="text-xl">
                        {getMessagePrefix(item?.action_type)}{" "}
                        <span className="md:font-semibold text-gradient">
                            {item?.sender_user?.first_name}
                        </span>
                    </h4>
                    <p className="text-sm text-text-600 md:text-text-400 line-clamp-2 mt-1">
                        {item?.body}
                    </p>
                    {item?.action_type ===
                        CategoryEnums.your_connection_invite_was_accepted && (
                        <div>
                            <span className="text-background text-sm font-medium bg-success rounded-[6px] py-2.5 px-5 mt-2 inline-block">
                                <ClientTranslate translationKey="userHasAdded" />
                            </span>
                        </div>
                    )}

                    {item?.action_type ===
                        CategoryEnums.you_sent_a_connection_invite && (
                        <div>
                            <span className="text-background text-sm font-medium bg-primary rounded-[6px] py-2.5 px-5 mt-2 inline-block">
                                <ClientTranslate translationKey="waitingForUser" />
                            </span>
                        </div>
                    )}
                    {item?.action_type ===
                        CategoryEnums.you_received_a_connection_invite &&
                        item?.connection_invite_status !== "accepted" &&
                        item?.connection_invite_status !== "ignored" && (
                            <div className="flex md:hidden gap-4 mt-4">
                                <Button
                                    variant={"ghost"}
                                    className="text-primary bg-primary-8-lighter font-semibold"
                                    onClick={() => handleActions("accept")}
                                    isLoading={
                                        isPending && activeAction === "accept"
                                    }
                                >
                                    <ClientTranslate translationKey="accept" />
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    className="text-destructive bg-destructive/10 font-semibold hover:text-destructive"
                                    onClick={() => handleActions("ignore")}
                                    isLoading={
                                        isPending && activeAction === "ignore"
                                    }
                                >
                                    <ClientTranslate translationKey="decline" />
                                </Button>
                            </div>
                        )}
                </div>
            </hgroup>

            <hgroup className="flex items-end flex-col justify-between gap-4">
                <p className="text-text-300 text-sm font-medium whitespace-nowrap">
                    {formatDistance(item?.created_at)}
                </p>
                {item?.action_type ===
                    CategoryEnums.you_received_a_connection_invite &&
                    item?.connection_invite_status !== "accepted" &&
                    item?.connection_invite_status !== "ignored" && (
                        <div className="hidden md:flex gap-4">
                            <Button
                                variant={"ghost"}
                                onClick={() => handleActions("accept")}
                                isLoading={
                                    isPending && activeAction === "accept"
                                }
                                className="text-primary bg-primary-8-lighter font-semibold"
                            >
                                <ClientTranslate translationKey="accept" />
                            </Button>
                            <Button
                                variant={"ghost"}
                                onClick={() => handleActions("ignore")}
                                isLoading={
                                    isPending && activeAction === "ignore"
                                }
                                className="text-destructive bg-destructive/10 font-semibold hover:text-destructive"
                            >
                                <ClientTranslate translationKey="decline" />
                            </Button>
                        </div>
                    )}

                {/* {item?.action_type ===
                    (CategoryEnums.you_received_a_message_from_investment ||
                        CategoryEnums.you_received_a_message_from_marketplace ||
                        CategoryEnums.you_received_a_message_from_outreach_hub) && (
                    <span
                        onClick={() => {
                            router.push(
                                getHref({
                                    pathname: "/[locale]/chat",
                                }),
                            )
                        }}
                        className="w-fit truncate cursor-pointer text-primary font-semibold"
                    >
                        <ClientTranslate translationKey="viewMessage" />
                    </span>
                )} */}
            </hgroup>
        </div>
    )
}
