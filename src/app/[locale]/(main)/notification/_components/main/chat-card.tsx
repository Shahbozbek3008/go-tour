import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import { useRouter } from "@/i18n/navigation"
import { CategoryEnums } from "@/lib/constants/notifications.enum"
import { formatDistance } from "@/lib/utils/format-date"
import { getHref } from "@/lib/utils/get-href"
import parse from "html-react-parser"
import { useTranslations } from "next-intl"
import { ActionTypes } from "../../_types/action"
import { Notification } from "../../_types/notification"

interface ChatCardProps {
    item: Notification
}

export default function ChatCard({ item }: ChatCardProps) {
    const router = useRouter()
    const t = useTranslations()
    const getChatPrefix = (actionType: ActionTypes) => {
        switch (actionType) {
            case CategoryEnums.you_received_a_message_from_investment:
                return t("investment")
            case CategoryEnums.you_received_a_message_from_marketplace:
                return t("marketplace")
            case CategoryEnums.you_received_a_message_from_outreach_hub:
                return t("outreachhub")
            default:
                return ""
        }
    }

    const handleChatClick = (chatId: string) => {
        router.push(
            getHref({
                pathname: "/[locale]/chat",
                query: { chat_id: chatId },
            }),
        )
    }

    const ViewMessageButton = ({ chatId }: { chatId: string }) => (
        <span
            onClick={() => handleChatClick(chatId)}
            className="w-fit truncate cursor-pointer text-primary font-semibold"
        >
            <ClientTranslate translationKey="viewMessage" />
        </span>
    )

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
                    </hgroup>
                </div>
                <div>
                    <h4 className="text-xl">
                        <span className="text-gradient md:font-semibold">
                            {item?.sender_user?.first_name}
                        </span>{" "}
                        <span>
                            <ClientTranslate translationKey="sendYouMessageFrom" />
                        </span>{" "}
                        <span className="text-primary md:font-semibold">
                            {getChatPrefix(item?.action_type)}
                        </span>
                    </h4>
                    <div className="text-sm text-text-600 md:text-text-400 line-clamp-2 mt-1">
                        {parse(item?.body)}
                    </div>
                </div>
            </hgroup>

            <hgroup className="flex items-end flex-col justify-between gap-4">
                <p className="text-text-300 text-sm font-medium whitespace-nowrap">
                    {formatDistance(item?.created_at)}
                </p>

                {item.chat_message?.chat_id && (
                    <ViewMessageButton chatId={item.chat_message.chat_id} />
                )}
            </hgroup>
        </div>
    )
}
