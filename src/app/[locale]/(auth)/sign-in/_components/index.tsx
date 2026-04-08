"use client"

import MailIcon from "@/assets/icons/mail-icon"
import ClientTranslate from "@/components/common/translation/client-translate"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useLastPagePersist } from "@/hooks/store/use-last-page-persist"
import { Link, useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import FormTitle from "../../_components/form-title"
import Oauth from "../../_components/oauth"

interface Form {
    email: string
    password: string
}
interface Response {
    step: string
    access_token: string
    refresh_token: string
    message: string
}

export default function SignIn() {
    const t = useTranslations()
    const { lastPage } = useLastPagePersist()
    const router = useRouter()
    const { queryClient } = useRevalidate()
    const { post, isPending } = useRequest({ device: true })
    const methods = useForm<Form>({
        defaultValues: {
            email: "",
            password: "",
        },
        disabled: isPending,
    })
    const { handleSubmit } = methods

    const onSubmit = handleSubmit((vals) => {
        post(API.AUTH.LOGIN.EMAIL, vals, {
            onSuccess: (res: Response) => {
                if (res?.access_token) {
                    ClientTokenService.setAccessToken(res.access_token)
                }
                if (res?.refresh_token) {
                    ClientTokenService.setRefreshToken(res.refresh_token)
                }
                queryClient.clear()
                router.replace(lastPage)
                router.refresh()
            },
        })
    })

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col clamp-[gap,4,6] w-full clamp-[text,xs,sm]"
        >
            <FormTitle text="signIn" />
            <UncontrolledInput
                methods={methods}
                name="email"
                type="email"
                label={t("email")}
                leftNode={<MailIcon />}
            />
            <UncontrolledInput
                methods={methods}
                name="password"
                type="password"
                label={t("password")}
            />

            <Link
                className="lg:text-start text-end text-info"
                href={getHref({ pathname: "/[locale]/forgot-password" })}
            >
                <ClientTranslate translationKey="forgotPassword" />
            </Link>

            <Button type="submit" variant={"gradient2"} isLoading={isPending}>
                <ClientTranslate translationKey="signIn" />
            </Button>

            <p className="text-center">
                <ClientTranslate translationKey="doNotHaveAnAccount" />{" "}
                <Link
                    href={getHref({ pathname: "/[locale]/sign-up" })}
                    className="text-info"
                >
                    <ClientTranslate translationKey="signUp" />
                </Link>
            </p>

            <div className="flex gap-5 items-center text-text-300">
                <span className="h-[1px] bg-text-300 w-full"></span>
                <ClientTranslate translationKey="or" />
                <span className="h-[1px] bg-text-300 w-full"></span>
            </div>

            <div>
                <p className="mb-5 text-center">
                    <ClientTranslate translationKey="signInUsing" />
                </p>
                <Oauth />
            </div>
        </form>
    )
}
