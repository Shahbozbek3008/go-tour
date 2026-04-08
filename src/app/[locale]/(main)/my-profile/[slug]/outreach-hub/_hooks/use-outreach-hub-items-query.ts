import { OutreachhubItem } from "@/app/[locale]/(main)/outreach-hub/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"

export const useOutreachhubItemQuery = (
    args?: UseGetArgs<IPaginatedResponse<OutreachhubItem>>,
) => {
    const res = useGet<IPaginatedResponse<OutreachhubItem>>(
        API.PROFILE.OUTREACH_HUB.ITEMS,
        {
            ...args,
        },
    )

    const outreachhubItems = getArray(res.data?.results)

    return { ...res, outreachhubItems }
}
