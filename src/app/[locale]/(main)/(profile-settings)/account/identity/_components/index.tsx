"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import SelectControl from "@/components/form/controlled-select"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useProfileQuery } from "@/hooks/react-query/use-profile-query"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import DeleteAccount from "./delete-account"
import { chat_status, timeZone } from "./options"
import Upload from "./upload"

const MyIdentity = () => {
    const t = useTranslations()
    const { data, refetch } = useProfileQuery()
    const { patch, isPending } = useRequest()

    const form = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            job_title: "",
            about: "",
            profile_image: "",
            banner_image: "",
            address: "",
            phone_number: "",
            email: "",
            time_zone: "",
            chat_status: "",
        },
        values: data,
        disabled: isPending,
    })

    const { handleSubmit, setValue } = form

    const onSubmit = handleSubmit((vals) => {
        patch(API.PROFILE.INFO.ME, vals, {
            onSuccess: () => {
                toast.success(t("profileUpdateSuccess"))
                refetch()
            },
            onError: () => {
                toast.error(t("someThingWrong"))
            },
        })
    })

    const inputClassName = "h-10 col-span-1"
    return (
        <div className="flex flex-col gap-6">
            <div className="profile-card">
                <Form {...form}>
                    <Upload
                        onSuccessBanner={(banner_img) =>
                            setValue("banner_image", banner_img)
                        }
                        onSuccessProfile={(profile_img) =>
                            setValue("profile_image", profile_img)
                        }
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <UncontrolledInput
                            methods={form}
                            name="first_name"
                            placeholder={t("firstName")}
                            label={t("firstName")}
                            className={inputClassName}
                        />
                        <UncontrolledInput
                            methods={form}
                            name="last_name"
                            placeholder={t("lastName")}
                            label={t("lastName")}
                            className={inputClassName}
                        />
                        <UncontrolledInput
                            methods={form}
                            name="job_title"
                            placeholder={t("jobTitle")}
                            label={t("jobTitle")}
                            className={inputClassName}
                        />
                        <UncontrolledInput
                            methods={form}
                            name="phone_number"
                            placeholder={t("phoneNumber")}
                            label={t("phoneNumber")}
                            className={inputClassName}
                        />
                        <UncontrolledInput
                            methods={form}
                            name="email"
                            type="email"
                            placeholder={t("email")}
                            label={t("email")}
                            className={inputClassName}
                        />
                        <UncontrolledInput
                            methods={form}
                            name="address"
                            placeholder={t("address")}
                            label={t("address")}
                            className={inputClassName}
                        />
                        <UncontrolledInput
                            methods={form}
                            name="about"
                            placeholder="About"
                            label="About"
                            className={inputClassName}
                        />
                        <SelectControl
                            control={form.control}
                            name="chat_status"
                            placeholder={t("chatStatus")}
                            label={t("chatStatus")}
                            options={chat_status}
                            selectClass={cn(inputClassName, "w-full")}
                        />
                        <SelectControl
                            control={form.control}
                            name="time_zone"
                            placeholder={t("selectTimezone")}
                            label={t("timeZone")}
                            options={timeZone}
                            selectClass={cn(inputClassName, "w-full")}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size="lg" type="submit" onClick={onSubmit}>
                            <ClientTranslate translationKey="saveChanges" />
                        </Button>
                        <Button
                            size="lg"
                            className="bg-gray-100 text-(--secondary-main) hover:bg-gray-100"
                            onClick={() => form.reset(data)}
                        >
                            <ClientTranslate translationKey="cancel" />
                        </Button>
                    </div>
                </Form>
            </div>
            <DeleteAccount />
        </div>
    )
}

export default MyIdentity
