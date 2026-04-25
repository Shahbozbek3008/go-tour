import { useSlug } from "@/app/_providers/slug-provider"
import { useGet, UseGetArgs } from "@/hooks/react-query/use-get"
import { API } from "@/lib/constants/api-endpoints"
import { getArray } from "@/lib/utils/get-array"
import { tour } from "../_constants/mockdata"
import { FilesResponse } from "../_types"

export const useTourFilesQuery = (
    args?: UseGetArgs<FilesResponse[]>,
    slugId?: string,
) => {
    const slug = useSlug(slugId)
    const res = useGet<FilesResponse[]>(
        API.TOUR.TOUR_SLUG_FILES.replace("{slug}", slug),
        args,
    )
    const files = getArray(res.data)

    const images =
        files?.length ?
            {
                main: files?.find((f) => f?.isMain)?.url ?? files[0]?.url,
                gallery: files?.filter((f) => !f?.isMain)?.map((f) => f?.url),
            }
        :   tour.images

    return {
        ...res,
        files,
        images,
    }
}
