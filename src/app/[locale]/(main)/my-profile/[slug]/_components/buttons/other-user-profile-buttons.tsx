import { useSlug } from "@/app/_providers/slug-provider"
import { IconClock } from "@/assets/icons/clock"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { ProfileInfo } from "@/types/common/profile"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

interface Props {
    data: ProfileInfo | undefined
}

export default function OtherUserProfileButtons({ data }: Props) {
    const t = useTranslations()
    const router = useRouter()
    const { invalidateByPatternMatch } = useRevalidate()
    const slug = useSlug()
    const { post: postChat, isPending: isPendingChat } = useRequest()
    const { post: postConnection, isPending: isPendingConnection } =
        useRequest()
    const handleChatNow = () => {
        postChat(
            API.CHAT.MESSENGER_CHATS,
            { participant_id: slug },
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

    const handleSendConnection = () => {
        postConnection(
            API.PROFILE.NETWORK.INVITATIONS,
            { receiver: slug },
            {
                onSuccess: () => {
                    toast.success(t("connectionSent"))
                    invalidateByPatternMatch([API.PROFILE.INDEX])
                },
            },
        )
    }

    return (
        <>
            <Button
                onClick={handleChatNow}
                variant="gradient"
                size="lg"
                isLoading={isPendingChat}
            >
                <ClientTranslate translationKey="chatNow" />
            </Button>
            {data?.connection_status ?
                <Button
                    variant="gradient"
                    size="lg"
                    isLoading={isPendingConnection}
                    className={cn(
                        data?.connection_status?.status === "accepted" &&
                            "hidden",
                    )}
                >
                    {(data?.connection_status.status === "pending" ||
                        data?.connection_status.status === "ignored") && (
                        <IconClock stroke="#fff" />
                    )}
                    {(
                        data?.connection_status.status === "pending" ||
                        data?.connection_status.status === "ignored"
                    ) ?
                        t("pending")
                    : data?.connection_status.status === "accepted" ?
                        t("connect")
                    :   null}
                </Button>
            :   <Button
                    onClick={handleSendConnection}
                    variant="gradient"
                    size="lg"
                >
                    <ClientTranslate translationKey="sendConnection" />
                </Button>
            }
        </>
    )
}
