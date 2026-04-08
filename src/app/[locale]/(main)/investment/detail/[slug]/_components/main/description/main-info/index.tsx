"use client"

import {
    INVESTMENT_REQUEST_TYPES,
    InvestmentField,
} from "@/app/[locale]/(main)/investment/_constants"
import { InvestmentItemDetail } from "@/app/[locale]/(main)/investment/_types"
import ClientTranslate from "@/components/common/translation/client-translate"
import parse from "html-react-parser"
import { useTranslations } from "next-intl"
import { useInvestmentItemQuery } from "../../../../_hooks/use-investment-item-query"
import InfoRow from "./info-row"
import PriceInfo from "./price-row"

export default function MainInfo() {
    const t = useTranslations()
    const { data } = useInvestmentItemQuery()
    const requestType = INVESTMENT_REQUEST_TYPES.find(
        (t) => t.key === data?.request_type,
    )

    return (
        <>
            <div className="flex w-full">
                <button
                    className={`hidden md:inline-block flex-1 px-4 py-2 text-sm font-medium rounded-1 cursor-pointer bg-(--gray-200)`}
                >
                    <ClientTranslate translationKey="description" />
                </button>
            </div>
            <div className="mt-4">{parse(data?.description || "")}</div>
            <div className="mt-4 md:mt-0 space-y-1">
                {Object.entries(requestType?.specific_fields || {}).map(
                    // @ts-expect-error asdf
                    ([key, value]: [
                        keyof InvestmentItemDetail,
                        InvestmentField,
                    ]) => {
                        if (key === "start_price") {
                            return <PriceInfo key={key} />
                        }
                        if (key === "description") return
                        return (
                            <InfoRow
                                key={key}
                                label={t(value.label)}
                                value={String(data?.[key] ?? "")}
                            />
                        )
                    },
                )}
            </div>
        </>
    )
}
