import { OutreachhubItem } from "@/app/[locale]/(main)/outreach-hub/_types"
import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { IPaginatedResponse } from "@/types/common"

export const useOtherOutreachHubItemQuery = (
    args?: UseGetArgs<IPaginatedResponse<OutreachhubItem>>,
) => {
    const slug = useSlug()
    const res = useGet<IPaginatedResponse<OutreachhubItem>>(
        API.PROFILE.OUTREACH_HUB.OTHER_USER_ID.replace("{user_id}", slug),
        {
            ...args,
        },
    )

    const otherOutreachHubItems = getArray(res.data?.results)

    return { ...res, otherOutreachHubItems }
}
