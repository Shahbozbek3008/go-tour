import { format, formatDistanceToNow, isValid } from "date-fns"
import { enUS } from "date-fns/locale"

function safeParseDateInput(date: string | Date | undefined): Date | null {
    if (!date) return null

    try {
        const parsedDate = date instanceof Date ? date : new Date(date)
        return isValid(parsedDate) ? parsedDate : null
    } catch (error) {
        console.warn(`Error parsing date: ${date}`, error)
        return null
    }
}

export function formatDate(
    date: string | Date | undefined,
    formatStr: string = "dd.MM.yyyy",
) {
    const parsedDate = safeParseDateInput(date)
    return parsedDate ? format(parsedDate, formatStr) : ""
}
export function formatDateTime(date: string | undefined | Date) {
    const parsedDate = safeParseDateInput(date)
    return parsedDate ? format(parsedDate, "dd.MM.yyyy HH:mm:ss") : ""
}

export function formatTime(date: string | Date | undefined) {
    const parsedDate = safeParseDateInput(date)
    return parsedDate ? format(parsedDate, "hh:mm a") : ""
}

export function formatDistance(date: string | Date | undefined) {
    const parsedDate = safeParseDateInput(date)
    if (!parsedDate) return ""
    return formatDistanceToNow(parsedDate, {
        addSuffix: true,
        locale: enUS,
    })
}
