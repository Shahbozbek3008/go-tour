"use client"

import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRequest } from "@/hooks/react-query/use-request"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import parse from "html-react-parser"
import { useOutreachhubItemQuery } from "../../../_hooks/use-outreachhub-item-query"

const Organizer = () => {
    const router = useRouter()
    const { data, isPreview } = useOutreachhubItemQuery()
    const { post, isPending } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()

    const pathname =
        data?.is_mine ?
            "/[locale]/my-profile/[slug]/profile"
        :   "/[locale]/my-profile/[slug]/profile-other"

    const handleShowProfile = () => {
        redirectToSignIn(() => {
            if (isPreview) return
            if (data?.user) {
                router.push(
                    getHref({
                        pathname: pathname,
                        query: {
                            slug: data?.is_mine ? "me" : data?.user?.user_id,
                        },
                    }),
                )
            }
        })
    }

    const handleChatAction = () => {
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
        <div className="flex flex-col gap-4">
            <Separator className="hidden md:block" />
            <div className="border p-4 md:border-0 bg-[#EFF6FF] md:bg-transparent rounded-2xl flex gap-4 flex-col">
                <h4 className="text-xl font-semibold">
                    <ClientTranslate translationKey="organizer" />
                </h4>
                <div className="flex items-center justify-between">
                    <Group
                        onClick={handleShowProfile}
                        className="flex items-center gap-2"
                    >
                        <AvatarImageProfile
                            src={data?.user?.profile_image}
                            first_name={data?.user?.first_name}
                            last_name={data?.user?.last_name}
                            wrapperClassName="w-12 h-12"
                            fallbackClassName="bg-background md:bg-muted"
                            width={40}
                            height={40}
                        />
                        {data?.user ?
                            <div className="flex flex-col">
                                <h5 className="text-base text-(--text-secondary) opacity-90">
                                    {data.user?.first_name}{" "}
                                    {data.user?.last_name}
                                </h5>
                                <p className="text-xs text-(--text-secondary) opacity-70">
                                    {data.user?.connections_count}{" "}
                                    <ClientTranslate translationKey="connections" />
                                </p>
                            </div>
                        :   <h5 className="text-lg">
                                <ClientTranslate translationKey="anonymous" />
                            </h5>
                        }
                    </Group>

                    <Button
                        size="lg"
                        variant="outline"
                        onClick={handleShowProfile}
                        className="hidden md:block text-primary bg-(--primary-8-lighter) border border-(--primary)"
                    >
                        <ClientTranslate translationKey="showProfile" />
                    </Button>
                </div>
                <Button
                    onClick={handleChatAction}
                    isLoading={isPending}
                    className="md:hidden"
                >
                    <ClientTranslate translationKey="chatNow" />
                </Button>
            </div>
            <Separator className="hidden md:block" />
            <div className="clamp-[text,base,xl] text-text-600 md:text-(--text-700) leading-7 font-regular clamp-[mt,2,6]">
                {parse(data?.description || "")}
            </div>
            <div className="flex flex-col clamp-[text,base,xl] text-text-600 md:text-(--text-700) leading-7 font-regular clamp-[mt,2,6]">
                <ClientTranslate
                    translationKey="cause"
                    className="font-medium text-lg text-text-900"
                />
                {parse(data?.cause || "")}
            </div>
            <div className="hidden md:flex flex-col gap-5 mt-7">
                <h3 className="text-lg font-medium">
                    <ClientTranslate translationKey="tags" />:
                </h3>
                <div className="flex flex-wrap items-center gap-2 w-full">
                    {data?.tags?.map((tag) => {
                        return (
                            <Badge
                                key={tag.id}
                                className="rounded-[30px] px-4 text-base"
                                variant="gray"
                            >
                                #{tag.name}
                            </Badge>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Organizer
