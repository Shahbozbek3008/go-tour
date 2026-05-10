const DAYS_SHORT_RU = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
const MONTHS_SHORT_RU = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
]

export function formatDateShort(date: Date): string {
    const day = date.getDate()
    const month = MONTHS_SHORT_RU[date.getMonth()]
    const dow = DAYS_SHORT_RU[date.getDay()]
    return `${day} ${month}, ${dow}`
}

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

export function isBeforeDay(a: Date, b: Date): boolean {
    const aClean = new Date(a.getFullYear(), a.getMonth(), a.getDate())
    const bClean = new Date(b.getFullYear(), b.getMonth(), b.getDate())
    return aClean < bClean
}
