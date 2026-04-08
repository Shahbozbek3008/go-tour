import { usePathname } from "@/i18n/navigation"
import { useLastPagePersist } from "./store/use-last-page-persist"

export const useLastPage = () => {
    const pathname = usePathname()
    const { setLastPageState } = useLastPagePersist()

    function setLastPage() {
        setLastPageState({ lastPage: pathname })
    }
    return { setLastPage }
}
