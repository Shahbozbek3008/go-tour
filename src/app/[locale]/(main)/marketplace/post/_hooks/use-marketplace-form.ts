import { getArray } from "@/lib/utils/get-array"
import { useFormContext } from "react-hook-form"
import { MARKETPLACE_REQUEST_TYPES } from "../../_constants"
import { MarketplaceProductForm } from "../_types"

export const useMarketplaceForm = () => {
    const methods = useFormContext<MarketplaceProductForm>()
    const requestTypeValue = methods.watch("request_type")
    const visibilityType = methods.watch("visibility_type")
    const visibilityPermissionUsersIds = getArray(
        methods.watch("visibility_permission_users_ids"),
    )
    const requestType = MARKETPLACE_REQUEST_TYPES.find(
        (item) => item.key === requestTypeValue,
    )

    return {
        methods,
        requestType,
        visibilityPermissionUsersIds,
        visibilityType,
    }
}
