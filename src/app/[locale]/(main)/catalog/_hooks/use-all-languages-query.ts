import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { Language } from "../_types"

export const useAllLanguagesQuery = (args?: UseGetArgs<Language[]>) => {
    const res = useGet<Language[]>(API.ALL_LANGUAGES, args)

    const allLanguages = getArray(res?.data)

    return { ...res, allLanguages }
}
