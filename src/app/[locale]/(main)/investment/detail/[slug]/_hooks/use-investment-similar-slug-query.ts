import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { InvestmentItem } from "../../../_types"

export const useInvestmentSimilarSlugQuery = (
    args?: UseGetArgs<IPaginatedResponse<InvestmentItem>>,
) => {
    const slug = useSlug()
    const res = useGet<IPaginatedResponse<InvestmentItem>>(
        API.INVESTMENT.INVESTMENT_ITEMS.SLUG_SIMILAR.replace("{slug}", slug),
        args,
    )
    const similarList = getArray(res.data?.results)

    return { ...res, similarList }
}
