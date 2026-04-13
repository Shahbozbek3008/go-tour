import { API } from "@/lib/constants/api-endpoints"
import { ClientTokenService } from "@/lib/cookies/client-token-service"
import { AuthResponse } from "@/types/common/profile"
import { useGet, UseGetArgs } from "./use-get"

export const useProfileQuery = (args?: UseGetArgs<AuthResponse>) => {
    const accessToken = ClientTokenService.getAccessToken()
    const res = useGet<AuthResponse>(API.PROFILE.INFO.ME, {
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
