"use client"

import { IconLock } from "@/assets/icons/lock"
import { IconMail } from "@/assets/icons/mail"
import { IconPhone } from "@/assets/icons/phone"
import AvatarImageProfile from "@/components/common/avatar-image"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useFirstMessageSlugStore } from "@/hooks/store/use-first-message-slug-store"
import { useNoneAuthorized } from "@/hooks/use-none-authorized"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useInvestmentItemQuery } from "../../_hooks/use-investment-item-query"

const ProfileCard = () => {
    const { data, isPreview } = useInvestmentItemQuery()
    const router = useRouter()
    const { post, isPending } = useRequest()
    const { redirectToSignIn } = useNoneAuthorized()
    const { setInvestmentSlug } = useFirstMessageSlugStore()

    const handleChatNow = () => {
        redirectToSignIn(() => {
            if (isPreview) return
            if (data?.is_mine) {
                router.push(
                    getHref({
                        pathname: "/[locale]/chat",
                    }),
                )
            } else {
                setInvestmentSlug(data?.slug ?? null)
                post(
                    API.MESSENGER.CHATS.CHAT_CREATE_INVESTMENT,
                    { investment_item_slug: data?.slug },
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
        <div className="flex max-w-[31.25rem] flex-col border py-4 px-5 rounded-xl gap-5 sticky top-24">
            <Group
                onClick={() => {
                    router.push(
                        getHref({
                            pathname:
                                "/[locale]/my-profile/[slug]/profile-other",
                            query: { slug: data?.profile?.user_id ?? "" },
                        }),
                    )
                }}
                className="flex items-center gap-5"
            >
                <AvatarImageProfile
                    src={data?.profile?.profile_image}
                    wrapperClassName="w-17 h-17"
                    first_name={data?.profile?.first_name}
                    last_name={data?.profile?.last_name}
                />
                {data?.profile ?
                    <div className="flex flex-col gap-1">
                        <h5 className="text-lg">
                            {data?.profile?.first_name}{" "}
                            {data?.profile?.last_name}
                        </h5>
                        <p className="text-sm typography">
                            {data?.profile?.job_title}
                        </p>
                        {/* <p className="md:hidden text-sm typography">
                            Joined <span>April 2025</span>
                            </p> */}
                    </div>
                :   <h5 className="text-lg">
                        <ClientTranslate translationKey="anonymous" />
                    </h5>
                }
            </Group>

            <div className="flex flex-col gap-3 w-full">
                <div className="hidden md:flex flex-col gap-3 w-full">
                    <div className="flex gap-1">
                        <p className="flex items-center gap-1">
                            <IconPhone />{" "}
                            <ClientTranslate translationKey="phone" />:
                        </p>
                        {data?.profile?.phone_number ?
                            <p className="flex items-center gap-1.5 typography">
                                {data?.profile?.phone_number}
                            </p>
                        :   <p className="flex items-center gap-1.5 typography">
                                <IconLock stroke="#97939E" />{" "}
                                <ClientTranslate translationKey="availableAfter" />
                            </p>
                        }
                    </div>
                    <div className="flex items-start gap-1">
                        <p className="flex items-center gap-1">
                            <IconMail />{" "}
                            <ClientTranslate translationKey="mail" />:
                        </p>
                        {data?.profile?.email ?
                            <p className="flex items-center gap-1.5 typography break-all">
                                {data?.profile?.email}fffffffdddffdedf
                            </p>
                        :   <p className="flex items-center gap-1.5 typography">
                                <IconLock stroke="#97939E" />{" "}
                                <ClientTranslate translationKey="availableAfter" />
                            </p>
                        }
                    </div>
                </div>
            </div>

            <Button
                className="w-full"
                onClick={handleChatNow}
                isLoading={isPending}
                size="lg"
            >
                <ClientTranslate translationKey="contactInvestor" />
            </Button>
        </div>
    )
}

export default ProfileCard
