"use client"

import { useInvestmentPersist } from "@/app/[locale]/(main)/investment/post/_hooks/use-investment-persist"
import { useMarketplacePersist } from "@/app/[locale]/(main)/marketplace/post/_hooks/use-marketplace-persist"
import { useOutreachHubPersist } from "@/app/[locale]/(main)/outreach-hub/post/_hooks/use-outreach-hub-persist"
import { IconArrowUp } from "@/assets/icons/arrow-up"
import ControlledTextarea from "@/components/form/controlled-textarea"
import { TextShimmer } from "@/components/motion-primitives/text-shimmer"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { MUTATION_KEYS } from "@/lib/constants/mutation-keys"
import { getArray } from "@/lib/utils/get-array"
import { getHref } from "@/lib/utils/get-href"
import { getStringArray } from "@/lib/utils/get-string-array"
import { useTranslations } from "next-intl"
import { RouteLiteral } from "nextjs-routes"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAiModal } from "../../_hooks/use-ai-modal"
import { useAiPersist } from "../../_hooks/use-ai-persist"
import {
    AiGetUserDatasResponse,
    AiHomeResponse,
    AiInvestmentAddResponse,
    AiInvestmentFilterResponse,
    AiMarketplaceAddResponse,
    AiMarketplaceFilterResponse,
    AiOutreachHubAddResponse,
    AiOutreachHubFilterResponse,
} from "../../_types"
import { getMessage } from "../../_utils/get-message"

interface Form {
    user_message: string
}

