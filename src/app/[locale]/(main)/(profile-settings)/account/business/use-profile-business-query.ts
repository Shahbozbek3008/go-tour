import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { IProfileBusiness } from "./types"

export const useProfileBusinessQuery = (
    args?: UseGetArgs<IProfileBusiness>,
) => {
    const res = useGet<IProfileBusiness>(API.PROFILE.BUSINESS, {
        ...args,
    })

    return { ...res }
}
