import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { Partner } from "./partner"

export const usePartnesQuery = (args?: UseGetArgs<Partner[]>) => {
    const res = useGet<Partner[]>(API.EXTRA.PARTNERS, { ...args })
    const partners = getArray(res.data)
    return { ...res, partners }
}