const Toolbar = () => {
    const { reset: resetMarketPlacePersist } = useMarketplacePersist()
    const { reset: resetInvestmentPersist } = useInvestmentPersist()
    const { reset: resetOutreachHubPersist } = useOutreachHubPersist()
    const t = useTranslations()
    const { refetch: refetchProfile } = useProfileQuery()
    const { closeModal } = useAiModal()
    const router = useRouter()
    const { chatType, addMessage, chats, updateChat, setNewChat } =
        useAiPersist()

    const { postAsync, isPending } = useRequest({
        options: {
            mutationKey: [MUTATION_KEYS.AI_CHAT],
        },
    })
    const { patch } = useRequest()
    const methods = useForm<Form>({
        defaultValues: {
            user_message: "",
        },
        disabled: isPending,
    })

    const onSubmit = methods.handleSubmit(async (vals) => {
        methods.reset()
        addMessage(getMessage({ userMessage: vals.user_message }))

        switch (chatType) {
            case "marketplace_add":
                await postAsync(
                    API.MARKETPLACE.AI_CREATE_POST,
                    {
                        ...vals,
                        thread_id: chats.marketplace_add.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiMarketplaceAddResponse) => {
                            const { message_for_user, ...fields } = {
                                ...res?.fields,
                            }
                            const tags = getStringArray(fields.tags)
                            const offered_tags = getStringArray(
                                fields.offered_tags,
                            )
                            updateChat<"marketplace_add">({
                                fields: {
                                    ...fields,
                                    tags,
                                    offered_tags,
                                },
                                threadId: res?.thread_id || null,
                            })
                            addMessage(
                                getMessage({ aiMessage: message_for_user }),
                            )

                            if (res?.is_full) {
                                toast.success(t("fieldsWereSuccessGenerated"))
                                router.push(
                                    getHref({
                                        pathname: "/[locale]/marketplace/post",
                                    }),
                                )
                                setNewChat("marketplace_add")
                                resetMarketPlacePersist()
                                closeModal()
                            }
                        },
                    },
                )
                break
            case "investment_add":
                await postAsync(
                    API.INVESTMENT.AI_CREATE_POST,
                    {
                        ...vals,
                        thread_id: chats.investment_add.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiInvestmentAddResponse) => {
                            const { message_for_user, ...fields } = {
                                ...res?.fields,
                            }
                            const tags = getStringArray(fields.tags)
                            const offered_tags = getStringArray(
                                fields.offered_tags,
                            )
                            updateChat<"investment_add">({
                                fields: {
                                    ...fields,
                                    tags,
                                    offered_tags,
                                },
                                threadId: res?.thread_id || null,
                            })
                            addMessage(
                                getMessage({ aiMessage: message_for_user }),
                            )

                            if (res?.is_full) {
                                toast.success(t("fieldsWereSuccessGenerated"))
                                router.push(
                                    getHref({
                                        pathname: "/[locale]/investment/post",
                                    }),
                                )
                                setNewChat("investment_add")
                                resetInvestmentPersist()
                                closeModal()
                            }
                        },
                    },
                )
                break
            case "outreach_hub_add":
                await postAsync(
                    API.OUT_REACH_HUB.AI_CREATE_POST,
                    {
                        ...vals,
                        thread_id: chats.outreach_hub_add.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiOutreachHubAddResponse) => {
                            const { message_for_user, ...fields } = {
                                ...res?.fields,
                            }
                            const tags = getStringArray(fields.tags)
                            const offered_tags = getStringArray(
                                fields.offered_tags,
                            )
                            updateChat<"outreach_hub_add">({
                                fields: {
                                    ...fields,
                                    tags,
                                    offered_tags,
                                },
                                threadId: res?.thread_id || null,
                            })

                            addMessage(
                                getMessage({ aiMessage: message_for_user }),
                            )

                            if (res?.is_full) {
                                toast.success(t("fieldsWereSuccessGenerated"))
                                router.push(
                                    getHref({
                                        pathname: "/[locale]/outreach-hub/post",
                                    }),
                                )
                                setNewChat("outreach_hub_add")
                                resetOutreachHubPersist()
                                closeModal()
                            }
                        },
                    },
                )
                break
            case "marketplace_filter":
                await postAsync(
                    API.MARKETPLACE.AI_FILTER,
                    {
                        user_filter_text: vals.user_message,
                        thread_id:
                            chats.marketplace_filter.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiMarketplaceFilterResponse) => {
                            updateChat<"marketplace_filter">({
                                threadId: res?.thread_id,
                                countries: getArray(res?.countries),
                                tags: getArray(res?.tags),
                                requestTypes: getArray(res?.request_types),
                                categories: getArray(res?.categories),
                            })
                            addMessage(
                                getMessage({
                                    aiMessage: res?.message_for_user,
                                }),
                            )
                            if (res?.is_approved) {
                                setNewChat("marketplace_filter")
                            }
                            closeModal()
                        },
                    },
                )
                break
            case "investment_filter":
                await postAsync(
                    API.INVESTMENT.AI_FILTER,
                    {
                        user_filter_text: vals.user_message,
                        thread_id:
                            chats.investment_filter.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiInvestmentFilterResponse) => {
                            updateChat<"investment_filter">({
                                threadId: res?.thread_id,
                                countries: getArray(res?.countries),
                                tags: getArray(res?.tags),
                                requestTypes: getArray(res?.request_types),
                            })
                            addMessage(
                                getMessage({
                                    aiMessage: res?.message_for_user,
                                }),
                            )
                            if (res?.is_approved) {
                                setNewChat("investment_filter")
                            }
                            closeModal()
                        },
                    },
                )
                break
            case "outreach_hub_filter":
                await postAsync(
                    API.OUT_REACH_HUB.AI_FILTER,
                    {
                        user_filter_text: vals.user_message,
                        thread_id:
                            chats.outreach_hub_filter.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiOutreachHubFilterResponse) => {
                            updateChat<"outreach_hub_filter">({
                                threadId: res?.thread_id,
                                countries: getArray(res?.countries),
                                tags: getArray(res?.tags),
                                requestTypes: getArray(res?.request_types),
                            })
                            addMessage(
                                getMessage({
                                    aiMessage: res?.message_for_user,
                                }),
                            )
                            if (res?.is_approved) {
                                setNewChat("outreach_hub_filter")
                            }
                            closeModal()
                        },
                    },
                )
                break
            case "register":
                await postAsync(
                    API.AUTH.AI.GET_USER_DATA,
                    {
                        text: vals.user_message,
                        thread_id: chats.register.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiGetUserDatasResponse) => {
                            const { message_for_user, ...fields } = {
                                ...res?.fields,
                            }
                            updateChat<"register">({
                                threadId: res?.thread_id,
                                fields,
                            })
                            addMessage(
                                getMessage({
                                    aiMessage: message_for_user,
                                }),
                            )
                            if (res?.is_full) {
                                patch(API.PROFILE.INFO.ME, fields, {
                                    onSuccess: () => {
                                        toast.success(
                                            t(
                                                "yourProfileInfoHasBeenSuccessUpdated",
                                            ),
                                        )
                                        refetchProfile()
                                        router.replace(
                                            getHref({ pathname: "/[locale]" }),
                                        )
                                    },
                                })
                                setNewChat("register")
                            }
                        },
                    },
                )
                break
            case "home":
                await postAsync(
                    API.GLOBAL.AI,
                    {
                        user_message: vals.user_message,
                        thread_id: chats.home.threadId || undefined,
                    },
                    {
                        onSuccess: (res: AiHomeResponse) => {
                            updateChat<"home">({
                                threadId: res?.thread_id,
                                redirectTo: res?.redirect_to,
                            })
                            addMessage(
                                getMessage({
                                    aiMessage: res?.message_for_user,
                                }),
                            )
                            if (res?.redirect_to) {
                                function getRouteLiteral(): RouteLiteral {
                                    switch (res.redirect_to) {
                                        case "marketplace_post":
                                            return getHref({
                                                pathname:
                                                    "/[locale]/marketplace",
                                            })
                                        case "investment_post":
                                            return getHref({
                                                pathname:
                                                    "/[locale]/investment",
                                            })
                                        case "outreach_hub_post":
                                            return getHref({
                                                pathname:
                                                    "/[locale]/outreach-hub",
                                            })
                                        case "marketplace_filter":
                                            return getHref({
                                                pathname:
                                                    "/[locale]/marketplace",
                                            })
                                        case "investment_filter":
                                            return getHref({
                                                pathname:
                                                    "/[locale]/investment",
                                            })
                                        case "outreach_hub_filter":
                                            return getHref({
                                                pathname:
                                                    "/[locale]/outreach-hub",
                                            })
                                        default:
                                            return getHref({
                                                pathname: "/[locale]",
                                            })
                                    }
                                }

                                router.push(getRouteLiteral())
                                setNewChat("home")
                                closeModal()
                            }
                        },
                    },
                )
                break
        }
    })

    useEffect(() => {
        methods.setFocus("user_message")
    })

    // Combined focus management
    useEffect(() => {
        if (document.hasFocus()) {
            // Only focus if the window is active
            const focusTimeout = setTimeout(() => {
                methods.setFocus("user_message")
            }, 0)
            return () => clearTimeout(focusTimeout)
        }
    }, [methods, isPending]) // Re-run when isPending changes

    return (
        <form onSubmit={onSubmit}>
            <Group className="relative border-gradient !rounded-3xl">
                <ControlledTextarea
                    methods={methods}
                    name="user_message"
                    textareaProps={{
                        onKeyDown: (e) => {
                            if (
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                !isPending
                            ) {
                                e.preventDefault() // Prevents adding a new line
                                onSubmit()
                            }
                        },
                        className:
                            "rounded-3xl p-4 bg-transparent min-h-14 border-none focus-visible:border-none scrollbar max-h-60 h-auto ring-0 shadow-none focus-visible:shadow-none focus-visible:ring-0 clamp-[text,base,lg] placeholder:clamp-[text,base,lg]",
                        placeholder: isPending ? "" : "Ask...",
                        leftNode: isPending && (
                            <TextShimmer className="text-base">
                                {t("analyzing")}
                            </TextShimmer>
                        ),
                        leftNodeClassName: "left-4 top-4",
                    }}
                />

                <Button
                    type="submit"
                    icon={<IconArrowUp />}
                    className="absolute bottom-3 right-3 rounded-full w-9 h-9 bg-foreground hover:bg-foreground/90"
                    size="sm"
                    disabled={isPending}
                />
            </Group>
        </form>
    )
}

export default Toolbar
