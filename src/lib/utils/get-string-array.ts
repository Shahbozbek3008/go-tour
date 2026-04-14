import { getArray } from "@/lib/utils/get-array"

export const getStringArray = (arr: string[] | undefined) => {
    return getArray(arr).filter((item) => !!item && typeof item === "string")
}
