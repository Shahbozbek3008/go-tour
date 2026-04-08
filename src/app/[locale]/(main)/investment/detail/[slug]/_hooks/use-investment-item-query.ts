import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { InvestmentItemDetail } from "../../../_types"
import { useInvestmentPersist } from "../../../post/_hooks/use-investment-persist"

export const useInvestmentItemQuery = (
    args?: UseGetArgs<InvestmentItemDetail>,
) => {
    const slug = useSlug()
    const { previewData, formData } = useInvestmentPersist()
    const isPreview = slug === "preview"
    const res = useGet<InvestmentItemDetail>(
        API.INVESTMENT.INVESTMENT_ITEMS.SLUG.replace("{slug}", slug),
        {
            ...args,
            options: {
                enabled: !isPreview,
                ...args?.options,
            },
        },
    )
    const docs = getArray(
        isPreview ? previewData?.documents : res.data?.documents,
    )
    const tags = getArray(isPreview ? previewData?.tags : res.data?.tags)

    return {
        ...res,
        docs,
        tags,
        data: isPreview ? previewData : res.data,
        formData,
        isPreview,
    }
}
