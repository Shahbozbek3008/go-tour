import { getArray } from "@/lib/utils/get-array"
import { useFormContext } from "react-hook-form"
import { OUTREACH_HUB_TYPES } from "../../_constants"
import { OutreachHubItemForm } from "../_types"

export const useOutreachHubItemForm = () => {
    const methods = useFormContext<OutreachHubItemForm>()
    const requestTypeValue = methods.watch("request_type")
    const requestType = OUTREACH_HUB_TYPES.find(
        (item) => item.key === requestTypeValue,
    )
    const visibilityType = methods.watch("visibility_type")
    const visibilityPermissionUsersIds = getArray(
        methods.watch("visibility_permission_users_ids"),
    )

    return {
        methods,
        requestType,
        visibilityPermissionUsersIds,
        visibilityType,
    }
}
