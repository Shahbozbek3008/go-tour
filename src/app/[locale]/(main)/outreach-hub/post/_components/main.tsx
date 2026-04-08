"use client"

import { useSlugWithoutThrowError } from "@/app/_providers/slug-provider"
import NumberText from "@/components/common/number-text"
import ControlledDatePicker from "@/components/form/controlled-datepicker"
import NumberField from "@/components/form/number-field"
import ReadOnlyField from "@/components/form/read-only-field"
import SelectField from "@/components/form/select-field"
import TextEditorField from "@/components/form/text-editor-field"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import Group from "@/components/semantic/group"
import { CURRENCIES } from "@/lib/constants/currency"
import { useTranslations } from "next-intl"
import { OUTREACH_HUB_TYPES } from "../../_constants"
import { OutreachhubItemDetail } from "../../_types"
import { useOutreachHubItemForm } from "../_hooks/use-outreach-hub-item-form"

interface Props {
    data: OutreachhubItemDetail | undefined
}

export default function Main({ data }: Props) {
    const slug = useSlugWithoutThrowError()
    const t = useTranslations()
    const { methods, requestType } = useOutreachHubItemForm()
    const textValue = data?.last_updates?.[data.last_updates.length - 1]?.text

    return (
        <div className="grid gap-y-10 gap-x-4 rounded-b-xl md:rounded-xl bg-[#F7FAFC] py-6 clamp-[px,2,12] w-full">
            <SelectField
                aiGenerated
                methods={methods}
                name="request_type"
                options={OUTREACH_HUB_TYPES}
                optionValueKey="key"
                label={t("selectYourPosition")}
                labelClassName="text-text-900 text-lg font-medium"
                getOptionLabel={(opt) => t(opt.name)}
            />
            <ReadOnlyField
                className="text-text-900"
                label={t("requestType")}
                value={requestType?.key ? t(requestType?.name) : ""}
            />
            <UncontrolledInput
                labelClassName="text-text-900 text-lg font-medium"
                className="border-gradient text-gradient-2"
                methods={methods}
                name="name"
                label={t("title")}
            />
            <Group className="flex flex-col md:flex-row gap-y-10 gap-x-4">
                <NumberField
                    labelClassName="text-text-900 text-lg font-medium"
                    className="border-gradient text-gradient-2"
                    methods={methods}
                    name="plan_price_amount"
                    label={t("estimatedValue")}
                />
                {slug && (
                    <ReadOnlyField
                        value={
                            <NumberText
                                value={methods.getValues("collected_amount")}
                                thousandSeparator=" "
                            />
                        }
                        label="Amount collected"
                    />
                )}
                <SelectField
                    labelClassName="text-text-900 text-lg font-medium"
                    methods={methods}
                    name="currency"
                    label={t("currency")}
                    options={CURRENCIES}
                    optionLabelKey="iso"
                    wrapperClassName="max-w-52"
                    getOptionLabel={(opt) => t(opt.name)}
                />
            </Group>

            {slug && (
                <ReadOnlyField
                    label="Updates"
                    value={textValue}
                    contentClassName="h-44"
                />
            )}
            <UncontrolledInput
                labelClassName="text-text-900 text-lg font-medium"
                className="border-gradient text-gradient-2"
                methods={methods}
                name="cause"
                label={t("cause")}
            />
            <UncontrolledInput
                labelClassName="text-text-900 text-lg font-medium"
                className="border-gradient text-gradient-2"
                methods={methods}
                name="type_of_support"
                label={t("typeOfSupport")}
            />
            <TextEditorField
                methods={methods}
                name="description"
                label={t("description")}
                className="border-gradient text-gradient-2"
                labelClassName="text-text-900 text-lg font-medium"
            />
            <UncontrolledInput
                methods={methods}
                name="location"
                label={t("location")}
                className="border-gradient text-gradient-2"
                labelClassName="text-text-900 text-lg font-medium"
            />
            <ControlledDatePicker
                className="border-gradient text-gradient-2"
                labelClass="text-text-900 text-lg font-medium"
                methods={methods}
                name="deadline_date"
                label={t("deadline")}
                calendarProps={{
                    startMonth: new Date(),
                }}
            />
        </div>
    )
}
