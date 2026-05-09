"use client"

import { cn } from "@/lib/utils/shadcn"
import {
    Calendar,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import ClientTranslate from "../common/translation/client-translate"

type TabType = "period" | "exact"

interface DateRange {
    from: Date | null
    to: Date | null
}

const MONTH_KEYS = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
] as const

const WEEK_DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const
const SEASON_KEYS = ["winter", "spring", "summer", "autumn"] as const
const DURATION_KEYS = ["days30", "days60", "days90", "days120"] as const
const HOLIDAY_KEYS = [
    "holiday8March",
    "holidayMay",
    "holidayJune",
    "holidaySeptember",
] as const

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

function isBetween(date: Date, from: Date, to: Date) {
    return date > from && date < to
}

function formatDate(date: Date, monthNames: readonly string[]): string {
    const d = date.getDate().toString().padStart(2, "0")
    const m = monthNames[date.getMonth()].slice(0, 3)
    const y = date.getFullYear()
    return `${d} ${m} ${y}`
}

function getPresetRange(
    label: string,
    options: {
        monthNames: readonly string[]
        seasons: readonly string[]
        durations: readonly string[]
        holidays: readonly string[]
    },
): { from: Date; to: Date } | null {
    const currentYear = new Date().getFullYear()
    const monthIndex = options.monthNames.indexOf(label)
    if (monthIndex !== -1) {
        return {
            from: new Date(currentYear, monthIndex, 1),
            to: new Date(
                currentYear,
                monthIndex,
                getDaysInMonth(currentYear, monthIndex),
            ),
        }
    }

    if (label === options.seasons[0]) {
        return { from: new Date(2026, 0, 1), to: new Date(2026, 1, 28) }
    }
    if (label === options.seasons[1]) {
        return { from: new Date(2026, 2, 1), to: new Date(2026, 4, 31) }
    }
    if (label === options.seasons[2]) {
        return { from: new Date(2026, 5, 1), to: new Date(2026, 7, 31) }
    }
    if (label === options.seasons[3]) {
        return { from: new Date(2026, 8, 1), to: new Date(2026, 10, 30) }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (label === options.durations[0]) {
        const to = new Date(today)
        to.setDate(to.getDate() + 29)
        return { from: today, to }
    }
    if (label === options.durations[1]) {
        const to = new Date(today)
        to.setDate(to.getDate() + 59)
        return { from: today, to }
    }
    if (label === options.durations[2]) {
        const to = new Date(today)
        to.setDate(to.getDate() + 89)
        return { from: today, to }
    }
    if (label === options.durations[3]) {
        const to = new Date(today)
        to.setDate(to.getDate() + 119)
        return { from: today, to }
    }

    if (label === options.holidays[0]) {
        return { from: new Date(2026, 2, 8), to: new Date(2026, 2, 9) }
    }
    if (label === options.holidays[1]) {
        return { from: new Date(2026, 4, 9), to: new Date(2026, 4, 11) }
    }
    if (label === options.holidays[2]) {
        return { from: new Date(2026, 5, 12), to: new Date(2026, 5, 14) }
    }
    if (label === options.holidays[3]) {
        return { from: new Date(2026, 8, 1), to: new Date(2026, 8, 1) }
    }

    return null
}

interface MonthCalendarProps {
    year: number
    month: number
    monthNames: readonly string[]
    weekDays: readonly string[]
    range: DateRange
    hovered: Date | null
    onDayClick: (d: Date) => void
    onDayHover: (d: Date | null) => void
}

function MonthCalendar({
    year,
    month,
    monthNames,
    weekDays,
    range,
    hovered,
    onDayClick,
    onDayHover,
}: MonthCalendarProps) {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const todayMidnight = new Date()
    todayMidnight.setHours(0, 0, 0, 0)

    const cells: (Date | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from(
            { length: daysInMonth },
            (_, i) => new Date(year, month, i + 1),
        ),
    ]

    const effectiveTo =
        range.to ??
        (range.from && hovered && hovered > range.from ? hovered : null)

    return (
        <div className="flex-1 min-w-0">
            <p className="text-center text-sm font-semibold text-gray-800 mb-3">
                {monthNames[month]} {year}
            </p>

            <div className="grid grid-cols-7 mb-1">
                {weekDays.map((d) => (
                    <div
                        key={d}
                        className="text-center text-[11px] font-medium text-gray-400 py-1"
                    >
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {cells.map((date, i) => {
                    if (!date)
                        return <div key={`e-${i}`} className="h-9 md:h-9" />

                    const isPast = date < todayMidnight
                    const isToday = isSameDay(date, todayMidnight)
                    const isFrom = !!(range.from && isSameDay(date, range.from))
                    const isTo = !!(effectiveTo && isSameDay(date, effectiveTo))
                    const inRange = !!(
                        range.from &&
                        effectiveTo &&
                        range.from < effectiveTo &&
                        isBetween(date, range.from, effectiveTo)
                    )
                    const isSunday = date.getDay() === 0

                    return (
                        <div
                            key={date.getTime()}
                            className={cn(
                                "flex items-center justify-center h-10 md:h-9",
                                inRange && "bg-blue-50",
                                isFrom && !isTo && "rounded-l-full bg-blue-50",
                                isTo && !isFrom && "rounded-r-full bg-blue-50",
                            )}
                        >
                            <button
                                onClick={() => !isPast && onDayClick(date)}
                                onMouseEnter={() => onDayHover(date)}
                                onMouseLeave={() => onDayHover(null)}
                                disabled={isPast}
                                className={cn(
                                    "w-9 h-9 md:w-8 md:h-8 text-[13px] rounded-full flex items-center justify-center transition-all duration-150 relative z-10",
                                    isPast &&
                                        "text-gray-300 cursor-not-allowed",
                                    !isPast &&
                                        !isFrom &&
                                        !isTo &&
                                        "hover:bg-blue-100 cursor-pointer active:bg-blue-200",
                                    !isPast &&
                                        !isFrom &&
                                        !isTo &&
                                        isSunday &&
                                        "text-red-500",
                                    !isPast &&
                                        !isFrom &&
                                        !isTo &&
                                        !isSunday &&
                                        "text-gray-700",
                                    isToday &&
                                        !isFrom &&
                                        !isTo &&
                                        "font-bold ring-1 ring-blue-300 text-blue-600",
                                    (isFrom || isTo) &&
                                        "bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600",
                                )}
                            >
                                {date.getDate()}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ─── Mobile Period Tab ───────────────────────────────────────────────────────
// Mobileda alohida, qulay section-lar bilan ko'rsatiladi

type MobilePeriodSection = "months" | "seasons" | "durations" | "holidays"

function MobilePeriodTab({
    selected,
    onSelect,
    monthNames,
    seasons,
    durations,
    holidays,
    periodLabels,
}: {
    selected: string | null
    onSelect: (label: string) => void
    monthNames: readonly string[]
    seasons: readonly string[]
    durations: readonly string[]
    holidays: readonly string[]
    periodLabels: {
        month: string
        season: string
        duration: string
        holiday: string
    }
}) {
    const [activeSection, setActiveSection] =
        useState<MobilePeriodSection>("months")

    const sections: {
        key: MobilePeriodSection
        label: string
        emoji: string
        items: string[]
    }[] = [
        {
            key: "months",
            label: periodLabels.month,
            emoji: "📅",
            items: [...monthNames],
        },
        {
            key: "seasons",
            label: periodLabels.season,
            emoji: "🌤",
            items: [...seasons],
        },
        {
            key: "durations",
            label: periodLabels.duration,
            emoji: "⏱",
            items: [...durations],
        },
        {
            key: "holidays",
            label: periodLabels.holiday,
            emoji: "🎉",
            items: [...holidays],
        },
    ]

    const activeItems =
        sections.find((s) => s.key === activeSection)?.items ?? []

    return (
        <div className="flex flex-col h-full">
            {/* Segment control - top */}
            <div className="flex gap-1.5 p-3 pb-2">
                {sections.map((s) => (
                    <button
                        key={s.key}
                        onClick={() => setActiveSection(s.key)}
                        className={cn(
                            "flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 rounded-xl text-[11px] font-semibold transition-all duration-200",
                            activeSection === s.key ?
                                "bg-blue-500 text-white shadow-sm"
                            :   "bg-gray-100 text-gray-500 active:bg-gray-200",
                        )}
                    >
                        <span className="text-base leading-none">
                            {s.emoji}
                        </span>
                        <span>{s.label}</span>
                    </button>
                ))}
            </div>

            {/* Items grid */}
            <div className="flex-1 overflow-y-auto px-3 pb-4">
                {
                    activeSection === "months" ?
                        // Oylar uchun 3 ustunli grid
                        <div className="grid grid-cols-3 gap-2 pt-1">
                            {activeItems.map((item) => {
                                const isSelected = selected?.includes(item)
                                return (
                                    <button
                                        key={item}
                                        onClick={() => onSelect(item)}
                                        className={cn(
                                            "py-3 px-2 rounded-xl text-sm font-medium transition-all duration-150 active:scale-95",
                                            isSelected ?
                                                "bg-blue-500 text-white shadow-sm"
                                            :   "bg-gray-50 text-gray-700 active:bg-gray-100 border border-gray-100",
                                        )}
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                        // Qolganlar uchun to'liq kenglikdagi list
                    :   <div className="flex flex-col gap-2 pt-1">
                            {activeItems.map((item) => {
                                const isSelected = selected?.includes(item)
                                return (
                                    <button
                                        key={item}
                                        onClick={() => onSelect(item)}
                                        className={cn(
                                            "w-full py-3.5 px-4 rounded-xl text-sm font-medium text-left transition-all duration-150 active:scale-[0.98] flex items-center justify-between",
                                            isSelected ?
                                                "bg-blue-500 text-white shadow-sm"
                                            :   "bg-gray-50 text-gray-700 active:bg-gray-100 border border-gray-100",
                                        )}
                                    >
                                        <span>{item}</span>
                                        {isSelected && (
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                }
            </div>
        </div>
    )
}

// ─── Mobile Exact Tab ────────────────────────────────────────────────────────
// Mobileda bitta oy ko'rsatiladi, pastga scroll qilib ikkinchisini ko'radi

function MobileExactTab({
    calYear,
    calMonth,
    monthNames,
    weekDays,
    range,
    hovered,
    onDayClick,
    onDayHover,
    onPrev,
    onNext,
    onClear,
    secondYear,
    secondMonth,
}: {
    calYear: number
    calMonth: number
    monthNames: readonly string[]
    weekDays: readonly string[]
    range: DateRange
    hovered: Date | null
    onDayClick: (d: Date) => void
    onDayHover: (d: Date | null) => void
    onPrev: () => void
    onNext: () => void
    onClear: () => void
    secondYear: number
    secondMonth: number
}) {
    return (
        <div className="flex flex-col">
            {/* Range hint */}
            {range.from && !range.to && (
                <div className="mx-4 mb-2 py-2.5 px-4 bg-blue-50 rounded-xl">
                    <p className="text-center text-xs text-blue-600 font-medium">
                        <ClientTranslate translationKey="selectEndDate" />
                    </p>
                </div>
            )}

            {/* Selected range display */}
            {range.from && range.to && (
                <div className="mx-4 mb-2 py-2.5 px-4 bg-blue-500 rounded-xl flex items-center justify-between">
                    <span className="text-xs text-white font-medium">
                        {formatDate(range.from, monthNames)} –{" "}
                        {formatDate(range.to, monthNames)}
                    </span>
                    <button
                        onClick={onClear}
                        className="text-white/80 active:text-white"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}

            {/* Month navigation */}
            <div className="flex items-center justify-between px-4 py-2">
                <button
                    onClick={onPrev}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-sm font-semibold text-gray-700">
                    {monthNames[calMonth]} {calYear}
                </span>
                <button
                    onClick={onNext}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Current month calendar */}
            <div className="px-3 pb-2">
                <MonthCalendar
                    year={calYear}
                    month={calMonth}
                    monthNames={monthNames}
                    weekDays={weekDays}
                    range={range}
                    hovered={hovered}
                    onDayClick={onDayClick}
                    onDayHover={onDayHover}
                />
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mx-4 my-2" />

            {/* Second month navigation */}
            <div className="flex items-center justify-between px-4 py-2">
                <div className="w-10 h-10" />
                <span className="text-sm font-semibold text-gray-700">
                    {monthNames[secondMonth]} {secondYear}
                </span>
                <div className="w-10 h-10" />
            </div>

            {/* Second month calendar */}
            <div className="px-3 pb-4">
                <MonthCalendar
                    year={secondYear}
                    month={secondMonth}
                    monthNames={monthNames}
                    weekDays={weekDays}
                    range={range}
                    hovered={hovered}
                    onDayClick={onDayClick}
                    onDayHover={onDayHover}
                />
            </div>

            {/* Clear button */}
            {!range.from && !range.to ? null : (
                <div className="flex justify-center pb-4">
                    <button
                        onClick={onClear}
                        className="text-xs text-gray-400 active:text-red-400 transition-colors font-medium px-4 py-2"
                    >
                        <ClientTranslate translationKey="clear" />
                    </button>
                </div>
            )}
        </div>
    )
}

// ─── Main DatePicker ─────────────────────────────────────────────────────────

interface DatePickerProps {
    value?: string
    defaultRange?: DateRange
    onChange?: (value: string, range: DateRange) => void
}

export function DatePicker({ value, onChange, defaultRange }: DatePickerProps) {
    const t = useTranslations()
    const locale = useLocale()
    const monthNames = useMemo(() => MONTH_KEYS.map((k) => t(k)), [locale, t])
    const weekDays = useMemo(() => WEEK_DAY_KEYS.map((k) => t(k)), [locale, t])
    const seasons = useMemo(
        () => SEASON_KEYS.map((k) => `${t(k)} 2026`),
        [locale, t],
    )
    const durations = useMemo(
        () => DURATION_KEYS.map((k) => t(k)),
        [locale, t],
    )
    const holidays = useMemo(
        () => HOLIDAY_KEYS.map((k) => t(k)),
        [locale, t],
    )
    const periodLabels = useMemo(
        () => ({
            month: t("periodMonthLabel"),
            season: t("periodSeasonLabel"),
            duration: t("periodDurationLabel"),
            holiday: t("periodHolidayLabel"),
        }),
        [locale, t],
    )
    const desktopColumnTitles = useMemo(
        () => [
            t("monthSection"),
            t("seasonSection"),
            t("futureSection"),
            t("holidaysSection"),
        ],
        [locale, t],
    )

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState<TabType>("period")
    const [selected, setSelected] = useState<string | null>(value ?? null)
    const [offset, setOffset] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const [calYear, setCalYear] = useState(today.getFullYear())
    const [calMonth, setCalMonth] = useState(today.getMonth())
    const [range, setRange] = useState<DateRange>(
        defaultRange ?? { from: null, to: null },
    )
    const [hovered, setHovered] = useState<Date | null>(null)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    useEffect(() => {
        if (defaultRange) {
            setRange(defaultRange)
            if (defaultRange.from && defaultRange.to) {
                const fmt = (d: Date) =>
                    `${d.getDate()} ${monthNames[d.getMonth()]}`
                setSelected(
                    `${fmt(defaultRange.from)} – ${fmt(defaultRange.to)}`,
                )
            } else if (defaultRange.from) {
                const fmt = (d: Date) =>
                    `${d.getDate()} ${monthNames[d.getMonth()]}`
                setSelected(fmt(defaultRange.from))
            } else {
                setSelected(null)
            }
        }
    }, [defaultRange, monthNames])

    // Body scroll lock when mobile modal is open
    useEffect(() => {
        if (isMobile && open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isMobile, open])

    const wrapperRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open || !wrapperRef.current) return

        if (window.innerWidth < 768) {
            setOffset(0)
            return
        }

        const triggerRect = wrapperRef.current.getBoundingClientRect()
        const dropWidth = tab === "exact" ? 560 : 520
        const vw = window.innerWidth
        const gap = 12

        const rightEdge = triggerRect.left + dropWidth
        if (rightEdge > vw - gap) {
            setOffset(-(rightEdge - vw + gap))
        } else {
            setOffset(0)
        }
    }, [open, tab])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (isMobile) return // Mobile modal backdrop handles closing
            const target = e.target as Node
            const inWrapper = wrapperRef.current?.contains(target)
            const inDropdown = dropdownRef.current?.contains(target)
            if (!inWrapper && !inDropdown) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [isMobile])

    const nextMonth = () => {
        if (calMonth === 11) {
            setCalMonth(0)
            setCalYear((y) => y + 1)
        } else setCalMonth((m) => m + 1)
    }

    const prevMonth = () => {
        if (calMonth === 0) {
            setCalMonth(11)
            setCalYear((y) => y - 1)
        } else setCalMonth((m) => m - 1)
    }

    const secondMonth = calMonth === 11 ? 0 : calMonth + 1
    const secondYear = calMonth === 11 ? calYear + 1 : calYear

    const handleDayClick = useCallback(
        (date: Date) => {
            if (!range.from || (range.from && range.to)) {
                setRange({ from: date, to: null })
            } else {
                const from = date < range.from ? date : range.from
                const to = date < range.from ? range.from : date
                setRange({ from, to })

                const fmt = (d: Date) =>
                    `${d.getDate()} ${monthNames[d.getMonth()]}`
                const label = `${fmt(from)} – ${fmt(to)}`
                setSelected(label)
                onChange?.(label, { from, to })
                setTimeout(() => setOpen(false), 250)
            }
        },
        [range, onChange, monthNames],
    )

    const handlePeriodSelect = (label: string) => {
        const r = getPresetRange(label, {
            monthNames,
            seasons,
            durations,
            holidays,
        })
        if (r) {
            const localizedDateLabel =
                `${formatDate(r.from, monthNames)} – ${formatDate(r.to, monthNames)}`
            setSelected(localizedDateLabel)
            onChange?.(localizedDateLabel, r)
        } else {
            setSelected(label)
            onChange?.(label, { from: null, to: null })
        }
        setOpen(false)
    }

    const handleClear = () => {
        setRange({ from: null, to: null })
        setSelected(null)
        onChange?.("", { from: null, to: null })
    }

    // ── Trigger button (shared) ──────────────────────────────────────────────
    const triggerButton = (
        <button
            onClick={() => setOpen((o) => !o)}
            className={cn(
                "flex items-center gap-2 px-5 md:px-4 h-10 lg:h-[46px] bg-white rounded-2xl md:rounded-xl text-[15px] md:text-sm transition-all duration-200 border w-full min-w-[250px]",
                open ?
                    "border-blue-400 shadow-sm"
                :   "border-gray-100 hover:border-transparent md:hover:border-gray-200",
            )}
        >
            <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400 shrink-0" />
            <span
                className={cn(
                    "flex-1 text-left truncate lg:text-sm text-xs",
                    selected ? "text-gray-800" : "text-gray-400",
                )}
            >
                {selected ?? (
                    <ClientTranslate translationKey="whenDoYouWantToGo" />
                )}
            </span>
            {selected && (
                <X
                    className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleClear()
                    }}
                />
            )}
            <svg
                className={cn(
                    "w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0",
                    open && "rotate-180",
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>
    )

    // ── Tab header (shared logic, different style per breakpoint) ────────────
    const tabHeader = (
        <div className="flex items-center justify-center gap-2 p-3 border-b border-gray-200">
            <button
                onClick={() => setTab("period")}
                className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    tab === "period" ?
                        "bg-blue-500 text-white shadow-sm"
                    :   "text-gray-500 hover:bg-gray-100 active:bg-gray-200",
                )}
            >
                <Calendar className="w-3.5 h-3.5" />
                <ClientTranslate translationKey="monthOrPeriod" />
            </button>
            <button
                onClick={() => setTab("exact")}
                className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    tab === "exact" ?
                        "bg-blue-500 text-white shadow-sm"
                    :   "text-gray-500 hover:bg-gray-100 active:bg-gray-200",
                )}
            >
                <CalendarDays className="w-3.5 h-3.5" />
                <ClientTranslate translationKey="exactDates" />
            </button>
        </div>
    )

    // ── MOBILE: Bottom sheet modal ───────────────────────────────────────────
    if (isMobile) {
        return (
            <div ref={wrapperRef} className="relative w-full">
                {triggerButton}

                {/* Backdrop */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black/30 z-[490] backdrop-blur-[2px]"
                        onClick={() => setOpen(false)}
                    />
                )}

                {/* Bottom sheet */}
                <div
                    className={cn(
                        "fixed bottom-0 left-0 right-0 z-[500] bg-white rounded-t-3xl shadow-2xl",
                        "transition-transform duration-300 ease-out",
                        "flex flex-col",
                        open ? "translate-y-0" : "translate-y-full",
                    )}
                    style={{
                        maxHeight: "calc(90dvh - 64px)",
                        bottom: "64px",
                        paddingBottom: "env(safe-area-inset-bottom)",
                    }}
                >
                    {/* Handle bar */}
                    <div className="flex justify-center pt-3 pb-1 shrink-0">
                        <div className="w-10 h-1 bg-gray-300 rounded-full" />
                    </div>

                    {/* Close button */}
                    <div className="flex items-center justify-between px-4 pb-2 shrink-0">
                        <span className="text-base font-semibold text-gray-800">
                            {tab === "period" ?
                                <ClientTranslate translationKey="monthOrPeriod" />
                            :   <ClientTranslate translationKey="exactDates" />}
                        </span>
                        <button
                            onClick={() => setOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    {/* Tab switcher */}
                    <div className="shrink-0">{tabHeader}</div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto overscroll-contain">
                        {tab === "period" && (
                            <MobilePeriodTab
                                selected={selected}
                                onSelect={handlePeriodSelect}
                                monthNames={monthNames}
                                seasons={seasons}
                                durations={durations}
                                holidays={holidays}
                                periodLabels={periodLabels}
                            />
                        )}
                        {tab === "exact" && (
                            <MobileExactTab
                                calYear={calYear}
                                calMonth={calMonth}
                                monthNames={monthNames}
                                weekDays={weekDays}
                                range={range}
                                hovered={hovered}
                                onDayClick={handleDayClick}
                                onDayHover={setHovered}
                                onPrev={prevMonth}
                                onNext={nextMonth}
                                onClear={handleClear}
                                secondYear={secondYear}
                                secondMonth={secondMonth}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // ── DESKTOP / TABLET: original dropdown ─────────────────────────────────
    return (
        <div ref={wrapperRef} className="relative w-full">
            {triggerButton}

            <div
                ref={dropdownRef}
                style={{ left: offset }}
                className={cn(
                    "absolute top-[calc(100%+8px)] left-auto z-[500] bg-white rounded-2xl shadow-2xl border border-gray-100",
                    "transition-all duration-200 origin-top overflow-visible",
                    tab === "exact" ? "w-[560px]" : "w-[520px]",
                    open ?
                        "opacity-100 scale-100 pointer-events-auto"
                    :   "opacity-0 scale-95 pointer-events-none",
                )}
            >
                {tabHeader}

                {tab === "period" && (
                    <div className="p-4">
                        <div className="grid grid-cols-4 gap-4">
                            {(
                                [
                                    { title: desktopColumnTitles[0], items: monthNames.slice(0, 6) },
                                    { title: desktopColumnTitles[1], items: seasons },
                                    { title: desktopColumnTitles[2], items: durations },
                                    { title: desktopColumnTitles[3], items: holidays },
                                ] as const
                            ).map(({ title, items }) => (
                                <div key={title}>
                                    <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-2 uppercase px-1">
                                        {title}
                                    </p>
                                    <div className="flex flex-col gap-0.5">
                                        {items.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() =>
                                                    handlePeriodSelect(item)
                                                }
                                                className={cn(
                                                    "text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 font-medium",
                                                    selected?.includes(item) ?
                                                        "bg-blue-500 text-white"
                                                    :   "text-gray-700 hover:bg-gray-100",
                                                )}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "exact" && (
                    <div className="p-4">
                        {range.from && !range.to && (
                            <p className="text-center text-xs text-blue-500 mb-3 font-medium">
                                <ClientTranslate translationKey="selectEndDate" />
                            </p>
                        )}

                        <div className="flex items-start gap-1 relative">
                            <button
                                onClick={prevMonth}
                                className="mt-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-500" />
                            </button>

                            <div className="flex flex-row flex-1 gap-2 min-w-0">
                                <MonthCalendar
                                    year={calYear}
                                    month={calMonth}
                                    monthNames={monthNames}
                                    weekDays={weekDays}
                                    range={range}
                                    hovered={hovered}
                                    onDayClick={handleDayClick}
                                    onDayHover={setHovered}
                                />
                                <div className="w-px bg-gray-100 self-stretch" />
                                <MonthCalendar
                                    year={secondYear}
                                    month={secondMonth}
                                    monthNames={monthNames}
                                    weekDays={weekDays}
                                    range={range}
                                    hovered={hovered}
                                    onDayClick={handleDayClick}
                                    onDayHover={setHovered}
                                />
                            </div>

                            <button
                                onClick={nextMonth}
                                className="mt-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
                            >
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                            <button
                                onClick={handleClear}
                                className="text-xs text-gray-400 hover:text-red-400 transition-colors font-medium"
                            >
                                <ClientTranslate translationKey="clear" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
