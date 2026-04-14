import { UseGetArgs, useGet } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { Footer } from "./footer"

export const useMainSiteInfoQuery = (args?: UseGetArgs<Footer>) => {
    const res = useGet<Footer>(API.EXTRA.MAIN_SITE_INFO, { ...args })
    return { ...res }
}
