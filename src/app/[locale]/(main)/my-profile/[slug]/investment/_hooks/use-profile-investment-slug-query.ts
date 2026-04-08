import { InvestmentItemDetail } from "@/app/[locale]/(main)/investment/_types"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"

export const useProfileInvestmentSlugQuery = (
    slug: string,
    args?: UseGetArgs<InvestmentItemDetail>,
) => {
    const res = useGet<InvestmentItemDetail>(
        API.PROFILE.INVESTMENT.SLUG.replace("{slug}", slug),
        args,
    )

    return res
}
