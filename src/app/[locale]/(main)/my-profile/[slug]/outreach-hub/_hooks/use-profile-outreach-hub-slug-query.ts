import { OutreachhubItemDetail } from "@/app/[locale]/(main)/outreach-hub/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"

export const useProfileOutreachHubSlugQuery = (
    slug: string,
    args?: UseGetArgs<OutreachhubItemDetail>,
) => {
    const res = useGet<OutreachhubItemDetail>(
        API.PROFILE.OUTREACH_HUB.SLUG.replace("{slug}", slug),
        args,
    )

    return res
}
