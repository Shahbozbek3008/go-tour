import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { ProfileInfo } from "@/types/common/profile"

export const useOtherUserInfoQuery = (
    args?: UseGetArgs<ProfileInfo>,
    id?: string,
) => {
    const slug = useSlug(id)
    const res = useGet<ProfileInfo>(
        API.PROFILE.OTHER.USER_INFO.replace("{user_id}", slug),
        args,
    )

    return { ...res }
}
