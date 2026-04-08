import { MarketplaceProductDetail } from "@/app/[locale]/(main)/marketplace/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"

export const useProfileMarketplaceSlugQuery = (
    slug: string,
    args?: UseGetArgs<MarketplaceProductDetail>,
) => {
    const res = useGet<MarketplaceProductDetail>(
        API.PROFILE.MARKETPLACE.SLUG.replace("{slug}", slug),
        args,
    )

    return res
}
