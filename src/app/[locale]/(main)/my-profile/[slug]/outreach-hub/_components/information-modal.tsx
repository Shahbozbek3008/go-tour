"use client"

import { useOutreachHubStore } from "@/app/[locale]/(main)/outreach-hub/_hooks/use-outreach-hub-item-store"
import { OutreachHubItemForm } from "@/app/[locale]/(main)/outreach-hub/post/_types"
import { IconUser } from "@/assets/icons/user"
import SelectField from "@/components/form/select-field"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import UncontrolledTextarea from "@/components/form/uncontrolled-textarea"
import { Button } from "@/components/ui/button"
import { useGet } from "@/hooks/react-query/use-get"
import { useRequest } from "@/hooks/react-query/use-request"
import { useRevalidate } from "@/hooks/react-query/use-revalidate"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { CURRENCIES } from "@/lib/constants/currency"
import { useTranslations } from "next-intl"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

type InfoModalForm = OutreachHubItemForm & {
    outreach_hub_item_slug: string
    text: string
}

export default function InformationModal() {
    const { item } = useOutreachHubStore()
    const { closeModal } = useModal("outreach-hub-update-modal")
    const t = useTranslations()
    const { patch, post } = useRequest()
    const { invalidateByExactMatch } = useRevalidate()
    const { data } = useGet<InfoModalForm>(
        item ? API.PROFILE.OUTREACH_HUB.SLUG.replace("{slug}", item.slug) : "",
    )

    const form = useForm<InfoModalForm>({
        defaultValues: {
            currency: null,
            collected_amount: "",
            donations_count: 0,
            outreach_hub_item_slug: "",
            text: "",
        },
        values: data,
    })

    const { handleSubmit } = form
    const onSubmit = handleSubmit((vals) => {
        post(API.PROFILE.OUTREACH_HUB.LAST_UPDATE_REPORT, {
            outreach_hub_item_slug: data?.slug,
            text: vals.text,
        })
        patch(
            item ?
                API.PROFILE.OUTREACH_HUB.SLUG.replace("{slug}", item.slug)
            :   "",
            {
                collected_amount: vals.collected_amount,
                currency: vals.currency,
                donations_count: vals.donations_count,
            },
            {
                onSuccess: () => {
                    toast.success(t("edited"))
                    invalidateByExactMatch([
                        API.PROFILE.OUTREACH_HUB.SLUG.replace(
                            "{slug}",
                            item?.slug || "",
                        ),
                        API.PROFILE.OUTREACH_HUB.ITEMS,
                    ])
                    closeModal()
                },
            },
        )
    })
    return (
        <FormProvider {...form}>
            <h1 className="font-medium text-2xl text-center">
                View Information
            </h1>

            <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="w-full col-span-4 sm:col-span-3">
                    <UncontrolledInput
                        labelClassName="text-text-900 text-lg font-medium"
                        className="border-gradient text-gradient-2"
                        methods={form}
                        name="collected_amount"
                        label="Amount collected"
                    />
                </div>
                <div className="w-full col-span-4 sm:col-span-1">
                    <SelectField
                        labelClassName="text-text-900 text-lg font-medium"
                        methods={form}
                        className="w-full col-span-1"
                        name="currency"
                        label={t("currency")}
                        options={CURRENCIES}
                        optionLabelKey="iso"
                        wrapperClassName="max-w-52"
                        getOptionLabel={(opt) => t(opt.name)}
                    />
                </div>
                <div className="w-full col-span-4">
                    <UncontrolledInput
                        type="number"
                        labelClassName="text-text-900 text-lg font-medium"
                        className="w-full col-span-4 border-gradient text-gradient-2"
                        methods={form}
                        rightNode={<IconUser className="w-6 h-6" />}
                        name="donations_count"
                        label="Donations"
                    />
                    <UncontrolledTextarea
                        methods={form}
                        name="text"
                        wrapperClassName="mt-5"
                        labelClassName="text-text-900 text-lg font-medium"
                        label="Updates"
                        textareaProps={{
                            className:
                                "w-full col-span-4 border-gradient text-gradient-2",
                        }}
                    />
                </div>
                <Button onClick={onSubmit} className="col-span-4">
                    Update
                </Button>
            </div>
        </FormProvider>
    )
}
