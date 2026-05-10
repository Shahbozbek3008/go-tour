"use client"

import { formatDateShort } from "@/lib/utils/date-utils"
import { cn } from "@/lib/utils/shadcn"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { DAYS_SHORT, MONTHS_RU } from "../../../_constants/mockdata"
import { useCalendar } from "../../../_hooks/use-calendar"

interface DateRangePickerProps {
    departureDate: Date | null
    returnDate: Date | null
    onDepartureSelect: (date: Date) => void
    onReturnSelect: (date: Date) => void
}

type PickerMode = "departure" | "return" | null

interface CalendarDropdownProps {
    viewMonth: number
    viewYear: number
    daysInMonth: number
    offset: number
    onPrev: () => void
    onNext: () => void
    getDayClassName: (day: number) => string
    onDayClick: (day: number) => void
    hint: string
}

function CalendarDropdown({
    viewMonth,
    viewYear,
    daysInMonth,
    offset,
    onPrev,
    onNext,
    getDayClassName,
    onDayClick,
    hint,
}: CalendarDropdownProps) {
    return (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[280px] rounded-[8px] border border-[0.5px] border-lime-500 bg-background p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <div className="mb-3 flex items-center justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Предыдущий месяц"
                    className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[0.5px] border-border bg-muted text-muted-foreground transition-colors hover:bg-border"
                >
                    <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <span className="font-display text-sm font-semibold text-foreground">
                    {MONTHS_RU[viewMonth]} {viewYear}
                </span>
                <button
                    type="button"
                    onClick={onNext}
                    aria-label="Следующий месяц"
                    className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[0.5px] border-border bg-muted text-muted-foreground transition-colors hover:bg-border"
                >
                    <ChevronRightIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-0.5">
                {DAYS_SHORT.map((d) => (
                    <div
                        key={d}
                        className="py-1 text-center text-[11px] font-medium tracking-wide text-muted-foreground"
                    >
                        {d}
                    </div>
                ))}
                {Array.from({ length: offset }).map((_, i) => (
                    <div key={`e-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                    (day) => (
                        <div
                            key={day}
                            className="flex items-center justify-center"
                            onClick={() => onDayClick(day)}
                        >
                            <span className={getDayClassName(day)}>{day}</span>
                        </div>
                    ),
                )}
            </div>
            <div className="mt-3 border-t border-[0.5px] border-border pt-2">
                <p className="text-xs text-muted-foreground">{hint}</p>
            </div>
        </div>
    )
}

export function DateRangePicker({
    departureDate,
    returnDate,
    onDepartureSelect,
    onReturnSelect,
}: DateRangePickerProps) {
    const [openMode, setOpenMode] = useState<PickerMode>(null)
    const wrapRef = useRef<HTMLDivElement>(null)
    const {
        viewMonth,
        viewYear,
        goToPrev,
        goToNext,
        getDaysInMonth,
        getFirstDayOffset,
    } = useCalendar()

    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (
                wrapRef.current &&
                !wrapRef.current.contains(e.target as Node)
            ) {
                setOpenMode(null)
            }
        }
        document.addEventListener("mousedown", handleOutside)
        return () => document.removeEventListener("mousedown", handleOutside)
    }, [])

    function handleDayClick(day: number) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const date = new Date(viewYear, viewMonth, day)
        date.setHours(0, 0, 0, 0)
        if (date < today) return

        if (openMode === "departure") {
            onDepartureSelect(date)
            setOpenMode("return")
        } else if (openMode === "return") {
            if (departureDate && date <= departureDate) {
                onDepartureSelect(date)
            } else {
                onReturnSelect(date)
                setOpenMode(null)
            }
        }
    }

    function getDayClassName(day: number): string {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const date = new Date(viewYear, viewMonth, day)
        date.setHours(0, 0, 0, 0)
        const base =
            "w-8 h-8 text-sm flex items-center justify-center select-none transition-colors duration-100"

        if (date < today)
            return cn(base, "text-muted-foreground/30 cursor-not-allowed")

        const dep =
            departureDate ?
                new Date(
                    departureDate.getFullYear(),
                    departureDate.getMonth(),
                    departureDate.getDate(),
                )
            :   null
        const ret =
            returnDate ?
                new Date(
                    returnDate.getFullYear(),
                    returnDate.getMonth(),
                    returnDate.getDate(),
                )
            :   null
        const cur = date.getTime()
        const isDepDay = dep && cur === dep.getTime()
        const isRetDay = ret && cur === ret.getTime()

        if (isDepDay && isRetDay)
            return cn(
                base,
                "rounded-[6px] bg-lime-500 text-white font-medium cursor-pointer",
            )
        if (isDepDay)
            return cn(
                base,
                "bg-lime-500 text-white font-medium cursor-pointer",
                ret ? "rounded-l-[6px]" : "rounded-[6px]",
            )
        if (isRetDay)
            return cn(
                base,
                "rounded-r-[6px] bg-lime-500 text-white font-medium cursor-pointer",
            )
        if (dep && ret && cur > dep.getTime() && cur < ret.getTime())
            return cn(base, "bg-lime-100 text-lime-700 cursor-pointer")
        return cn(base, "rounded-[6px] cursor-pointer hover:bg-muted")
    }

    const daysInMonth = getDaysInMonth(viewYear, viewMonth)
    const offset = getFirstDayOffset(viewYear, viewMonth)

    return (
        <div ref={wrapRef} className="contents">
            <div className="relative">
                <button
                    type="button"
                    aria-label="Departure date"
                    aria-expanded={openMode === "departure"}
                    onClick={() =>
                        setOpenMode((p) =>
                            p === "departure" ? null : "departure",
                        )
                    }
                    className={cn(
                        "flex h-[52px] w-full items-center rounded-[8px] border border-[0.5px] border-border",
                        "bg-muted px-3.5 pr-10 text-left text-sm transition-colors duration-150 hover:border-foreground/20",
                        !departureDate && "text-muted-foreground",
                        openMode === "departure" &&
                            "border-lime-500 bg-background",
                    )}
                >
                    {departureDate ?
                        formatDateShort(departureDate)
                    :   "Departure date"}
                </button>
                <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                {openMode === "departure" && (
                    <CalendarDropdown
                        viewMonth={viewMonth}
                        viewYear={viewYear}
                        daysInMonth={daysInMonth}
                        offset={offset}
                        onPrev={goToPrev}
                        onNext={goToNext}
                        getDayClassName={getDayClassName}
                        onDayClick={handleDayClick}
                        hint="Departure date"
                    />
                )}
            </div>

            <div className="relative">
                <button
                    type="button"
                    aria-label="Return date"
                    aria-expanded={openMode === "return"}
                    onClick={() =>
                        setOpenMode((p) => (p === "return" ? null : "return"))
                    }
                    className={cn(
                        "flex h-[52px] w-full items-center rounded-[8px] border border-[0.5px] border-border",
                        "bg-muted px-3.5 pr-10 text-left text-sm transition-colors duration-150 hover:border-foreground/20",
                        !returnDate && "text-muted-foreground",
                        openMode === "return" &&
                            "border-lime-500 bg-background",
                    )}
                >
                    {returnDate ? formatDateShort(returnDate) : "Return date"}
                </button>
                <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                {openMode === "return" && (
                    <CalendarDropdown
                        viewMonth={viewMonth}
                        viewYear={viewYear}
                        daysInMonth={daysInMonth}
                        offset={offset}
                        onPrev={goToPrev}
                        onNext={goToNext}
                        getDayClassName={getDayClassName}
                        onDayClick={handleDayClick}
                        hint="Return date"
                    />
                )}
            </div>
        </div>
    )
}
