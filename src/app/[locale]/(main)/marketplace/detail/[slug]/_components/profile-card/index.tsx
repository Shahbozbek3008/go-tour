"use client"

import { useChatListStore } from "@/app/[locale]/(main)/chat/_store/use-chat-list-store"
import { IconLock } from "@/assets/icons/lock"
import { IconMail } from "@/assets/icons/mail"
import { IconPhone } from "@/assets/icons/phone"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useFirstMessageSlugStore } from "@/hooks/store/use-first-message-slug-store"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { MouseEventHandler } from "react"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"

const ProfileCard = () => {
    const router = useRouter()
    const { data, isPreview } = useMarketplaceProductQuery()
    const { addChat } = useChatListStore()
    const pathname =
        data?.is_mine ?
            "/[locale]/my-profile/[slug]/profile"
        :   "/[locale]/my-profile/[slug]/profile-other"
    const { post, isPending } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()
    const { setMarketplaceSlug } = useFirstMessageSlugStore()

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
                setMarketplaceSlug(data?.slug ?? null)
                post(
                    API.MESSENGER.CHATS.CHAT_CREATE_MARKETPLACE,
                    { marketplace_item_slug: data?.slug },
                    {
                        onSuccess: (res) => {
                            addChat(res)
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

    const handleClick = () => {
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

    return (
        <main className="flex flex-col border py-4 px-5 rounded-xl gap-5 bg-[#EFF6FF]">
            {/* <Badge className="hidden md:flex rounded-[30px]">
                <IconVerified /> Premium
            </Badge> */}
            <div className="flex justify-between">
                <hgroup
                    onClick={handleClick}
                    className="flex items-center gap-5 cursor-pointer"
                >
                    <AvatarImageProfile
                        src={data?.user?.profile_image}
                        first_name={data?.user?.first_name}
                        last_name={data?.user?.last_name}
                        wrapperClassName="w-17 h-17"
                        fallbackClassName="bg-white"
                    />
                    {data?.user ?
                        <div className="flex flex-col gap-1">
                            <h5 className="text-lg">
                                {data?.user?.first_name} {data?.user?.last_name}
                            </h5>
                            <p className="text-sm typography">
                                {data?.user?.job_title}
                            </p>
                            {/* <p className="md:hidden text-sm typography">
                            Joined <span>April 2025</span>
                            </p> */}
                        </div>
                    :   <h5 className="text-lg">Anonymous</h5>}
                </hgroup>
                {/* <div className="flex flex-col justify-between">
                    <p className="flex items-center gap-1">
                        <IconStar /> 7,5/10
                    </p>
                    <Badge className="md:hidden rounded-[30px]">
                        <IconVerified /> Premium
                    </Badge>
                </div> */}
            </div>
            <div className="hidden md:flex flex-col gap-3 w-full">
                <div className="flex gap-1">
                    <p className="flex items-center gap-1">
                        <IconPhone /> <ClientTranslate translationKey="phone" />
                        :
                    </p>
                    {data?.user?.phone_number ?
                        <p className="flex items-center gap-1.5 typography">
                            {data?.user?.phone_number}
                        </p>
                    :   <p className="flex items-center gap-1.5 typography">
                            <IconLock stroke="#97939E" />{" "}
                            <ClientTranslate translationKey="availableAfter" />
                        </p>
                    }
                </div>
                <div className="flex gap-1">
                    <p className="flex items-center gap-1">
                        <IconMail /> <ClientTranslate translationKey="mail" />:
                    </p>
                    {data?.user?.email ?
                        <p className="flex items-center gap-1.5 typography">
                            {data?.user?.email}
                        </p>
                    :   <p className="flex items-center gap-1.5 typography">
                            <IconLock stroke="#97939E" />{" "}
                            <ClientTranslate translationKey="availableAfter" />
                        </p>
                    }
                </div>
            </div>
            <Button
                className="w-full"
                size="lg"
                onClick={handleChatNow}
                isLoading={isPending}
            >
                <ClientTranslate translationKey="chatNow" />
            </Button>
        </main>
    )
}

export default ProfileCard
