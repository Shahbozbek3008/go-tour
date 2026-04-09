"use client"

import { cn } from "@/lib/utils/shadcn"
import { Calendar, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

type TabType = "period" | "exact"

interface DateRange {
    from: Date | null
    to: Date | null
}

const MONTHS = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
]

const SEASONS = ["Qish 2026", "Bahor 2026", "Yoz 2026", "Kuz 2026"]
const DURATIONS = ["30 kunlar", "60 kunlar", "90 kunlar", "120 kunlar"]
const HOLIDAYS = ["8 Mart", "May bayramlari", "12–14 Iyun", "1 Sentabr"]
const WEEK_DAYS = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"]

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

interface MonthCalendarProps {
    year: number
    month: number
    range: DateRange
    hovered: Date | null
    onDayClick: (d: Date) => void
    onDayHover: (d: Date | null) => void
}

function MonthCalendar({
    year,
    month,
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
                {MONTHS[month]} {year}
            </p>

            <div className="grid grid-cols-7 mb-1">
                {WEEK_DAYS.map((d) => (
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
                    if (!date) return <div key={`e-${i}`} className="h-9" />

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
                                "flex items-center justify-center h-9",
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
                                    "w-8 h-8 text-[13px] rounded-full flex items-center justify-center transition-all duration-150 relative z-10",
                                    isPast &&
                                        "text-gray-300 cursor-not-allowed",
                                    !isPast &&
                                        !isFrom &&
                                        !isTo &&
                                        "hover:bg-blue-100 cursor-pointer",
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

interface DatePickerProps {
    value?: string
    onChange?: (value: string) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState<TabType>("period")
    const [selected, setSelected] = useState<string | null>(value ?? null)
    const [offset, setOffset] = useState(0)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const [calYear, setCalYear] = useState(today.getFullYear())
    const [calMonth, setCalMonth] = useState(today.getMonth())
    const [range, setRange] = useState<DateRange>({ from: null, to: null })
    const [hovered, setHovered] = useState<Date | null>(null)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Recalculate horizontal offset to prevent viewport overflow
    useEffect(() => {
        if (!open || !wrapperRef.current) return

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
            const target = e.target as Node
            const inWrapper = wrapperRef.current?.contains(target)
            const inDropdown = dropdownRef.current?.contains(target)
            if (!inWrapper && !inDropdown) setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

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
                    `${d.getDate()} ${MONTHS[d.getMonth()]}`
                const label = `${fmt(from)} – ${fmt(to)}`
                setSelected(label)
                onChange?.(label)
                setTimeout(() => setOpen(false), 250)
            }
        },
        [range, onChange],
    )

    const handlePeriodSelect = (label: string) => {
        setSelected(label)
        onChange?.(label)
        setOpen(false)
    }

    return (
        <div ref={wrapperRef} className="relative w-full">
            {/* Trigger button */}
            <button
                onClick={() => setOpen((o) => !o)}
                className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all duration-200 border w-[250px]",
                    open ?
                        "border-blue-400 bg-blue-50/40 shadow-sm"
                    :   "border-transparent hover:border-gray-200 bg-transparent",
                )}
            >
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span
                    className={cn(
                        "flex-1 text-left truncate",
                        selected ? "text-gray-800" : "text-gray-400",
                    )}
                >
                    {selected ?? "Oy yoki sanalar"}
                </span>
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

            {/* Dropdown panel */}
            <div
                ref={dropdownRef}
                style={{ left: offset }}
                className={cn(
                    "absolute top-[calc(100%+8px)] z-[100] bg-white rounded-2xl shadow-2xl border border-gray-100",
                    "transition-all duration-200 origin-top-left",
                    tab === "exact" ? "w-[560px]" : "w-[520px]",
                    open ?
                        "opacity-100 scale-100 pointer-events-auto"
                    :   "opacity-0 scale-95 pointer-events-none",
                )}
            >
                {/* Tab switcher */}
                <div className="flex items-center justify-center gap-2 p-3 border-b border-gray-200">
                    <button
                        onClick={() => setTab("period")}
                        className={cn(
                            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                            tab === "period" ?
                                "bg-blue-500 text-white shadow-sm"
                            :   "text-gray-500 hover:bg-gray-100",
                        )}
                    >
                        <Calendar className="w-3.5 h-3.5" />
                        Oy yoki davr
                    </button>
                    <button
                        onClick={() => setTab("exact")}
                        className={cn(
                            "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                            tab === "exact" ?
                                "bg-blue-500 text-white shadow-sm"
                            :   "text-gray-500 hover:bg-gray-100",
                        )}
                    >
                        <CalendarDays className="w-3.5 h-3.5" />
                        Aniq sanalar
                    </button>
                </div>

                {/* Period tab content */}
                {tab === "period" && (
                    <div className="p-4">
                        <div className="grid grid-cols-4 gap-4">
                            {(
                                [
                                    { title: "OY", items: MONTHS.slice(0, 6) },
                                    { title: "MAVSUM", items: SEASONS },
                                    { title: "KELAJAK", items: DURATIONS },
                                    { title: "BAYRAMLAR", items: HOLIDAYS },
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
                                                    selected === item ?
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

                {/* Exact dates tab content */}
                {tab === "exact" && (
                    <div className="p-4">
                        {range.from && !range.to && (
                            <p className="text-center text-xs text-blue-500 mb-3 font-medium">
                                Tugash sanasini tanlang
                            </p>
                        )}

                        <div className="flex items-start gap-1">
                            <button
                                onClick={prevMonth}
                                className="mt-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-500" />
                            </button>

                            <div className="flex flex-1 gap-2 min-w-0">
                                <MonthCalendar
                                    year={calYear}
                                    month={calMonth}
                                    range={range}
                                    hovered={hovered}
                                    onDayClick={handleDayClick}
                                    onDayHover={setHovered}
                                />
                                <div className="w-px bg-gray-100 self-stretch" />
                                <MonthCalendar
                                    year={secondYear}
                                    month={secondMonth}
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
                                onClick={() => {
                                    setRange({ from: null, to: null })
                                    setSelected(null)
                                    onChange?.("")
                                }}
                                className="text-xs text-gray-400 hover:text-red-400 transition-colors font-medium"
                            >
                                Tozalash
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
