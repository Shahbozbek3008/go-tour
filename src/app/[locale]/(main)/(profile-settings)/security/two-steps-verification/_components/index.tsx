"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import ControlledInput from "@/components/form/controlled-input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { useAuthStore } from "@/hooks/store/use-auth-store"
import { useTimerStore } from "@/hooks/store/use-timer-store"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { MUTATION_KEYS } from "@/lib/constants/mutation-keys"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

interface FormValues {
    email: string
    two_fa_password: string
}

interface ResponseVerify {
    email: string
    code: number
    message: string
}

const PageComponents = () => {
    const t = useTranslations()
    const { data } = useProfileQuery()
    const router = useRouter()
    const { setAuthState } = useAuthStore()
    const { setTimerState } = useTimerStore()
    const { post, isPending } = useRequest()
    const { post: verifyPost } = useRequest({
        options: {
            mutationKey: [MUTATION_KEYS.VERIFICATION],
        },
    })
    const form = useForm<FormValues>({
        defaultValues: {
            email: "",
            two_fa_password: "",
        },
        disabled: isPending,
    })

    const { handleSubmit } = form

    const onSubmit = handleSubmit((vals) => {
        if (data?.is_2fa_enabled) {
            post(API.PROFILE.TWO_FA.DISABLE, vals, {
                onSuccess: () => {
                    toast.success("Muvaffaqiyatli o'chirildi")
                    router.push(
                        getHref({
                            pathname: "/[locale]/security",
                        }),
                    )
                },
            })
        } else {
            post(API.PROFILE.TWO_FA.ENABLE, vals, {
                onSuccess: () => {
                    setAuthState({
                        ...vals,
                        getNewCodeEndpoint: API.PROFILE.TWO_FA.ENABLE,
                        onVerificationSubmit: ({ code }) => {
                            verifyPost(
                                API.PROFILE.TWO_FA.VERIFY_EMAIL_FOR_TWO_FACTOR,
                                {
                                    code,
                                    email: vals.email,
                                },
                                {
                                    onSuccess: (res: ResponseVerify) => {
                                        setAuthState({
                                            email: res?.email,
                                        })
                                        router.replace(
                                            getHref({
                                                pathname: "/[locale]/security",
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
            })
        }
    })

    return (
        <div className="profile-card clamp-[mt,5,6]">
            <h4 className="text-lg font-medium text-(--text-secondary) opacity-90">
                <ClientTranslate translationKey="twoStepsVerification" />
            </h4>
            <p className="text-sm text-(--text-secondary) opacity-70 w-full sm:w-[66%]">
                <ClientTranslate translationKey="addAnExtraLayer" />
            </p>
            <FormProvider {...form}>
                <Form {...form}>
                    <div className="flex flex-col gap-6">
                        {!data?.is_2fa_enabled && (
                            <ControlledInput
                                methods={form}
                                name="email"
                                type="email"
                                label={t("email")}
                                placeholder={t("email")}
                                className="w-full sm:w-[50%] h-10"
                            />
                        )}
                        <ControlledInput
                            methods={form}
                            name="two_fa_password"
                            type="password"
                            label={t("password")}
                            placeholder={t("password")}
                            className="h-10 placeholder:text-sm"
                            wrapperClassName="w-full sm:w-[50%]"
                        />
                        <Button
                            size="lg"
                            className="max-w-45"
                            onClick={onSubmit}
                        >
                            <ClientTranslate translationKey="confirm" />
                        </Button>
                    </div>
                </Form>
            </FormProvider>
        </div>
    )
}

export default PageComponents
