import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    differenceInWeeks,
    format,
    isValid,
    isYesterday,
} from "date-fns"
import { DATE } from "../constants/date"

const translations = {
    en: {
        justNow: "Just now",
        fewMinutesAgo: "A few minutes ago",
        minutesAgo: (c: number) => `${c} minutes ago`,
        hoursAgo: (c: number) => `${c} hour${c > 1 ? "s" : ""} ago`,
        yesterdayAt: (time: string) => `Yesterday at ${time}`,
        daysAgo: (c: number) => `${c} days ago`,
        weeksAgo: (c: number) => `${c} week${c > 1 ? "s" : ""} ago`,
    },
    uz: {
        justNow: "Hozirgina",
        fewMinutesAgo: "Bir necha daqiqa oldin",
        minutesAgo: (c: number) => `${c} daqiqa oldin`,
        hoursAgo: (c: number) => `${c} soat oldin`,
        yesterdayAt: (time: string) => `Kecha ${time} da`,
        daysAgo: (c: number) => `${c} kun oldin`,
        weeksAgo: (c: number) => `${c} hafta oldin`,
    },
    ru: {
        justNow: "Только что",
        fewMinutesAgo: "Несколько минут назад",
        minutesAgo: (c: number) => `${c} минут назад`,
        hoursAgo: (c: number) => `${c} час${c > 1 ? "ов" : ""} назад`,
        yesterdayAt: (time: string) => `Вчера в ${time}`,
        daysAgo: (c: number) => `${c} дней назад`,
        weeksAgo: (c: number) => `${c} недель назад`,
    },
    ar: {
        justNow: "الآن",
        fewMinutesAgo: "منذ بضع دقائق",
        minutesAgo: (c: number) => `منذ ${c} دقيقة`,
        hoursAgo: (c: number) => `منذ ${c} ساعة`,
        yesterdayAt: (time: string) => `أمس في ${time}`,
        daysAgo: (c: number) => `منذ ${c} يوم`,
        weeksAgo: (c: number) => `منذ ${c} أسبوع`,
    },
    zh: {
        justNow: "刚刚",
        fewMinutesAgo: "几分钟前",
        minutesAgo: (c: number) => `${c} 分钟前`,
        hoursAgo: (c: number) => `${c} 小时前`,
        yesterdayAt: (time: string) => `昨天 ${time}`,
        daysAgo: (c: number) => `${c} 天前`,
        weeksAgo: (c: number) => `${c} 周前`,
    },
}

export function formatRelativeDate(
    dateStr: string,
    lang: keyof typeof translations = "en",
): string {
    if (typeof dateStr !== "string") return ""

    const date = new Date(dateStr)
    if (!isValid(date)) return ""

    const now = new Date()
    if (date > now) return ""

    const t = translations[lang]

    const secDiff = differenceInSeconds(now, date)
    if (secDiff < 60) return t.justNow

    const minDiff = differenceInMinutes(now, date)
    if (minDiff < 5) return t.fewMinutesAgo
    if (minDiff < 60) return t.minutesAgo(minDiff)

    const hourDiff = differenceInHours(now, date)
    if (hourDiff < 24) return t.hoursAgo(hourDiff)

    if (isYesterday(date)) return t.yesterdayAt(format(date, "HH:mm"))

    const dayDiff = differenceInDays(now, date)
    if (dayDiff < 7) return t.daysAgo(dayDiff)

    const weekDiff = differenceInWeeks(now, date)
    if (weekDiff < 4) return t.weeksAgo(weekDiff)

    return format(date, DATE.SERVER_FORMAT)
}
