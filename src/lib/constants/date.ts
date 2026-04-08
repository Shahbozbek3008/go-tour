export const DATE = {
    SERVER_FORMAT: "yyyy-MM-dd",
    FROM: "start_date",
    TO: "end_date",
    YEAR: "year",
    MONTH: "month",
} as const

export enum WeekdayId {
    Monday = "1",
    Tuesday = "2",
    Wednesday = "3",
    Thursday = "4",
    Friday = "5",
    Saturday = "6",
    Sunday = "7",
}

export enum WeekdayName {
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
    Sunday = "sunday",
}

export const WEEKDAY_NAMES: Record<WeekdayId, WeekdayName> = {
    [WeekdayId.Monday]: WeekdayName.Monday,
    [WeekdayId.Tuesday]: WeekdayName.Tuesday,
    [WeekdayId.Wednesday]: WeekdayName.Wednesday,
    [WeekdayId.Thursday]: WeekdayName.Thursday,
    [WeekdayId.Friday]: WeekdayName.Friday,
    [WeekdayId.Saturday]: WeekdayName.Saturday,
    [WeekdayId.Sunday]: WeekdayName.Sunday,
}

export interface Weekday {
    id: WeekdayId
    name: WeekdayName
}

export const WEEKDAYS: readonly Weekday[] = Object.entries(WEEKDAY_NAMES).map(
    ([id, name]) => ({
        id: id as WeekdayId,
        name,
    }),
)

export const SHORT_MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
] as const
