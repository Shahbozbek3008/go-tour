"use client"

import { AdditionalPageType } from "@/app/[locale]/(main)/additional-pages/[slug]/_types"
import MailIcon from "@/assets/icons/mail-icon"
import { useAiPersist } from "@/components/common/ai-chat/_hooks/use-ai-persist"
import ClientTranslate from "@/components/common/translation/client-translate"
import CheckboxField from "@/components/form/checkbox-field"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useAuthStore } from "@/hooks/store/use-auth-store"
import { useTimerStore } from "@/hooks/store/use-timer-store"
import { Link, useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { MUTATION_KEYS } from "@/lib/constants/mutation-keys"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { getDeviceInfo } from "@/lib/firebase/get-device-info"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import FormTitle from "../../_components/form-title"
import Oauth from "../../_components/oauth"
interface Form {
    email: string
    password: string
    confirmPwd: string
    privacyPolicy: boolean
}

interface Response {
    success: boolean
    message: string
    device_id: string
}
interface ResponseVerification {
    access_token: string
    refresh_token: string
    message: string
}

export default function SignUp() {
    const { queryClient } = useRevalidate()
    const { setAiState } = useAiPersist()
    const t = useTranslations()
    const router = useRouter()
    const { setAuthState } = useAuthStore()
    const { setTimerState } = useTimerStore()
    const { post, isPending } = useRequest()
    const { post: verifyPost } = useRequest({
        options: {
            mutationKey: [MUTATION_KEYS.VERIFICATION],
        },
    })
    const methods = useForm<Form>({
        disabled: isPending,
        defaultValues: {
            email: "",
            password: "",
            confirmPwd: "",
            privacyPolicy: true,
        },
    })
    const { watch, handleSubmit, setError } = methods
    const privacyPolicy = watch("privacyPolicy")

    const onSubmit = handleSubmit(async (vals) => {
        if (vals.password !== vals.confirmPwd) {
            setError("confirmPwd", {
                message: t("passwordAndConfirmMust"),
            })

            return
        }
        const device = await getDeviceInfo()

        post(
            API.AUTH.REGISTER.EMAIL,
            {
                email: vals.email,
                password: vals.password,
                device,
            },
            {
                onSuccess: (res: Response) => {
                    setAuthState({
                        email: vals.email,
                        device,
                        getNewCodeEndpoint:
                            API.AUTH.REGISTER.EMAIL_GET_NEW_CODE,
                        onVerificationSubmit: ({ code }) => {
                            verifyPost(
                                API.AUTH.REGISTER.EMAIL_VERIFY,
                                {
                                    code,
                                    device_id: res?.device_id,
                                    email: vals.email,
                                },
                                {
                                    onSuccess: (res: ResponseVerification) => {
                                        ClientTokenService.setAccessToken(
                                            res?.access_token,
                                        )
                                        ClientTokenService.setRefreshToken(
                                            res?.refresh_token,
                                        )
                                        queryClient.clear()
                                        router.refresh()
                                        router.replace(
                                            getHref({
                                                pathname: "/[locale]/ai-chat",
                                            }),
                                        )
                                        setAiState({ chatType: "register" })
                                    },
                                },
                            )
                        },
                    })
                    setTimerState({ isTimerActive: true, timeLeft: 120 })
                    router.push(
                        getHref({ pathname: "/[locale]/verification-code" }),
                    )
                },
            },
        )
    })
    const termsOfUseSlug: AdditionalPageType = "terms_of_use"
    const privacyPolicySlug: AdditionalPageType = "privacy_policy"

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col clamp-[gap,4,6] w-full clamp-[text,xs,sm]"
        >
            <FormTitle text="signUp" />
            <UncontrolledInput
                methods={methods}
                name="email"
                type="email"
                label={t("email")}
                leftNode={<MailIcon />}
                showError
            />
            <UncontrolledInput
                methods={methods}
                name="password"
                type="password"
                label={t("password")}
                showError
            />
            <UncontrolledInput
                methods={methods}
                name="confirmPwd"
                type="password"
                label={t("confirmPassword")}
                showError
            />
            <CheckboxField
                methods={methods}
                name="privacyPolicy"
                label={
                    <div className="leading-4">
                        <ClientTranslate translationKey="iHaveReadAndAgree" />{" "}
                        <Link
                            href={getHref({
                                pathname: "/[locale]/additional-pages/[slug]",
                                query: {
                                    slug: termsOfUseSlug,
                                },
                            })}
                            className="text-info underline"
                        >
                            <ClientTranslate translationKey="termsOfUse" />
                        </Link>{" "}
                        <ClientTranslate translationKey="and" />{" "}
                        <Link
                            href={getHref({
                                pathname: "/[locale]/additional-pages/[slug]",
                                query: {
                                    slug: privacyPolicySlug,
                                },
                            })}
                            className="text-info underline"
                        >
                            <ClientTranslate translationKey="privacyPolicy" />
                        </Link>
                    </div>
                }
                variant={"info"}
            />

            <Button
                type="submit"
                disabled={!privacyPolicy}
                variant={"gradient2"}
                isLoading={isPending}
            >
                <ClientTranslate translationKey="signUp" />
            </Button>

            <p className="text-center">
                <ClientTranslate translationKey="allreadyHaveAnAccount" />{" "}
                <Link
                    href={getHref({ pathname: "/[locale]/sign-in" })}
                    className="text-info"
                >
                    <ClientTranslate translationKey="signIn" />
                </Link>
            </p>

            <div className="flex gap-5 items-center text-text300">
                <span className="h-[1px] bg-text300 w-full"></span>
                <ClientTranslate translationKey="or" />
                <span className="h-[1px] bg-text300 w-full"></span>
            </div>

            <div>
                <p className="mb-5 text-center">
                    <ClientTranslate translationKey="signUpUsing" />
                </p>
                <Oauth />
            </div>
        </form>
    )
}
