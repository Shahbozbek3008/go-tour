import { useRouter } from "@/i18n/navigation"
import { useProfileQuery } from "./react-query/use-profile-query"
import { useLastPage } from "./use-last-page"

export function useNoneAuthorized() {
    const { setLastPage } = useLastPage()
    const router = useRouter()
    const { isAuthenticated } = useProfileQuery()

    const redirectToSignIn = (action?: () => void) => {
        if (!isAuthenticated) {
            // router.push(
            //     getHref({ pathname: "/[locale]/sign-in" as RouteLiteral }),
            // )
            setLastPage()
        } else {
            action?.()
        }
    }

    return { redirectToSignIn }
}
