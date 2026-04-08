"use client"
import ClientTranslate from "@/components/common/translation/client-translate"
import ControlledInput from "@/components/form/controlled-input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { IUpdatePassword } from "../../types"

const ChangePassword = () => {
    const t = useTranslations()
    const { post, isPending } = useRequest()
    const form = useForm<IUpdatePassword>({
        defaultValues: {
            old_password: "",
            new_password1: "",
            new_password2: "",
        },
        disabled: isPending,
    })

    const { handleSubmit, setError } = form

    const onSubmit = handleSubmit((vals) => {
        if (vals.new_password1 !== vals.new_password2) {
            setError("new_password2", {
                message: t("newPasswordAndConfirm"),
            })
            return
        }
        post(API.PROFILE.UPDATE_PASSWORD, vals, {
            onSuccess: () => {
                toast.success(t("passwordUpdated"))
            },
        })
    })

    return (
        <div className="profile-card">
            <h4 className="text-lg font-medium">
                <ClientTranslate translationKey="changePassword" />
            </h4>
            <Form {...form}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="col-span-1 sm:col-span-2">
                        <ControlledInput
                            methods={form}
                            name="old_password"
                            type="password"
                            label={t("currentPassword")}
                            className="h-10 placeholder:text-sm"
                            placeholder={t("currentPassword")}
                            wrapperClassName="w-full sm:w-[50%]"
                        />
                    </div>
                    <div className="col-span-1">
                        <ControlledInput
                            methods={form}
                            name="new_password1"
                            type="password"
                            label={t("newPassword")}
                            className="h-10 placeholder:text-sm"
                            placeholder={t("newPassword")}
                        />
                    </div>
                    <div className="col-span-1">
                        <ControlledInput
                            methods={form}
                            name="new_password2"
                            type="password"
                            label={t("confirmNewPassword")}
                            className="h-10 placeholder:text-sm"
                            placeholder={t("confirmNewPassword")}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h5 className="text-sm text-(--text-secondary) opacity-70 font-medium">
                        <ClientTranslate translationKey="passwordRequirments" />
                    </h5>
                    <ul className="flex flex-col gap-4 list-disc pl-3">
                        <li className="text-sm text-(--text-secondary) opacity-70">
                            <ClientTranslate translationKey="minimumEightCharacters" />
                        </li>
                        <li className="text-sm text-(--text-secondary) opacity-70">
                            <ClientTranslate translationKey="leastOneLowercase" />
                        </li>
                        <li className="text-sm text-(--text-secondary) opacity-70">
                            <ClientTranslate translationKey="leastOneNumber" />
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-4 mt-6">
                    <Button size="lg" className="" onClick={onSubmit}>
                        <ClientTranslate translationKey="saveChanges" />
                    </Button>
                    <Button
                        size="lg"
                        className="bg-gray-100 hover:bg-gray-100 text-(--secondary-main)"
                    >
                        <ClientTranslate translationKey="reset" />
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ChangePassword
