"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useAuthStore } from "@/hooks/store/use-auth-store"
import { useTimerStore } from "@/hooks/store/use-timer-store"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { MUTATION_KEYS } from "@/lib/constants/mutation-keys"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import FormTitle from "../../_components/form-title"

interface Form {
    email: string
}

interface ResponseVerify {
    email: string
    code: number
    message: string
}

export default function Index() {
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
        defaultValues: {
            email: "",
        },
        disabled: isPending,
    })
    const { handleSubmit } = methods
    const onSubmit = handleSubmit((vals) => {
        post(
            API.AUTH.LOGIN.FORGOT_PASSWORD.REQUEST,
            {
                email: vals.email || undefined,
            },
            {
                onSuccess: () => {
                    setAuthState({
                        ...vals,
                        getNewCodeEndpoint:
                            API.AUTH.LOGIN.FORGOT_PASSWORD.REQUEST,
                        onVerificationSubmit: ({ code }) => {
                            verifyPost(
                                API.AUTH.LOGIN.FORGOT_PASSWORD.VERIFY,
                                {
                                    code,
                                    email: vals.email,
                                },
                                {
                                    onSuccess: (res: ResponseVerify) => {
                                        setAuthState({
                                            email: res?.email,
                                            forgotPwdCode: res?.code,
                                        })
                                        router.replace(
                                            getHref({
                                                pathname:
                                                    "/[locale]/set-new-password",
                                            }),
                                        )
                                    },
                                },
                            )
                        },
                    })
                    setTimerState({
                        isTimerActive: true,
                        timeLeft: 120,
                    })
                    router.push(
                        getHref({ pathname: "/[locale]/verification-code" }),
                    )
                },
            },
        )
    })

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col items-center clamp-[gap,4,6] w-full clamp-[text,xs,sm]"
        >
            <FormTitle text="enterVerification" />
            <p className="text-center">
                <ClientTranslate translationKey="enterVerificationDesc" />
            </p>
            <UncontrolledInput
                methods={methods}
                name="email"
                label={t("email")}
                placeholder="example@gmail.com"
            />
            <Button type="submit" variant={"gradient2"} className="w-full">
                <ClientTranslate translationKey="continue" />
            </Button>
        </form>
    )
}
