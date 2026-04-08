import { API } from "@/lib/constants/api-endpoints"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { ProfileInfo } from "@/types/common/profile"
import { useGet, UseGetArgs } from "./use-get"

export const useProfileQuery = (args?: UseGetArgs<ProfileInfo>) => {
    const accessToken = ClientTokenService.getAccessToken()
    const res = useGet<ProfileInfo>(API.PROFILE.INFO.ME, {
        options: {
            refetchOnMount: false,
            retryOnMount: false,
            enabled: !!accessToken,
        },
        ...args,
    })

    const isAuthenticated =
        !res.error && !!Object.entries(res.data || {}).length

    return { ...res, isAuthenticated }
}
