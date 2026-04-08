"use client"

import { TranslationKey } from "@/components/common/translation/types"
import NumberField from "@/components/form/number-field"
import SelectField from "@/components/form/select-field"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { CURRENCIES } from "@/lib/constants/currency"
import { getArray } from "@/lib/utils/get-array"
import { useTranslations } from "next-intl"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"

export default function PriceFields() {
    const t = useTranslations()
    const { methods, requestType } = useMarketplaceForm()
    const { watch } = methods
    const options = getArray(requestType?.priceModel?.options)
    const priceModelType = watch("pricing_model.type")
    const priceLabel =
        (
            priceModelType &&
            priceModelType in (requestType?.priceModel?.priceLabels ?? {})
        ) ?
            requestType?.priceModel?.priceLabels?.[
                priceModelType as keyof typeof requestType.priceModel.priceLabels
            ]
        :   undefined
    const percentageLabel =
        (
            priceModelType &&
            priceModelType in (requestType?.priceModel?.percentageLabels ?? {})
        ) ?
            requestType?.priceModel?.percentageLabels?.[
                priceModelType as keyof typeof requestType.priceModel.percentageLabels
            ]
        :   undefined

    return (
        <>
            <SelectField
                methods={methods}
                name="pricing_model.type"
                label={t("pricingModel")}
                options={options}
                optionLabelKey="id"
                getOptionLabel={(opt) => t(opt.name)}
                labelClassName="text-text-900 text-base"
                wrapperClassName="col-span-full"
            />
            {priceLabel && priceModelType === "Fixed Price" && (
                <>
                    <NumberField
                        methods={methods}
                        name="pricing_model.start_amount"
                        label={t(priceLabel as TranslationKey)}
                        placeholder={t("from")}
                        wrapperClassName="col-span-1"
                        labelClassName="text-text-900 text-base"
                        className="border-gradient text-gradient-2"
                    />
                    <NumberField
                        methods={methods}
                        name="pricing_model.end_amount"
                        label=" "
                        labelClassName="text-white text-base"
                        placeholder={t("upTo")}
                        wrapperClassName="col-span-1"
                        className="border-gradient text-gradient-2"
                    />
                </>
            )}
            {priceLabel && priceModelType === "Tender-Based" && (
                <>
                    <NumberField
                        methods={methods}
                        name="pricing_model.start_amount"
                        label={t(priceLabel as TranslationKey)}
                        labelClassName="text-text-900 text-base"
                        placeholder={t("from")}
                        wrapperClassName="col-span-2"
                        className="border-gradient text-gradient-2"
                    />
                </>
            )}
            {percentageLabel && (
                <>
                    <NumberField
                        methods={methods}
                        name="pricing_model.start_percentage"
                        label={percentageLabel}
                        labelClassName="text-text-900 text-base"
                        placeholder={t("from")}
                        wrapperClassName="col-span-1"
                        rightIcon={"%"}
                        className="!border-gradient text-gradient-2"
                    />
                    <NumberField
                        methods={methods}
                        name="pricing_model.end_percentage"
                        label=" "
                        labelClassName="text-text-900 text-base"
                        className="!border-gradient text-gradient-2"
                        placeholder={t("upTo")}
                        wrapperClassName="col-span-1"
                        rightIcon={"%"}
                    />
                </>
            )}
            {priceLabel && (
                <>
                    <SelectField
                        methods={methods}
                        name="pricing_model.currency"
                        label={t("currency")}
                        labelClassName="text-text-900 text-base"
                        options={CURRENCIES}
                        optionLabelKey="iso"
                        wrapperClassName="col-span-1"
                    />
                    <UncontrolledInput
                        methods={methods}
                        name="pricing_model.measurement"
                        label={t("measurement")}
                        labelClassName="text-text-900 text-base"
                        wrapperClassName="col-span-1"
                        className="border-gradient text-gradient-2"
                    />
                </>
            )}
        </>
    )
}
