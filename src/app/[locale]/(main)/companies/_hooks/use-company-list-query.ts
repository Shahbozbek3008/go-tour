import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import useSearch from "@/hooks/use-search"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"
import { CompanyItem } from "../_types"

export const useCompanyListQuery = (
    args?: UseGetArgs<IPaginatedResponse<CompanyItem>>,
) => {
    const params = useSearch()
    const res = useGet<IPaginatedResponse<CompanyItem>>(API.EXTRA.COMPANIES, {
        params: {
            page_size: 12,
            ...params,
        },
        ...args,
    })
    const companyList = getArray(res.data?.results)

    return { ...res, companyList }
}
