import { getArray } from "@/lib/utils/get-array"
import { useFormContext } from "react-hook-form"
import { INVESTMENT_REQUEST_TYPES } from "../../_constants"
import { InvestmentItemForm } from "../_types"

export const useInvestmentForm = () => {
    const methods = useFormContext<InvestmentItemForm>()
    const requestTypeValue = methods.watch("request_type")
    const requestType = INVESTMENT_REQUEST_TYPES.find(
        (item) => item.key === requestTypeValue,
    )
    const visibilityType = methods.watch("visibility_type")
    const visibilityPermissionUsersIds = getArray(
        methods.watch("visible_connections"),
    )

    return {
        methods,
        requestType,
        visibilityPermissionUsersIds,
        visibilityType,
    }
}
