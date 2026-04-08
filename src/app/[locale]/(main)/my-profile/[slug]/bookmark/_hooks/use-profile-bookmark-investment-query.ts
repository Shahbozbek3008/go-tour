import { InvestmentItem } from "@/app/[locale]/(main)/investment/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"

export const useProfileBookmarkInvestmentQuery = (
    args?: UseGetArgs<IPaginatedResponse<InvestmentItem>>,
) => {
    const res = useGet<IPaginatedResponse<InvestmentItem>>(
        API.PROFILE.BOOKMARK.INVESTMENT,
        {
            ...args,
        },
    )

    const bookmarkInvestment = getArray(res.data?.results)

    return { ...res, bookmarkInvestment }
}
