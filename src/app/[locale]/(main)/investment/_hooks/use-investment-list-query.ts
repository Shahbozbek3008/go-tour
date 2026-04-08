import { UseGetArgs, useGet } from "@/hooks/react-query/use-get"
import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { InvestmentItem } from "../_types"

export const useInvestmentListQuery = (
    args?: UseGetArgs<IPaginatedResponse<InvestmentItem>>,
) => {
    const params = useSearch()
    const res = useGet<IPaginatedResponse<InvestmentItem>>(
        API.INVESTMENT.INVESTMENT_ITEMS.INDEX,
        {
            params: {
                page_size: 12,
                ...params,
            },
            ...args,
        },
    )
    const investmentList = getArray(res.data?.results)

    return { ...res, investmentList }
}
