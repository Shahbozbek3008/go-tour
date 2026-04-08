"use client"
import { IProfileBusiness } from "@/app/[locale]/(main)/(profile-settings)/account/business/types"
import { useSlug } from "@/app/_providers/slug-provider"
import { IconLocation } from "@/assets/icons/location"
import { IconMail } from "@/assets/icons/mail"
import { IconPhone } from "@/assets/icons/phone"
import { IconProfileClock } from "@/assets/icons/profile-clock"
import IconProfileUser from "@/assets/icons/profile-user"
import ClientImg from "@/components/common/client-img"
import ClientTranslate from "@/components/common/translation/client-translate"
import SwitchField from "@/components/form/switch-field"
import { Form } from "@/components/ui/form"
import { useRequest } from "@/hooks/react-query/use-request"
import { API } from "@/lib/constants/api-endpoints"
import { cn } from "@/lib/utils/shadcn"
import { ProfileInfo } from "@/types/common/profile"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useProfileInfoDisplayPermissionQuery } from "../_hooks/use-profile-info-display-permission-query"
import { IProfileDisplayPermission } from "../types"

interface Props {
    data: ProfileInfo
    businessData?: IProfileBusiness
}

export default function Sidebar({ data, businessData }: Props) {
    const slug = useSlug()
    const isMe = slug === "me"
    const { data: displayPermission, refetch } =
        useProfileInfoDisplayPermissionQuery()
    const { patch, isPending } = useRequest()

    const form = useForm<IProfileDisplayPermission>({
        defaultValues: {
            phone_number_permission: false,
            email_permission: false,
        },
        disabled: isPending,
    })

    const { reset, setValue } = form

    useEffect(() => {
        if (displayPermission) {
            reset({
                phone_number_permission:
                    !!displayPermission.phone_number_permission,
                email_permission: !!displayPermission.email_permission,
            })
        }
    }, [displayPermission, reset])

    const handleToggle = (
        name: keyof IProfileDisplayPermission,
        checked: boolean,
    ) => {
        setValue(name, checked, { shouldDirty: true })

        patch(
            API.PROFILE.INFO.DISPLAY_PERMISSION,
            { [name]: checked },
            {
                onSuccess: () => {
                    refetch()
                },
            },
        )
    }

    return (
        <Form {...form}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-x-10 gap-y-2 md:col-span-4 lg:col-span-2 p-6 rounded-md bg-white shadow-[var(--card-shadow)]">
                <div className="space-y-4">
                    <div className="text-gray-500 text-sm mb-4">
                        <ClientTranslate translationKey="about" />
                    </div>
                    <div className={cn("flex items-center gap-2")}>
                        <IconProfileUser />
                        <span className="text-(--text-secondary) opacity-70 text-sm">
                            <ClientTranslate translationKey="fullName" />:{" "}
                            {data?.first_name} {data?.last_name}
                        </span>
                    </div>

                    <div className={cn("flex items-center gap-2")}>
                        <IconMail
                            stroke="var(--text-secondary)"
                            strokeOpacity={0.7}
                        />
                        <span className="text-(--text-secondary) opacity-70 text-sm">
                            <ClientTranslate translationKey="email" />:{" "}
                            {data?.email}
                        </span>
                        {isMe && (
                            <span className="ml-auto">
                                <SwitchField
                                    dir="ltr"
                                    methods={form}
                                    name="email_permission"
                                    disabled={isPending}
                                    onCheckedChange={(checked: boolean) =>
                                        handleToggle(
                                            "email_permission",
                                            checked,
                                        )
                                    }
                                />
                            </span>
                        )}
                    </div>

                    <div className={cn("flex items-center gap-2")}>
                        <IconPhone
                            stroke="var(--text-secondary)"
                            strokeOpacity={0.7}
                        />
                        <span className="text-(--text-secondary) opacity-70 text-sm">
                            <ClientTranslate translationKey="contact" />:{" "}
                            {data?.phone_number}
                        </span>
                        {isMe && (
                            <span className="ml-auto">
                                <SwitchField
                                    dir="ltr"
                                    methods={form}
                                    name="phone_number_permission"
                                    disabled={isPending}
                                    onCheckedChange={(checked: boolean) =>
                                        handleToggle(
                                            "phone_number_permission",
                                            checked,
                                        )
                                    }
                                />
                            </span>
                        )}
                    </div>

                    <div className={cn("flex items-center gap-2")}>
                        <IconProfileClock />
                        <span className="text-(--text-secondary) opacity-70 text-sm">
                            <ClientTranslate translationKey="timeZone" />:{" "}
                            {data?.time_zone}
                        </span>
                    </div>

                    <div className={cn("flex items-center gap-2")}>
                        <IconLocation />
                        <span className="text-(--text-secondary) opacity-70 text-sm">
                            <ClientTranslate translationKey="location" />:{" "}
                            {data?.address}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="uppercase text-gray-500 text-sm mt-6 mb-4">
                        <ClientTranslate translationKey="businessInfo" />
                    </div>
                    <div className={cn("flex items-center gap-4")}>
                        <ClientImg
                            src={data?.business?.company_image}
                            wrapperClassName="w-18 h-18 rounded-full border border-[#e8e8e8]"
                            alt="company logo"
                        />

                        <ul className="max-w-[234px] flex flex-col gap-2 text-(--text-secondary) opacity-70">
                            <li className="font-medium text-sm">
                                {data?.business?.company_name}
                            </li>
                            <li className="text-xs">
                                {data?.business?.purpose_of_business_activity}
                            </li>
                        </ul>
                    </div>

                    <div className={cn("flex items-center gap-2")}>
                        <span className="text-(--text-secondary) opacity-70 font-medium">
                            <ClientTranslate translationKey="businessType" />:{" "}
                            <span className="font-normal">
                                {data?.business?.business_type}
                            </span>
                        </span>
                    </div>

                    <div className={cn("flex items-center gap-2")}>
                        <span className="text-(--text-secondary) opacity-70 font-medium">
                            <ClientTranslate translationKey="licenseNumber" />:{" "}
                            <span className="font-normal">
                                {isMe ?
                                    businessData?.license_number
                                :   data?.business?.license_number}
                            </span>
                        </span>
                    </div>

                    <div
                        className={cn(
                            "flex items-start gap-2 text-(--text-secondary) opacity-70 font-medium",
                        )}
                    >
                        <ClientTranslate translationKey="address" />:{" "}
                        <span className="font-normal text-(--text-secondary/70)">
                            {isMe ?
                                businessData?.business_address
                            :   data?.business?.address}
                        </span>
                    </div>

                    <div className={cn("flex items-center gap-2")}>
                        <span className="text-(--text-secondary) opacity-70 font-medium">
                            <ClientTranslate translationKey="taxIdNumber" />:{" "}
                            <span className="font-normal">
                                {isMe ?
                                    businessData?.tax_id_number
                                :   data?.business?.tax_id_number}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Form>
    )
}
