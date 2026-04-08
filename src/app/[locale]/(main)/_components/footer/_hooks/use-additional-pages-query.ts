import { UseGetArgs, useGet } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { IAdditionalPageDetail } from "../../../additional-pages/[slug]/_types"

export const useAdditionalPagesQuery = (
    args?: UseGetArgs<IPaginatedResponse<IAdditionalPageDetail>>,
) => {
    const res = useGet<IPaginatedResponse<IAdditionalPageDetail>>(
        API.EXTRA.ADDITIONAL_PAGES,
        {
            params: {
                page_size: 100,
            },
            ...args,
        },
    )
    const additionalPages = getArray(res.data?.results)

    return { ...res, additionalPages }
}
