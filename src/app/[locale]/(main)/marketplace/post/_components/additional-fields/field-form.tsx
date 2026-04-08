"use client"

import UncontrolledInput from "@/components/form/uncontrolled-input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import {
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFieldArrayUpdate,
    useForm,
} from "react-hook-form"
import { MarketplaceProductForm } from "../../_types"

interface Props {
    append: UseFieldArrayAppend<MarketplaceProductForm, "additional_fields">
    update: UseFieldArrayUpdate<MarketplaceProductForm, "additional_fields">
    field?: FieldArrayWithId<MarketplaceProductForm, "additional_fields"> & {
        index: number
    }
    closeDrawer: () => void
}

export default function FieldForm({
    append,
    update,
    field,
    closeDrawer,
}: Props) {
    const t = useTranslations()
    const methods = useForm<
        MarketplaceProductForm["additional_fields"][number]
    >({
        defaultValues: {
            field_name: "",
            field_value: "",
            ...field,
        },
    })

    const onSubmit = methods.handleSubmit((vals) => {
        if (field) {
            update(field.index, vals)
            closeDrawer()
        } else {
            append(vals)
            closeDrawer()
        }
    })

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <UncontrolledInput
                methods={methods}
                name="field_name"
                placeholder={t("name")}
            />
            <UncontrolledInput
                methods={methods}
                name="field_value"
                placeholder={t("value")}
            />
            <Button type="submit" className="w-full">
                {!field ? t("create") : t("edit")}
            </Button>
        </form>
    )
}
