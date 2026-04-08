import { format, parse } from "date-fns"

export function removeSeconds(time: string | null): string {
    if (!time) return ""

    try {
        // Try parsing with seconds first
        try {
            const parsed = parse(time, "HH:mm:ss", new Date())
            return format(parsed, "HH:mm")
            // If that fails, try parsing without seconds
        } catch {
            const parsed = parse(time, "HH:mm", new Date())
            return format(parsed, "HH:mm")
        }
        // Return empty string for any invalid format
    } catch {
        return ""
    }
}
