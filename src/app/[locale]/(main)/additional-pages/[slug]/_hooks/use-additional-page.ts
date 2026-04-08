import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { IAdditionalPageDetail } from "../_types"

export const useAdditionalPageQuery = (
    args?: UseGetArgs<IAdditionalPageDetail>,
) => {
    const slug = useSlug()
    const res = useGet<IAdditionalPageDetail>(
        API.EXTRA.ADDITIONAL_PAGE_SLUG.replace("{slug}", slug),
        args,
    )

    return res
}
