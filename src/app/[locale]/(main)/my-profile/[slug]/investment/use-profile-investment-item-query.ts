import { InvestmentItem } from "@/app/[locale]/(main)/investment/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"

export const useProfileInvestmentItemsQuery = (
    args?: UseGetArgs<IPaginatedResponse<InvestmentItem>>,
) => {
    const res = useGet<IPaginatedResponse<InvestmentItem>>(
        API.PROFILE.INVESTMENT.ITEMS,
        {
            ...args,
        },
    )

    const activeItems = getArray(res.data?.results)

    return { ...res, activeItems }
}
