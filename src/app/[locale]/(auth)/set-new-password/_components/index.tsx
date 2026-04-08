"use client"
import ClientTranslate from "@/components/common/translation/client-translate"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { Button } from "@/components/ui/button"
import { useRequest } from "@/hooks/react-query/use-request"
import { useAuthStore } from "@/hooks/store/use-auth-store"
import { useRouter } from "@/i18n/navigation"
import { API } from "@/lib/constants/api-endpoints"
import { getHref } from "@/lib/utils/get-href"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import FormTitle from "../../_components/form-title"

interface Form {
    newPwd: string
    confirmPwd: string
}

export default function SetNewPassword() {
    const t = useTranslations()
    const { email, forgotPwdCode } = useAuthStore()
    const router = useRouter()
    const { post, isPending } = useRequest()
    const form = useForm<Form>({
        defaultValues: {
            newPwd: "",
            confirmPwd: "",
        },
        disabled: isPending,
    })
    const { handleSubmit } = form

    const onSubmit = handleSubmit((vals) => {
        if (vals.newPwd !== vals.confirmPwd) {
            toast.error(<ClientTranslate translationKey="samePasswords" />)
            return
        }
        post(
            API.AUTH.LOGIN.FORGOT_PASSWORD.RESET,
            { new_password: vals.newPwd, email, code: forgotPwdCode },
            {
                onSuccess: () => {
                    toast.success(
                        <ClientTranslate translationKey="updatedPassword" />,
                    )
                    router.push(getHref({ pathname: "/[locale]/sign-in" }))
                },
            },
        )
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <FormTitle text="setNewPassword" />

            <UncontrolledInput
                methods={form}
                name="newPwd"
                label={t("password")}
                type="password"
            />
            <UncontrolledInput
                methods={form}
                name="confirmPwd"
                label={t("repeatPassword")}
                type="password"
            />

            <Button type="submit" isLoading={isPending} variant={"gradient2"}>
                <ClientTranslate translationKey="resetPassword" />
            </Button>
        </form>
    )
}
