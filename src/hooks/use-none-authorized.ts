import { useRouter } from "@/i18n/navigation"
import { getHref } from "@/lib/utils/get-href"
import { useProfileQuery } from "./react-query/use-profile-query"
import { useLastPage } from "./use-last-page"

export function useNoneAuthorized() {
    const { setLastPage } = useLastPage()
    const router = useRouter()
    const { isAuthenticated } = useProfileQuery()

    const redirectToSignIn = (action?: () => void) => {
        if (!isAuthenticated) {
            router.push(getHref({ pathname: "/[locale]/sign-in" }))
            setLastPage()
        } else {
            action?.()
        }
    }

    return { redirectToSignIn }
}
